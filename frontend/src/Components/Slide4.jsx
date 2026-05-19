import React from 'react';

const Slide4 = () => {
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
    <div className="contact-section fade-in-section is-visible">
      <div className="contact-container">
        <section className="contact-left">
          <h2 className="contact-title">Связаться</h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                id="body"
                name="body"
                placeholder="Задача"
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Отправить
            </button>
          </form>
        </section>

        <div className="contact-art" aria-hidden="true">
          <img src="/images/13.png" alt="Contact Art" style={{ width: '100%', height: 'auto', maxWidth: '500px', objectFit: 'contain', display: 'block', margin: '0 auto' }} />
        </div>

        <aside className="contact-right">
          <div className="qr-card">
            <img src="/images/14.png" alt="QR код для связи" />
          </div>
          <h3>Telegram</h3>
          <p>Сканируйте, чтобы написать нам.</p>
        </aside>
      </div>

      <footer className="footer">
        <button onClick={() => document.getElementById('section-0')?.scrollIntoView({ behavior: 'smooth' })}>ITea</button>
        <span>© 2024 ITea. Все права защищены.</span>
        <a href="#section-3">Политика конфиденциальности</a>
        <a href="#section-3">Контакты</a>
      </footer>
    </div>
  );
};

export default Slide4;
