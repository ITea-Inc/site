import React from 'react';

const Slide2 = () => {
  const cases = [
    {
      id: 1,
      title: 'Завод оборудования',
      metric: 'Рост заявок: ×2,7',
      image: '/images/6.png'
    },
    {
      id: 2,
      title: 'Платформа для бизнеса',
      metric: 'Рост конверсии: +63%',
      image: '/images/7.png'
    },
    {
      id: 3,
      title: 'Юридическая компания',
      metric: 'Рост заявок: +48%',
      image: '/images/8.png'
    }
  ];

  return (
    <div className="cases-section fade-in-section is-visible">
      <div className="cases-art" aria-hidden="true">
        <img src="/images/5.png" alt="Cases Art" style={{ width: '100%', height: 'auto', maxWidth: '600px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
      </div>

      <div className="cases-content">
        <p className="section-kicker">Кейсы</p>
        <h2 className="section-title">Сайты, которые приносят заявки</h2>
        <button className="text-button cases-link">
          Смотреть все кейсы
          <span aria-hidden="true">→</span>
        </button>

        <div className="case-grid">
          {cases.map((item, index) => (
            <article
            key={item.id} 
            className="case-card"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
              <div className="case-visual-wrapper">
                <img src={item.image} alt={item.title} className="case-visual" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.metric}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide2;
