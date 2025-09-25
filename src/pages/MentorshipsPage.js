import React, { useEffect, useMemo, useState } from 'react'
import './Dashboard.css'
import { getAllMentorships, createMentorship, updateMentorship, deleteMentorship } from '../services/mentorshipService'
import { getAllStudents } from '../services/studentService'

function MentorshipsPage() {
	const [items, setItems] = useState([])
	const [students, setStudents] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [showForm, setShowForm] = useState(false)
	const [editing, setEditing] = useState(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [form, setForm] = useState({ id: null, student_id: '', topic: '', description: '', start_date: '', end_date: '' })

	const stats = useMemo(() => {
		const total = items.length
		// Count upcoming mentorships (start_date in next 30 days)
		const upcoming = items.filter(m => {
			if (!m.start_date) return false
			const d = new Date(m.start_date)
			const now = new Date()
			const diff = Math.ceil((d - now) / (1000*60*60*24))
			return diff >= 0 && diff <= 30
		}).length
		const ongoing = items.filter(m => {
			const now = new Date()
			const s = m.start_date ? new Date(m.start_date) : null
			const e = m.end_date ? new Date(m.end_date) : null
			return s && s <= now && (!e || e >= now)
		}).length
		return { total, upcoming, ongoing }
	}, [items])

	async function load() {
		setLoading(true)
		setError('')
		try {
			const [mentorships, studentsData] = await Promise.all([
				getAllMentorships(),
				getAllStudents()
			])
			setItems(mentorships)
			setStudents(studentsData)
		} catch (e) {
			setError(e.message || 'Failed to load')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => { load() }, [])

	function onChange(e) {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	async function onSubmit(e) {
		e.preventDefault()
		setError('')
		try {
			if (editing) {
				await updateMentorship({ id: editing.id, topic: form.topic, description: form.description, start_date: form.start_date, end_date: form.end_date })
			} else {
				await createMentorship({ student_id: Number(form.student_id), topic: form.topic, description: form.description, start_date: form.start_date, end_date: form.end_date })
			}
			setShowForm(false)
			setEditing(null)
			setForm({ id: null, student_id: '', topic: '', description: '', start_date: '', end_date: '' })
			await load()
		} catch (e) {
			setError(e.message || 'Save failed')
		}
	}

	function onEdit(item) {
		setEditing(item)
		setForm({
			id: item.id,
			student_id: item.student_id || '',
			topic: item.topic || '',
			description: item.description || '',
			start_date: item.start_date ? item.start_date.substring(0,10) : '',
			end_date: item.end_date ? item.end_date.substring(0,10) : ''
		})
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

	const filteredMentorships = items.filter(m => {
		const name = getStudentName(m.student_id).toLowerCase()
		return (
			String(m.id).includes(searchTerm) ||
			(m.topic || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
			(m.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
			name.includes(searchTerm.toLowerCase())
		)
	})

	return (
		<div className="dashboard-container">
			<div className="dashboard-content">
				<div className="dash-header">
					<div>
						<div className="dash-title">Mentorships Management 🤝</div>
						<div className="dash-subtitle">Manage student mentorships, topics and schedules</div>
					</div>
					<div className="dash-controls">
						<button 
							className="chip" 
							onClick={() => setShowForm(!showForm)}
						>
							{showForm ? 'Cancel' : '+ Add Mentorship'}
						</button>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="kpi-grid">
					<div className="kpi"><h4>Total Mentorships</h4><div className="num">{stats.total}</div><div className="trend">All records</div></div>
					<div className="kpi"><h4>Ongoing</h4><div className="num">{stats.ongoing}</div><div className="trend">Happening now</div></div>
					<div className="kpi"><h4>Starting soon</h4><div className="num">{stats.upcoming}</div><div className="trend">Next 30 days</div></div>
					<div className="kpi"><h4>Students</h4><div className="num">{students.length}</div><div className="trend">Available</div></div>
				</div>

				{/* Search */}
				<div style={{ marginBottom: '24px' }}>
					<div className="input-with-addon">
						<div className="addon">🔍</div>
						<input
							type="text"
							placeholder="Search by topic, student name, description, or ID..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="form-input"
						/>
					</div>
				</div>

				{/* Form */}
				{showForm && (
					<div className="form-section" style={{ marginBottom: '32px' }}>
						<h3>{editing ? 'Edit Mentorship' : 'Add New Mentorship'}</h3>
						<form onSubmit={onSubmit}>
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
									<label className="form-label">Topic</label>
									<div className="form-hint">Area of focus</div>
									<div className="input-with-addon">
										<div className="addon">🗂️</div>
										<input name="topic" value={form.topic} onChange={onChange} placeholder="e.g., Career Guidance" className="form-input" />
									</div>
								</div>
							</div>

							<div>
								<label className="form-label">Description</label>
								<div className="form-hint">Goals and expectations</div>
								<div className="input-with-addon">
									<div className="addon">📝</div>
									<textarea name="description" value={form.description} onChange={onChange} placeholder="Describe the mentorship" className="form-input" rows={4} />
								</div>
							</div>

							<div className="form-grid-2">
								<div>
									<label className="form-label">Start Date</label>
									<div className="form-hint">When it begins</div>
									<div className="input-with-addon">
										<div className="addon">📅</div>
										<input type="date" name="start_date" value={form.start_date} onChange={onChange} className="form-input" />
									</div>
								</div>
								<div>
									<label className="form-label">End Date</label>
									<div className="form-hint">Optional</div>
									<div className="input-with-addon">
										<div className="addon">📅</div>
										<input type="date" name="end_date" value={form.end_date} onChange={onChange} className="form-input" />
									</div>
								</div>
							</div>

							<div className="actions-row">
								<button type="submit" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>
									{editing ? 'Update Mentorship' : 'Create Mentorship'}
								</button>
								<button 
									type="button" 
									className="chip" 
									onClick={() => { setShowForm(false); setEditing(null); setForm({ id: null, student_id: '', topic: '', description: '', start_date: '', end_date: '' }) }}
								>
									Cancel
								</button>
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
						<h3>Mentorships ({filteredMentorships.length})</h3>
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
													<div>
														<h4 style={{ margin: 0, fontSize: '18px' }}>{item.topic || `Mentorship #${item.id}`}</h4>
														<div style={{ color: '#6b7280', fontSize: '14px' }}>ID: {item.id} • Created: {new Date(item.created_at).toLocaleDateString()}</div>
													</div>
												</div>

												<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
													<div>
														<div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Student</div>
														<div style={{ fontSize: '16px', fontWeight: '500' }}>
															<span style={{ padding: '4px 8px', borderRadius: '12px', backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '12px' }}>{getStudentName(item.student_id)}</span>
														</div>
													</div>
													<div>
														<div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Dates</div>
														<div style={{ fontSize: '16px', fontWeight: '500' }}>{item.start_date ? new Date(item.start_date).toLocaleDateString() : '—'} → {item.end_date ? new Date(item.end_date).toLocaleDateString() : '—'}</div>
													</div>
													<div style={{ gridColumn: '1 / -1' }}>
														<div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Description</div>
														<div style={{ fontSize: '14px', color: '#374151', marginTop: '4px' }}>{item.description || '—'}</div>
													</div>
												</div>
											</div>
											<div style={{ display: 'flex', gap: '8px' }}>
												<button onClick={() => onEdit(item)} className="chip" style={{ backgroundColor: '#f59e0b', color: 'white', fontSize: '12px' }}>✏️ Edit</button>
												<button onClick={() => onDelete(item.id)} className="chip" style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '12px' }}>🗑️ Delete</button>
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

