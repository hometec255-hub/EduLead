import React, { useEffect, useState, useMemo } from 'react'
import './Dashboard.css'
import { getAllStudents } from '../services/studentService'
import { getAllMentors } from '../services/mentorService'
import { getAllInstitutions } from '../services/institutionService'
import { getAllScholarships } from '../services/scholarshipService'
import { getAllApplications } from '../services/applicationService'
import { getAllMentorships } from '../services/mentorshipService'

function AdminDashboard() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [students, setStudents] = useState([])
	const [mentors, setMentors] = useState([])
	const [institutions, setInstitutions] = useState([])
	const [scholarships, setScholarships] = useState([])
	const [applications, setApplications] = useState([])
	const [mentorships, setMentorships] = useState([])

	useEffect(() => {
		async function load() {
			setLoading(true)
			setError('')
			try {
				const studentsPromise = getAllStudents ? getAllStudents() : Promise.resolve([])
				const mentorsPromise = getAllMentors ? getAllMentors() : Promise.resolve([])
				const instPromise = getAllInstitutions ? getAllInstitutions() : Promise.resolve([])
				const schPromise = getAllScholarships ? getAllScholarships() : Promise.resolve([])
				const appsPromise = getAllApplications ? getAllApplications() : Promise.resolve([])
				const mentsPromise = getAllMentorships ? getAllMentorships() : Promise.resolve([])

				const [studs, ments, inst, sch, apps, mentships] = await Promise.all([
					studentsPromise,
					mentorsPromise,
					instPromise,
					schPromise,
					appsPromise,
					mentsPromise
				])
				setStudents(Array.isArray(studs) ? studs : [])
				setMentors(Array.isArray(ments) ? ments : [])
				setInstitutions(Array.isArray(inst) ? inst : [])
				setScholarships(Array.isArray(sch) ? sch : [])
				setApplications(Array.isArray(apps) ? apps : [])
				setMentorships(Array.isArray(mentships) ? mentships : [])
			} catch (e) {
				setError(e.message || 'Failed to load overview')
			} finally {
				setLoading(false)
			}
		}
		load()
	}, [])

	const kpis = useMemo(() => {
		const totalUsers = students.length + mentors.length
		const mentorCount = mentors.length
		const studentCount = students.length
		const instCount = institutions.length
		const pendingApps = applications.filter(a => a.status === 'pending').length
		return { totalUsers, mentorCount, studentCount, instCount, pendingApps }
	}, [students, mentors, institutions, applications])

	// Build last-12-month buckets from applications created/applied dates
	const activity = useMemo(() => {
		const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
		const months = []
		const now = new Date()
		for (let i = 11; i >= 0; i--) {
			const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
			const key = `${d.getFullYear()}-${d.getMonth()}`
			months.push({ key, label: monthNames[d.getMonth()], year: d.getFullYear(), month: d.getMonth(), count: 0 })
		}
		
		// Use object instead of Map for better compatibility
		const byKey = {}
		months.forEach(m => {
			byKey[m.key] = m
		})
		
		;(applications || []).forEach(a => {
			const tRaw = a && (a.applied_at || a.created_at)
			if (!tRaw) return
			const t = new Date(tRaw)
			if (Number.isNaN(t.getTime())) return
			const key = `${t.getFullYear()}-${t.getMonth()}`
			const b = byKey[key]
			if (b) b.count += 1
		})
		return months
	}, [applications])

	// Compute SVG bar chart metrics
	const chart = useMemo(() => {
		const width = 560, height = 180, padding = 28
		const n = Math.max(1, activity.length)
		const maxY = Math.max(1, ...activity.map(m => m.count))
		const plotW = width - 2 * padding
		const slotW = plotW / n
		const barGap = Math.min(8, Math.max(4, slotW * 0.2))
		const barW = Math.max(4, slotW - barGap)
		const bars = activity.map((m, i) => {
			const barHeight = (m.count / maxY) * (height - 2 * padding)
			const x = padding + i * slotW + (slotW - barW) / 2
			const y = height - padding - barHeight
			return { x, y, w: barW, h: barHeight, label: m.label, count: m.count }
		})
		return { width, height, padding, maxY, bars }
	}, [activity])

	const recentRows = useMemo(() => {
		const appRows = (applications || []).slice(0, 5).map(a => ({
			time: new Date(a.applied_at || a.created_at || Date.now()).toLocaleTimeString(),
			event: `Application #${a.id}`,
			status: (a.status || 'info').toUpperCase()
		}))
		const schRows = (scholarships || []).slice(0, 5).map(s => ({
			time: new Date(s.created_at || Date.now()).toLocaleDateString(),
			event: `Scholarship: ${s.title}`,
			status: 'NEW'
		}))
		const mentRows = (mentorships || []).slice(0, 5).map(m => ({
			time: new Date(m.created_at || Date.now()).toLocaleDateString(),
			event: `Mentorship #${m.id}`,
			status: 'UPDATED'
		}))
		return [...appRows, ...schRows, ...mentRows].slice(0, 5)
	}, [applications, scholarships, mentorships])

	return (
		<div className="dashboard-container">
			<div className="dashboard-content">
				<div className="dash-header">
					<div>
						<div className="dash-title">Welcome back, Admin! 👋</div>
						<div className="dash-subtitle">{loading ? 'Loading latest metrics...' : 'Here\'s what\'s happening across the system.'}</div>
					</div>
					<div className="dash-controls">
						<button className="chip" onClick={() => window.location.reload()}>Refresh</button>
					</div>
				</div>

				{error && <div className="card" style={{ borderColor: '#fee2e2' }}><div style={{ color: '#b91c1c', padding: 10 }}>{error}</div></div>}

				<div className="kpi-grid">
					<div className="kpi"><h4>Total users</h4><div className="num">{kpis.totalUsers}</div><div className="trend">{kpis.studentCount} students, {kpis.mentorCount} mentors</div></div>
					<div className="kpi"><h4>Mentors</h4><div className="num">{kpis.mentorCount}</div><div className="trend">active mentors</div></div>
					<div className="kpi"><h4>Institutions</h4><div className="num">{kpis.instCount}</div><div className="trend">connected</div></div>
					<div className="kpi"><h4>Pending applications</h4><div className="num">{kpis.pendingApps}</div><div className="trend">awaiting review</div></div>
				</div>

				<div className="content-grid">
					<div className="chart-card">
						<h3>Platform activity</h3>
						<svg width={chart.width} height={chart.height} role="img" aria-label="Applications over last 12 months (bar chart)">
							{/* Axes */}
							<line x1={chart.padding} y1={chart.height-chart.padding} x2={chart.width-chart.padding} y2={chart.height-chart.padding} stroke="#e5e7eb" />
							<line x1={chart.padding} y1={chart.padding} x2={chart.padding} y2={chart.height-chart.padding} stroke="#e5e7eb" />
							{/* Bars */}
							{chart.bars.map((b, i) => (
								<g key={i}>
									<rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill="#3b82f6" opacity="0.85" />
									<title>{b.label + ': ' + b.count}</title>
									<text x={b.x + b.w / 2} y={chart.height - 6} textAnchor="middle" fontSize="10" fill="#6b7280">{b.label}</text>
								</g>
							))}
							{/* Y max label */}
							<text x={chart.padding - 6} y={chart.padding + 4} textAnchor="end" fontSize="10" fill="#6b7280">{chart.maxY}</text>
						</svg>
					</div>

					<div className="right-col">
						<div className="widget">
							<h4>At a glance</h4>
							<div className="list">
								<div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Scholarships</span><span className="badge">{scholarships.length}</span></div>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Mentorships</span><span className="badge">{mentorships.length}</span></div>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Applications</span><span className="badge">{applications.length}</span></div>
							</div>
						</div>

						<div className="widget">
							<h4>Recent activity</h4>
							<table className="table">
								<thead><tr><th>Time</th><th>Event</th><th>Status</th></tr></thead>
								<tbody>
									{recentRows.map((r, idx) => (
										<tr key={idx}><td>{r.time}</td><td>{r.event}</td><td><span className="badge">{r.status}</span></td></tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard