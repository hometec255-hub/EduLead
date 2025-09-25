import React, { useState, useEffect } from 'react';
import { getAllInstitutions, createInstitution, updateInstitution, deleteInstitution } from '../services/institutionService';
import './Dashboard.css';

function InstitutionsPage() {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingInstitution, setEditingInstitution] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    website: ''
  });

  useEffect(() => {
    loadInstitutions();
  }, []);

  const loadInstitutions = async () => {
    try {
      setLoading(true);
      const data = await getAllInstitutions();
      setInstitutions(data);
    } catch (err) {
      setError('Failed to load institutions');
      console.error('Error loading institutions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingInstitution) {
        await updateInstitution({ id: editingInstitution.id, ...formData });
      } else {
        await createInstitution(formData);
      }
      setShowForm(false);
      setEditingInstitution(null);
      setFormData({ name: '', country: '', website: '' });
      loadInstitutions();
    } catch (err) {
      setError('Failed to save institution');
      console.error('Error saving institution:', err);
    }
  };

  const handleEdit = (institution) => {
    setEditingInstitution(institution);
    setFormData({
      name: institution.name || '',
      country: institution.country || '',
      website: institution.website || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this institution?')) {
      try {
        await deleteInstitution(id);
        loadInstitutions();
      } catch (err) {
        setError('Failed to delete institution');
        console.error('Error deleting institution:', err);
      }
    }
  };

  const filteredInstitutions = institutions.filter(institution =>
    institution.id?.toString().includes(searchTerm) ||
    institution.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.website?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: institutions.length,
    countries: [...new Set(institutions.map(i => i.country).filter(Boolean))].length,
    withWebsite: institutions.filter(i => i.website).length,
    recent: institutions.filter(i => {
      const created = new Date(i.created_at);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return created > monthAgo;
    }).length
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dash-header">
          <div>
            <div className="dash-title">Institutions Management 🏫</div>
            <div className="dash-subtitle">Manage educational institutions and their information</div>
          </div>
          <div className="dash-controls">
            <button 
              className="chip" 
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Add Institution'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="kpi-grid">
          <div className="kpi">
            <h4>Total Institutions</h4>
            <div className="num">{stats.total}</div>
            <div className="trend">All registered</div>
          </div>
          <div className="kpi">
            <h4>Countries</h4>
            <div className="num">{stats.countries}</div>
            <div className="trend">Different countries</div>
          </div>
          <div className="kpi">
            <h4>With Website</h4>
            <div className="num">{stats.withWebsite}</div>
            <div className="trend">Have websites</div>
          </div>
          <div className="kpi">
            <h4>Recent</h4>
            <div className="num">{stats.recent}</div>
            <div className="trend">Last 30 days</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '24px' }}>
          <div className="input-with-addon">
            <div className="addon">🔍</div>
            <input
              type="text"
              placeholder="Search institutions by name, country, or website..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="form-section" style={{ marginBottom: '32px' }}>
            <h3>{editingInstitution ? 'Edit Institution' : 'Add New Institution'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div>
                  <label className="form-label">Institution Name *</label>
                  <div className="form-hint">Full name of the institution</div>
                  <div className="input-with-addon">
                    <div className="addon">🏫</div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                      placeholder="e.g., Harvard University"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Country</label>
                  <div className="form-hint">Country where institution is located</div>
                  <div className="input-with-addon">
                    <div className="addon">🌍</div>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="form-input"
                      placeholder="e.g., United States"
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">Website</label>
                  <div className="form-hint">Official website URL</div>
                  <div className="input-with-addon">
                    <div className="addon">🌐</div>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="form-input"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <div></div>
              </div>

              <div className="actions-row">
                <button type="submit" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                  {editingInstitution ? 'Update Institution' : 'Create Institution'}
                </button>
                <button 
                  type="button" 
                  className="chip" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingInstitution(null);
                    setFormData({ name: '', country: '', website: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{ 
            padding: '12px', 
            backgroundColor: '#fee2e2', 
            color: '#dc2626', 
            borderRadius: '8px', 
            marginBottom: '24px' 
          }}>
            {error}
          </div>
        )}

        {/* Institutions List */}
        <div className="content-grid">
          <div style={{ gridColumn: '1 / -1' }}>
            <h3>Institutions ({filteredInstitutions.length})</h3>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading institutions...</div>
            ) : filteredInstitutions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                {searchTerm ? 'No institutions found matching your search.' : 'No institutions found.'}
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {filteredInstitutions.map((institution) => (
                  <div key={institution.id} className="card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            borderRadius: '50%', 
                            backgroundColor: '#10b981', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: 'bold'
                          }}>
                            {institution.name ? institution.name.charAt(0).toUpperCase() : 'I'}
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '18px' }}>{institution.name}</h4>
                            <div style={{ color: '#6b7280', fontSize: '14px' }}>
                              ID: {institution.id} • Created: {new Date(institution.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Country</div>
                            <div style={{ fontSize: '16px', fontWeight: '500' }}>
                              {institution.country ? (
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#dbeafe', 
                                  color: '#1e40af',
                                  fontSize: '12px'
                                }}>
                                  {institution.country}
                                </span>
                              ) : 'Not specified'}
                            </div>
                          </div>
                          
                          <div>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Website</div>
                            <div style={{ fontSize: '16px', fontWeight: '500' }}>
                              {institution.website ? (
                                <a 
                                  href={institution.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  style={{ 
                                    color: '#3b82f6', 
                                    textDecoration: 'none',
                                    fontSize: '14px'
                                  }}
                                >
                                  {institution.website}
                                </a>
                              ) : 'No website'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => handleEdit(institution)}
                          className="chip"
                          style={{ backgroundColor: '#f59e0b', color: 'white', fontSize: '12px' }}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(institution.id)}
                          className="chip"
                          style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px' }}
                        >
                          🗑️ Delete
                        </button>
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
  );
}

export default InstitutionsPage
