import React from 'react';

const Slide3 = () => {
  const processSteps = [
    { title: 'Понимаем задачу', image: '/images/9.jpg' },
    { title: 'Проектируем решение', image: '/images/10.jpg' },
    { title: 'Делаем сайт', image: '/images/11.jpg' },
    { title: 'Запускаем и улучшаем', image: '/images/12.jpg' }
  ];

  return (
    <div className="process-section fade-in-section is-visible">
      <p className="section-kicker">Процесс</p>
      <div className="process-timeline">
        {processSteps.map((step, index) => (
          <article
            key={index} 
            className="process-step"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="step-icon-wrapper">
              <img src={step.image} alt={step.title} className="step-icon-img" />
            </div>
            <h3 className="step-name">{step.title}</h3>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Slide3;
