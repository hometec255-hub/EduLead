import { getAllScholarships } from '../services/scholarshipService'
import { getAllApplications } from '../services/applicationService'
import { getAllMentorships } from '../services/mentorshipService'
import { getAllResources } from '../services/resourceService'
import { getAllInstitutions } from '../services/institutionService'
import { getAllStudents } from '../services/studentService'
import userService from '../services/userService'

function safeDateString(d) {
	try {
		const dt = d ? new Date(d) : new Date()
		if (Number.isNaN(dt.getTime())) return new Date().toLocaleString()
		return dt.toLocaleString()
	} catch (_) {
		return new Date().toLocaleString()
	}
}

async function fetchAllData() {
	const scholarshipsP = getAllScholarships ? getAllScholarships().catch(() => []) : Promise.resolve([])
	const applicationsP = getAllApplications ? getAllApplications().catch(() => []) : Promise.resolve([])
	const mentorshipsP = getAllMentorships ? getAllMentorships().catch(() => []) : Promise.resolve([])
	const resourcesP = getAllResources ? getAllResources().catch(() => []) : Promise.resolve([])
	const institutionsP = getAllInstitutions ? getAllInstitutions().catch(() => []) : Promise.resolve([])
	const studentsP = getAllStudents ? getAllStudents().catch(() => []) : Promise.resolve([])
	const usersP = (userService && userService.getAllUsers) ? userService.getAllUsers().catch(() => []) : Promise.resolve([])

	const [scholarships, applications, mentorships, resources, institutions, students, users] = await Promise.all([
		scholarshipsP,
		applicationsP,
		mentorshipsP,
		resourcesP,
		institutionsP,
		studentsP,
		usersP
	])

	return { scholarships, applications, mentorships, resources, institutions, students, users }
}

async function loadPdfLibs() {
    let jsPDF
    let autoTable
    jsPDF = (await import('jspdf')).jsPDF
    autoTable = (await import('jspdf-autotable')).default
    return { jsPDF, autoTable }
}

function ensureLibsInstalledError(e) {
    console.error('PDF libraries not installed:', e)
    alert('PDF generation libraries are missing. Please install: npm install jspdf jspdf-autotable')
}

