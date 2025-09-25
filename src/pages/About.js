import React, { useState, useEffect } from 'react';
import { Menu, X, Users, Target, Award, Globe, Heart, BookOpen, Lightbulb, TrendingUp, MapPin, Calendar, ArrowRight, Star, CheckCircle, Play } from 'lucide-react';

function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');
  const [countUp, setCountUp] = useState({
    women: 0,
    scholarships: 0,
    universities: 0,
    programs: 0
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animated counter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCountUp({
        women: 2500,
        scholarships: 450,
        universities: 12,
        programs: 25
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },

    // Navigation styles (consistent with contact page)
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
      padding: '5rem 0',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem',
      position: 'relative',
      zIndex: 2
    },
    heroContent: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '3rem',
      alignItems: 'center',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      lineHeight: '1.1'
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      color: '#c4b5fd',
      marginBottom: '2rem',
      maxWidth: '600px',
      margin: '0 auto 2rem auto',
      lineHeight: '1.6'
    },
    heroStats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '2rem',
      marginTop: '3rem'
    },
    heroStat: {
      textAlign: 'center'
    },
    heroStatNumber: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '0.5rem'
    },
    heroStatLabel: {
      fontSize: '0.875rem',
      color: '#c4b5fd',
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },

    // Mission section with tabs
    missionSection: {
      padding: '5rem 0',
      backgroundColor: '#f9fafb'
    },
    missionContainer: {
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
    tabButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '3rem',
      flexWrap: 'wrap'
    },
    tabButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '2rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: 'none',
      backgroundColor: '#ffffff',
      color: '#6b7280'
    },
    activeTabButton: {
      backgroundColor: '#7c3aed',
      color: '#ffffff'
    },
    tabContent: {
      backgroundColor: '#ffffff',
      padding: '3rem',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    tabGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      alignItems: 'center'
    },
    tabText: {
      fontSize: '1.125rem',
      lineHeight: '1.7',
      color: '#374151'
    },
    tabFeatures: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    tabFeature: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    tabFeatureIcon: {
      width: '2rem',
      height: '2rem',
      borderRadius: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      flexShrink: 0
    },
    tabFeatureText: {
      fontSize: '1rem',
      color: '#374151'
    },

    // Story section
    storySection: {
      padding: '5rem 0'
    },
    storyContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    storyGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center'
    },
    storyContent: {
      order: 1
    },
    storyTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '1.5rem'
    },
    storyText: {
      fontSize: '1.125rem',
      lineHeight: '1.7',
      color: '#6b7280',
      marginBottom: '2rem'
    },
    storyFeatures: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    storyFeature: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem'
    },
    storyFeatureIcon: {
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      flexShrink: 0,
      marginTop: '0.25rem'
    },
    storyFeatureContent: {
      flex: 1
    },
    storyFeatureTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    storyFeatureText: {
      color: '#6b7280',
      lineHeight: '1.6'
    },
    storyVisual: {
      order: 2,
      backgroundColor: '#f3f4f6',
      borderRadius: '1rem',
      padding: '3rem',
      textAlign: 'center',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1rem'
    },
    storyVisualIcon: {
      width: '6rem',
      height: '6rem',
      borderRadius: '1rem',
      backgroundColor: '#7c3aed',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem auto'
    },
    storyVisualText: {
      fontSize: '1.125rem',
      color: '#6b7280',
      fontStyle: 'italic'
    },

    // Impact section
    impactSection: {
      padding: '5rem 0',
      backgroundColor: '#f9fafb'
    },
    impactContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    impactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem'
    },
    impactCard: {
      backgroundColor: '#ffffff',
      padding: '2.5rem',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    },
    impactIcon: {
      width: '4rem',
      height: '4rem',
      borderRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      margin: '0 auto 1.5rem auto'
    },
    impactTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '1rem'
    },
    impactDescription: {
      color: '#6b7280',
      lineHeight: '1.6',
      marginBottom: '1.5rem'
    },
    impactStat: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#7c3aed'
    },

    // Team section
    teamSection: {
      padding: '5rem 0'
    },
    teamContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem'
    },
    teamCard: {
      backgroundColor: '#ffffff',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease'
    },
    teamImage: {
      width: '100%',
      height: '280px',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af'
    },
    teamContent: {
      padding: '2rem'
    },
    teamName: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '0.5rem'
    },
    teamRole: {
      color: '#7c3aed',
      fontWeight: '600',
      marginBottom: '1rem'
    },
    teamBio: {
      color: '#6b7280',
      lineHeight: '1.6',
      fontSize: '0.875rem'
    },

    // Partnership section
    partnershipSection: {
      padding: '5rem 0',
      backgroundColor: '#111827'
    },
    partnershipContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 1rem',
      textAlign: 'center'
    },
    partnershipTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '1rem'
    },
    partnershipSubtitle: {
      fontSize: '1.125rem',
      color: '#9ca3af',
      marginBottom: '3rem',
      maxWidth: '600px',
      margin: '0 auto 3rem auto'
    },
    partnershipLogos: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '3rem',
      flexWrap: 'wrap'
    },
    partnershipLogo: {
      padding: '1.5rem 2rem',
      backgroundColor: '#374151',
      borderRadius: '1rem',
      color: '#ffffff',
      fontSize: '1.125rem',
      fontWeight: '600'
    },

    // CTA section
    ctaSection: {
      padding: '5rem 0',
      background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #4338ca 100%)',
      color: '#ffffff',
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
      marginBottom: '1rem'
    },
    ctaText: {
      fontSize: '1.125rem',
      color: '#c4b5fd',
      marginBottom: '2rem'
    },
    ctaButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    ctaButton: {
      padding: '0.75rem 2rem',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '600',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      border: 'none'
    },
    primaryCtaButton: {
      backgroundColor: '#ffffff',
      color: '#7c3aed'
    },
    secondaryCtaButton: {
      backgroundColor: 'transparent',
      color: '#ffffff',
      border: '2px solid #ffffff'
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

  const tabContent = {
    mission: {
      title: "Our Mission",
      text: "The EduLead Foundation is dedicated to empowering women in Rwanda through accessible, quality higher education opportunities. This case study explores innovative approaches to break down barriers, provide scholarships, and create pathways for academic and professional success.",
      features: [
        { icon: <Target size={20} />, text: "Provide scholarships for rural women across all 30 districts", color: '#7c3aed' },
        { icon: <BookOpen size={20} />, text: "Partner with University of Rwanda and international institutions", color: '#10b981' },
        { icon: <Globe size={20} />, text: "Offer digital skills training and technology access", color: '#f59e0b' },
        { icon: <Heart size={20} />, text: "Support women from marginalized communities", color: '#ef4444' }
      ]
    },
    vision: {
      title: "Our Vision",
      text: "This case study envisions a Rwanda where every woman has equal access to higher education, regardless of her background or circumstances. We explore how the MasterCard Foundation could lead initiatives where educated women drive innovation, economic growth, and community transformation.",
      features: [
        { icon: <Star size={20} />, text: "Rwanda leads Africa in women's higher education", color: '#7c3aed' },
        { icon: <TrendingUp size={20} />, text: "50% increase in women graduating in STEM fields", color: '#10b981' },
        { icon: <Users size={20} />, text: "10,000 women empowered by 2030", color: '#f59e0b' },
        { icon: <Lightbulb size={20} />, text: "Innovation hubs led by female graduates", color: '#ef4444' }
      ]
    },
    values: {
      title: "Our Values",
      text: "This case study is guided by the MasterCard Foundation's core values, reflecting commitment to the women served and communities transformed throughout Rwanda. These values demonstrate how strategic philanthropic investment could create lasting change.",
      features: [
        { icon: <CheckCircle size={20} />, text: "Inclusivity - Welcoming women from all backgrounds", color: '#7c3aed' },
        { icon: <Award size={20} />, text: "Excellence - Striving for the highest standards", color: '#10b981' },
        { icon: <Heart size={20} />, text: "Empowerment - Building confidence and capability", color: '#f59e0b' },
        { icon: <Globe size={20} />, text: "Innovation - Embracing new approaches to education", color: '#ef4444' }
      ]
    }
  };

  const impactData = [
    {
      icon: <Users size={32} />,
      title: "Projected Impact: Women",
      description: "Potential number of Rwandan women who could benefit from expanded MasterCard Foundation programs.",
      stat: countUp.women.toLocaleString() + '+',
      color: '#7c3aed'
    },
    {
      icon: <Award size={32} />,
      title: "Proposed Scholarships",
      description: "Conceptual scholarship program scope for women pursuing higher education across various fields.",
      stat: countUp.scholarships.toLocaleString() + '+',
      color: '#10b981'
    },
    {
      icon: <Globe size={32} />,
      title: "Partner Universities",
      description: "Potential partnerships with local and international universities to expand educational opportunities.",
      stat: countUp.universities.toLocaleString() + '+',
      color: '#f59e0b'
    },
    {
      icon: <BookOpen size={32} />,
      title: "Program Framework",
      description: "Comprehensive program structure covering education, digital skills, entrepreneurship, and leadership.",
      stat: countUp.programs.toLocaleString() + '+',
      color: '#ef4444'
    }
  ];

  const teamMembers = [
    {
      name: "Mutoni Fabrice",
      role: "Case Study Developer",
      bio: "Research analyst developing this conceptual framework for MasterCard Foundation's potential expansion in Rwanda's women's higher education sector."
    },
    {
      name: "Dr. Aimable Uwimana",
      role: "Academic Advisor (Conceptual)",
      bio: "Former University of Rwanda professor with 15 years in higher education policy. PhD in Educational Leadership from University of Edinburgh."
    },
    {
      name: "Immaculée Mukagatare",
      role: "Program Consultant (Conceptual)",
      bio: "Rwanda Women's Network alumna, expert in women's empowerment programs. Master's in Development Studies from KIST."
    },
    {
      name: "Jean Claude Nkurunziza",
      role: "Partnership Analyst (Conceptual)",
      bio: "Former MINEDUC advisor, specialist in educational partnerships. Fluent in Kinyarwanda, English, French, and Swahili."
    }
  ];

  const storyFeatures = [
    {
      icon: <MapPin size={24} />,
      title: "Born in Rwanda",
      text: "Founded in Kigali with deep understanding of local challenges and opportunities facing women in higher education.",
      color: '#7c3aed'
    },
    {
      icon: <Users size={24} />,
      title: "Community-Driven",
      text: "Built by Rwandans for Rwandans, with programs designed specifically for our cultural context and needs.",
      color: '#10b981'
    },
    {
      icon: <Globe size={24} />,
      title: "Globally Connected",
      text: "Partnering with international institutions while staying rooted in Rwandan values and educational excellence.",
      color: '#f59e0b'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.navContent}>
            <div style={styles.logo}>
              <div style={styles.logoText}>EduLead Foundation</div>
              <div style={styles.logoSub}>x MasterCard Foundation</div>
            </div>

            <div style={styles.desktopMenu}>
              <a href="/" style={styles.menuLink}>Home</a>
              <a href="/about" style={styles.activeMenuLink}>About</a>
              <a href="/courses" style={styles.menuLink}>Courses</a>
              <a href="/contact" style={styles.menuLink}>Contact</a>
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
              <a href="/about" style={{...styles.mobileMenuLink, color: '#7c3aed', fontWeight: '600'}}>About</a>
              <a href="/courses" style={styles.mobileMenuLink}>Courses</a>
              <a href="/contact" style={styles.mobileMenuLink}>Contact</a>
              <a href="/login" style={styles.mobileMenuLink}>Login</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContainer}>
          <div style={styles.heroContent}>
            <div>
              <h1 style={styles.heroTitle}>
                edulead Foundation Rwanda Initiative
              </h1>
              <p style={styles.heroSubtitle}>
                A case study exploring innovative approaches to empower Rwandan women through accessible higher education. This conceptual platform demonstrates how strategic partnerships and targeted programs could transform educational opportunities for women across all districts of Rwanda.
              </p>
              
              <div style={styles.heroStats}>
                <div style={styles.heroStat}>
                  <div style={styles.heroStatNumber}>{countUp.women.toLocaleString()}+</div>
                  <div style={styles.heroStatLabel}>Women Empowered</div>
                </div>
                <div style={styles.heroStat}>
                  <div style={styles.heroStatNumber}>{countUp.scholarships}+</div>
                  <div style={styles.heroStatLabel}>Scholarships</div>
                </div>
                <div style={styles.heroStat}>
                  <div style={styles.heroStatNumber}>{countUp.universities}+</div>
                  <div style={styles.heroStatLabel}>University Partners</div>
                </div>
                <div style={styles.heroStat}>
                  <div style={styles.heroStatNumber}>{countUp.programs}+</div>
                  <div style={styles.heroStatLabel}>Programs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section style={styles.missionSection}>
        <div style={styles.missionContainer}>
          <h2 style={styles.sectionTitle}>What Drives Us</h2>
          <p style={styles.sectionSubtitle}>
            Our mission, vision, and values shape everything we do in service of Rwandan women's educational success.
          </p>

          <div style={styles.tabButtons}>
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tabButton,
                  ...(activeTab === tab ? styles.activeTabButton : {})
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div style={styles.tabContent}>
            <div style={styles.tabGrid}>
              <div>
                <h3 style={{fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem'}}>
                  {tabContent[activeTab].title}
                </h3>
                <p style={styles.tabText}>
                  {tabContent[activeTab].text}
                </p>
              </div>
              
              <div style={styles.tabFeatures}>
                {tabContent[activeTab].features.map((feature, index) => (
                  <div key={index} style={styles.tabFeature}>
                    <div style={{...styles.tabFeatureIcon, backgroundColor: feature.color}}>
                      {feature.icon}
                    </div>
                    <span style={styles.tabFeatureText}>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section style={styles.storySection}>
        <div style={styles.storyContainer}>
          <div style={styles.storyGrid}>
            <div style={styles.storyContent}>
              <h2 style={styles.storyTitle}>Our Rwanda Story</h2>
              <p style={styles.storyText}>
                This platform was founded in 2025 by Mutoni Fabrice as a case study exploring how the MasterCard Foundation could expand its impact in empowering Rwandan women through higher education. Currently under development, this conceptual framework demonstrates innovative approaches to addressing barriers facing women in accessing quality higher education across Rwanda's 30 districts.
              </p>
              
              <div style={styles.storyFeatures}>
                {storyFeatures.map((feature, index) => (
                  <div key={index} style={styles.storyFeature}>
                    <div style={{...styles.storyFeatureIcon, backgroundColor: feature.color}}>
                      {feature.icon}
                    </div>
                    <div style={styles.storyFeatureContent}>
                      <h4 style={styles.storyFeatureTitle}>{feature.title}</h4>
                      <p style={styles.storyFeatureText}>{feature.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={styles.storyVisual}>
              <div style={styles.storyVisualIcon}>
                <BookOpen size={48} />
              </div>
              <p style={styles.storyVisualText}>
                "Education is the most powerful weapon which you can use to change the world, and for Rwandan women, it's the key to transforming not just their own lives, but entire communities."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section style={styles.impactSection}>
        <div style={styles.impactContainer}>
          <h2 style={styles.sectionTitle}>Case Study Impact Framework</h2>
          <p style={styles.sectionSubtitle}>
            Exploring the potential scope and impact of expanded MasterCard Foundation initiatives across all districts of Rwanda.
          </p>
          
          <div style={styles.impactGrid}>
            {impactData.map((impact, index) => (
              <div key={index} style={styles.impactCard}>
                <div style={{...styles.impactIcon, backgroundColor: impact.color}}>
                  {impact.icon}
                </div>
                <h3 style={styles.impactTitle}>{impact.title}</h3>
                <p style={styles.impactDescription}>{impact.description}</p>
                <div style={styles.impactStat}>{impact.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={styles.teamSection}>
        <div style={styles.teamContainer}>
          <h2 style={styles.sectionTitle}>Case Study Development Team</h2>
          <p style={styles.sectionSubtitle}>
            Research team developing this conceptual framework for MasterCard Foundation's potential impact in Rwandan women's higher education.
          </p>
          
          <div style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} style={styles.teamCard}>
                <div style={styles.teamImage}>
                  <Users size={64} />
                </div>
                <div style={styles.teamContent}>
                  <h3 style={styles.teamName}>{member.name}</h3>
                  <p style={styles.teamRole}>{member.role}</p>
                  <p style={styles.teamBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section style={styles.partnershipSection}>
        <div style={styles.partnershipContainer}>
          <h2 style={styles.partnershipTitle}>MasterCard Foundation Framework</h2>
          <p style={styles.partnershipSubtitle}>
            This case study explores how MasterCard Foundation could leverage strategic partnerships to scale impact across Rwanda and East Africa.
          </p>
          
          <div style={styles.partnershipLogos}>
            <div style={styles.partnershipLogo}>MasterCard Foundation</div>
            <div style={styles.partnershipLogo}>University of Rwanda</div>
            <div style={styles.partnershipLogo}>MINEDUC Rwanda</div>
            <div style={styles.partnershipLogo}>Rwanda Women's Network</div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaTitle}>Join Our Mission</h2>
          <p style={styles.ctaText}>
            Whether you're a student seeking opportunities, an educator wanting to contribute, or an organization interested in partnership, there's a place for you in our community.
          </p>
          
          <div style={styles.ctaButtons}>
            <a href="/courses" style={{...styles.ctaButton, ...styles.primaryCtaButton}}>
              <BookOpen size={20} />
              Explore Programs
            </a>
            <a href="/contact" style={{...styles.ctaButton, ...styles.secondaryCtaButton}}>
              <ArrowRight size={20} />
              Get Involved
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerGrid}>
            <div>
              <div style={styles.footerLogo}>MasterCard Foundation</div>
              <p style={styles.footerText}>
                Case study exploring innovative approaches to empower women in higher education through strategic partnerships.
              </p>
              <p style={styles.footerPartnership}>
                Rwanda Women's Education Initiative - Conceptual Framework
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
            <p>&copy; 2025 MasterCard Foundation Case Study - Rwanda Women's Education Initiative. Developed by Mutoni Fabrice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;