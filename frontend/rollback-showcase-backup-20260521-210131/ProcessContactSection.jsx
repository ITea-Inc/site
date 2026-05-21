import React from 'react';

const ProcessContactSection = () => {
  const processSteps = [
    { title: 'Разбираем бизнес, аудиторию и цель сайта', image: '/images/9.png' },
    { title: 'Собираем структуру и сценарии страниц', image: '/images/10.png' },
    { title: 'Делаем дизайн и аккуратно верстаем страницы', image: '/images/11.png' },
    { title: 'Запускаем, проверяем и дорабатываем по фактам', image: '/images/12.png' }
  ];

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
      <section className="process-section contact-process">
        <p className="section-kicker">Процесс</p>
        <h2 className="section-title">Как мы доводим идею до работающего сайта</h2>

        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <article key={step.title} className="process-step">
              <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="step-icon-wrapper">
                <img src={step.image} alt="" className="step-icon-img" />
              </div>
              <h3 className="step-name">{step.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <div id="contact-anchor" className="contact-container">
        <section className="contact-left">
          <h2 className="contact-title">Расскажите, что нужно сделать</h2>

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
                placeholder="Пара слов о проекте"
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              Отправить задачу
            </button>
          </form>
        </section>

        <div className="contact-art" aria-hidden="true">
          <img src="/images/13.png" alt="Contact Art" className="contact-image" />
        </div>

        <aside className="contact-right">
          <div className="qr-card">
            <img src="/images/14.png" alt="QR код для связи" />
          </div>
          <h3>Telegram</h3>
          <p>Можно написать напрямую, если так быстрее.</p>
        </aside>
      </div>

      <footer className="footer">
        <button onClick={() => document.getElementById('section-0')?.scrollIntoView({ behavior: 'smooth' })}>ITea</button>
        <span>© 2024 ITea. Все права защищены.</span>
        <a href="#contact-anchor">Политика конфиденциальности</a>
        <a href="#contact-anchor">Контакты</a>
      </footer>
    </div>
  );
};

export default ProcessContactSection;