export async function generateAdminReport() {
	let jsPDF
	let autoTable
	try {
        ({ jsPDF, autoTable } = await loadPdfLibs())
	} catch (e) {
        ensureLibsInstalledError(e)
		return
	}

	const data = await fetchAllData()
	const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
	const marginX = 40
	const pageWidth = doc.internal.pageSize.getWidth()

	// Header
	doc.setFont('helvetica', 'bold')
	doc.setFontSize(18)
	doc.text('Edulead - Admin Report', pageWidth / 2, 40, { align: 'center' })
	doc.setFont('helvetica', 'normal')
	doc.setFontSize(10)
	doc.text(`Generated: ${safeDateString(Date.now())}`, pageWidth / 2, 58, { align: 'center' })

	// Summary
	const summaryRows = [
		['Scholarships', String((data.scholarships || []).length)],
		['Applications', String((data.applications || []).length)],
		['Mentorships', String((data.mentorships || []).length)],
		['Resources', String((data.resources || []).length)],
		['Institutions', String((data.institutions || []).length)],
		['Students', String((data.students || []).length)],
		['Users', String((data.users || []).length)]
	]
	autoTable(doc, {
		startY: 80,
		margin: { left: marginX, right: marginX },
		head: [['Section', 'Count']],
		body: summaryRows
	})

	function addSection(title, head, body) {
		let startY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY + 20 : 100
		if (startY > doc.internal.pageSize.getHeight() - 120) {
			doc.addPage()
			startY = 60
		}
		doc.setFont('helvetica', 'bold')
		doc.setFontSize(14)
		doc.text(title, marginX, startY)
		autoTable(doc, {
			startY: startY + 10,
			margin: { left: marginX, right: marginX },
			head: [head],
			body
		})
	}

	// Scholarships
	addSection('Scholarships', ['Title', 'Level', 'Mode', 'Start Date', 'Rating'],
		(data.scholarships || []).slice(0, 100).map(s => [
			s.title || '-',
			s.level || '-',
			s.mode || '-',
			s.start_date ? new Date(s.start_date).toLocaleDateString() : '-',
			(String(s.rating ?? '-') )
		])
	)

	// Applications
	addSection('Applications', ['ID', 'Scholarship', 'Student', 'Status', 'Applied'],
		(data.applications || []).slice(0, 100).map(a => [
			String(a.id ?? '-'),
			String(a.scholarship_id ?? '-'),
			String(a.student_id ?? '-'),
			a.status || '-',
			a.applied_at ? new Date(a.applied_at).toLocaleDateString() : (a.created_at ? new Date(a.created_at).toLocaleDateString() : '-')
		])
	)

	// Mentorships
	addSection('Mentorships', ['ID', 'Topic', 'Start', 'End'],
		(data.mentorships || []).slice(0, 100).map(m => [
			String(m.id ?? '-'),
			m.topic || '-',
			m.start_date ? new Date(m.start_date).toLocaleDateString() : '-',
			m.end_date ? new Date(m.end_date).toLocaleDateString() : '-'
		])
	)

	// Resources
	addSection('Resources', ['Title', 'URL', 'Created By'],
		(data.resources || []).slice(0, 100).map(r => [
			r.title || '-',
			r.file_url || '-',
			String(r.created_by ?? '-')
		])
	)

	// Institutions
	addSection('Institutions', ['Name', 'Country', 'Website'],
		(data.institutions || []).slice(0, 100).map(i => [
			i.name || '-',
			i.country || '-',
			i.website || '-'
		])
	)

	// Students
	addSection('Students', ['Name', 'DOB', 'Education', 'Interests'],
		(data.students || []).slice(0, 100).map(s => [
			s.student_name || '-',
			s.date_of_birth ? new Date(s.date_of_birth).toLocaleDateString() : '-',
			s.education_level || '-',
			Array.isArray(s.interests) ? s.interests.join(', ') : (s.interests || '-')
		])
	)

	// Footer
	const pageCount = doc.internal.getNumberOfPages()
	for (let i = 1; i <= pageCount; i++) {
		doc.setPage(i)
		doc.setFontSize(9)
		doc.setTextColor('#666666')
		doc.text(`Page ${i} of ${pageCount}`, pageWidth - marginX, doc.internal.pageSize.getHeight() - 20, { align: 'right' })
	}

	doc.save(`edulead-admin-report-${new Date().toISOString().slice(0,10)}.pdf`)
}

export default { generateAdminReport }

// Section-specific reports
export async function generateScholarshipsReport() {
    let jsPDF, autoTable
    try { ({ jsPDF, autoTable } = await loadPdfLibs()) } catch (e) { ensureLibsInstalledError(e); return }
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const marginX = 40
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Scholarships Report', pageWidth / 2, 40, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Generated: ${safeDateString(Date.now())}`, pageWidth / 2, 58, { align: 'center' })
    const scholarships = await (getAllScholarships ? getAllScholarships().catch(() => []) : Promise.resolve([]))
    autoTable(doc, {
        startY: 80,
        margin: { left: marginX, right: marginX },
        head: [['Title', 'Level', 'Mode', 'Start Date', 'Rating']],
        body: (scholarships || []).map(s => [
            s.title || '-',
            s.level || '-',
            s.mode || '-',
            s.start_date ? new Date(s.start_date).toLocaleDateString() : '-',
            String(s.rating ?? '-')
        ])
    })
    doc.save(`scholarships-report-${new Date().toISOString().slice(0,10)}.pdf`)
}

