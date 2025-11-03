import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout'

function StudentArea() {
	return (
		<div className="dashboard-container">
			<DashboardLayout
				title="Student"
				userRole="student"
				navItems={[
					{ href: '/student', label: 'Overview' },
					{ href: '/student/applications', label: 'Apply Scholarships', cta: true },
					{ href: '/student/mentorships', label: 'Mentorships' },
					// Resources hidden for students per requirements
				]}
			>
				<Outlet />
			</DashboardLayout>
		</div>
	)
}

export default StudentArea
