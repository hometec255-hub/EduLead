import React, { useEffect, useMemo, useState } from 'react'
import './Dashboard.css'
import { getAllResources, createResource } from '../services/resourceService'
import { getUser } from '../services/authService'
import { getAllUsers } from '../services/userService'

function ResourcesPage() {
	const [items, setItems] = useState([])
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [showForm, setShowForm] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [form, setForm] = useState({ title: '', description: '', file_url: '', created_by: '' })

	const stats = useMemo(() => {
		const total = items.length
		const withFiles = items.filter(i => !!i.file_url).length
		const last30 = items.filter(i => new Date(i.created_at) > new Date(Date.now() - 30*24*60*60*1000)).length
		return { total, withFiles, last30 }
	}, [items])

	async function load() {
		setLoading(true)
		setError('')
		try {
			const [resources, allUsers] = await Promise.all([
				getAllResources(),
				getAllUsers().catch(() => [])
			])
			setItems(resources)
			setUsers(allUsers || [])
		} catch (e) {
			setError(e.message || 'Failed to load')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const u = getUser && getUser()
		setForm(prev => ({ ...prev, created_by: (u && u.id) || '' }))
		load()
	}, [])

	function onChange(e) {
		const { name, value } = e.target
		setForm(prev => ({ ...prev, [name]: value }))
	}

	async function onSubmit(e) {
		e.preventDefault()
		setError('')
		try {
			await createResource({ 
				title: form.title, 
				description: form.description, 
				file_url: form.file_url, 
				created_by: form.created_by ? Number(form.created_by) : null 
			})
			setShowForm(false)
			setForm({ title: '', description: '', file_url: '', created_by: (getUser && getUser()?.id) || '' })
			await load()
		} catch (e) {
			setError(e.message || 'Create failed')
		}
	}

	const filtered = items.filter(r =>
		(r.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
		(r.description || '').toLowerCase().includes(searchTerm.toLowerCase())
	)

	function getCreatorName(userId) {
		const u = users.find(x => x.id === userId)
		return u ? (u.name || `User #${u.id}`) : (userId ? `User #${userId}` : '')
	}

	return (
		<div className="dashboard-container">
			<div className="dashboard-content">
				<div className="dash-header">
					<div>
						<div className="dash-title">Resources Management 📚</div>
						<div className="dash-subtitle">Upload and share useful materials</div>
					</div>
					<div className="dash-controls">
						<button className="chip" onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : '+ Add Resource'}</button>
					</div>
				</div>

				<div className="kpi-grid">
					<div className="kpi"><h4>Total</h4><div className="num">{stats.total}</div><div className="trend">All resources</div></div>
					<div className="kpi"><h4>With Files</h4><div className="num">{stats.withFiles}</div><div className="trend">Have attachments</div></div>
					<div className="kpi"><h4>Last 30 days</h4><div className="num">{stats.last30}</div><div className="trend">Recently added</div></div>
					<div className="kpi"><h4>Creators</h4><div className="num">{new Set(items.map(i => i.created_by).filter(Boolean)).size}</div><div className="trend">Unique</div></div>
				</div>

				<div style={{ marginBottom: '24px' }}>
					<div className="input-with-addon">
						<div className="addon">🔍</div>
						<input
							type="text"
							placeholder="Search resources by title or description..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="form-input"
						/>
					</div>
				</div>

				{showForm && (
					<div className="form-section" style={{ marginBottom: '32px' }}>
						<h3>Add New Resource</h3>
						<form onSubmit={onSubmit}>
							<div className="form-grid-2">
								<div>
									<label className="form-label">Title *</label>
									<div className="form-hint">Short and descriptive</div>
									<div className="input-with-addon">
										<div className="addon">🏷️</div>
										<input name="title" value={form.title} onChange={onChange} placeholder="e.g., CV Template" className="form-input" required />
									</div>
								</div>
								<div>
									<label className="form-label">File URL</label>
									<div className="form-hint">Link to the resource file</div>
									<div className="input-with-addon">
										<div className="addon">🔗</div>
										<input name="file_url" value={form.file_url} onChange={onChange} placeholder="https://..." className="form-input" />
									</div>
								</div>
							</div>

							<div>
								<label className="form-label">Description</label>
								<div className="form-hint">What is this resource about?</div>
								<div className="input-with-addon">
									<div className="addon">📝</div>
									<textarea name="description" value={form.description} onChange={onChange} placeholder="Add a short description" className="form-input" rows={4} />
								</div>
							</div>

							<div className="form-grid-2">
								<div>
									<label className="form-label">Created By (User ID)</label>
									<div className="form-hint">Will default to your user id if logged in</div>
									<div className="input-with-addon">
										<div className="addon">👤</div>
										<input name="created_by" value={form.created_by} onChange={onChange} placeholder="e.g., 1" className="form-input" />
									</div>
								</div>
								<div></div>
							</div>

							<div className="actions-row">
								<button type="submit" className="chip" style={{ backgroundColor: '#3b82f6', color: 'white' }}>Create Resource</button>
								<button type="button" className="chip" onClick={() => { setShowForm(false); setForm({ title: '', description: '', file_url: '', created_by: (getUser && getUser()?.id) || '' }) }}>Cancel</button>
							</div>
						</form>
					</div>
				)}

				{error && (
					<div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '8px', marginBottom: '24px' }}>{error}</div>
				)}

				<div className="content-grid">
					<div style={{ gridColumn: '1 / -1' }}>
						<h3>Resources ({filtered.length})</h3>
						{loading ? (
							<div style={{ textAlign: 'center', padding: '40px' }}>Loading resources...</div>
						) : filtered.length === 0 ? (
							<div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>{searchTerm ? 'No resources match your search.' : 'No resources found.'}</div>
						) : (
							<div style={{ display: 'grid', gap: '16px' }}>
								{filtered.map((item) => (
									<div key={item.id} className="card" style={{ padding: '20px' }}>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
											<div style={{ flex: 1 }}>
												<div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
													<div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px', fontWeight: 'bold' }}>📚</div>
													<div>
														<h4 style={{ margin: 0, fontSize: '18px' }}>{item.title}</h4>
														<div style={{ color: '#6b7280', fontSize: '14px' }}>ID: {item.id} • Created: {new Date(item.created_at).toLocaleDateString()} {item.created_by ? `• By ${getCreatorName(item.created_by)}` : ''}</div>
													</div>
												</div>

												<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
													<div style={{ gridColumn: '1 / -1' }}>
														<div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>Description</div>
														<div style={{ fontSize: '14px', color: '#374151', marginTop: '4px' }}>{item.description || '—'}</div>
													</div>
													<div>
														<div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: '500' }}>File</div>
														<div style={{ fontSize: '14px', fontWeight: '500' }}>
															{item.file_url ? <a href={item.file_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{item.file_url}</a> : 'No file'}
														</div>
													</div>
												</div>
											</div>
											<div style={{ display: 'flex', gap: '8px' }}>
												{/* Could add actions later */}
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

export default ResourcesPage
