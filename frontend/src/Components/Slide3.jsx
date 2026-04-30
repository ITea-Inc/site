import React, { useEffect, useRef, useState } from 'react';

const Slide3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { root: document.querySelector('.app-container'), threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

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

  const processSteps = [
    { title: 'Бренд & Анализ', icon: '/images/1.png' },
    { title: 'UI/UX Проектирование', icon: '/images/2.png' },
    { title: 'Frontend Разработка', icon: '/images/3.png' },
    { title: 'Backend Разработка', icon: '/images/4.png' },
    { title: 'Тестирование & Запуск', icon: '/images/5.png' }
  ];

  return (
    <div ref={sectionRef} className={`process-section fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <h2 className="section-title">
        Наш <span>процесс</span> разработки
      </h2>
      
      <div className="process-timeline">
        {processSteps.map((step, index) => (
          <div 
            key={index} 
            className="process-step"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="step-icon-wrapper">
              <img src={step.icon} alt={step.title} />
            </div>
            <div className="step-info">
              <div className="step-name">{step.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="tech-marquee-container">
        <div className="tech-track">
          {infiniteTechnologies.map((tech, index) => (
            <div key={`${tech.id}-${index}`} className="tech-item">
              <img src={tech.icon} alt={tech.name} />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide3;