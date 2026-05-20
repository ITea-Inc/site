import React from 'react';

const Slide1 = () => {
  const scrollToCases = () => {
    document.getElementById('section-1')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    { title: 'Смысл', copy: 'Сразу понятно, кто вы и чем полезны.', image: '/images/2.png', alt: 'Смысл' },
    { title: 'Маршрут', copy: 'Посетитель не теряется и движется к решению.', image: '/images/3.png', alt: 'Маршрут' },
    { title: 'Доверие', copy: 'Аргументы, кейсы и форма стоят на своих местах.', image: '/images/4.png', alt: 'Доверие' },
  ];

  return (
    <div className="hero-content fade-in-section is-visible">
      <section className="hero-panel">
        <div className="hero-copy">
          <h1 className="hero-title">
            Делаем сайты,<br />
            где понятно<br />
            и хочется оставить заявку
          </h1>
          <p className="hero-description">Продумываем подачу, структуру и путь клиента до обращения.</p>

          <div className="hero-actions">
            <button className="primary-button" onClick={scrollToContact}>Разобрать задачу</button>
            <button className="text-button" onClick={scrollToCases}>
              Посмотреть примеры
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <img src="/images/1.png" alt="Hero Art" className="hero-image" />
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
