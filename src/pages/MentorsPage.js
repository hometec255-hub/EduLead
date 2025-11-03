import React, { useEffect, useMemo, useState } from 'react'
import './Dashboard.css'
import mentorService from '../services/mentorService'

function MentorsPage() {
  const [mentors, setMentors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', expertise: '', description: '', contact_info: '' })

  const stats = useMemo(() => ({
    total: mentors.length,
    withContact: mentors.filter(m => !!m.contact_info).length
  }), [mentors])

  async function load() {
    setLoading(true)
    setError('')
    try {
      const all = await mentorService.getAllMentors()
      setMentors(Array.isArray(all) ? all : [])
    } catch (e) {
      setError(e.message || 'Failed to load mentors')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (editing) {
        await mentorService.updateMentor({ id: editing.id, ...form })
      } else {
        await mentorService.createMentor(form)
      }
      setShowForm(false)
      setEditing(null)
      setForm({ name: '', expertise: '', description: '', contact_info: '' })
      await load()
    } catch (e) {
      setError(e.message || 'Save failed')
    }
  }

  async function onDelete(id) {
    if (!window.confirm('Delete this mentor?')) return
    setError('')
    try {
      await mentorService.deleteMentor(id)
      await load()
    } catch (e) {
      setError(e.message || 'Delete failed')
    }
  }

  function onEdit(m) {
    setEditing(m)
    setForm({
      name: m.name || '',
      expertise: m.expertise || '',
      description: m.description || '',
      contact_info: m.contact_info || ''
    })
    setShowForm(true)
  }

  const filtered = mentors.filter(m =>
    (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.expertise || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(m.id || '').includes(searchTerm)
  )

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dash-header">
          <div>
            <div className="dash-title">Mentors Management 🧑‍🏫</div>
            <div className="dash-subtitle">Create and manage mentors for student requests</div>
          </div>
          <div className="dash-controls">
            <button className="chip" onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : '+ Add Mentor'}</button>
          </div>
        </div>

        <div className="kpi-grid">
          <div className="kpi"><h4>Total Mentors</h4><div className="num">{stats.total}</div><div className="trend">All registered</div></div>
          <div className="kpi"><h4>With Contact</h4><div className="num">{stats.withContact}</div><div className="trend">Reachable</div></div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div className="input-with-addon">
            <div className="addon">🔍</div>
            <input
              type="text"
              placeholder="Search mentors by name, expertise, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {showForm && (
          <div className="form-section" style={{ marginBottom: '32px' }}>
            <h3>{editing ? 'Edit Mentor' : 'Add New Mentor'}</h3>
            <form onSubmit={onSubmit}>
              <div className="form-grid-2">
                <div>
                  <label className="form-label">Name *</label>
                  <div className="input-with-addon">
                    <div className="addon">👤</div>
                    <input name="name" value={form.name} onChange={onChange} className="form-input" placeholder="e.g., Dr. Jane Smith" required />
                  </div>
                </div>
                <div>
                  <label className="form-label">Expertise *</label>
                  <div className="input-with-addon">
                    <div className="addon">🧠</div>
                    <input name="expertise" value={form.expertise} onChange={onChange} className="form-input" placeholder="e.g., Data Science" required />
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Description</label>
                  <div className="input-with-addon">
                    <div className="addon">📝</div>
                    <textarea name="description" value={form.description} onChange={onChange} className="form-input" rows={4} placeholder="Short bio, focus areas, availability" />
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">Contact Info</label>
                  <div className="input-with-addon">
                    <div className="addon">✉️</div>
                    <input name="contact_info" value={form.contact_info} onChange={onChange} className="form-input" placeholder="email/phone/link" />
                  </div>
                </div>
                <div></div>
              </div>

              <div className="actions-row">
                <button type="submit" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>{editing ? 'Update Mentor' : 'Create Mentor'}</button>
                <button type="button" className="chip" onClick={() => { setShowForm(false); setEditing(null); setForm({ name: '', expertise: '', description: '', contact_info: '' }) }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {error && (
          <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>
        )}

        <div className="content-grid">
          <div style={{ gridColumn: '1 / -1' }}>
            <h3>Mentors ({filtered.length})</h3>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading mentors...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>No mentors found.</div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {filtered.map((m) => (
                  <div key={m.id} className="card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#14b8a6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>🧑‍🏫</div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '18px' }}>{m.name || `Mentor #${m.id}`}</h4>
                            <div style={{ color: '#6b7280', fontSize: '14px' }}>ID: {m.id} {m.expertise ? `• ${m.expertise}` : ''}</div>
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div style={{ gridColumn: '1 / -1' }}>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Description</div>
                            <div style={{ fontSize: '14px', color: '#374151', marginTop: '4px' }}>{m.description || '—'}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Contact</div>
                            <div style={{ fontSize: '14px', fontWeight: '500' }}>{m.contact_info || '—'}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => onEdit(m)} className="chip" style={{ backgroundColor: '#f59e0b', color: 'white', fontSize: '12px' }}>✏️ Edit</button>
                        <button onClick={() => onDelete(m.id)} className="chip" style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px' }}>🗑️ Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentorsPage


