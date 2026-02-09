import React from 'react';

const Slide3 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {
  const capabilities = [
    {
      id: 1,
      title: "Работа без границ",
      description: "Находимся в РФ, но работаем по всему миру - от стартапов в Саратове до технологических компаний в Базальте"
    },
    {
      id: 2,
      title: "Гибкие процессы",
      description: "Используем IAgile, чтобы вы видели результат после каждой итерации и могли вносить правки на лету"
    },
    {
      id: 3,
      title: "Всегда на связи",
      description: "Удалённый формат работы позволяет нам быть доступными в удобном для вас часовом поясе"
    }
  ];

  return (
    <div className="slide-capabilities">
      <h1 className="capabilities-title">Профессиональные IT-решения</h1>
      
      <div className="capabilities-list">
        {capabilities.map((item) => (
          <div key={item.id} className="capability-item">
            <div className="capability-header">
              <div className="capability-icon">{item.id}</div>
              <h3>{item.title}</h3>
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide3;