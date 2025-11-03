import React, { useEffect, useMemo, useState } from 'react'
import './Dashboard.css'
<<<<<<< HEAD
import { getAllMentorships, createMentorship, updateMentorship, deleteMentorship } from '../services/mentorshipService'
import { getAllStudents, createStudent } from '../services/studentService'
import mentorService from '../services/mentorService'
import { getUser } from '../services/authService'
import { generateMentorshipsReport, generateMentorshipsReportForCurrentUser } from '../utils/reportService'
// requestMentorship removed; createMentorship now handles student requests
=======
import { getAllMentorships, createMentorship, updateMentorshipStatus, deleteMentorship } from '../services/mentorshipService'
import { getAllStudents } from '../services/studentService'
import { getAllMentors } from '../services/mentorService'
import { getUser } from '../services/authService'
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26

function MentorshipsPage() {
	const [items, setItems] = useState([])
	const [students, setStudents] = useState([])
	const [mentors, setMentors] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentUser, setCurrentUser] = useState(null)
	const [error, setError] = useState('')
	const [showForm, setShowForm] = useState(false)
	const [editing, setEditing] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
<<<<<<< HEAD
const [form, setForm] = useState({ id: null, student_id: '', mentor_id: '', request_message: '', status: 'pending' })
    const [showRequest, setShowRequest] = useState(false)
    const [mentors, setMentors] = useState([])
    const [requestForm, setRequestForm] = useState({ mentor_id: '', message: '' })
    const currentUser = getUser && getUser()
    const role = (currentUser?.role || '').toLowerCase()

