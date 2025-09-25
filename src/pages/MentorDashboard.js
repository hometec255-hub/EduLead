import React from 'react'
import './Dashboard.css'

function MentorDashboard() {
	return (
		<div className="dashboard-container">
			<div className="dashboard-content">
				<div className="dash-header">
					<div>
						<div className="dash-title">Welcome back, Mentor! 🎯</div>
						<div className="dash-subtitle">Today’s sessions and student activity overview.</div>
					</div>
					<div className="dash-controls">
						<button className="chip">Today</button>
						<button className="chip">This week</button>
					</div>
				</div>

				<div className="kpi-grid">
					<div className="kpi"><h4>Upcoming sessions</h4><div className="num">3</div><div className="trend">▲ 1</div></div>
					<div className="kpi"><h4>Students</h4><div className="num">28</div><div className="trend">▲ 2</div></div>
					<div className="kpi"><h4>Rating</h4><div className="num">4.8</div><div className="trend">★</div></div>
					<div className="kpi"><h4>Messages</h4><div className="num">12</div><div className="trend">▲ 3</div></div>
				</div>

				<div className="content-grid">
					<div className="chart-card">
						<h3>Mentorship load</h3>
						<div className="bars">
							{[30,55,40,75,60,35,50,80,45,70,30,65].map((h,i) => (
								<div key={i} className="bar" style={{ height: h + '%' }}></div>
							))}
						</div>
					</div>
					<div className="right-col">
						<div className="widget">
							<h4>Today agenda</h4>
							<ul className="list">
								<li><span>1:00 PM - JavaScript Basics</span><span className="badge">Live</span></li>
								<li><span>3:30 PM - 1:1 Mentorship</span><span className="badge">Upcoming</span></li>
							</ul>
						</div>
						<div className="widget">
							<h4>Recent messages</h4>
							<ul className="list">
								<li><span>Anna: Thanks for the session!</span><span className="badge">2m</span></li>
								<li><span>James: Can we reschedule?</span><span className="badge">10m</span></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MentorDashboard
