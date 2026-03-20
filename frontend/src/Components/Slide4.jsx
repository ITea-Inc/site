import React from 'react';

const Slide4 = ({ scrollProgress = 0, slideDirection = 'next', isTransitioning = false }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Заявка успешно отправлена!');
        e.target.reset();
      } else {
        alert('Произошла ошибка при отправке (код ошибки: ' + response.status + ').');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Нет связи с сервером. Проверьте, работает ли backend на localhost:8080.');
    }
  };

  return (
    <section className={`slide ${slideDirection} ${isTransitioning ? 'slide-exit' : 'slide-enter'}`}>
      <div className="slide4-container">
        <div className="slide4-content">
          <div className="slide4-left">
            <h1 className="slide4-title">Свяжитесь с нами</h1>

            <p className="slide4-description">
              Расскажите о своей идее, и мы предложим оптимальный стек технологий для её реализации.
            </p>

            <form className="slide4-form" onSubmit={handleSubmit}>
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
                <label htmlFor="body">Сообщение</label>
                <textarea
                  id="body"
                  name="body"
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