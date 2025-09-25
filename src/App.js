import React from 'react'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Course from './pages/Course' 
import Login from './pages/Login'
import StudentDashboard from './pages/StudentDashboard'
import MentorDashboard from './pages/MentorDashboard'
import InstitutionDashboard from './pages/InstitutionDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ScholarshipsPage from './pages/ScholarshipsPage'
import ApplicationsPage from './pages/ApplicationsPage'
import MentorshipsPage from './pages/MentorshipsPage'
import ResourcesPage from './pages/ResourcesPage'
import InstitutionsPage from './pages/InstitutionsPage'
import StudentsPage from './pages/StudentsPage'
import Register from './pages/Register'
import UserApplicationsPage from './pages/UserApplicationsPage'
import{ BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import RequireRole from './components/RequireRole'
import { AuthProvider } from './contexts/AuthContext'
import StudentArea from './pages/areas/StudentArea'
import MentorArea from './pages/areas/MentorArea'
import InstitutionArea from './pages/areas/InstitutionArea'
import AdminArea from './pages/areas/AdminArea'

// Initialize API interceptor for automatic token handling
import './utils/apiInterceptor'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/courses' element={<Course/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/student' element={<RequireRole roles='student'><StudentArea/></RequireRole>}>
          <Route index element={<StudentDashboard/>} />
          <Route path='applications' element={<ApplicationsPage/>} />
          <Route path='mentorships' element={<MentorshipsPage/>} />
          <Route path='resources' element={<ResourcesPage/>} />
        </Route>

        <Route path='/mentor' element={<RequireRole roles='mentor'><MentorArea/></RequireRole>}>
          <Route index element={<MentorDashboard/>} />
          <Route path='mentorships' element={<MentorshipsPage/>} />
          <Route path='resources' element={<ResourcesPage/>} />
        </Route>

        <Route path='/institution' element={<RequireRole roles='institution'><InstitutionArea/></RequireRole>}>
          <Route index element={<InstitutionDashboard/>} />
          <Route path='scholarships' element={<ScholarshipsPage/>} />
          <Route path='resources' element={<ResourcesPage/>} />
        </Route>

        <Route path='/admin' element={<RequireRole roles='admin'><AdminArea/></RequireRole>}>
          <Route index element={<AdminDashboard/>} />
          <Route path='scholarships' element={<ScholarshipsPage/>} />
          <Route path='applications' element={<ApplicationsPage/>} />
          <Route path='mentorships' element={<MentorshipsPage/>} />
          <Route path='resources' element={<ResourcesPage/>} />
          <Route path='institutions' element={<InstitutionsPage/>} />
          <Route path='students' element={<StudentsPage/>} />
        </Route>
        <Route path='/register' element={<Register/>}/>
        <Route path='/applications' element={
          <RequireRole roles={['student']}>
            <UserApplicationsPage/>
          </RequireRole>
        }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App