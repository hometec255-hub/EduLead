import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { getUser } from '../services/authService'
import { getMentorById } from '../services/mentorService'
import { getAllMentorships } from '../services/mentorshipService'
import { getAllStudents } from '../services/studentService'

function MentorDashboard() {
	const [currentUser, setCurrentUser] = useState(null)
	const [mentorData, setMentorData] = useState(null)
	const [mentorships, setMentorships] = useState([])
	const [students, setStudents] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

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
			loadMentorData(currentUser)
		}
	}, [currentUser])

	const loadMentorData = async (user) => {
		try {
			setLoading(true)
			setError('')
			
			// Try to get mentor info, but don't fail if mentor record doesn't exist
			let mentorInfo = null
			try {
				mentorInfo = await getMentorById(user.id)
			} catch (mentorErr) {
				console.log('Mentor record not found, using user data instead:', mentorErr.message)
				// Create a basic mentor object from user data
				mentorInfo = {
					id: user.id,
					name: user.name || user.email,
					expertise: 'General Mentoring',
					description: 'Mentor profile not yet set up',
					contact_info: user.email
				}
			}

			const [mentorshipsData, studentsData] = await Promise.all([
				getAllMentorships(),
				getAllStudents()
			])

			// Filter mentorships for this mentor
			const mentorMentorships = mentorshipsData.filter(mentorship => 
				mentorship.mentor_id === user.id
			)

			// Get unique students assigned to this mentor
			const assignedStudentIds = [...new Set(mentorMentorships.map(m => m.student_id))]
			const assignedStudents = studentsData.filter(student => 
				assignedStudentIds.includes(student.id)
			)

			setMentorData(mentorInfo)
			setMentorships(mentorMentorships)
			setStudents(assignedStudents)
		} catch (err) {
			setError('Failed to load mentor data')
			console.error('Error loading mentor data:', err)
		} finally {
			setLoading(false)
		}
	}

	const stats = {
		totalMentorships: mentorships.length,
		pendingMentorships: mentorships.filter(m => m.status === 'pending').length,
		activeMentorships: mentorships.filter(m => m.status === 'approved').length,
		completedMentorships: mentorships.filter(m => m.status === 'completed').length,
		assignedStudents: students.length
	}

	const getStatusColor = (status) => {
		switch (status) {
			case 'approved': return '#10b981'
			case 'rejected': return '#ef4444'
			case 'pending': return '#f59e0b'
			case 'completed': return '#3b82f6'
			default: return '#6b7280'
		}
	}

	const getStatusIcon = (status) => {
		switch (status) {
			case 'approved': return '✅'
			case 'rejected': return '❌'
			case 'pending': return '⏳'
			case 'completed': return '🎯'
			default: return '📋'
		}
	}

	const getStudentName = (studentId) => {
		const student = students.find(s => s.id === studentId)
		return student ? (student.student_name || `Student #${student.id}`) : `ID ${studentId}`
	}

	if (loading) {
		return (
			<div className="dashboard-container">
				<div className="dashboard-content">
					<div style={{ textAlign: 'center', padding: '4rem' }}>
						<div>Loading your dashboard...</div>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="dashboard-container">
				<div className="dashboard-content">
					<div style={{ textAlign: 'center', padding: '4rem' }}>
						<div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>
						<button className="chip" onClick={() => window.location.reload()}>
							Try Again
						</button>
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
							Welcome back, {mentorData?.name || currentUser?.name || 'Mentor'}! 🎯
						</div>
						<div className="dash-subtitle">
							Here's your mentorship activity and assigned students.
						</div>
					</div>
					<div className="dash-controls">
						<button className="chip" onClick={() => window.location.href = '/mentor/mentorships'}>
							View Mentorships
						</button>
						<button className="chip" onClick={() => window.location.href = '/mentor/resources'}>
							Browse Resources
						</button>
					</div>
				</div>

				{/* Mentor Info Card */}
				{mentorData && (
					<div className="card" style={{ marginBottom: '24px', padding: '20px' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
							<div style={{ 
								width: '64px', 
								height: '64px', 
								borderRadius: '50%', 
								backgroundColor: '#8b5cf6', 
								display: 'flex', 
								alignItems: 'center', 
								justifyContent: 'center',
								color: 'white',
								fontSize: '24px',
								fontWeight: 'bold'
							}}>
								{mentorData.name ? mentorData.name.charAt(0).toUpperCase() : 'M'}
							</div>
							<div style={{ flex: 1 }}>
								<h3 style={{ margin: 0, fontSize: '20px' }}>{mentorData.name || 'Mentor'}</h3>
								<div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
									{mentorData.expertise && (
										<span style={{ 
											padding: '4px 8px', 
											borderRadius: '12px', 
											backgroundColor: '#e0e7ff', 
											color: '#3730a3',
											fontSize: '12px',
											marginRight: '8px'
										}}>
											{mentorData.expertise}
										</span>
									)}
									{mentorData.contact_info && (
										<span>{mentorData.contact_info}</span>
									)}
								</div>
								{mentorData.description && (
									<div style={{ marginTop: '8px', fontSize: '14px', color: '#374151' }}>
										{mentorData.description}
									</div>
								)}
								{mentorData.description === 'Mentor profile not yet set up' && (
									<div style={{ 
										marginTop: '8px', 
										padding: '8px 12px', 
										backgroundColor: '#fef3c7', 
										borderRadius: '8px',
										fontSize: '12px',
										color: '#92400e'
									}}>
										⚠️ Your mentor profile needs to be set up. Contact an administrator to complete your profile.
									</div>
								)}
							</div>
						</div>
					</div>
				)}

				<div className="kpi-grid">
					<div className="kpi">
						<h4>Total Mentorships</h4>
						<div className="num">{stats.totalMentorships}</div>
						<div className="trend">All assigned</div>
					</div>
					<div className="kpi">
						<h4>Active</h4>
						<div className="num">{stats.activeMentorships}</div>
						<div className="trend">Currently mentoring</div>
					</div>
					<div className="kpi">
						<h4>Pending</h4>
						<div className="num">{stats.pendingMentorships}</div>
						<div className="trend">Awaiting response</div>
					</div>
					<div className="kpi">
						<h4>Assigned Students</h4>
						<div className="num">{stats.assignedStudents}</div>
						<div className="trend">Unique students</div>
					</div>
				</div>

				<div className="content-grid">
					<div className="chart-card">
						<h3>Recent Mentorship Requests</h3>
						{mentorships.length === 0 ? (
							<div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
								No mentorship requests yet
							</div>
						) : (
							<div style={{ display: 'grid', gap: '12px' }}>
								{mentorships.slice(0, 5).map((mentorship) => (
									<div key={mentorship.id} style={{ 
										padding: '12px', 
										border: '1px solid #e5e7eb', 
										borderRadius: '8px',
										display: 'flex',
										alignItems: 'center',
										gap: '12px'
									}}>
										<div style={{ 
											width: '32px', 
											height: '32px', 
											borderRadius: '50%', 
											backgroundColor: getStatusColor(mentorship.status), 
											display: 'flex', 
											alignItems: 'center', 
											justifyContent: 'center',
											color: 'white',
											fontSize: '14px'
										}}>
											{getStatusIcon(mentorship.status)}
										</div>
										<div style={{ flex: 1 }}>
											<div style={{ fontSize: '14px', fontWeight: '500' }}>
												{getStudentName(mentorship.student_id)}
											</div>
											<div style={{ fontSize: '12px', color: '#6b7280' }}>
												Requested: {new Date(mentorship.created_at).toLocaleDateString()}
											</div>
										</div>
										<span style={{ 
											padding: '4px 8px', 
											borderRadius: '12px', 
											backgroundColor: getStatusColor(mentorship.status) + '20', 
											color: getStatusColor(mentorship.status),
											fontSize: '12px',
											textTransform: 'capitalize'
										}}>
											{mentorship.status}
										</span>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="right-col">
						<div className="widget">
							<h4>Assigned Students</h4>
							{students.length === 0 ? (
								<div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '14px' }}>
									No students assigned yet
								</div>
							) : (
								<ul className="list">
									{students.slice(0, 5).map((student) => (
										<li key={student.id}>
											<span>{student.student_name || `Student #${student.id}`}</span>
											<span className="badge" style={{ 
												backgroundColor: '#3b82f6',
												color: 'white'
											}}>
												{student.education_level || 'Student'}
											</span>
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="widget">
							<h4>Quick Actions</h4>
							<ul className="list">
								<li>
									<a href="/mentor/mentorships" style={{ textDecoration: 'none', color: 'inherit' }}>
										<span>Manage Mentorships</span>
										<span className="badge">Active</span>
									</a>
								</li>
								<li>
									<a href="/mentor/resources" style={{ textDecoration: 'none', color: 'inherit' }}>
										<span>Browse Resources</span>
										<span className="badge">Helpful</span>
									</a>
								</li>
								<li>
									<span>Update Profile</span>
									<span className="badge">Settings</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MentorDashboard