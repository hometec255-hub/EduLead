import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { getUser } from '../services/authService'
import { getAllApplications } from '../services/applicationService'
import { getAllMentorships } from '../services/mentorshipService'
import { getAllScholarships } from '../services/scholarshipService'

function StudentDashboard() {
	const [currentUser, setCurrentUser] = useState(null)
	const [applications, setApplications] = useState([])
	const [mentorships, setMentorships] = useState([])
	const [scholarships, setScholarships] = useState([])
	const [loading, setLoading] = useState(true)

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
			const [applicationsData, mentorshipsData, scholarshipsData] = await Promise.all([
				getAllApplications(),
				getAllMentorships(),
				getAllScholarships()
			])

			// Filter data for current student only
			const studentApplications = applicationsData.filter(app => 
				app.student_id === user.id || app.user_id === user.id
			)
			const studentMentorships = mentorshipsData.filter(m => m.student_id === user.id)

			setApplications(studentApplications)
			setMentorships(studentMentorships)
			setScholarships(scholarshipsData)
		} catch (err) {
			console.error('Error loading student data:', err)
		} finally {
			setLoading(false)
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

	return (
		<div className="dashboard-container">
			<div className="dashboard-content">
				<div className="dash-header">
					<div>
						<div className="dash-title">Welcome back, {currentUser?.name || 'Student'}! 📚</div>
						<div className="dash-subtitle">Here's your learning progress and scholarship applications.</div>
					</div>
					<div className="dash-controls">
						<button className="chip">This month</button>
						<button className="chip">This year</button>
					</div>
				</div>

				<div className="kpi-grid">
					<div className="kpi">
						<h4>My Applications</h4>
						<div className="num">{applications.length}</div>
						<div className="trend">Total submitted</div>
					</div>
					<div className="kpi">
						<h4>Approved</h4>
						<div className="num">{applications.filter(a => a.status === 'approved').length}</div>
						<div className="trend">Congratulations!</div>
					</div>
					<div className="kpi">
						<h4>Pending</h4>
						<div className="num">{applications.filter(a => a.status === 'pending').length}</div>
						<div className="trend">Under review</div>
					</div>
					<div className="kpi">
						<h4>Mentorships</h4>
						<div className="num">{mentorships.length}</div>
						<div className="trend">Active sessions</div>
					</div>
				</div>

				<div className="content-grid">
					<div className="chart-card">
						<h3>Application Status Overview</h3>
						<div className="bars">
							{[
								applications.filter(a => a.status === 'approved').length * 10,
								applications.filter(a => a.status === 'pending').length * 10,
								applications.filter(a => a.status === 'rejected').length * 10,
								scholarships.length - applications.length,
								mentorships.length * 15,
								applications.length * 8
							].map((h,i) => (
								<div key={i} className="bar" style={{ height: Math.min(h, 100) + '%' }}></div>
							))}
						</div>
					</div>
					<div className="right-col">
						<div className="widget">
							<h4>Recent Applications</h4>
							<ul className="list">
								{applications.slice(0, 3).map(app => {
									const scholarship = scholarships.find(s => s.id === app.scholarship_id)
									return (
										<li key={app.id}>
											<span>{scholarship?.title || 'Unknown Scholarship'}</span>
											<span className={`badge ${app.status === 'approved' ? 'approved' : app.status === 'rejected' ? 'rejected' : 'pending'}`}>
												{app.status}
											</span>
										</li>
									)
								})}
								{applications.length === 0 && (
									<li><span>No applications yet</span><span className="badge">Start applying!</span></li>
								)}
							</ul>
						</div>
						<div className="widget">
							<h4>Active Mentorships</h4>
							<ul className="list">
								{mentorships.slice(0, 3).map(mentorship => (
									<li key={mentorship.id}>
										<span>{mentorship.topic || 'Mentorship Session'}</span>
										<span className="badge">
											{mentorship.start_date ? new Date(mentorship.start_date).toLocaleDateString() : 'TBD'}
										</span>
									</li>
								))}
								{mentorships.length === 0 && (
									<li><span>No mentorships yet</span><span className="badge">Find a mentor!</span></li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StudentDashboard
