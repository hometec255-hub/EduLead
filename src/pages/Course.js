import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Award, Users, Clock, Globe, Star, ChevronRight, Filter, Search, Calendar, MapPin, DollarSign } from 'lucide-react';
import { getAllScholarships } from '../services/scholarshipService';
import { getUser } from '../services/authService';

function Course() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if user is logged in
  useEffect(() => {
    const user = getUser();
    setCurrentUser(user);
  }, []);

  // Fetch scholarships from backend
  useEffect(() => {
    const loadScholarships = async () => {
      try {
        setLoading(true);
        const scholarshipsData = await getAllScholarships();
        
        // Transform scholarship data to match course format
        const transformedCourses = scholarshipsData.map(scholarship => ({
          id: scholarship.id,
          title: scholarship.title,
          category: getCategoryFromSkills(scholarship.skills),
          duration: scholarship.duration || 'Not specified',
          level: scholarship.level || 'Not specified',
          scholarshipAmount: scholarship.available_amount ? `$${scholarship.available_amount.toLocaleString()}` : 'Not specified',
          location: scholarship.mode || 'Not specified',
          startDate: scholarship.start_date ? new Date(scholarship.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'TBD',
          description: scholarship.description || 'No description available',
          features: Array.isArray(scholarship.skills) ? scholarship.skills : (scholarship.skills ? scholarship.skills.split(',').map(s => s.trim()) : []),
          rating: scholarship.rating || 0,
          students: scholarship.students_enrolled || 0,
          image: getCategoryFromSkills(scholarship.skills)
        }));
        
        setCourses(transformedCourses);
      } catch (err) {
        setError('Failed to load courses');
        console.error('Error loading courses:', err);
      } finally {
        setLoading(false);
      }
    };

    loadScholarships();
  }, []);

  // Helper function to determine category from skills
  const getCategoryFromSkills = (skills) => {
    if (!skills) return 'academic';
    
    const skillsArray = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim().toLowerCase());
    
    if (skillsArray.some(skill => skill.includes('leadership') || skill.includes('management') || skill.includes('team'))) {
      return 'leadership';
    }
    if (skillsArray.some(skill => skill.includes('career') || skill.includes('professional') || skill.includes('networking'))) {
      return 'career';
    }
    if (skillsArray.some(skill => skill.includes('research') || skill.includes('analysis') || skill.includes('methodology'))) {
      return 'research';
    }
    if (skillsArray.some(skill => skill.includes('business') || skill.includes('entrepreneur') || skill.includes('marketing'))) {
      return 'business';
    }
    if (skillsArray.some(skill => skill.includes('digital') || skill.includes('technology') || skill.includes('programming') || skill.includes('data'))) {
      return 'technology';
    }
    return 'academic';
  };

  // Handle Apply Now button click
  const handleApplyNow = (courseId) => {
    // Always redirect to login page first
    window.location.href = '/login';
  };

  const filters = [
    { key: 'all', label: 'All Programs' },
    { key: 'academic', label: 'Academic' },
    { key: 'leadership', label: 'Leadership' },
    { key: 'career', label: 'Career' },
    { key: 'research', label: 'Research' },
    { key: 'business', label: 'Business' },
    { key: 'technology', label: 'Technology' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesFilter = activeFilter === 'all' || course.category === activeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },

    // Navigation styles (same as homepage)
    nav: {
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    },
    navContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    navContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#7c3aed'
    },
    logoSub: {
      marginLeft: '0.5rem',
      fontSize: '0.875rem',
      color: '#6b7280'
    },
    desktopMenu: {
      display: 'flex',
      marginLeft: '2.5rem',
      alignItems: 'baseline',
      gap: '2rem'
    },
    menuLink: {
      color: '#374151',
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      cursor: 'pointer'
    },
    activeMenuLink: {
      color: '#7c3aed',
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    loginButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
      cursor: 'pointer',
      border: 'none'
    },
    mobileMenuButton: {
      display: 'block',
      color: '#374151',
      cursor: 'pointer',
      background: 'none',
      border: 'none'
    },
    mobileMenu: {
      display: 'block',
      padding: '0.5rem',
      paddingTop: '0.5rem',
      paddingBottom: '0.75rem',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #e5e7eb'
    },
    mobileMenuLink: {
      display: 'block',
      color: '#374151',
      padding: '0.5rem 0.75rem',
      fontSize: '1rem',
      fontWeight: '500',
      textDecoration: 'none',
      cursor: 'pointer'
    },

    // Hero section
    hero: {
      background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4338ca 100%)',
      color: '#ffffff',
      padding: '4rem 0',
      textAlign: 'center'
    },
    heroContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      color: '#c4b5fd',
      maxWidth: '600px',
      margin: '0 auto'
    },

    // Stats section
    statsSection: {
      backgroundColor: '#f9fafb',
      padding: '3rem 0'
    },
    statsContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      textAlign: 'center'
    },
    statItem: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '0.75rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#7c3aed',
      marginBottom: '0.5rem'
    },
    statLabel: {
      color: '#6b7280',
      fontSize: '1rem',
      fontWeight: '500'
    },

    // Filters and search section
    filtersSection: {
      padding: '3rem 0',
      backgroundColor: '#ffffff'
    },
    filtersContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    filtersHeader: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '2rem'
    },
    searchContainer: {
      position: 'relative',
      maxWidth: '400px'
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 3rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease'
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280'
    },
    filtersGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    filterButton: {
      padding: '0.5rem 1rem',
      border: '2px solid #e5e7eb',
      backgroundColor: '#ffffff',
      color: '#6b7280',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    activeFilterButton: {
      padding: '0.5rem 1rem',
      border: '2px solid #7c3aed',
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer'
    },

    // Courses section
    coursesSection: {
      padding: '3rem 0',
      backgroundColor: '#f9fafb'
    },
    coursesContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    coursesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem'
    },
    courseCard: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)'
    },
    courseCardHover: {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-4px)'
    },
    courseImageContainer: {
      height: '200px',
      position: 'relative',
      overflow: 'hidden'
    },
    courseImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    courseImageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '3rem'
    },
    scholarshipBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: '#10b981',
      color: '#ffffff',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    courseContent: {
      padding: '1.5rem'
    },
    courseHeader: {
      marginBottom: '1rem'
    },
    courseTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    courseRating: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    ratingStars: {
      display: 'flex'
    },
    ratingText: {
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    courseDescription: {
      color: '#6b7280',
      marginBottom: '1rem',
      lineHeight: '1.5'
    },
    courseFeatures: {
      marginBottom: '1.5rem'
    },
    featuresTitle: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    featuresList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    featureTag: {
      backgroundColor: '#ede9fe',
      color: '#7c3aed',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.375rem',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    courseDetails: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    detailIcon: {
      color: '#7c3aed'
    },
    detailText: {
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    courseActions: {
      display: 'flex',
      gap: '0.5rem'
    },
    primaryButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      flex: 1,
      textAlign: 'center'
    },
    secondaryButton: {
      border: '2px solid #7c3aed',
      color: '#7c3aed',
      backgroundColor: 'transparent',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      flex: 1,
      textAlign: 'center'
    },

    // CTA Section
    ctaSection: {
      padding: '4rem 0',
      background: 'linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)',
      textAlign: 'center'
    },
    ctaContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '1rem'
    },
    ctaText: {
      fontSize: '1.125rem',
      color: '#c4b5fd',
      marginBottom: '2rem'
    },
    ctaButton: {
      backgroundColor: '#ffffff',
      color: '#7c3aed',
      padding: '1rem 2rem',
      borderRadius: '0.5rem',
      fontSize: '1.125rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },

    // Footer styles (same as homepage)
    footer: {
      backgroundColor: '#111827',
      color: '#ffffff',
      padding: '3rem 0'
    },
    footerContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem'
    },
    footerLogo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    footerText: {
      color: '#9ca3af',
      marginBottom: '1rem'
    },
    footerPartnership: {
      color: '#fbbf24',
      fontWeight: '600'
    },
    footerTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    footerList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    footerListItem: {
      marginBottom: '0.5rem'
    },
    footerLink: {
      color: '#9ca3af',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    footerBottom: {
      borderTop: '1px solid #374151',
      marginTop: '2rem',
      paddingTop: '2rem',
      textAlign: 'center',
      color: '#9ca3af'
    }
  };

  const getCourseImageGradient = (type) => {
    const gradients = {
      academic: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      leadership: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      career: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      research: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      business: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      technology: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
    };
    return gradients[type] || gradients.academic;
  };

  const getCourseIcon = (type) => {
    const icons = {
      academic: <BookOpen size={48} />,
      leadership: <Users size={48} />,
      career: <Award size={48} />,
      research: <Globe size={48} />,
      business: <DollarSign size={48} />,
      technology: <BookOpen size={48} />
    };
    return icons[type] || icons.academic;
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.navContent}>
            <div style={styles.logo}>
              <div style={styles.logoText}>EduLead</div>
              <div style={styles.logoSub}>x MasterCard Foundation</div>
            </div>

            <div style={{...styles.desktopMenu, display: window.innerWidth >= 768 ? 'flex' : 'none'}}>
              <a href="/" style={styles.menuLink}>Home</a>
              <a href="/about" style={styles.menuLink}>About</a>
              <a href="/courses" style={styles.activeMenuLink}>Courses</a>
              <a href="/contact" style={styles.menuLink}>Contact</a>
              <a href="/login" style={styles.loginButton}>
                {currentUser ? 'Dashboard' : 'Login'}
              </a>
            </div>

            <div style={{...styles.mobileMenuButton, display: window.innerWidth >= 768 ? 'none' : 'block'}}>
              <button onClick={toggleMenu} style={styles.mobileMenuButton}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div style={styles.mobileMenu}>
              <a href="/" style={styles.mobileMenuLink}>Home</a>
              <a href="/about" style={styles.mobileMenuLink}>About</a>
              <a href="/courses" style={{...styles.mobileMenuLink, color: '#7c3aed', fontWeight: '600'}}>Courses</a>
              <a href="/contact" style={styles.mobileMenuLink}>Contact</a>
              <a href="/login" style={styles.mobileMenuLink}>
                {currentUser ? 'Dashboard' : 'Login'}
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>Our Programs & Courses</h1>
          <p style={styles.heroSubtitle}>
            Discover comprehensive learning pathways designed to accelerate women's success in higher education and leadership roles through MasterCard Foundation partnership.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{courses.length}</div>
              <div style={styles.statLabel}>Active Programs</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>
                {courses.reduce((total, course) => total + (course.students || 0), 0).toLocaleString()}
              </div>
              <div style={styles.statLabel}>Students Enrolled</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>
                ${courses.reduce((total, course) => {
                  const amount = course.scholarshipAmount?.replace(/[$,]/g, '') || 0;
                  return total + parseInt(amount) || 0;
                }, 0).toLocaleString()}
              </div>
              <div style={styles.statLabel}>Total Scholarship Value</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>
                {courses.length > 0 ? (courses.reduce((total, course) => total + (course.rating || 0), 0) / courses.length).toFixed(1) : '0.0'}
              </div>
              <div style={styles.statLabel}>Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search Section */}
      <section style={styles.filtersSection}>
        <div style={styles.filtersContainer}>
          <div style={styles.filtersHeader}>
            <div style={styles.searchContainer}>
              <Search style={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={styles.filtersGrid}>
              {filters.map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  style={activeFilter === filter.key ? styles.activeFilterButton : styles.filterButton}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section style={styles.coursesSection}>
        <div style={styles.coursesContainer}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
              <div style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Loading courses...</div>
              <div style={{ fontSize: '0.875rem' }}>Please wait while we fetch the latest scholarship opportunities.</div>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#dc2626' }}>
              <div style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Error loading courses</div>
              <div style={{ fontSize: '0.875rem' }}>{error}</div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
              <div style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>No courses found</div>
              <div style={{ fontSize: '0.875rem' }}>
                {searchTerm ? 'Try adjusting your search terms or filters.' : 'No scholarship programs are currently available.'}
              </div>
            </div>
          ) : (
            <div style={styles.coursesGrid}>
              {filteredCourses.map(course => (
              <div key={course.id} style={styles.courseCard}>
                <div style={styles.courseImageContainer}>
                  <div style={{
                    ...styles.courseImageOverlay,
                    background: getCourseImageGradient(course.category)
                  }}>
                    {getCourseIcon(course.category)}
                  </div>
                  <div style={styles.scholarshipBadge}>
                    {course.scholarshipAmount} Available
                  </div>
                </div>
                
                <div style={styles.courseContent}>
                  <div style={styles.courseHeader}>
                    <h3 style={styles.courseTitle}>{course.title}</h3>
                    <div style={styles.courseRating}>
                      <div style={styles.ratingStars}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            color="#fbbf24"
                            fill={i < Math.floor(course.rating) ? "#fbbf24" : "none"}
                          />
                        ))}
                      </div>
                      <span style={styles.ratingText}>
                        {course.rating} ({course.students.toLocaleString()} students)
                      </span>
                    </div>
                  </div>

                  <p style={styles.courseDescription}>
                    {course.description}
                  </p>

                  <div style={styles.courseFeatures}>
                    <div style={styles.featuresTitle}>What you'll learn:</div>
                    <div style={styles.featuresList}>
                      {course.features.map((feature, index) => (
                        <span key={index} style={styles.featureTag}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={styles.courseDetails}>
                    <div style={styles.detailItem}>
                      <Clock style={styles.detailIcon} size={16} />
                      <span style={styles.detailText}>{course.duration}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <MapPin style={styles.detailIcon} size={16} />
                      <span style={styles.detailText}>{course.location}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <Calendar style={styles.detailIcon} size={16} />
                      <span style={styles.detailText}>Starts {course.startDate}</span>
                    </div>
                    <div style={styles.detailItem}>
                      <Award style={styles.detailIcon} size={16} />
                      <span style={styles.detailText}>{course.level}</span>
                    </div>
                  </div>

                  <div style={styles.courseActions}>
                    <button 
                      style={styles.primaryButton}
                      onClick={() => handleApplyNow(course.id)}
                    >
                      Apply Now
                    </button>
                    <button style={styles.secondaryButton}>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <p style={styles.ctaText}>
            Join thousands of women who are transforming their careers through our partnership with MasterCard Foundation.
          </p>
          <button 
            style={styles.ctaButton}
            onClick={() => handleApplyNow()}
          >
            Apply for Scholarship <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.footerLogo}>EduLead</div>
              <p style={styles.footerText}>Empowering women in higher education through innovative digital solutions.</p>
              <p style={styles.footerPartnership}>Powered by MasterCard Foundation</p>
            </div>
            <div>
              <h4 style={styles.footerTitle}>Programs</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Academic Excellence</a></li>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Leadership Development</a></li>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Career Acceleration</a></li>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Research & Innovation</a></li>
              </ul>
            </div>
            <div>
              <h4 style={styles.footerTitle}>Support</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Scholarships</a></li>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Mentorship</a></li>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Career Guidance</a></li>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Financial Aid</a></li>
              </ul>
            </div>
            <div>
              <h4 style={styles.footerTitle}>Connect</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}><a href="/contact" style={styles.footerLink}>Contact Us</a></li>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Community</a></li>
                <li style={styles.footerListItem}><a href="#" style={styles.footerLink}>Success Stories</a></li>
                <li style={styles.footerListItem}><a href="/login" style={styles.footerLink}>Student Portal</a></li>
              </ul>
            </div>
          </div>
          <div style={styles.footerBottom}>
            <p>&copy; 2025 EduLead. All rights reserved. | Partnership with MasterCard Foundation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Course;