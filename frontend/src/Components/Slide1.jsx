import React from 'react';

const Slide1 = () => {
  const scrollToCases = () => {
    document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('section-3')?.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    { title: 'Структура', copy: 'Понятно и убедительно.', image: '/images/2.jpg', alt: 'Структура' },
    { title: 'Фокус', copy: 'На действиях.', image: '/images/3.jpg', alt: 'Фокус' },
    { title: 'Результат', copy: 'Заявки и рост.', image: '/images/4.jpg', alt: 'Результат' },
  ];

  return (
    <div className="hero-content fade-in-section is-visible">
      <section className="hero-panel">
        <div className="hero-copy">
          <h1 className="hero-title">
            Сайты,<br />
            которые ведут<br />
            к заявке
          </h1>
          <p className="hero-description">Структура. Фокус. Результат.</p>

          <div className="hero-actions">
            <button className="primary-button" onClick={scrollToContact}>Обсудить проект</button>
            <button className="text-button" onClick={scrollToCases}>
              Смотреть кейсы
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <img src="/images/1.jpg" alt="Hero Art" style={{ width: '100%', height: 'auto', maxWidth: '800px', objectFit: 'contain' }} />
        </div>
      </section>

      <section className="pillars-panel" aria-label="Подход">
        {pillars.map((pillar) => (
          <article className="pillar-card" key={pillar.title}>
            <img src={pillar.image} alt={pillar.alt} className="pillar-image" />
            <h2>{pillar.title}</h2>
            <p>{pillar.copy}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Slide1;
