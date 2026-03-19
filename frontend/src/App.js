import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Slide1 from './Components/Slide1';
import Slide2 from './Components/Slide2';
import Slide3 from './Components/Slide3';
import Slide4 from './Components/Slide4';

function App() {
  const [activeSlide, setActiveSlide] = useState(null);
  const slidesRef = useRef([]);
  const isClicked = useRef(false);
  
  const slides = [Slide1, Slide2, Slide3, Slide4];
  const slideNames = ['Главная', 'О нас', 'Процесс', 'Контакты'];

  const scrollToSlide = (index) => {
    if (slidesRef.current[index]) {
      isClicked.current = true;
      setActiveSlide(index);
      
      slidesRef.current[index].scrollIntoView({ 
        behavior: 'smooth' 
      });

      setTimeout(() => {
        isClicked.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = (e) => {
      
      if (!isClicked.current) {
        setActiveSlide(null);
      }
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('wheel', handleScroll);
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img 
            src="/images/itea.png" 
            alt="Logo" 
            style={{ height: '60px', width: 'auto' }} 
          />
        </div>
        
        <nav className="header-nav">
          {slideNames.map((name, index) => (
            <button
              key={index}
              className={`nav-link ${activeSlide === index ? 'active' : ''}`}
              onClick={() => scrollToSlide(index)}
            >
              {name}
            </button>
          ))}
        </nav>
      </header>

      <div className="slides-container">
        {slides.map((Slide, index) => (
          <div 
            key={index} 
            className="slide-wrapper"
            ref={el => slidesRef.current[index] = el}
          >
            <Slide />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;