import React from 'react';

const Slide1 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {
  return (
    <section 
      className={`slide ${slideDirection} ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}
      style={{
        backgroundColor: 'transparent', 
        position: 'relative',           
        width: '100%',                  
        height: '100vh',                
      }}
    >
      <div className="slide-content">
        {/* Перемещаем текст ещё левее, уменьшаем его размер */}
        <div className="slide-text" 
             style={{
               position: 'absolute', 
               top: '5vh', 
               left: '1%',              // Сдвигаем текст еще левее
               width: '90%', 
               maxWidth: '600px',       // Уменьшаем максимальную ширину
               padding: '0 20px',       
               boxSizing: 'border-box' 
             }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#333' }}>
            Интеграция IT в бизнес любого масштаба и любой сложности
          </h1>
          <p style={{ fontSize: '1rem', color: '#666' }}>
            Улучшаем процессы, автоматизируем задачи и помогаем вашему бизнесу расти с помощью передовых IT-решений.
          </p>
          {/* Кнопка "Узнать больше" */}
             <button
              type="button"
              onClick={() => { /* handle navigation or open modal here */ }}
              style={{
              display: 'inline-block',
              marginTop: '20px',
              padding: '15px 20px',
              backgroundImage: `url('/images/BGbutton.png')`,  // Используем сгенерированное изображение
              backgroundSize: 'cover',
              color: '#fff',
              borderRadius: '30px',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.1rem',
              transition: 'transform 0.3s ease',  // Плавный переход при наведении
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}  // Увеличиваем кнопку при наведении
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}  // Возвращаем размер при уходе
          >
            Узнать больше
          </button>
        </div>

        {/* Добавляем три плитки горизонтально с фоном */}
        <div className="tiles" style={{
          position: 'absolute', 
          bottom: '5%', 
          right: '5%',
          display: 'flex',         // Используем flex для горизонтального выравнивания
          gap: '20px',             // Отступы между плитками
        }}>

          {/* Плитка "Масштабируемые решения" */}
          <div className="tile" style={{ 
            background: 'rgba(255, 255, 255, 0.8)', 
            padding: '20px', 
            borderRadius: '15px', 
            width: '200px', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
            color: '#fff', 
            textAlign: 'center' 
          }}>
            <div style={{
              //backgroundImage: `url('/images/OrangePl.png')`,
              height: '60px',
              //margin: '0 auto 10px auto',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}></div>
            

            <div style={{
              color: '#212121',
              textAlign: 'left',
            }}>Повышение процессов</div>

            <div style={{
              color: '#7b7b7b',
              marginTop: '10px',
              textAlign: 'left',
            }}>Эффективное и безошибочное выполнение задач благодаря автоматизации</div>
            <div style={{
              marginTop: '15px',
              marginLeft: '-10px',
              marginBottom: '-12px',
              marginRight: '-10px',
              background: `linear-gradient(135deg, rgba(255, 213, 178, 0.77), rgba(255, 145, 76, 0.89)5, 213, 178, 0.77))`,
              height: '15px',
              borderRadius: '10px 10px 0px 0px',
              
            }}></div>
          </div>

          {/* Плитка "Масштабируемые решения" */}
          <div className="tile" style={{ 
            background: 'linear-gradient(135deg, #f8d86d, #ffeb99)', 
            padding: '20px', 
            borderRadius: '10px', 
            width: '200px', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
            color: '#fff', 
            textAlign: 'center' 
          }}>
            <h4>Масштабируемые решения</h4>
            <p>Гибкие IT-решения, которые растут вместе с вашим бизнесом.</p>
          </div>

          {/* Плитка "Индивидуальный подход" */}
          <div className="tile" style={{ 
            background: 'linear-gradient(135deg, #c0a8f4, #e0b4f2)', 
            padding: '20px', 
            borderRadius: '10px', 
            width: '200px', 
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
            color: '#fff', 
            textAlign: 'center' 
          }}>
            <h4>Индивидуальный подход</h4>
            <p>Адаптируемся под уникальные потребности вашего бизнеса.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide1;
