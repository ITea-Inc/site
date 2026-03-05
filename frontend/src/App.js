import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Slide1 from './Components/Slide1';
import Slide2 from './Components/Slide2';
import Slide3 from './Components/Slide3';
import Slide4 from './Components/Slide4';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isJopa, setJopa] = useState(false);
  const slidesRef = useRef([]);
  
  const slides = [Slide1, Slide2, Slide3, Slide4];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Определяем текущий слайд на основе позиции скролла
      const newSlide = Math.round(scrollPosition / windowHeight);
      setCurrentSlide(Math.min(slides.length - 1, Math.max(0, newSlide)));
    };

    window.addEventListener('scroll', handleScroll);
    
    // Устанавливаем начальную позицию
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slides.length]);

  return (
    <div className="app" style={{display: `${isJopa ? 'none':'block'}` }}>
      {/* Прогресс активного слайда */}
      {/* <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ 
            height: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        ></div>
      </div> */}

      <header className="header">
        <div className="logo">
          <img 
            src="/images/itea.png" 
            alt="Logo" 
            style={{ 
              height: '60px', 
              width: 'auto' 
            }} 
          />
        </div>
        <div className="burger-menu" onClick={() => setJopa(true)}>☰</div>
      </header>

      {/* Все слайды сразу */}
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