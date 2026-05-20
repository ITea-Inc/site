import React, { useState, useEffect } from 'react';
import './App.css';
import Slide1 from './Components/Slide1';
import Slide2 from './Components/Slide2';
import Slide4 from './Components/Slide4';

function App() {
  const [activeSection, setActiveSection] = useState('section-0');

  const navItems = [
    { id: 'section-0', name: 'Подача' },
    { id: 'section-1', name: 'Кейсы' },
    { id: 'section-2', name: 'Процесс' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim()} 0px -45% 0px`,
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <button className="logo" onClick={() => scrollToSection('section-0')}>ITea</button>
        
        <nav className="header-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.name}
            </button>
          ))}
        </nav>

        <button className="header-cta" onClick={() => scrollToSection('contact-anchor')}>
          Обсудить проект
        </button>
      </header>

      <main className="page-flow">
        <section id="section-0" className="section">
          <Slide1 />
        </section>

        <section id="section-1" className="section">
          <Slide2 />
        </section>

        <section id="section-2" className="section">
          <Slide4 />
        </section>
      </main>
    </div>
  );
}

export default App;
