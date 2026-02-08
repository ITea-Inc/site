import React from 'react';

const Slide2 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {
  const capabilities = [
    {
      id: 1,
      title: "Backend высшего уровня",
      description: "Проектируем надёжную логику на Java и Spring, которая выдержит любые нагрузки"
    },
    {
      id: 2,
      title: "Комплексная разработка",
      description: "Мы - слаженная команда, где каждый отвечает за свою часть пазла: от идеи до деллов"
    },
    {
      id: 3,
      title: "Внимание к деталям",
      description: "Не просто \"пишем код\", а вникаем в бизнес-логику вашего продукта, чтобы каждое решение работало на результат"
    }
  ];

  return (
    <div className="slide-capabilities">
      <h1 className="capabilities-title">Наши возможности</h1>
      
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

export default Slide2;