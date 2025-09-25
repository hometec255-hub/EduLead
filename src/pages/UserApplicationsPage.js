import React, { useState, useEffect } from 'react';
import { getAllApplications, createApplication } from '../services/applicationService';
import { getAllScholarships } from '../services/scholarshipService';
import { getUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function UserApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [formData, setFormData] = useState({
    scholarship_id: '',
    motivation: '',
    experience: '',
    goals: ''
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    setCurrentUser(user);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [applicationsData, scholarshipsData] = await Promise.all([
        getAllApplications(),
        getAllScholarships()
      ]);
      
      // Filter applications for current user (assuming user_id is stored in applications)
      const userApplications = applicationsData.filter(app => 
        app.student_id === currentUser?.id || app.user_id === currentUser?.id
      );
      
      setApplications(userApplications);
      setScholarships(scholarshipsData);
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
      await createApplication({
        scholarship_id: formData.scholarship_id,
        student_id: currentUser.id,
        motivation: formData.motivation,
        experience: formData.experience,
        goals: formData.goals
      });
      
      setShowForm(false);
      setSelectedScholarship(null);
      setFormData({
        scholarship_id: '',
        motivation: '',
        experience: '',
        goals: ''
      });
      loadData();
    } catch (err) {
      setError('Failed to submit application');
      console.error('Error submitting application:', err);
    }
  };

  const handleApplyForScholarship = (scholarship) => {
    setSelectedScholarship(scholarship);
    setFormData({
      ...formData,
      scholarship_id: scholarship.id
    });
    setShowForm(true);
  };

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.level?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      case 'pending': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      case 'pending': return '⏳';
      default: return '📋';
    }
  };

  if (!currentUser) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>Please log in to view applications</h2>
            <a href="/login" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dash-header">
          <div>
            <div className="dash-title">My Scholarship Applications 📝</div>
            <div className="dash-subtitle">Apply for scholarships and track your applications</div>
          </div>
          <div className="dash-controls">
            <button 
              className="chip" 
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ New Application'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="kpi-grid">
          <div className="kpi">
            <h4>Total Applications</h4>
            <div className="num">{applications.length}</div>
            <div className="trend">All time</div>
          </div>
          <div className="kpi">
            <h4>Pending</h4>
            <div className="num">{applications.filter(a => a.status === 'pending').length}</div>
            <div className="trend">Under review</div>
          </div>
          <div className="kpi">
            <h4>Approved</h4>
            <div className="num">{applications.filter(a => a.status === 'approved').length}</div>
            <div className="trend">Congratulations!</div>
          </div>
          <div className="kpi">
            <h4>Available Scholarships</h4>
            <div className="num">{scholarships.length}</div>
            <div className="trend">Ready to apply</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '24px' }}>
          <div className="input-with-addon">
            <div className="addon">🔍</div>
            <input
              type="text"
              placeholder="Search available scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Application Form */}
        {showForm && selectedScholarship && (
          <div className="form-section" style={{ marginBottom: '32px' }}>
            <h3>Apply for: {selectedScholarship.title}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Why are you interested in this scholarship? *</label>
                  <div className="form-hint">Tell us what motivates you to apply</div>
                  <textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="form-input"
                    placeholder="I am passionate about..."
                    rows={4}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">Relevant Experience *</label>
                  <div className="form-hint">Describe your background and experience</div>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="form-input"
                    placeholder="I have experience in..."
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Future Goals *</label>
                  <div className="form-hint">How will this scholarship help you achieve your goals?</div>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    className="form-input"
                    placeholder="My goals are to..."
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="actions-row">
                <button type="submit" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                  Submit Application
                </button>
                <button 
                  type="button" 
                  className="chip" 
                  onClick={() => {
                    setShowForm(false);
                    setSelectedScholarship(null);
                    setFormData({
                      scholarship_id: '',
                      motivation: '',
                      experience: '',
                      goals: ''
                    });
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

        {/* My Applications */}
        <div className="content-grid">
          <div style={{ gridColumn: '1 / -1' }}>
            <h3>My Applications ({applications.length})</h3>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading applications...</div>
            ) : applications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                <div style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>No applications yet</div>
                <div style={{ fontSize: '0.875rem' }}>Start by applying for a scholarship below!</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {applications.map((application) => {
                  const scholarship = scholarships.find(s => s.id === application.scholarship_id);
                  return (
                    <div key={application.id} className="card" style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ 
                              width: '48px', 
                              height: '48px', 
                              borderRadius: '50%', 
                              backgroundColor: getStatusColor(application.status), 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '20px',
                              fontWeight: 'bold'
                            }}>
                              {getStatusIcon(application.status)}
                            </div>
                            <div>
                              <h4 style={{ margin: 0, fontSize: '18px' }}>
                                {scholarship ? scholarship.title : 'Unknown Scholarship'}
                              </h4>
                              <div style={{ color: '#6b7280', fontSize: '14px' }}>
                                Applied: {new Date(application.applied_at || application.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                            <div>
                              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Status</div>
                              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: getStatusColor(application.status) + '20', 
                                  color: getStatusColor(application.status),
                                  fontSize: '12px',
                                  textTransform: 'capitalize'
                                }}>
                                  {application.status}
                                </span>
                              </div>
                            </div>
                            
                            {scholarship && (
                              <>
                                <div>
                                  <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Amount</div>
                                  <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                    <span style={{ 
                                      padding: '4px 8px', 
                                      borderRadius: '12px', 
                                      backgroundColor: '#d1fae5', 
                                      color: '#059669',
                                      fontSize: '12px'
                                    }}>
                                      ${scholarship.available_amount?.toLocaleString() || 'Not specified'}
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
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Available Scholarships */}
        <div className="content-grid" style={{ marginTop: '32px' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <h3>Available Scholarships ({filteredScholarships.length})</h3>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading scholarships...</div>
            ) : filteredScholarships.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                {searchTerm ? 'No scholarships found matching your search.' : 'No scholarships available.'}
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {filteredScholarships.map((scholarship) => {
                  const hasApplied = applications.some(app => app.scholarship_id === scholarship.id);
                  
                  return (
                    <div key={scholarship.id} className="card" style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ 
                              width: '48px', 
                              height: '48px', 
                              borderRadius: '50%', 
                              backgroundColor: hasApplied ? '#6b7280' : '#3b82f6', 
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
                              <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Amount</div>
                              <div style={{ fontSize: '16px', fontWeight: '500' }}>
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#d1fae5', 
                                  color: '#059669',
                                  fontSize: '12px'
                                }}>
                                  ${scholarship.available_amount?.toLocaleString() || 'Not specified'}
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
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {hasApplied ? (
                            <button 
                              className="chip"
                              style={{ backgroundColor: '#6b7280', color: 'white', fontSize: '12px' }}
                              disabled
                            >
                              ✅ Applied
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleApplyForScholarship(scholarship)}
                              className="chip"
                              style={{ backgroundColor: '#3b82f6', color: 'white', fontSize: '12px' }}
                            >
                              📝 Apply Now
                            </button>
                          )}
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

export default UserApplicationsPage;
