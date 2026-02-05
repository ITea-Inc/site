import React from 'react';

const Slide1 = () => {
  return (
    <section className="slide">
      <div className="slide-text">
        <h1>Интеграция IT в бизнес любого масштаба и любой сложности</h1>
        <p>Здесь идеально подойдёт минималистичный 3D-рендер или качественное фото рабочего процесса вашей команды.</p>
      </div>
      <div className="slide-circles">
        <div className="left-circles">
          <div className="circle orange"></div>
          <div className="circle yellow"></div>
        </div>
        <div className="right-circles">
          <div className="circle pink"></div>
          <div className="circle purple"></div>
        </div>
      </div>
    </section>
  );
}

export default Slide1;
