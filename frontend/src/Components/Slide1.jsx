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
          
          
          <div className="slide1-chips">
            <div className="chips-row">
              <span className="chip">Качество</span>
              <span className="chip">Скорость</span>
              <span className="chip">Надежность</span>
              <span className="chip">Инновации</span>
              <span className="chip">Экспертиза</span>
            </div>
            <div className="chips-row">
              <span className="chip">Поддержка 24/7</span>
              <span className="chip">Индивидуальный подход</span>
              <span className="chip">Прозрачность</span>
              <span className="chip">Безопасность</span>
            </div>
          </div>
        </div>

        <div className="slide1-right">
          <div className="slide1-tiles">
            <div className="tile slide1-tile-process">
              <div className="tile-photo-Title">
                <img className='settingsPhoto' src='images/settings-svgrepo-com.svg' alt="settings"></img>
                <div className="tile-title">Быстрая разработка</div>
              </div>
              <div className="tile-description">Эффективное и безошибочное выполнение задач благодаря автоматизации</div>
            </div>

            <div className="tile slide1-tile-scalable">
              <div className="tile-photo-Title">
                <img className='settingsPhoto' src='images/chart-growth-invest-svgrepo-com.svg' alt="growth"></img>
                <div className="tile-title">Масштабируемые решения</div>
              </div>
              <div className="tile-description">Гибкие IT-решения, которые растут вместе с вашим бизнесом</div>
            </div>

            <div className="tile slide1-tile-custom">
              <div className="tile-photo-Title">
                <img className='settingsPhoto' src='images/businessman-svgrepo-com.svg' alt="businessman"></img>
                <div className="tile-title">Индивидуальный подход</div>
              </div>
              <div className="tile-description">Адаптируемся под уникальные потребности вашего бизнеса</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide1;