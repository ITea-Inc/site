import React from 'react';

const Slide3 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {

  const technologies = [
    { id: 1, name: 'Java', icon: '/images/tech/java.svg' },
    { id: 2, name: 'Spring', icon: '/images/tech/spring.svg' },
    { id: 3, name: 'React', icon: '/images/tech/react.svg' },
    { id: 4, name: 'Node.js', icon: '/images/tech/nodejs.svg' },
    { id: 5, name: 'Python', icon: '/images/tech/python.svg' },
    { id: 6, name: 'Docker', icon: '/images/tech/docker.svg' },
    { id: 7, name: 'Kubernetes', icon: '/images/tech/kubernetes.svg' },
    { id: 8, name: 'PostgreSQL', icon: '/images/tech/postgresql.svg' },
    { id: 9, name: 'MongoDB', icon: '/images/tech/mongodb.svg' },
    { id: 10, name: 'Git', icon: '/images/tech/git.svg' },
  ];

  const infiniteTechnologies = [...technologies, ...technologies, ...technologies];

  return (
    <section className={`slide3 ${slideDirection} ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
      <div className="process-container">
        <div className="title-container">
          <div className="capabilities-title">Наш процесс разработки</div>
        </div>
        

        <div className="steps">
          <div className="step">
            <div className="image-container">
              <img src="/images/1.png" className="imgClaster" alt="brain"></img>
            </div>
            <div className="step-title">Бренд & Анализ</div>
          </div>
          <div className="ArrLContainer">
            <img src="/images/arrL.png" className="ArrowLeft" alt="arrowLeft"></img>
          </div>
          <div className="step">
            <div className="image-container">
              <img src="/images/2.png" className="imgClaster" alt="UI/UX"></img>
            </div>
            <div className="step-title">UI/UX Проектирование</div>
          </div>
          <div className="ArrRContainer">
            <img src="/images/arrR.png" className="ArrowRight" alt="arrowRight"></img>
          </div>
          <div className="step">
            <div className="image-container">
              <img src="/images/3.png" className="imgClaster" alt="FrontEnd"></img>
            </div>
            <div className="step-title">Frontend Разработка</div>
          </div>
          <div className="ArrLContainer">
            <img src="/images/arrL.png" className="ArrowLeft" alt="arrowLeft"></img>
          </div>
          <div className="step">
            <div className="image-container">
              <img src="/images/4.png" className="imgClaster" alt="BackEnd"></img>
            </div>
            <div className="step-title">Backend (Java/Spring)</div>
          </div>
          <div className="ArrRContainer">
            <img src="/images/arrR.png" className="ArrowRight" alt="arrowRight"></img>
          </div>
          <div className="step">
            <div className="image-container">
              <img src="/images/5.png" className="imgClaster" alt="Rocket"></img>
            </div>
            <div className="step-title">Тестирование & Запуск</div>
          </div>
        </div>

        <div className="tech-marquee">
          <div className="tech-marquee-track">
            {infiniteTechnologies.map((tech, index) => (
              <div key={`${tech.id}-${index}`} className="tech-item">
                <img src={tech.icon} alt={tech.name} className="tech-icon" />
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide3;