import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './DashboardLayout.css'

function DashboardLayout({ title, userRole, navItems, children }) {
	const { logout } = useAuth()

	const getIconForNavItem = (label) => {
		const iconMap = {
			'Overview': '🏠',
			'Dashboard': '🏠',
			'Scholarships': '🎓',
			'Applications': '📝',
			'Apply Scholarships': '📝',
			'Mentorships': '👥',
			'Requests': '👥',
			'Resources': '📚',
			'Workshops': '📚',
			'Institutions': '🏛️',
			'Students': '👨‍🎓',
			'Post Scholarships': '➕'
		}
		return iconMap[label] || '📄'
	}

	return (
		<div className="dl-root">
			<aside className="dl-sidebar">
				<div className="dl-sidebar-inner">
					<div className="dl-brand-row">
						<div className="dl-logo">N</div>
						<div className="dl-brand">EduLead</div>
					</div>
					<nav className="dl-nav">
						{navItems.map(item => (
							<NavLink
								key={item.href}
								className={({ isActive }) => `dl-link${isActive ? ' active' : ''}`}
								to={item.href}
							>
								<div className="dl-link-content">
									<span className="dl-link-icon">{getIconForNavItem(item.label)}</span>
									<span className="dl-link-text">{item.label}</span>
									{item.badge && <span className="dl-link-badge">{item.badge}</span>}
									{item.hasSubmenu && <span className="dl-link-chevron">▼</span>}
								</div>
							</NavLink>
						))}
					</nav>
					<div className="dl-logout-section">
						<button 
							className="dl-logout-btn"
							onClick={logout}
						>
							🚪 Logout
						</button>
					</div>
				</div>
			</aside>
			<div className="dl-main">
				<header className="dl-topbar">
					<div className="dl-title">{title}</div>
					<div className="dl-search">
						<input placeholder="Search everywhere..." />
					</div>
					<div className="dl-actions">
						{navItems.filter(n => n.cta).map(n => (
							<NavLink key={n.href} className="dl-button" to={n.href}>{n.label}</NavLink>
						))}
						<div className="dl-avatar">A</div>
					</div>
				</header>
				<main className="dl-content">
					{children}
				</main>
			</div>
		</div>
	)
}

export default DashboardLayout
