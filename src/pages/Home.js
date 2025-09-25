import React, { useState } from 'react';
import { Menu, X, ChevronRight, Users, BookOpen, Award, Globe, ArrowRight, Star } from 'lucide-react';
import './Home.css';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-logo-container">
            <div className="nav-logo">EduLead</div>
            <div className="nav-subtitle">x MasterCard Foundation</div>
          </div>

          {/* Desktop Menu */}
          <div className="nav-links-desktop">
            <a href="/about">About</a>
            <a href="/courses">Courses</a>
            <a href="/contact">Contact</a>
            <a href="/login" className="nav-login">Login</a>
          </div>

          {/* Mobile menu button */}
          <div className="nav-mobile-button" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="nav-mobile-menu">
            <a href="/about">About</a>
            <a href="/courses">Courses</a>
            <a href="/contact">Contact</a>
            <a href="/login" className="nav-login">Login</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div>
            <div className="hero-badge">Partnership with MasterCard Foundation</div>
            <h1 className="hero-title">Empowering Women in Higher Education</h1>
            <p className="hero-text">
              EduLead bridges the gender gap in academia through scholarships, mentorship, and leadership development. Join thousands of women advancing their careers worldwide.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Get Started Today <ChevronRight className="icon-right" size={20} /></button>
              <button className="btn-secondary">Watch Demo</button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">15K+</div>
                <div className="stat-label">Women Empowered</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">$50M</div>
                <div className="stat-label">In Scholarships</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">200+</div>
                <div className="stat-label">Partner Universities</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">85%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="features-header">
            <h2>What Makes EduLead Special</h2>
            <p>A comprehensive platform designed specifically for women's advancement in higher education</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon award"><Award size={28} /></div>
              <h3>Scholarship Access</h3>
              <p>Connect with funding opportunities through our partnership with MasterCard Foundation and other global sponsors.</p>
              <a href="/courses" className="feature-link">Explore Scholarships <ArrowRight size={16} /></a>
            </div>
            <div className="feature-card">
              <div className="feature-icon users"><Users size={28} /></div>
              <h3>Expert Mentorship</h3>
              <p>Get paired with industry leaders and academic professionals who understand your journey and challenges.</p>
              <a href="/about" className="feature-link">Meet Mentors <ArrowRight size={16} /></a>
            </div>
            <div className="feature-card">
              <div className="feature-icon book"><BookOpen size={28} /></div>
              <h3>Leadership Training</h3>
              <p>Develop essential leadership skills through interactive programs designed for tomorrow's leaders.</p>
              <a href="/courses" className="feature-link">View Programs <ArrowRight size={16} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* MasterCard Foundation Section */}
      <section className="partnership">
        <div className="partnership-container">
          <div className="partnership-text">
            <h2>Proudly Supported by MasterCard Foundation</h2>
            <p>Through our strategic partnership, we're able to provide comprehensive support that transforms educational opportunities for women across Africa and beyond.</p>
            <div className="partnership-buttons">
              <button className="btn-partnership">Learn About Partnership</button>
              <button className="btn-partnership-outline">Success Stories</button>
            </div>
          </div>
          <div className="partnership-visual">
            <div className="visual-card">
              <Globe size={64} className="globe-icon" />
              <h3>Global Impact</h3>
              <p>Transforming lives across 30+ countries with sustainable educational solutions and career opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="testimonials-header">
          <h2>What Our Community Says</h2>
          <p>Real stories from women who've transformed their careers with EduLead</p>
        </div>
        <div className="testimonials-grid">
          {[
            { name: "Sarah K.", role: "PhD Student, Kenya", text: `"EduLead connected me with a scholarship that changed my life. The mentorship program helped me navigate challenges I never expected."` },
            { name: "Dr. Amina M.", role: "Research Director, Ghana", text: `"The leadership development program prepared me for roles I never thought possible. Now I'm leading a team of 50+ researchers."` },
            { name: "Prof. Grace O.", role: "University Professor, Nigeria", text: `"The networking opportunities through EduLead opened doors I didn't even know existed. Grateful for this amazing community."` }
          ].map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">{[...Array(5)].map((_, j) => <Star key={j} size={20} className="star" />)}</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-name">{t.name}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Transform Your Academic Journey?</h2>
        <p>Join thousands of women who are advancing their careers with EduLead's comprehensive support system.</p>
        <div className="cta-buttons">
          <button className="btn-primary-lg">Apply for Scholarships</button>
          <button className="btn-secondary-lg">Explore Programs</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">EduLead</div>
            <p>Empowering women in higher education through innovative digital solutions.</p>
            <p className="footer-powered">Powered by MasterCard Foundation</p>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Programs</h4>
            <ul>
              <li><a href="/courses">Scholarships</a></li>
              <li><a href="/courses">Mentorship</a></li>
              <li><a href="/courses">Leadership</a></li>
              <li><a href="/courses">Career Development</a></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="/contact">Get Support</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="/login">Member Login</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 EduLead. All rights reserved. | Partnership with MasterCard Foundation
        </div>
      </footer>
    </div>
  );
}

export default Home;
