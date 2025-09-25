import React, { useState, useEffect } from 'react';
import { getAllScholarships, createScholarship, updateScholarship, deleteScholarship } from '../services/scholarshipService';
import { getAllInstitutions } from '../services/institutionService';
import './Dashboard.css';

function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    available_amount: '',
    rating: '',
    students_enrolled: '',
    duration: '',
    mode: '',
    start_date: '',
    level: '',
    skills: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [scholarshipsData, institutionsData] = await Promise.all([
        getAllScholarships(),
        getAllInstitutions()
      ]);
      setScholarships(scholarshipsData);
      setInstitutions(institutionsData);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingScholarship) {
        await updateScholarship({ id: editingScholarship.id, ...formData });
      } else {
        await createScholarship(formData);
      }
      setShowForm(false);
      setEditingScholarship(null);
      setFormData({ title: '', description: '', available_amount: '', rating: '', students_enrolled: '', duration: '', mode: '', start_date: '', level: '', skills: '' });
      loadData();
    } catch (err) {
      setError('Failed to save scholarship');
      console.error('Error saving scholarship:', err);
    }
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setFormData({
      title: scholarship.title || '',
      description: scholarship.description || '',
      available_amount: scholarship.available_amount || '',
      rating: scholarship.rating || '',
      students_enrolled: scholarship.students_enrolled || '',
      duration: scholarship.duration || '',
      mode: scholarship.mode || '',
      start_date: scholarship.start_date ? scholarship.start_date.substring(0, 10) : '',
      level: scholarship.level || '',
      skills: Array.isArray(scholarship.skills) ? scholarship.skills.join(', ') : (scholarship.skills || '')
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        await deleteScholarship(id);
        loadData();
      } catch (err) {
        setError('Failed to delete scholarship');
        console.error('Error deleting scholarship:', err);
      }
    }
  };

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.id?.toString().includes(searchTerm) ||
    scholarship.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.level?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.skills?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: scholarships.length,
    withAmount: scholarships.filter(s => s.available_amount && s.available_amount > 0).length,
    rated: scholarships.filter(s => s.rating && s.rating > 0).length,
    withStudents: scholarships.filter(s => s.students_enrolled && s.students_enrolled > 0).length
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dash-header">
          <div>
            <div className="dash-title">Scholarships Management 🎓</div>
            <div className="dash-subtitle">Create and manage scholarship opportunities</div>
          </div>
          <div className="dash-controls">
            <button 
              className="chip" 
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Add Scholarship'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="kpi-grid">
          <div className="kpi">
            <h4>Total Scholarships</h4>
            <div className="num">{stats.total}</div>
            <div className="trend">All scholarships</div>
          </div>
          <div className="kpi">
            <h4>With Funding</h4>
            <div className="num">{stats.withAmount}</div>
            <div className="trend">Have available amount</div>
          </div>
          <div className="kpi">
            <h4>Rated</h4>
            <div className="num">{stats.rated}</div>
            <div className="trend">Have ratings</div>
          </div>
          <div className="kpi">
            <h4>With Students</h4>
            <div className="num">{stats.withStudents}</div>
            <div className="trend">Have enrolled students</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '24px' }}>
          <div className="input-with-addon">
            <div className="addon">🔍</div>
            <input
              type="text"
              placeholder="Search scholarships by title, description, level, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="form-section" style={{ marginBottom: '32px' }}>
            <h3>{editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div>
                  <label className="form-label">Scholarship Title *</label>
                  <div className="form-hint">A short, recognizable name</div>
                  <div className="input-with-addon">
                    <div className="addon">🏷️</div>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="form-input"
                      placeholder="e.g., STEM Excellence Award"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Available Amount</label>
                  <div className="form-hint">Funding amount available</div>
                  <div className="input-with-addon">
                    <div className="addon">💰</div>
                    <input
                      type="number"
                      value={formData.available_amount}
                      onChange={(e) => setFormData({ ...formData, available_amount: e.target.value })}
                      className="form-input"
                      placeholder="e.g., 5000"
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">Rating</label>
                  <div className="form-hint">Scholarship rating (1-5)</div>
                  <div className="input-with-addon">
                    <div className="addon">⭐</div>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                      className="form-input"
                      placeholder="e.g., 4.5"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Students Enrolled</label>
                  <div className="form-hint">Number of enrolled students</div>
                  <div className="input-with-addon">
                    <div className="addon">👥</div>
                    <input
                      type="number"
                      value={formData.students_enrolled}
                      onChange={(e) => setFormData({ ...formData, students_enrolled: e.target.value })}
                      className="form-input"
                      placeholder="e.g., 25"
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">Duration</label>
                  <div className="form-hint">Program duration</div>
                  <div className="input-with-addon">
                    <div className="addon">⏱️</div>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="form-input"
                      placeholder="e.g., 2 years, 6 months"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Mode</label>
                  <div className="form-hint">Delivery mode</div>
                  <div className="input-with-addon">
                    <div className="addon">🌐</div>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Select Mode</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">Start Date</label>
                  <div className="form-hint">Program start date</div>
                  <div className="input-with-addon">
                    <div className="addon">📅</div>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Level</label>
                  <div className="form-hint">Education level</div>
                  <div className="input-with-addon">
                    <div className="addon">🎓</div>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Select Level</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Postgraduate</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Skills</label>
                  <div className="form-hint">Required skills (comma-separated)</div>
                  <div className="input-with-addon">
                    <div className="addon">🛠️</div>
                    <input
                      type="text"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      className="form-input"
                      placeholder="e.g., JavaScript, React, Python, Data Analysis"
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Description</label>
                  <div className="form-hint">Detailed description of the scholarship</div>
                  <div className="input-with-addon">
                    <div className="addon">📝</div>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="form-input"
                      placeholder="Describe the scholarship, benefits, and requirements"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="actions-row">
                <button type="submit" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                  {editingScholarship ? 'Update Scholarship' : 'Create Scholarship'}
                </button>
                <button 
                  type="button" 
                  className="chip" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingScholarship(null);
                    setFormData({ title: '', description: '', available_amount: '', rating: '', students_enrolled: '', duration: '', mode: '', start_date: '', level: '', skills: '' });
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

        {/* Scholarships List */}
        <div className="content-grid">
          <div style={{ gridColumn: '1 / -1' }}>
            <h3>Scholarships ({filteredScholarships.length})</h3>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading scholarships...</div>
            ) : filteredScholarships.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                {searchTerm ? 'No scholarships found matching your search.' : 'No scholarships found.'}
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {filteredScholarships.map((scholarship) => {
                  return (
                    <div key={scholarship.id} className="card" style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ 
                              width: '48px', 
                              height: '48px', 
                              borderRadius: '50%', 
                              backgroundColor: '#3b82f6', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '20px',
                              fontWeight: 'bold'
                            }}>
                              🎓
                            </div>
                            <div>
                              <h4 style={{ margin: 0, fontSize: '18px' }}>{scholarship.title}</h4>
                              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                                ID: {scholarship.id} • Created: {new Date(scholarship.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Available Amount</div>
                              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#d1fae5', 
                                  color: '#059669',
                                  fontSize: '12px'
                                }}>
                                  ${scholarship.available_amount || 'Not specified'}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Rating</div>
                              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#fef3c7', 
                                  color: '#d97706',
                                  fontSize: '12px'
                                }}>
                                  ⭐ {scholarship.rating || 'Not rated'}
                                </span>
                              </div>
                            </div>

                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Level</div>
                              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#dbeafe', 
                                  color: '#1e40af',
                                  fontSize: '12px'
                                }}>
                                  {scholarship.level || 'Not specified'}
                                </span>
                              </div>
                            </div>

                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Mode</div>
                              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#e0e7ff', 
                                  color: '#3730a3',
                                  fontSize: '12px'
                                }}>
                                  {scholarship.mode || 'Not specified'}
                                </span>
                              </div>
                            </div>

                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Students Enrolled</div>
                              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#f3e8ff', 
                                  color: '#7c3aed',
                                  fontSize: '12px'
                                }}>
                                  👥 {scholarship.students_enrolled || '0'}
                                </span>
                              </div>
                            </div>

                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Duration</div>
                              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#fce7f3', 
                                  color: '#be185d',
                                  fontSize: '12px'
                                }}>
                                  ⏱️ {scholarship.duration || 'Not specified'}
                                </span>
                              </div>
                            </div>
                            
                            <div style={{ gridColumn: '1 / -1' }}>
                              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Description</div>
                              <div style={{ fontSize: '14px', color: '#374151', marginTop: '4px' }}>
                                {scholarship.description ? (
                                  scholarship.description.length > 150 
                                    ? `${scholarship.description.substring(0, 150)}...` 
                                    : scholarship.description
                                ) : 'No description provided'}
                              </div>
                            </div>
                            
                            {scholarship.skills && scholarship.skills.length > 0 && (
                              <div style={{ gridColumn: '1 / -1' }}>
                                <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Required Skills</div>
                                <div style={{ fontSize: '14px', color: '#374151', marginTop: '4px' }}>
                                  <span style={{ 
                                    padding: '4px 8px', 
                                    borderRadius: '12px', 
                                    backgroundColor: '#f0f9ff', 
                                    color: '#0369a1',
                                    fontSize: '12px'
                                  }}>
                                    🛠️ {Array.isArray(scholarship.skills) ? scholarship.skills.join(', ') : scholarship.skills}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleEdit(scholarship)}
                            className="chip"
                            style={{ backgroundColor: '#f59e0b', color: 'white', fontSize: '12px' }}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(scholarship.id)}
                            className="chip"
                            style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px' }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipsPage
