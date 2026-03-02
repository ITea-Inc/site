import React from 'react';

const Slide3 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {

  return (
    <div classNameName="slide-capabilities">
      <div className="process-container">
    <div className="title-container">
      <div className="title">Наш процесс разработки</div>
    </div>
    <div className="steps">
      <div className="step">
        <div className="image-container">
            <img src="/images/1.png" className="imgClaster" alt="brain"></img>
        </div>
        <div className="step-title">1. Бренд & Анализ</div>
        <div className="step-description">Брендирование компании и анализ потребностей в проектировании дальнейших шагов.</div>
      </div>
      <div className="ArrLContainer">
          <img src="/images/arrL.png" className="ArrowLeft" alt="arrowLeft"></img>
      </div>
      <div className="step">
        <div className="image-container">
            <img src="/images/2.png" className="imgClaster" alt="UI/UX"></img>
        </div>
        <div className="step-title">2. UI/UX Проектирование</div>
        <div className="step-description">Разработка дизайна, ориентированного на пользователя, с красивым интерфейсом.</div>
      </div>
      <div className="ArrRContainer">
          <img src="/images/arrR.png" className="ArrowRight" alt="arrowRight"></img>
      </div>
      <div className="step">
        <div className="image-container">
            <img src="/images/3.png" className="imgClaster" alt="FrontEnd"></img>
        </div>
        <div className="step-title">3. Frontend Разработка</div>
        <div className="step-description">Разработка frontend части проекта с использованием современных технологий.</div>
      </div>
      <div className="ArrLContainer">
          <img src="/images/arrL.png" className="ArrowLeft" alt="arrowLeft"></img>
      </div>
      <div className="step">
        <div className="image-container">
            <img src="/images/4.png" className="imgClaster" alt="BackEnd"></img>
        </div>
        <div className="step-title">4. Backend (Java/Spring)</div>
        <div className="step-description">Разработка backend части с использованием Java и Spring для устойчивого решения.</div>
      </div>
      <div className="ArrRContainer">
          <img src="/images/arrR.png" className="ArrowRight" alt="arrowRight"></img>
      </div>
      <div className="step">
        <div className="image-container">
            <img src="/images/5.png" className="imgClaster" alt="Rocket"></img>
        </div>
        <div className="step-title">5. Тестирование & Запуск</div>
        <div className="step-description">Проверка всех компонентов и подготовка к финальному запуску.</div>
      </div>
    </div>
  </div>
    </div>
  );
};

export default Slide3;