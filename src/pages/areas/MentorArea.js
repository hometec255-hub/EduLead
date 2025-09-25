import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout'

function MentorArea() {
	return (
		<div className="dashboard-container">
			<DashboardLayout
				title="Mentor"
				userRole="mentor"
				navItems={[
					{ href: '/mentor', label: 'Overview' },
					{ href: '/mentor/mentorships', label: 'Requests', cta: true },
					{ href: '/mentor/resources', label: 'Resources' },
				]}
			>
				<Outlet />
			</DashboardLayout>
		</div>
	)
}

export default MentorArea
