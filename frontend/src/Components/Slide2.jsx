import React from 'react';

const Slide2 = () => {
  const scrollToContact = () => {
    document.getElementById('contact-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cases = [
    {
      id: 1,
      title: 'Производство оборудования',
      metric: 'Показали линейку, преимущества и точки контакта.',
      image: '/images/6.png'
    },
    {
      id: 2,
      title: 'B2B-сервис',
      metric: 'Собрали сложный продукт в понятную историю.',
      image: '/images/7.png'
    },
    {
      id: 3,
      title: 'Экспертная услуга',
      metric: 'Убрали лишнее и усилили доверие к команде.',
      image: '/images/8.png'
    }
  ];

  return (
    <div className="cases-section fade-in-section is-visible">
      <div className="cases-art" aria-hidden="true">
        <img src="/images/5.png" alt="Cases Art" className="cases-image" />
      </div>

      <div className="cases-content">
        <p className="section-kicker">Кейсы</p>
        <h2 className="section-title">Задачи, где сайт должен объяснять и продавать</h2>
        <button className="text-button cases-link" onClick={scrollToContact}>
          Обсудить похожую задачу
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
