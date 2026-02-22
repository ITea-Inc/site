import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Slide1 from './Components/Slide1';
import Slide2 from './Components/Slide2';
import Slide3 from './Components/Slide3';
import Slide4 from './Components/Slide4';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next');
  //const [isJopa, setJopa] = useState(false)
  const containerRef = useRef(null);

  const slides = [Slide1, Slide2, Slide3, Slide4];
  const CurrentSlide = slides[currentSlide];


  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isTransitioning) return;
      
      const delta = e.deltaY > 0 ? 1 : -1;
      const step = 15;

      if (delta > 0 && scrollProgress < 100) {
        const newProgress = Math.min(100, scrollProgress + step);
        setScrollProgress(newProgress);

        if (newProgress === 100 && currentSlide < slides.length - 1) {
          setIsTransitioning(true);
          setSlideDirection('next');
          setTimeout(() => {
            setCurrentSlide(currentSlide + 1);
            setScrollProgress(0);
            setTimeout(() => setIsTransitioning(false), 50);
          }, 300);
        }
      } else if (delta < 0 && scrollProgress > 0) {
        setScrollProgress(Math.max(0, scrollProgress - step));
      } else if (delta < 0 && scrollProgress === 0 && currentSlide > 0) {
        setIsTransitioning(true);
        setSlideDirection('prev');
        setTimeout(() => {
          setCurrentSlide(currentSlide - 1);
          setScrollProgress(0);
          setTimeout(() => setIsTransitioning(false), 50);
        }, 300);
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [scrollProgress, currentSlide, slides.length, isTransitioning]);

  return (
    <div className="app" ref={containerRef} /*style={{display: `${isJopa ? 'none':'block'}` }}*/>
      <div className="progress-container">
        <div className="progress-bar" style={{ height: `${scrollProgress}%` }}></div>
      </div>

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
      <div className="burger-menu" /*onClick={(e)=>setJopa(true)}*/>☰</div>
    </header>

      <div className={`slide-container ${isTransitioning ? 'transitioning' : ''}`}  >
        <CurrentSlide 
          scrollProgress={scrollProgress} 
          slideDirection={slideDirection}
          isTransitioning={isTransitioning}
        />
      </div>
    </div>
  );
}

export default App;