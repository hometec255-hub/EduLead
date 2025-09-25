import React from 'react'
import './Dashboard.css'

function StudentDashboard() {
	return (
		<div className="dashboard-container">
			<div className="dashboard-content">
				<div className="dash-header">
					<div>
						<div className="dash-title">Welcome back, Student! 📚</div>
						<div className="dash-subtitle">Here’s your learning progress and schedule.</div>
					</div>
					<div className="dash-controls">
						<button className="chip">This month</button>
						<button className="chip">This year</button>
					</div>
				</div>

				<div className="kpi-grid">
					<div className="kpi"><h4>Active courses</h4><div className="num">4</div><div className="trend">▲ 6%</div></div>
					<div className="kpi"><h4>Completed</h4><div className="num">12</div><div className="trend">▲ 2%</div></div>
					<div className="kpi"><h4>Overall progress</h4><div className="num">68%</div><div className="trend">▲ 1%</div></div>
					<div className="kpi"><h4>Mentorships</h4><div className="num">2</div><div className="trend">▲ 1</div></div>
				</div>

				<div className="content-grid">
					<div className="chart-card">
						<h3>Study activity</h3>
						<div className="bars">
							{[50,70,40,80,35,60,75,55,65,30,85,45].map((h,i) => (
								<div key={i} className="bar" style={{ height: h + '%' }}></div>
							))}
						</div>
					</div>
					<div className="right-col">
						<div className="widget">
							<h4>Upcoming lessons</h4>
							<ul className="list">
								<li><span>Math - Algebra II</span><span className="badge">Tomorrow</span></li>
								<li><span>Physics - Mechanics</span><span className="badge">In 2 days</span></li>
								<li><span>History - WW II</span><span className="badge">Friday</span></li>
							</ul>
						</div>
						<div className="widget">
							<h4>Recommendations</h4>
							<ul className="list">
								<li><span>Intro to Programming</span><span className="badge">New</span></li>
								<li><span>Career Path: Data Science</span><span className="badge">Trending</span></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default StudentDashboard
