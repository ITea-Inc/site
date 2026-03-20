import React from 'react';

const Slide2 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {
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
    <section className={`slide ${slideDirection} ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
      <div className="slide-capabilities">
        <h1 className="capabilities-title">Наши преимущества в цифрах</h1>
        
        <div className="capabilities-list">
          {capabilities.map((item) => (
            <div key={item.id} className="capability-item">
              <div className="capability-stat-wrapper">
                <span className="capability-stat-number">{item.stat}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slide2;