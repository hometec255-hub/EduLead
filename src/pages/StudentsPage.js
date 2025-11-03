import React, { useState, useEffect } from 'react';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '../services/studentService';
import './Dashboard.css';
import { generateStudentsReport } from '../utils/reportService';

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    student_name: '',
    date_of_birth: '',
    education_level: '',
    interests: ''
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to load students');
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await updateStudent({ id: editingStudent.id, ...formData });
      } else {
        await createStudent(formData);
      }
      setShowForm(false);
      setEditingStudent(null);
      setFormData({ student_name: '', date_of_birth: '', education_level: '', interests: '' });
      loadStudents();
    } catch (err) {
      setError('Failed to save student');
      console.error('Error saving student:', err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      student_name: student.student_name || '',
      date_of_birth: student.date_of_birth || '',
      education_level: student.education_level || '',
      interests: student.interests || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        loadStudents();
      } catch (err) {
        setError('Failed to delete student');
        console.error('Error deleting student:', err);
      }
    }
  };

  const filteredStudents = students.filter(student =>
    student.id?.toString().includes(searchTerm) ||
    student.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.education_level?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.interests?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: students.length,
    highSchool: students.filter(s => s.education_level === 'High School').length,
    undergraduate: students.filter(s => s.education_level === 'Undergraduate').length,
    graduate: students.filter(s => s.education_level === 'Graduate').length,
    phd: students.filter(s => s.education_level === 'PhD').length
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dash-header">
          <div>
            <div className="dash-title">Students Management 👨‍🎓</div>
            <div className="dash-subtitle">Manage student profiles and information</div>
          </div>
          <div className="dash-controls">
            <button 
              className="chip" 
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Add Student'}
            </button>
            <button 
              className="chip" 
              onClick={() => generateStudentsReport()}
            >
              Download Report (PDF)
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="kpi-grid">
          <div className="kpi">
            <h4>Total Students</h4>
            <div className="num">{stats.total}</div>
            <div className="trend">All registered</div>
          </div>
          <div className="kpi">
            <h4>High School</h4>
            <div className="num">{stats.highSchool}</div>
            <div className="trend">Pre-college</div>
          </div>
          <div className="kpi">
            <h4>Undergraduate</h4>
            <div className="num">{stats.undergraduate}</div>
            <div className="trend">Bachelor's level</div>
          </div>
          <div className="kpi">
            <h4>Graduate</h4>
            <div className="num">{stats.graduate}</div>
            <div className="trend">Master's level</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '24px' }}>
          <div className="input-with-addon">
            <div className="addon">🔍</div>
            <input
              type="text"
              placeholder="Search students by name, ID, education level, or interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="form-section" style={{ marginBottom: '32px' }}>
            <h3>{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div>
                  <label className="form-label">Student Name *</label>
                  <div className="form-hint">Full name of the student</div>
                  <div className="input-with-addon">
                    <div className="addon">👤</div>
                    <input
                      type="text"
                      value={formData.student_name}
                      onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      className="form-input"
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Date of Birth</label>
                  <div className="form-hint">Student's birth date</div>
                  <div className="input-with-addon">
                    <div className="addon">📅</div>
                    <input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">Education Level</label>
                  <div className="form-hint">Current academic level</div>
                  <div className="input-with-addon">
                    <div className="addon">🎓</div>
                    <select
                      value={formData.education_level}
                      onChange={(e) => setFormData({ ...formData, education_level: e.target.value })}
                      className="form-input"
                    >
                      <option value="">Select level</option>
                      <option value="High School">High School</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="PhD">PhD</option>
                      <option value="Postdoc">Postdoc</option>
                    </select>
                  </div>
                </div>
                <div></div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label className="form-label">Interests</label>
                  <div className="form-hint">Areas of interest (comma-separated)</div>
                  <div className="input-with-addon">
                    <div className="addon">🎯</div>
                    <input
                      type="text"
                      value={formData.interests}
                      onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                      className="form-input"
                      placeholder="e.g., Computer Science, Mathematics, Research"
                    />
                  </div>
                </div>
                <div></div>
              </div>

              <div className="actions-row">
                <button type="submit" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
                  {editingStudent ? 'Update Student' : 'Create Student'}
                </button>
                <button 
                  type="button" 
                  className="chip" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingStudent(null);
                    setFormData({ student_name: '', date_of_birth: '', education_level: '', interests: '' });
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

        {/* Students List */}
        <div className="content-grid">
          <div style={{ gridColumn: '1 / -1' }}>
            <h3>Students ({filteredStudents.length})</h3>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>Loading students...</div>
            ) : filteredStudents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                {searchTerm ? 'No students found matching your search.' : 'No students found.'}
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {filteredStudents.map((student) => (
                  <div key={student.id} className="card" style={{ padding: '20px' }}>
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
                            {student.student_name ? student.student_name.charAt(0).toUpperCase() : 'S'}
                          </div>
                          <div>
                            <h4 style={{ margin: 0, fontSize: '18px' }}>
                              {student.student_name || `Student #${student.id}`}
                            </h4>
                            <div style={{ color: '#6b7280', fontSize: '14px' }}>
                              ID: {student.id} • Created: {new Date(student.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                          <div>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Education Level</div>
                            <div style={{ fontSize: '16px', fontWeight: '500' }}>
                              {student.education_level ? (
                                <span style={{ 
                                  padding: '4px 8px', 
                                  borderRadius: '12px', 
                                  backgroundColor: '#dbeafe', 
                                  color: '#1e40af',
                                  fontSize: '12px',
                                  textTransform: 'capitalize'
                                }}>
                                  {student.education_level}
                                </span>
                              ) : 'Not specified'}
                            </div>
                          </div>
                          
                          <div>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Date of Birth</div>
                            <div style={{ fontSize: '16px', fontWeight: '500' }}>
                              {student.date_of_birth ? new Date(student.date_of_birth).toLocaleDateString() : 'Not specified'}
                            </div>
                          </div>
                          
                          <div style={{ gridColumn: '1 / -1' }}>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Interests</div>
                            <div style={{ fontSize: '16px', fontWeight: '500' }}>
                              {student.interests ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                                  {student.interests.split(',').map((interest, index) => (
                                    <span key={index} style={{ 
                                      padding: '4px 8px', 
                                      borderRadius: '12px', 
                                      backgroundColor: '#f3f4f6', 
                                      color: '#374151',
                                      fontSize: '12px'
                                    }}>
                                      {interest.trim()}
                                    </span>
                                  ))}
                                </div>
                              ) : 'No interests specified'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => handleEdit(student)}
                          className="chip"
                          style={{ backgroundColor: '#f59e0b', color: 'white', fontSize: '12px' }}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(student.id)}
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

export default StudentsPage;
