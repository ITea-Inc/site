import React from 'react';

const Slide1 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {
  return (
    <section className={`slide ${slideDirection} ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
      <div className="slide1-content">
        <div className="slide1-left">
          <h1 className="slide1-title">
            Интеграция IT в бизнес любого масштаба и любой сложности
          </h1>
          <p className="slide1-description">
            Улучшаем процессы, автоматизируем задачи и помогаем вашему бизнесу расти с помощью передовых IT-решений.
          </p>
          <button className="learn-more-btn">
            Узнать больше
          </button>

          <div className="slide1-video">
            <video autoPlay muted loop={false} playsInline>
              <source src="/videos/video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="slide1-right">
          <div className="slide1-tiles">
            <div className="tile slide1-tile-process">
              <div className="tile-title">Повышение процессов</div>
              <div className="tile-description">Эффективное и безошибочное выполнение задач благодаря автоматизации</div>
            </div>

            <div className="tile slide1-tile-scalable">
              <h4>Масштабируемые решения</h4>
              <p>Гибкие IT-решения, которые растут вместе с вашим бизнесом.</p>
            </div>

            <div className="tile slide1-tile-custom">
              <h4>Индивидуальный подход</h4>
              <p>Адаптируемся под уникальные потребности вашего бизнеса.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide1;