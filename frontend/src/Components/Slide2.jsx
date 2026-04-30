import React, { useEffect, useRef, useState } from 'react';

const Slide2 = () => {
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

  const capabilities = [
    {
      id: 1,
      stat: "120+",
      title: "Проектов по России",
      description: "Успешно реализованных проектов от небольших лендингов до крупных корпоративных систем"
    },
    {
      id: 2,
      stat: "8 лет",
      title: "На рынке разработки",
      description: "Стабильно растем и развиваемся, адаптируясь к новым технологиям и требованиям рынка"
    },
    {
      id: 3,
      stat: "97%",
      title: "Довольных клиентов",
      description: "Возвращаются к нам с новыми проектами и рекомендуют нас партнерам"
    }
  ];

  return (
    <div ref={sectionRef} className={`stats-section fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <h2 className="section-title">
        Наши <span>преимущества</span> в цифрах
      </h2>
      
      <div className="stats-grid">
        {capabilities.map((item, index) => (
          <div 
            key={item.id} 
            className="stat-card"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="stat-number">{item.stat}</div>
            <h3 className="stat-title">{item.title}</h3>
            <p className="stat-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide2;