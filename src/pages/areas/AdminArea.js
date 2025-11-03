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
<<<<<<< HEAD
					{ href: '/admin/resources', label: 'Resources' },
					{ href: '/admin/mentors', label: 'Mentors' },
					{ href: '/admin/institutions', label: 'Institutions' },
=======
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
					{ href: '/admin/students', label: 'Students' },
				]}
			>
				<Outlet />
			</DashboardLayout>
		</div>
	)
}

export default AdminArea
