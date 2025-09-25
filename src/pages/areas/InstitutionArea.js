import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout'

function InstitutionArea() {
	return (
		<div className="dashboard-container">
			<DashboardLayout
				title="Institution"
				userRole="institution"
				navItems={[
					{ href: '/institution', label: 'Overview' },
					{ href: '/institution/scholarships', label: 'Post Scholarships', cta: true },
					{ href: '/institution/resources', label: 'Workshops' },
				]}
			>
				<Outlet />
			</DashboardLayout>
		</div>
	)
}

export default InstitutionArea
