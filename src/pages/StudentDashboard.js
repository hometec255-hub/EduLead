import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { getUser } from '../services/authService'
import { getStudentById } from '../services/studentService'
import { getAllApplications } from '../services/applicationService'
import { getAllMentorships } from '../services/mentorshipService'
import { getAllScholarships } from '../services/scholarshipService'

function StudentDashboard() {
	const [currentUser, setCurrentUser] = useState(null)
	const [studentData, setStudentData] = useState(null)
	const [applications, setApplications] = useState([])
	const [mentorships, setMentorships] = useState([])
	const [scholarships, setScholarships] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		const user = getUser()
		if (!user) {
			window.location.href = '/login'
			return
		}
		setCurrentUser(user)
		loadStudentData(user)
	}, [])

	const loadStudentData = async (user) => {
		try {
			setLoading(true)
			setError('')
			
			const [studentInfo, applicationsData, mentorshipsData, scholarshipsData] = await Promise.all([
				getStudentById(user.id),
				getAllApplications(),
				getAllMentorships(),
				getAllScholarships()
			])

			// Filter applications for this student
			const studentApplications = applicationsData.filter(app => 
				app.student_id === user.id || app.user_id === user.id
			)

			// Filter mentorships for this student
			const studentMentorships = mentorshipsData.filter(mentorship => 
				mentorship.student_id === user.id
			)

			setStudentData(studentInfo)
			setApplications(studentApplications)
			setMentorships(studentMentorships)
			setScholarships(scholarshipsData)
		} catch (err) {
			setError('Failed to load student data')
			console.error('Error loading student data:', err)
		} finally {
			setLoading(false)
		}
	}

	const stats = {
		totalApplications: applications.length,
		pendingApplications: applications.filter(app => app.status === 'pending').length,
		approvedApplications: applications.filter(app => app.status === 'approved').length,
		activeMentorships: mentorships.filter(mentorship => mentorship.status === 'approved').length,
		pendingMentorships: mentorships.filter(mentorship => mentorship.status === 'pending').length,
		availableScholarships: scholarships.length
	}

	const getStatusColor = (status) => {
		switch (status) {
			case 'approved': return '#10b981'
			case 'rejected': return '#ef4444'
			case 'pending': return '#f59e0b'
			default: return '#6b7280'
		}
	}

	const getStatusIcon = (status) => {
		switch (status) {
			case 'approved': return '✅'
			case 'rejected': return '❌'
			case 'pending': return '⏳'
			default: return '📋'
		}
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
							Welcome back, {studentData?.student_name || currentUser?.name || 'Student'}! 📚
						</div>
						<div className="dash-subtitle">
							Here's your academic progress and opportunities.
						</div>
					</div>
					<div className="dash-controls">
						<button className="chip" onClick={() => window.location.href = '/student/applications'}>
							View Applications
						</button>
						<button className="chip" onClick={() => window.location.href = '/student/mentorships'}>
							View Mentorships
						</button>
					</div>
				</div>

				{/* Student Info Card */}
				{studentData && (
					<div className="card" style={{ marginBottom: '24px', padding: '20px' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
							<div style={{ 
								width: '64px', 
								height: '64px', 
								borderRadius: '50%', 
								backgroundColor: '#3b82f6', 
								display: 'flex', 
								alignItems: 'center', 
								justifyContent: 'center',
								color: 'white',
								fontSize: '24px',
								fontWeight: 'bold'
							}}>
								{studentData.student_name ? studentData.student_name.charAt(0).toUpperCase() : 'S'}
							</div>
							<div style={{ flex: 1 }}>
								<h3 style={{ margin: 0, fontSize: '20px' }}>{studentData.student_name || 'Student'}</h3>
								<div style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>
									{studentData.education_level && (
										<span style={{ 
											padding: '4px 8px', 
											borderRadius: '12px', 
											backgroundColor: '#dbeafe', 
											color: '#1e40af',
											fontSize: '12px',
											marginRight: '8px'
										}}>
											{studentData.education_level}
										</span>
									)}
									{studentData.date_of_birth && (
										<span>Born: {new Date(studentData.date_of_birth).toLocaleDateString()}</span>
									)}
								</div>
								{studentData.interests && (
									<div style={{ marginTop: '8px' }}>
										<div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>
											Interests
										</div>
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
											{studentData.interests.split(',').map((interest, index) => (
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
									</div>
								)}
							</div>
						</div>
					</div>
				)}

				<div className="kpi-grid">
					<div className="kpi">
						<h4>Applications</h4>
						<div className="num">{stats.totalApplications}</div>
						<div className="trend">{stats.pendingApplications} pending</div>
					</div>
					<div className="kpi">
						<h4>Approved</h4>
						<div className="num">{stats.approvedApplications}</div>
						<div className="trend">Congratulations!</div>
					</div>
					<div className="kpi">
						<h4>Active Mentorships</h4>
						<div className="num">{stats.activeMentorships}</div>
						<div className="trend">{stats.pendingMentorships} pending</div>
					</div>
					<div className="kpi">
						<h4>Available Scholarships</h4>
						<div className="num">{stats.availableScholarships}</div>
						<div className="trend">Ready to apply</div>
					</div>
				</div>

				<div className="content-grid">
					<div className="chart-card">
						<h3>Recent Applications</h3>
						{applications.length === 0 ? (
							<div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
								No applications yet
							</div>
						) : (
							<div style={{ display: 'grid', gap: '12px' }}>
								{applications.slice(0, 5).map((application) => {
									const scholarship = scholarships.find(s => s.id === application.scholarship_id)
									return (
										<div key={application.id} style={{ 
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
												backgroundColor: getStatusColor(application.status), 
												display: 'flex', 
												alignItems: 'center', 
												justifyContent: 'center',
												color: 'white',
												fontSize: '14px'
											}}>
												{getStatusIcon(application.status)}
											</div>
											<div style={{ flex: 1 }}>
												<div style={{ fontSize: '14px', fontWeight: '500' }}>
													{scholarship ? scholarship.title : 'Unknown Scholarship'}
												</div>
												<div style={{ fontSize: '12px', color: '#6b7280' }}>
													Applied: {new Date(application.applied_at || application.created_at).toLocaleDateString()}
												</div>
											</div>
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
									)
								})}
							</div>
						)}
					</div>
					<div className="right-col">
						<div className="widget">
							<h4>Recent Mentorships</h4>
							{mentorships.length === 0 ? (
								<div style={{ textAlign: 'center', padding: '20px', color: '#6b7280', fontSize: '14px' }}>
									No mentorship requests yet
								</div>
							) : (
								<ul className="list">
									{mentorships.slice(0, 3).map((mentorship) => (
										<li key={mentorship.id}>
											<span>Request #{mentorship.id}</span>
											<span className="badge" style={{ 
												backgroundColor: mentorship.status === 'approved' ? '#10b981' : 
												              mentorship.status === 'rejected' ? '#ef4444' : '#f59e0b',
												color: 'white'
											}}>
												{mentorship.status}
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
									<a href="/student/applications" style={{ textDecoration: 'none', color: 'inherit' }}>
										<span>Apply for Scholarships</span>
										<span className="badge">New</span>
									</a>
								</li>
								<li>
									<a href="/student/mentorships" style={{ textDecoration: 'none', color: 'inherit' }}>
										<span>Request Mentorship</span>
										<span className="badge">Available</span>
									</a>
								</li>
								<li>
									<a href="/student/resources" style={{ textDecoration: 'none', color: 'inherit' }}>
										<span>Browse Resources</span>
										<span className="badge">Helpful</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StudentDashboard