/* Slide4.jsx */
import React from 'react';

const Slide4 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {
  return (
    <section className={`slide ${slideDirection} ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
      <div className="slide4-container">
        <div className="slide4-content">
          <h1 className="slide4-title">Свяжитесь с нами</h1>
          
          <p className="slide4-description">
            Мы верим, что за каждым успешным проектом стоит открытый диалог.
            <br />
            Расскажите о своей идее, и мы предложим оптимальный стек технологий для её реализации.
          </p>
          
          <p className="slide4-description">
            Работа в любом удобном для вас формате.
            <br />
            Ответим в течение 12 часов.
          </p>

          <button className="slide4-button">
            Написать нам
          </button>
        </div>
      </div>
    </section>
  );
};

export default Slide4;