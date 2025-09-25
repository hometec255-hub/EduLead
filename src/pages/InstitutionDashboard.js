import React from 'react'
import './Dashboard.css'

function InstitutionDashboard() {
	return (
		<div className="dashboard-container">
			<div className="dashboard-content">
				<div className="dash-header">
					<div>
						<div className="dash-title">Welcome back, Institution! 🏫</div>
						<div className="dash-subtitle">Overview of programs, instructors and enrollments.</div>
					</div>
					<div className="dash-controls">
						<button className="chip">This month</button>
						<button className="chip">Quarter</button>
					</div>
				</div>

				<div className="kpi-grid">
					<div className="kpi"><h4>Total students</h4><div className="num">1,240</div><div className="trend">▲ 3%</div></div>
					<div className="kpi"><h4>Active courses</h4><div className="num">86</div><div className="trend">▲ 4</div></div>
					<div className="kpi"><h4>Instructors</h4><div className="num">54</div><div className="trend">▲ 1</div></div>
					<div className="kpi"><h4>Workshops</h4><div className="num">7</div><div className="trend">▲ 2</div></div>
				</div>

				<div className="content-grid">
					<div className="chart-card">
						<h3>Enrollment trend</h3>
						<div className="bars">
							{[60,50,70,90,40,55,80,45,75,65,35,85].map((h,i) => (
								<div key={i} className="bar" style={{ height: h + '%' }}></div>
							))}
						</div>
					</div>
					<div className="right-col">
						<div className="widget">
							<h4>Recent enrollments</h4>
							<ul className="list">
								<li><span>Jane Doe → Computer Science</span><span className="badge">Just now</span></li>
								<li><span>Mike Ross → Business Admin</span><span className="badge">5m</span></li>
							</ul>
						</div>
						<div className="widget">
							<h4>System health</h4>
							<ul className="list">
								<li><span>API Latency</span><span className="badge">120ms</span></li>
								<li><span>Uptime</span><span className="badge">99.98%</span></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InstitutionDashboard
