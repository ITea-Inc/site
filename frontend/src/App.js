import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Slide1 from './Components/Slide1';
import Slide2 from './Components/Slide2';
import Slide3 from './Components/Slide3';
import Slide4 from './Components/Slide4';

function App() {
  const [activeSection, setActiveSection] = useState('section-0');
  
  const bgRef1 = useRef(null);
  const bgRef2 = useRef(null);
  const bgRef3 = useRef(null);

  const slides = [
    { id: 'section-0', Component: Slide1, name: 'Главная' },
    { id: 'section-1', Component: Slide2, name: 'О нас' },
    { id: 'section-2', Component: Slide3, name: 'Процесс' },
    { id: 'section-3', Component: Slide4, name: 'Контакты' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = (e) => {
    const y = e.target.scrollTop;
    if (bgRef1.current) bgRef1.current.style.transform = `translateY(${y * -0.15}px)`;
    if (bgRef2.current) bgRef2.current.style.transform = `translateY(${y * 0.2}px)`;
    if (bgRef3.current) bgRef3.current.style.transform = `translateY(${y * -0.25}px)`;
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
    <div className="app-container" onScroll={handleScroll}>
      <div className="animated-bg">
        <div ref={bgRef1} className="shape-parallax"><div className="shape shape-1"></div></div>
        <div ref={bgRef2} className="shape-parallax"><div className="shape shape-2"></div></div>
        <div ref={bgRef3} className="shape-parallax"><div className="shape shape-3"></div></div>
      </div>

      <header className="header">
        <div className="logo">
          <img src="/images/itea.png" alt="Logo" />
        </div>
        
        <nav className="header-nav">
          {slides.map((slide) => (
            <button
              key={slide.id}
              className={`nav-link ${activeSection === slide.id ? 'active' : ''}`}
              onClick={() => scrollToSection(slide.id)}
            >
              {slide.name}
            </button>
          ))}
        </nav>
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