const stats = useMemo(() => {
    const total = items.length
    const pending = items.filter(m => (m.status || '').toLowerCase() === 'pending').length
    const approved = items.filter(m => (m.status || '').toLowerCase() === 'approved').length
    return { total, pending, approved }
}, [items])
=======
	const [form, setForm] = useState({ id: null, student_id: '', mentor_id: '', request_message: '' })

	const stats = useMemo(() => {
		const total = items.length
		// Count by status
		const pending = items.filter(m => m.status === 'pending').length
		const approved = items.filter(m => m.status === 'approved').length
		const rejected = items.filter(m => m.status === 'rejected').length
		const completed = items.filter(m => m.status === 'completed').length
		return { total, pending, approved, rejected, completed }
	}, [items])
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26

	async function load() {
		setLoading(true)
		setError('')
		try {
<<<<<<< HEAD
            const [mentorships, studentsData, mentorsData] = await Promise.all([
                getAllMentorships(),
                getAllStudents(),
                mentorService.getAllMentors().catch(() => [])
            ])
			setItems(mentorships)
			setStudents(studentsData)
            setMentors(Array.isArray(mentorsData) ? mentorsData : [])
=======
			const [mentorships, studentsData, mentorsData] = await Promise.all([
				getAllMentorships(),
				getAllStudents(),
				getAllMentors()
			])
			
			// Filter mentorships based on user role
			let filteredMentorships
			if (currentUser?.role === 'admin') {
				filteredMentorships = mentorships // Admin sees all mentorships
			} else {
				filteredMentorships = mentorships.filter(mentorship => 
					mentorship.student_id === currentUser?.id
				)
			}
			
			setItems(filteredMentorships)
			setStudents(studentsData)
			setMentors(mentorsData)
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
		} catch (e) {
			setError(e.message || 'Failed to load')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const user = getUser()
		if (!user) {
			window.location.href = '/login'
			return
		}
		setCurrentUser(user)
	}, [])

	useEffect(() => {
		if (currentUser) {
			load()
		}
	}, [currentUser])

	function onChange(e) {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	async function onSubmit(e) {
		e.preventDefault()
		setError('')
<<<<<<< HEAD
        try {
            if (editing) {
                await updateMentorship({ id: editing.id, mentor_id: form.mentor_id ? Number(form.mentor_id) : null, request_message: form.request_message, status: form.status })
            } else {
                await createMentorship({ student_id: Number(form.student_id), mentor_id: Number(form.mentor_id), request_message: form.request_message, status: form.status })
            }
			setShowForm(false)
			setEditing(null)
            setForm({ id: null, student_id: '', mentor_id: '', request_message: '', status: 'pending' })
=======
		try {
			if (editing) {
				// For editing, we can only update the status
				await updateMentorshipStatus(editing.id, form.status)
			} else {
				// For students, automatically use their ID; for admins, use the selected student
				const studentId = currentUser?.role === 'admin' ? Number(form.student_id) : currentUser?.id
				await createMentorship({ 
					student_id: studentId, 
					mentor_id: Number(form.mentor_id), 
					request_message: form.request_message 
				})
			}
			setShowForm(false)
			setEditing(null)
			setForm({ id: null, student_id: '', mentor_id: '', request_message: '' })
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
			await load()
		} catch (e) {
			setError(e.message || 'Save failed')
		}
	}

	function onEdit(item) {
		setEditing(item)
<<<<<<< HEAD
    setForm({
        id: item.id,
        student_id: item.student_id || '',
        mentor_id: item.mentor_id || '',
        request_message: item.request_message || '',
        status: item.status || 'pending'
    })
=======
		setForm({
			id: item.id,
			student_id: item.student_id || '',
			mentor_id: item.mentor_id || '',
			request_message: item.request_message || '',
			status: item.status || 'pending'
		})
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
		setShowForm(true)
	}

	async function onDelete(id) {
		if (!window.confirm('Delete this mentorship?')) return
		try {
			await deleteMentorship(id)
			await load()
		} catch (e) {
			setError(e.message || 'Delete failed')
		}
	}

	function getStudentName(studentId) {
		const s = students.find(st => st.id === studentId)
		return s ? (s.student_name || `Student #${s.id}`) : `ID ${studentId}`
	}

	function getMentorName(mentorId) {
		const m = mentors.find(mentor => mentor.id === mentorId)
		return m ? (m.name || `Mentor #${m.id}`) : `ID ${mentorId}`
	}

	function getMentorExpertise(mentorId) {
		const m = mentors.find(mentor => mentor.id === mentorId)
		return m ? (m.expertise || 'No expertise listed') : 'Unknown'
	}

	const filteredMentorships = items.filter(m => {
		const studentName = getStudentName(m.student_id).toLowerCase()
		const mentorName = getMentorName(m.mentor_id).toLowerCase()
		const baseFilter = (
			String(m.id).includes(searchTerm) ||
			(m.request_message || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
			(m.status || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
			mentorName.includes(searchTerm.toLowerCase())
		)
		
		// Only include student name in search for admins
		if (currentUser?.role === 'admin') {
			return baseFilter || studentName.includes(searchTerm.toLowerCase())
		}
		
		return baseFilter
	})

	if (!currentUser) {
		return (
			<div className="dashboard-container">
				<div className="dashboard-content">
					<div style={{ textAlign: 'center', padding: '4rem' }}>
						<div>Loading...</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="dashboard-container">
			<div className="dashboard-content">
				<div className="dash-header">
					<div>
						<div className="dash-title">
							{currentUser?.role === 'admin' 
								? 'Mentorships Management 🤝' 
								: currentUser?.role === 'mentor'
								? 'My Assigned Mentorships 🤝'
								: 'My Mentorship Requests 🤝'
							}
						</div>
						<div className="dash-subtitle">
							{currentUser?.role === 'admin' 
								? 'Manage all mentorship requests and their statuses' 
								: currentUser?.role === 'mentor'
								? 'Review and respond to mentorship requests from students'
								: 'Request mentorships and track your requests'
							}
						</div>
					</div>
					<div className="dash-controls">
<<<<<<< HEAD
					{role !== 'student' && (
						<button 
							className="chip" 
							onClick={() => setShowForm(!showForm)}
						>
							{showForm ? 'Cancel' : '+ Add Mentorship'}
						</button>
					)}
					{role === 'student' && (
						<button className="chip" onClick={() => setShowRequest(!showRequest)}>
							{showRequest ? 'Close Request' : 'Request Mentorship'}
						</button>
					)}
					<button className="chip" onClick={() => generateMentorshipsReportForCurrentUser()}>Download Report (PDF)</button>
=======
						{currentUser?.role !== 'mentor' && (
							<button 
								className="chip" 
								onClick={() => setShowForm(!showForm)}
							>
								{showForm ? 'Cancel' : '+ Request Mentorship'}
							</button>
						)}
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
					</div>
				</div>

				{/* Stats Cards */}
				<div className="kpi-grid">
<<<<<<< HEAD
					<div className="kpi"><h4>Total Mentorships</h4><div className="num">{stats.total}</div><div className="trend">All records</div></div>
                    <div className="kpi"><h4>Pending</h4><div className="num">{stats.pending}</div><div className="trend">Awaiting review</div></div>
                    <div className="kpi"><h4>Approved</h4><div className="num">{stats.approved}</div><div className="trend">Mentorships approved</div></div>
					<div className="kpi"><h4>Students</h4><div className="num">{students.length}</div><div className="trend">Available</div></div>
=======
					<div className="kpi">
						<h4>
							{currentUser?.role === 'admin' 
								? 'Total Requests' 
								: currentUser?.role === 'mentor'
								? 'Assigned Requests'
								: 'My Requests'
							}
						</h4>
						<div className="num">{stats.total}</div>
						<div className="trend">
							{currentUser?.role === 'admin' 
								? 'All records' 
								: currentUser?.role === 'mentor'
								? 'From students'
								: 'All time'
							}
						</div>
					</div>
					<div className="kpi">
						<h4>Pending</h4>
						<div className="num">{stats.pending}</div>
						<div className="trend">
							{currentUser?.role === 'admin' 
								? 'Need review' 
								: currentUser?.role === 'mentor'
								? 'Awaiting your response'
								: 'Awaiting response'
							}
						</div>
					</div>
					<div className="kpi">
						<h4>Approved</h4>
						<div className="num">{stats.approved}</div>
						<div className="trend">{currentUser?.role === 'admin' ? 'Active mentorships' : 'Active mentorships'}</div>
					</div>
					<div className="kpi">
						<h4>Completed</h4>
						<div className="num">{stats.completed}</div>
						<div className="trend">Finished</div>
					</div>
					<div className="kpi">
						<h4>Rejected</h4>
						<div className="num">{stats.rejected}</div>
						<div className="trend">{currentUser?.role === 'admin' ? 'Not approved' : 'Declined'}</div>
					</div>
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
				</div>

				{/* Search */}
				<div style={{ marginBottom: '24px' }}>
					<div className="input-with-addon">
						<div className="addon">🔍</div>
						<input
							type="text"
							placeholder={currentUser?.role === 'admin' 
								? "Search by request message, student name, mentor name, status, or ID..." 
								: "Search by request message, mentor name, status, or ID..."
							}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="form-input"
						/>
					</div>
				</div>

				{/* Form */}
				{showForm && role !== 'student' && (
					<div className="form-section" style={{ marginBottom: '32px' }}>
						<h3>{editing ? 'Update Mentorship Status' : 'Add New Mentorship Request'}</h3>
						<form onSubmit={onSubmit}>
<<<<<<< HEAD
                            <div className="form-grid-2">
                                <div>
                                    <label className="form-label">Student *</label>
                                    <div className="form-hint">Select the mentee</div>
                                    <div className="input-with-addon">
                                        <div className="addon">👤</div>
                                        <select name="student_id" value={form.student_id} onChange={onChange} className="form-input" required>
                                            <option value="">Select Student</option>
                                            {students.map(s => (
                                                <option key={s.id} value={s.id}>{s.student_name || `Student #${s.id}`}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="form-label">Mentor *</label>
                                    <div className="input-with-addon">
                                        <div className="addon">🧑‍🏫</div>
                                        <select name="mentor_id" value={form.mentor_id} onChange={onChange} className="form-input" required>
                                            <option value="">Select Mentor</option>
                                            {mentors.map(m => (
                                                <option key={m.id} value={m.id}>{m.name || `Mentor #${m.id}`}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Request Message</label>
                                <div className="input-with-addon">
                                    <div className="addon">📝</div>
                                    <textarea name="request_message" value={form.request_message} onChange={onChange} placeholder="Describe the mentorship need" className="form-input" rows={4} />
                                </div>
                            </div>

                            <div className="form-grid-2">
                                <div>
                                    <label className="form-label">Status</label>
                                    <div className="input-with-addon">
                                        <div className="addon">⚙️</div>
                                        <select name="status" value={form.status} onChange={onChange} className="form-input">
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </div>
                                </div>
                                <div></div>
                            </div>
=======
							{editing ? (
								<div>
									<label className="form-label">Status *</label>
									<div className="form-hint">Update the mentorship status</div>
									<div className="input-with-addon">
										<div className="addon">📊</div>
										<select name="status" value={form.status} onChange={onChange} className="form-input" required>
											<option value="pending">Pending</option>
											<option value="approved">Approved</option>
											<option value="rejected">Rejected</option>
											<option value="completed">Completed</option>
										</select>
									</div>
								</div>
							) : currentUser?.role !== 'mentor' ? (
								<>
									{currentUser?.role === 'admin' && (
										<div className="form-grid-2">
											<div>
												<label className="form-label">Student *</label>
												<div className="form-hint">Select the mentee</div>
												<div className="input-with-addon">
													<div className="addon">👤</div>
													<select name="student_id" value={form.student_id} onChange={onChange} className="form-input" required>
														<option value="">Select Student</option>
														{students.map(s => (
															<option key={s.id} value={s.id}>{s.student_name || `Student #${s.id}`}</option>
														))}
													</select>
												</div>
											</div>
											<div>
												<label className="form-label">Mentor *</label>
												<div className="form-hint">Select a mentor</div>
												<div className="input-with-addon">
													<div className="addon">👨‍🏫</div>
													<select name="mentor_id" value={form.mentor_id} onChange={onChange} className="form-input" required>
														<option value="">Select Mentor</option>
														{mentors.map(mentor => (
															<option key={mentor.id} value={mentor.id}>
																{mentor.name} - {mentor.expertise}
															</option>
														))}
													</select>
												</div>
											</div>
										</div>
									)}
									
									{currentUser?.role !== 'admin' && (
										<div>
											<label className="form-label">Mentor *</label>
											<div className="form-hint">Select a mentor for your mentorship request</div>
											<div className="input-with-addon">
												<div className="addon">👨‍🏫</div>
												<select name="mentor_id" value={form.mentor_id} onChange={onChange} className="form-input" required>
													<option value="">Select Mentor</option>
													{mentors.map(mentor => (
														<option key={mentor.id} value={mentor.id}>
															{mentor.name} - {mentor.expertise}
														</option>
													))}
												</select>
											</div>
										</div>
									)}

									<div>
										<label className="form-label">Request Message *</label>
										<div className="form-hint">Message to the mentor</div>
										<div className="input-with-addon">
											<div className="addon">📝</div>
											<textarea name="request_message" value={form.request_message} onChange={onChange} placeholder="Describe what you're looking for in this mentorship" className="form-input" rows={4} required />
										</div>
									</div>
								</>
							) : (
								<div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
									Mentors can only update the status of existing mentorship requests.
								</div>
							)}
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26

							{currentUser?.role !== 'mentor' || editing ? (
								<div className="actions-row">
									<button type="submit" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
										{editing ? 'Update Status' : 'Create Request'}
									</button>
									<button 
										type="button" 
										className="chip" 
										onClick={() => { setShowForm(false); setEditing(null); setForm({ id: null, student_id: '', mentor_id: '', request_message: '' }) }}
									>
										Cancel
									</button>
								</div>
							) : null}
						</form>
					</div>
				)}

				{showRequest && role === 'student' && (
					<div className="form-section" style={{ marginBottom: '32px' }}>
						<h3>Request a Mentorship</h3>
						<form onSubmit={async (e) => {
							e.preventDefault()
							setError('')
							try {
                if (!requestForm.mentor_id) {
                    throw new Error('Please select a mentor')
                }
								// Ensure we have a valid student_id from the students table
								let studentId = null
								// Try to find by a likely linkage (user_id) if present
								const byUserId = (students || []).find(s => String(s.user_id || '') === String(currentUser?.id || ''))
								if (byUserId) {
									studentId = byUserId.id
								} else {
									// Fallback: try to match by name
									const byName = (students || []).find(s => (s.student_name || '').trim().toLowerCase() === (currentUser?.name || '').trim().toLowerCase())
									if (byName) {
										studentId = byName.id
									} else {
										// Create a minimal student profile, then use its id
										const created = await createStudent({
											student_name: currentUser?.name || `User #${currentUser?.id || ''}`,
											date_of_birth: null,
											education_level: '',
											interests: ''
										})
										studentId = created && created.id
										// Refresh students list to include the new profile
										await load()
									}
								}
								if (!studentId) throw new Error('Unable to resolve a valid student profile')
								await createMentorship({
									student_id: Number(studentId),
									mentor_id: Number(requestForm.mentor_id),
									request_message: requestForm.message,
									status: 'pending'
								})
								setShowRequest(false)
                setRequestForm({ mentor_id: '', message: '' })
								alert('Mentorship request submitted')
							} catch (e) {
								setError(e.message || 'Request failed')
							}
						}}>
                        <div className="form-grid-2">
                            <div>
                                <label className="form-label">Student</label>
                                <div className="form-hint">Logged in as</div>
                                <div className="input-with-addon">
                                    <div className="addon">👤</div>
                                    <input value={currentUser?.name || `User #${currentUser?.id || ''}`} className="form-input" disabled />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Mentor *</label>
                                <div className="form-hint">Choose a mentor</div>
                                <div className="input-with-addon">
                                    <div className="addon">🧑‍🏫</div>
                                    <select value={requestForm.mentor_id} onChange={e => setRequestForm({ ...requestForm, mentor_id: e.target.value })} className="form-input" required>
                                        <option value="">Select Mentor</option>
                                        {mentors.map(m => (
                                            <option key={m.id} value={m.id}>{m.name || `Mentor #${m.id}`}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="form-label">Request Message *</label>
                            <div className="input-with-addon">
                                <div className="addon">📝</div>
                                <textarea value={requestForm.message} onChange={e => setRequestForm({ ...requestForm, message: e.target.value })} className="form-input" rows={4} required />
                            </div>
                        </div>
                            <div className="actions-row">
                                <button type="submit" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>Submit Request</button>
                                <button type="button" className="chip" onClick={() => { setShowRequest(false); setRequestForm({ mentor_id: '', message: '' }) }}>Cancel</button>
                            </div>
						</form>
					</div>
				)}

				{/* Error Message */}
				{error && (
					<div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>
				)}

				{/* Mentorships List */}
                <div className="content-grid">
					<div style={{ gridColumn: '1 / -1' }}>
						<h3>
							{currentUser?.role === 'admin' 
								? `All Mentorship Requests (${filteredMentorships.length})` 
								: currentUser?.role === 'mentor'
								? `Assigned Mentorship Requests (${filteredMentorships.length})`
								: `My Mentorship Requests (${filteredMentorships.length})`
							}
						</h3>
						{loading ? (
							<div style={{ textAlign: 'center', padding: '40px' }}>Loading mentorships...</div>
						) : filteredMentorships.length === 0 ? (
							<div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
								{searchTerm ? 'No mentorships match your search.' : 'No mentorships found.'}
							</div>
						) : (
							<div style={{ display: 'grid', gap: '16px' }}>
								{filteredMentorships.map((item) => (
									<div key={item.id} className="card" style={{ padding: '20px' }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
											<div style={{ flex: 1 }}>
												<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
													<div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>🤝</div>
<<<<<<< HEAD
                            <div>
                                <h4 style={{ margin: 0, fontSize: '18px' }}>{`Mentorship #${item.id}`}</h4>
                                <div style={{ color: '#6b7280', fontSize: '14px' }}>ID: {item.id} • Created: {new Date(item.created_at).toLocaleDateString()} • Status: {item.status || 'pending'}</div>
                            </div>
=======
													<div>
														<h4 style={{ margin: 0, fontSize: '18px' }}>Mentorship Request #{item.id}</h4>
														<div style={{ color: '#6b7280', fontSize: '14px' }}>Created: {new Date(item.created_at).toLocaleDateString()}</div>
													</div>
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
												</div>

                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
													<div>
                                                        <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Student</div>
														<div style={{ fontSize: '16px', fontWeight: '500' }}>
															<span style={{ padding: '4px 8px', borderRadius: '12px', backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '12px' }}>{getStudentName(item.student_id)}</span>
														</div>
													</div>
													<div>
<<<<<<< HEAD
                                                        <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Mentor ID</div>
                                                        <div style={{ fontSize: '16px', fontWeight: '500' }}>{item.mentor_id ? `#${item.mentor_id}` : '—'}</div>
													</div>
													<div style={{ gridColumn: '1 / -1' }}>
                                                        <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Request Message</div>
                                                        <div style={{ fontSize: '14px', color: '#374151', marginTop: '4px' }}>{item.request_message || '—'}</div>
=======
														<div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Mentor</div>
														<div style={{ fontSize: '16px', fontWeight: '500' }}>
															<span style={{ padding: '4px 8px', borderRadius: '12px', backgroundColor: '#e0e7ff', color: '#3730a3', fontSize: '12px' }}>
																{getMentorName(item.mentor_id)}
															</span>
														</div>
														<div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
															{getMentorExpertise(item.mentor_id)}
														</div>
													</div>
													<div>
														<div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Status</div>
														<div style={{ fontSize: '16px', fontWeight: '500' }}>
															<span style={{ 
																padding: '4px 8px', 
																borderRadius: '12px', 
																fontSize: '12px',
																backgroundColor: item.status === 'approved' ? '#dcfce7' : 
																              item.status === 'rejected' ? '#fee2e2' : 
																              item.status === 'completed' ? '#e0e7ff' : '#fef3c7',
																color: item.status === 'approved' ? '#166534' : 
																       item.status === 'rejected' ? '#dc2626' : 
																       item.status === 'completed' ? '#3730a3' : '#d97706'
															}}>
																{item.status || 'pending'}
															</span>
														</div>
													</div>
													<div style={{ gridColumn: '1 / -1' }}>
														<div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Request Message</div>
														<div style={{ fontSize: '14px', color: '#374151', marginTop: '4px' }}>{item.request_message || '—'}</div>
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
													</div>
												</div>
											</div>
											<div style={{ display: 'flex', gap: '8px' }}>
<<<<<<< HEAD
                                                {role !== 'student' && <button onClick={() => onEdit(item)} className="chip" style={{ backgroundColor: '#f59e0b', color: 'white', fontSize: '12px' }}>✏️ Edit</button>}
                                                {role !== 'student' && <button onClick={() => onDelete(item.id)} className="chip" style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px' }}>🗑️ Delete</button>}
=======
												<button onClick={() => onEdit(item)} className="chip" style={{ backgroundColor: '#f59e0b', color: 'white', fontSize: '12px' }}>✏️ Edit Status</button>
												<button onClick={() => onDelete(item.id)} className="chip" style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px' }}>🗑️ Delete</button>
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
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

export default MentorshipsPage