import React, { useEffect, useRef, useState } from 'react';

const Slide1 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { root: document.querySelector('.app-container'), threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} className={`hero-content fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="hero-left">
        <h1 className="hero-title">
          Интеграция IT в бизнес <span>любого масштаба</span>
        </h1>
        <p className="hero-description">
          Улучшаем процессы, автоматизируем задачи и помогаем вашему бизнесу расти с помощью передовых IT-решений и индивидуального подхода.
        </p>

        <div className="hero-chips">
          <span className="chip">Качество</span>
          <span className="chip">Скорость</span>
          <span className="chip">Надежность</span>
          <span className="chip">Инновации</span>
          <span className="chip">Экспертиза</span>
          <span className="chip">Поддержка 24/7</span>
          <span className="chip">Индивидуальный подход</span>
          <span className="chip">Безопасность</span>
        </div>
      </div>

      <div className="hero-right">
        <div className="feature-card">
          <div className="feature-icon">
            <img src="/images/settings-svgrepo-com.svg" alt="Быстрая разработка" />
          </div>
          <div className="feature-content">
            <h3>Быстрая разработка</h3>
            <p>Эффективное и безошибочное выполнение задач благодаря автоматизации процессов.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <img src="/images/chart-growth-invest-svgrepo-com.svg" alt="Масштабируемые решения" />
          </div>
          <div className="feature-content">
            <h3>Масштабируемые решения</h3>
            <p>Гибкие IT-решения, которые растут вместе с вашим бизнесом и адаптируются к изменениям.</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <img src="/images/businessman-svgrepo-com.svg" alt="Индивидуальный подход" />
          </div>
          <div className="feature-content">
            <h3>Индивидуальный подход</h3>
            <p>Адаптируемся под уникальные потребности вашего бизнеса и находим лучшие решения.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide1;