export async function generateApplicationsReport() {
    let jsPDF, autoTable
    try { ({ jsPDF, autoTable } = await loadPdfLibs()) } catch (e) { ensureLibsInstalledError(e); return }
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const marginX = 40
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Applications Report', pageWidth / 2, 40, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Generated: ${safeDateString(Date.now())}`, pageWidth / 2, 58, { align: 'center' })
    const applications = await (getAllApplications ? getAllApplications().catch(() => []) : Promise.resolve([]))
    autoTable(doc, {
        startY: 80,
        margin: { left: marginX, right: marginX },
        head: [['ID', 'Scholarship', 'Student', 'Status', 'Applied']],
        body: (applications || []).map(a => [
            String(a.id ?? '-'),
            String(a.scholarship_id ?? '-'),
            String(a.student_id ?? '-'),
            a.status || '-',
            a.applied_at ? new Date(a.applied_at).toLocaleDateString() : (a.created_at ? new Date(a.created_at).toLocaleDateString() : '-')
        ])
    })
    doc.save(`applications-report-${new Date().toISOString().slice(0,10)}.pdf`)
}

export async function generateApplicationsReportForCurrentUser(currentUserArg) {
    let jsPDF, autoTable
    try { ({ jsPDF, autoTable } = await loadPdfLibs()) } catch (e) { ensureLibsInstalledError(e); return }
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const marginX = 40
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('My Applications Report', pageWidth / 2, 40, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Generated: ${safeDateString(Date.now())}`, pageWidth / 2, 58, { align: 'center' })
    const applications = await (getAllApplications ? getAllApplications().catch(() => []) : Promise.resolve([]))
    const currentUser = currentUserArg || (await import('../services/authService')).getUser?.() || null
    const uid = currentUser && currentUser.id
    const filtered = uid ? (applications || []).filter(a => a.student_id === uid || a.user_id === uid) : (applications || [])
    autoTable(doc, {
        startY: 80,
        margin: { left: marginX, right: marginX },
        head: [['ID', 'Scholarship', 'Status', 'Applied']],
        body: filtered.map(a => [
            String(a.id ?? '-'),
            String(a.scholarship_id ?? '-'),
            a.status || '-',
            a.applied_at ? new Date(a.applied_at).toLocaleDateString() : (a.created_at ? new Date(a.created_at).toLocaleDateString() : '-')
        ])
    })
    doc.save(`my-applications-report-${new Date().toISOString().slice(0,10)}.pdf`)
}

export async function generateMentorshipsReport() {
    let jsPDF, autoTable
    try { ({ jsPDF, autoTable } = await loadPdfLibs()) } catch (e) { ensureLibsInstalledError(e); return }
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const marginX = 40
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Mentorships Report', pageWidth / 2, 40, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Generated: ${safeDateString(Date.now())}`, pageWidth / 2, 58, { align: 'center' })
    const mentorships = await (getAllMentorships ? getAllMentorships().catch(() => []) : Promise.resolve([]))
    autoTable(doc, {
        startY: 80,
        margin: { left: marginX, right: marginX },
        head: [['ID', 'Student', 'Mentor', 'Status', 'Created']],
        body: (mentorships || []).map(m => [
            String(m.id ?? '-'),
            String(m.student_id ?? '-'),
            String(m.mentor_id ?? '-'),
            m.status || '-',
            m.created_at ? new Date(m.created_at).toLocaleDateString() : '-'
        ])
    })
    doc.save(`mentorships-report-${new Date().toISOString().slice(0,10)}.pdf`)
}

