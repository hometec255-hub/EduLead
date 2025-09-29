import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout'

function AdminArea() {
	return (
		<div className="dashboard-container">
			<DashboardLayout
				title="Admin"
				userRole="admin"
				navItems={[
					{ href: '/admin', label: 'Overview' },
					{ href: '/admin/scholarships', label: 'Scholarships' },
					{ href: '/admin/applications', label: 'Applications' },
					{ href: '/admin/mentorships', label: 'Mentorships' },
					{ href: '/admin/students', label: 'Students' },
				]}
			>
				<Outlet />
			</DashboardLayout>
		</div>
	)
}

export default AdminArea
