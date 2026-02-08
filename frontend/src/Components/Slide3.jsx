import React from 'react';

const Slide3 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {
  const moveDistance = (scrollProgress / 100) * 7.5;

  return (
    <section className={`slide ${slideDirection} ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
      <div className="slide-content">
        <div className="slide-text">
          <h1>Слайд 3: Профессиональные IT-решения</h1>
          <div className="video-container">
            <video 
              autoPlay 
              muted 
              loop={false}
              playsInline
              className="background-video"
            >
              <source src="/videos/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        
        <div className="slide-circles">
          <div className="left-circles">
            <div 
              className="circle orange" 
              style={{ 
                marginRight: '15vw',
                transform: `translateX(${moveDistance}vw)`
              }}
            ></div>
            <div 
              className="circle yellow" 
              style={{ 
                marginLeft: '15vw',
                transform: `translateX(${moveDistance}vw)`
              }}
            ></div>
          </div>
          <div className="right-circles">
            <div 
              className="circle pink" 
              style={{ 
                marginRight: '15vw',
                transform: `translateX(-${moveDistance}vw)`
              }}
            ></div>
            <div 
              className="circle purple" 
              style={{ 
                marginLeft: '15vw',
                transform: `translateX(-${moveDistance}vw)`
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide3;