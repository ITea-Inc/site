import React, { useEffect, useRef, useState } from 'react';

const Slide4 = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
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
      alert('Нет связи с сервером. Проверьте, работает ли backend.');
    }
  };

  return (
    <div ref={sectionRef} className={`contact-section fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <h2 className="section-title">
        Свяжитесь с <span>нами</span>
      </h2>

      <div className="contact-container">
        <div className="contact-left">
          <h3 className="contact-title">Давайте обсудим ваш проект</h3>
          <p className="contact-desc">
            Расскажите о своей идее, и мы предложим оптимальный стек технологий для её реализации.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
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
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Отправить заявку
            </button>
          </form>
        </div>

        <div className="contact-right">
          <div className="qr-card">
            <img src="/images/qrcode.png" alt="QR код для связи" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide4;