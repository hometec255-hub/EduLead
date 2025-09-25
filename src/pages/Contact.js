import React, { useState } from 'react';
import { Menu, X, Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Users, Globe, CheckCircle, AlertCircle } from 'lucide-react';

function Contact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('success');
    setTimeout(() => {
      setFormStatus(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: 'general',
        message: ''
      });
    }, 3000);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },

    // Navigation styles
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

    // Contact info section
    contactInfoSection: {
      padding: '4rem 0',
      backgroundColor: '#f9fafb'
    },
    contactInfoContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    contactInfoGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem'
    },
    contactInfoCard: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    },
    contactInfoCardHover: {
      transform: 'translateY(-4px)'
    },
    contactIcon: {
      width: '4rem',
      height: '4rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem auto',
      color: '#ffffff'
    },
    contactTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    contactDescription: {
      color: '#6b7280',
      marginBottom: '1rem'
    },
    contactDetail: {
      color: '#111827',
      fontWeight: '600',
      fontSize: '1.125rem'
    },

    // Main content section
    mainSection: {
      padding: '4rem 0'
    },
    mainContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '3rem',
      alignItems: 'start'
    },

    // Contact form
    formSection: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    formTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '1rem'
    },
    formDescription: {
      color: '#6b7280',
      marginBottom: '2rem'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    formLabel: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    formInput: {
      padding: '0.75rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      outline: 'none'
    },
    formInputFocus: {
      borderColor: '#7c3aed'
    },
    formSelect: {
      padding: '0.75rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      outline: 'none'
    },
    formTextarea: {
      padding: '0.75rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical',
      fontFamily: 'inherit',
      outline: 'none'
    },
    submitButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      padding: '0.75rem 2rem',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'background-color 0.3s ease',
      marginTop: '1rem'
    },
    submitButtonHover: {
      backgroundColor: '#6d28d9'
    },

    // Support options section
    supportSection: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    supportTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '1rem'
    },
    supportOptions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    supportOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    supportOptionHover: {
      borderColor: '#7c3aed',
      backgroundColor: '#f3f4f6'
    },
    supportIcon: {
      width: '3rem',
      height: '3rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff'
    },
    supportContent: {
      flex: 1
    },
    supportOptionTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.25rem'
    },
    supportOptionDescription: {
      color: '#6b7280',
      fontSize: '0.875rem'
    },

    // Office locations section
    officesSection: {
      padding: '4rem 0',
      backgroundColor: '#f9fafb'
    },
    officesContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#111827',
      textAlign: 'center',
      marginBottom: '1rem'
    },
    sectionSubtitle: {
      fontSize: '1.125rem',
      color: '#6b7280',
      textAlign: 'center',
      marginBottom: '3rem',
      maxWidth: '600px',
      margin: '0 auto 3rem auto'
    },
    officesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    officeCard: {
      backgroundColor: '#ffffff',
      padding: '2rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    officeHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    officeIcon: {
      width: '3rem',
      height: '3rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff'
    },
    officeTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#111827'
    },
    officeDetails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    },
    officeDetail: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    officeDetailIcon: {
      color: '#7c3aed'
    },
    officeDetailText: {
      color: '#6b7280'
    },

    // FAQ section
    faqSection: {
      padding: '4rem 0'
    },
    faqContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    faqGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    faqItem: {
      backgroundColor: '#ffffff',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
      overflow: 'hidden'
    },
    faqQuestion: {
      padding: '1.5rem',
      backgroundColor: '#f9fafb',
      fontWeight: '600',
      color: '#111827',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    faqAnswer: {
      padding: '1.5rem',
      color: '#6b7280',
      lineHeight: '1.6'
    },

    // Success/Error messages
    alertMessage: {
      padding: '1rem',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    successMessage: {
      backgroundColor: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0'
    },
    errorMessage: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fca5a5'
    },

    // Footer styles
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

  const supportOptions = [
    {
      icon: <MessageCircle size={24} />,
      title: "General Inquiries",
      description: "Questions about programs, scholarships for Rwandan students",
      color: '#3b82f6'
    },
    {
      icon: <HelpCircle size={24} />,
      title: "Technical Support", 
      description: "Help with platform access, mobile app, or technical issues",
      color: '#10b981'
    },
    {
      icon: <Users size={24} />,
      title: "Mentorship Program",
      description: "Connect with Rwandan professionals and international mentors",
      color: '#f59e0b'
    },
    {
      icon: <Globe size={24} />,
      title: "University Partnerships",
      description: "Collaboration with University of Rwanda and other institutions",
      color: '#8b5cf6'
    }
  ];

  const offices = [
    {
      title: "Rwanda Main Office",
      address: "KN 3 Avenue, Nyarugenge District, Kigali, Rwanda",
      phone: "+250 788 123 456",
      email: "rwanda@edulead.org",
      hours: "Mon-Fri: 8AM-5PM CAT",
      color: '#7c3aed'
    },
    {
      title: "University of Rwanda Partnership Hub",
      address: "University of Rwanda, Gikondo Campus, Kicukiro District",
      phone: "+250 788 234 567",
      email: "ur-partnership@edulead.org",
      hours: "Mon-Fri: 8AM-6PM CAT",
      color: '#10b981'
    },
    {
      title: "Regional East Africa Office",
      address: "Kigali Convention Centre, KG 1 Avenue, Gasabo District",
      phone: "+250 788 345 678",
      email: "eastafrica@edulead.org", 
      hours: "Mon-Fri: 8AM-5PM CAT",
      color: '#f59e0b'
    }
  ];

  const faqs = [
    {
      question: "How do I apply for scholarships available to Rwandan students?",
      answer: "Rwandan students can apply through our online platform by creating an account and completing the application process. We offer specific scholarships for various fields including STEM, agriculture, and business, with special focus on supporting young women from rural areas."
    },
    {
      question: "What programs are available for women in Rwanda's growing tech sector?",
      answer: "We offer comprehensive programs including Digital Skills Mastery, Software Development, Data Science, and Digital Entrepreneurship specifically designed for Rwandan women entering the tech industry. Programs are available in Kinyarwanda, English, and French."
    },
    {
      question: "How does EduLead support University of Rwanda students?",
      answer: "Through our partnership with the University of Rwanda, we provide mentorship programs, research funding, internship opportunities, and career guidance. We also offer specialized support for students in engineering, medicine, and business programs."
    },
    {
      question: "Are there programs for rural Rwandan women seeking higher education?",
      answer: "Yes! We have dedicated programs for rural women including transportation support, accommodation assistance, digital literacy training, and flexible learning options. We also provide scholarships specifically for women from all 30 districts of Rwanda."
    }
  ];

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

            <div style={styles.desktopMenu}>
              <a href="/" style={styles.menuLink}>Home</a>
              <a href="/about" style={styles.menuLink}>About</a>
              <a href="/courses" style={styles.menuLink}>Courses</a>
              <a href="/contact" style={styles.activeMenuLink}>Contact</a>
              <a href="/login" style={styles.loginButton}>Login</a>
            </div>

            <div style={styles.mobileMenuButton}>
              <button onClick={toggleMenu} style={styles.mobileMenuButton}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div style={styles.mobileMenu}>
              <a href="/" style={styles.mobileMenuLink}>Home</a>
              <a href="/about" style={styles.mobileMenuLink}>About</a>
              <a href="/courses" style={styles.mobileMenuLink}>Courses</a>
              <a href="/contact" style={{...styles.mobileMenuLink, color: '#7c3aed', fontWeight: '600'}}>Contact</a>
              <a href="/login" style={styles.mobileMenuLink}>Login</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <h1 style={styles.heroTitle}>
            Get in Touch
          </h1>
          <p style={styles.heroSubtitle}>
            Have questions about our programs? Need support with your application? We're here to help you succeed in your educational journey.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={styles.contactInfoSection}>
        <div style={styles.contactInfoContainer}>
          <div style={styles.contactInfoGrid}>
            <div style={styles.contactInfoCard}>
              <div style={{...styles.contactIcon, backgroundColor: '#7c3aed'}}>
                <Mail size={24} />
              </div>
              <h3 style={styles.contactTitle}>Email Us</h3>
              <p style={styles.contactDescription}>
                Get in touch via email for detailed inquiries
              </p>
              <p style={styles.contactDetail}>info@edulead.rw</p>
            </div>

            <div style={styles.contactInfoCard}>
              <div style={{...styles.contactIcon, backgroundColor: '#10b981'}}>
                <Phone size={24} />
              </div>
              <h3 style={styles.contactTitle}>Call Us</h3>
              <p style={styles.contactDescription}>
                Speak directly with our support team
              </p>
              <p style={styles.contactDetail}>+250 788 123 456</p>
            </div>

            <div style={styles.contactInfoCard}>
              <div style={{...styles.contactIcon, backgroundColor: '#f59e0b'}}>
                <Clock size={24} />
              </div>
              <h3 style={styles.contactTitle}>Office Hours</h3>
              <p style={styles.contactDescription}>
                We're available to help you
              </p>
              <p style={styles.contactDetail}>Mon-Fri: 8AM-5PM CAT</p>
            </div>

            <div style={styles.contactInfoCard}>
              <div style={{...styles.contactIcon, backgroundColor: '#8b5cf6'}}>
                <MapPin size={24} />
              </div>
              <h3 style={styles.contactTitle}>Visit Us</h3>
              <p style={styles.contactDescription}>
                Stop by our main office
              </p>
              <p style={styles.contactDetail}>Kigali, Rwanda</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section style={styles.mainSection}>
        <div style={styles.mainContainer}>
          <div style={styles.mainGrid}>
            
            {/* Contact Form */}
            <div style={styles.formSection}>
              <h2 style={styles.formTitle}>Send us a Message</h2>
              <p style={styles.formDescription}>
                Fill out the form below and we'll get back to you within 24 hours. For urgent matters, please call us directly.
              </p>

              {formStatus === 'success' && (
                <div style={{...styles.alertMessage, ...styles.successMessage}}>
                  <CheckCircle size={20} />
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={styles.formInput}
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={styles.formInput}
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={styles.formInput}
                      placeholder="+250 788 123 456"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      style={styles.formInput}
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      style={styles.formSelect}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="scholarship">Scholarship Information</option>
                      <option value="programs">Program Details</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div style={{...styles.formGroup, gridColumn: 'span 2'}}>
                    <label style={styles.formLabel}>Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      style={styles.formTextarea}
                      placeholder="Please provide details about your inquiry..."
                      required
                    />
                  </div>

                  <div style={{gridColumn: 'span 2'}}>
                    <button 
                      type="submit"
                      style={styles.submitButton}
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Support Options */}
            <div style={styles.supportSection}>
              <h3 style={styles.supportTitle}>How Can We Help?</h3>
              <div style={styles.supportOptions}>
                {supportOptions.map((option, index) => (
                  <div key={index} style={styles.supportOption}>
                    <div style={{...styles.supportIcon, backgroundColor: option.color}}>
                      {option.icon}
                    </div>
                    <div style={styles.supportContent}>
                      <div style={styles.supportOptionTitle}>{option.title}</div>
                      <div style={styles.supportOptionDescription}>{option.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section style={styles.officesSection}>
        <div style={styles.officesContainer}>
          <h2 style={styles.sectionTitle}>Our Rwanda Offices</h2>
          <p style={styles.sectionSubtitle}>
            We have offices across Rwanda to better serve our community of women in higher education throughout all districts.
          </p>
          
          <div style={styles.officesGrid}>
            {offices.map((office, index) => (
              <div key={index} style={styles.officeCard}>
                <div style={styles.officeHeader}>
                  <div style={{...styles.officeIcon, backgroundColor: office.color}}>
                    <MapPin size={24} />
                  </div>
                  <h3 style={styles.officeTitle}>{office.title}</h3>
                </div>
                
                <div style={styles.officeDetails}>
                  <div style={styles.officeDetail}>
                    <MapPin style={styles.officeDetailIcon} size={18} />
                    <span style={styles.officeDetailText}>{office.address}</span>
                  </div>
                  <div style={styles.officeDetail}>
                    <Phone style={styles.officeDetailIcon} size={18} />
                    <span style={styles.officeDetailText}>{office.phone}</span>
                  </div>
                  <div style={styles.officeDetail}>
                    <Mail style={styles.officeDetailIcon} size={18} />
                    <span style={styles.officeDetailText}>{office.email}</span>
                  </div>
                  <div style={styles.officeDetail}>
                    <Clock style={styles.officeDetailIcon} size={18} />
                    <span style={styles.officeDetailText}>{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={styles.faqSection}>
        <div style={styles.faqContainer}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p style={styles.sectionSubtitle}>
            Find answers to common questions about our programs and services.
          </p>
          
          <div style={styles.faqGrid}>
            {faqs.map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <div style={styles.faqQuestion}>
                  {faq.question}
                  <HelpCircle size={20} />
                </div>
                <div style={styles.faqAnswer}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.footerLogo}>EduLead</div>
              <p style={styles.footerText}>
                Empowering women in higher education through innovative programs and partnerships.
              </p>
              <p style={styles.footerPartnership}>
                In partnership with MasterCard Foundation
              </p>
            </div>

            <div>
              <h4 style={styles.footerTitle}>Programs</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Scholarship Opportunities</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Research & Innovation</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Digital Skills Mastery</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Academic Excellence</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={styles.footerTitle}>Support</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Help Center</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Contact Support</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Application Guide</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>FAQs</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={styles.footerTitle}>Connect</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Newsletter</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Community Forum</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Social Media</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Events</a>
                </li>
              </ul>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <p>&copy; 2024 EduLead x MasterCard Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;