export async function generateMentorshipsReportForCurrentUser(currentUserArg) {
    let jsPDF, autoTable
    try { ({ jsPDF, autoTable } = await loadPdfLibs()) } catch (e) { ensureLibsInstalledError(e); return }
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const marginX = 40
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('My Mentorships Report', pageWidth / 2, 40, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Generated: ${safeDateString(Date.now())}`, pageWidth / 2, 58, { align: 'center' })
    const mentorships = await (getAllMentorships ? getAllMentorships().catch(() => []) : Promise.resolve([]))
    const currentUser = currentUserArg || (await import('../services/authService')).getUser?.() || null
    const role = (currentUser?.role || '').toLowerCase()
    const uid = currentUser && currentUser.id
    let filtered = mentorships || []
    if (uid) {
        if (role === 'student') {
            filtered = filtered.filter(m => m.student_id === uid)
        } else if (role === 'mentor') {
            // If backend provides mentor_id, filter by it; otherwise export all
            filtered = filtered.filter(m => m.mentor_id ? m.mentor_id === uid : true)
        }
    }
    autoTable(doc, {
        startY: 80,
        margin: { left: marginX, right: marginX },
        head: [['ID', 'Mentor', 'Status', 'Created']],
        body: filtered.map(m => [
            String(m.id ?? '-'),
            String(m.mentor_id ?? '-'),
            m.status || '-',
            m.created_at ? new Date(m.created_at).toLocaleDateString() : '-'
        ])
    })
    doc.save(`my-mentorships-report-${new Date().toISOString().slice(0,10)}.pdf`)
}

export async function generateResourcesReport() {
    let jsPDF, autoTable
    try { ({ jsPDF, autoTable } = await loadPdfLibs()) } catch (e) { ensureLibsInstalledError(e); return }
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const marginX = 40
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Resources Report', pageWidth / 2, 40, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Generated: ${safeDateString(Date.now())}`, pageWidth / 2, 58, { align: 'center' })
    const resources = await (getAllResources ? getAllResources().catch(() => []) : Promise.resolve([]))
    autoTable(doc, {
        startY: 80,
        margin: { left: marginX, right: marginX },
        head: [['Title', 'URL', 'Created By', 'Created At']],
        body: (resources || []).map(r => [
            r.title || '-',
            r.file_url || '-',
            String(r.created_by ?? '-'),
            r.created_at ? new Date(r.created_at).toLocaleDateString() : '-'
        ])
    })
    doc.save(`resources-report-${new Date().toISOString().slice(0,10)}.pdf`)
}

export async function generateInstitutionsReport() {
    let jsPDF, autoTable
    try { ({ jsPDF, autoTable } = await loadPdfLibs()) } catch (e) { ensureLibsInstalledError(e); return }
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const marginX = 40
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Institutions Report', pageWidth / 2, 40, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Generated: ${safeDateString(Date.now())}`, pageWidth / 2, 58, { align: 'center' })
    const institutions = await (getAllInstitutions ? getAllInstitutions().catch(() => []) : Promise.resolve([]))
    autoTable(doc, {
        startY: 80,
        margin: { left: marginX, right: marginX },
        head: [['Name', 'Country', 'Website', 'Created At']],
        body: (institutions || []).map(i => [
            i.name || '-',
            i.country || '-',
            i.website || '-',
            i.created_at ? new Date(i.created_at).toLocaleDateString() : '-'
        ])
    })
    doc.save(`institutions-report-${new Date().toISOString().slice(0,10)}.pdf`)
}

export async function generateStudentsReport() {
    let jsPDF, autoTable
    try { ({ jsPDF, autoTable } = await loadPdfLibs()) } catch (e) { ensureLibsInstalledError(e); return }
    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const marginX = 40
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('Students Report', pageWidth / 2, 40, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Generated: ${safeDateString(Date.now())}`, pageWidth / 2, 58, { align: 'center' })
    const students = await (getAllStudents ? getAllStudents().catch(() => []) : Promise.resolve([]))
    autoTable(doc, {
        startY: 80,
        margin: { left: marginX, right: marginX },
        head: [['Name', 'DOB', 'Education', 'Interests']],
        body: (students || []).map(s => [
            s.student_name || '-',
            s.date_of_birth ? new Date(s.date_of_birth).toLocaleDateString() : '-',
            s.education_level || '-',
            Array.isArray(s.interests) ? s.interests.join(', ') : (s.interests || '-')
        ])
    })
    doc.save(`students-report-${new Date().toISOString().slice(0,10)}.pdf`)
}

export const sectionReports = {
    generateAdminReport,
    generateScholarshipsReport,
    generateApplicationsReport,
    generateMentorshipsReport,
    generateResourcesReport,
    generateInstitutionsReport,
    generateStudentsReport
}


