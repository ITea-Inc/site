import React from 'react';

const Slide4 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {
  return (
    <section className={`slide ${slideDirection} ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
      <div className="slide4-container">
        <div className="slide4-content">
          <div className="slide4-left">
            <h1 className="slide4-title">Свяжитесь с нами</h1>
            
            <p className="slide4-description">
              Расскажите о своей идее, и мы предложим оптимальный стек технологий для её реализации.
            </p>

            
            <form className="slide4-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="your@email.com"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Сообщение</label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Опишите вашу задачу или идею..."
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="slide4-button">
                Отправить заявку
              </button>
            </form>
          </div>
          
          <div className="slide4-right">
            <div className="slide4-qr-wrapper">
              <img 
                src="/images/qrcode.png" 
                alt="QR код для связи" 
                className="slide4-qr-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide4;