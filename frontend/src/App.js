import React, { useState, useEffect } from 'react';
import './App.css';
import Slide1 from './Components/Slide1';
import Slide2 from './Components/Slide2';
import Slide3 from './Components/Slide3';
import Slide4 from './Components/Slide4';

function App() {
  const [activeSection, setActiveSection] = useState('section-0');

  const slides = [
    { id: 'section-0', Component: Slide1, name: 'Подача' },
    { id: 'section-1', Component: Slide2, name: 'Кейсы' },
    { id: 'section-2', Component: Slide3, name: 'Процесс' },
    { id: 'section-3', Component: Slide4, name: 'Контакты' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = document.querySelector('.app-container');
    const observerOptions = {
      root: container,
      rootMargin: '0px',
      threshold: 0.5,
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
          {slides.slice(0, 3).map((slide) => (
            <button
              key={slide.id}
              className={`nav-link ${activeSection === slide.id ? 'active' : ''}`}
              onClick={() => scrollToSection(slide.id)}
            >
              {slide.name}
            </button>
          ))}
        </nav>

        <button className="header-cta" onClick={() => scrollToSection('section-3')}>
          Обсудить проект
        </button>
      </header>

      <main>
        {slides.map((slide) => (
          <div id={slide.id} key={slide.id} className="section">
            <slide.Component />
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
