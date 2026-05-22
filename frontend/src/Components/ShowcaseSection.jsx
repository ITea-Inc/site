import React, { useEffect, useRef } from 'react';

const useShowcaseSnap = (sectionRef, modeClass = '') => {
  const snappedRef = useRef(false);
  const snappingRef = useRef(false);
  const snapTimerRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let frame = 0;
    let settleTimer = 0;

    const getTravel = () => Math.max(1, section.offsetHeight - window.innerHeight);
    const getSectionTop = () => section.getBoundingClientRect().top + window.scrollY;
    const getSectionProgress = (target) => {
      const rect = target.getBoundingClientRect();
      const travel = Math.max(1, target.offsetHeight - window.innerHeight);
      return Math.min(1, Math.max(0, -rect.top / travel));
    };

    const updateBodyMode = () => {
      const sections = Array.from(document.querySelectorAll('.showcase-section'));
      const activeSections = sections.filter((target) => {
        const targetRect = target.getBoundingClientRect();
        return targetRect.top < window.innerHeight * 0.5 && targetRect.bottom > window.innerHeight * 0.24;
      });
      const fullMode = sections.some((target) => {
        const targetProgress = getSectionProgress(target);
        return targetProgress > 0.25 && targetProgress < 0.72;
      });

      document.body.classList.toggle('showcase-mode', activeSections.length > 0);
      document.body.classList.toggle(
        'showcase-furnace-mode',
        activeSections.some((target) => target.classList.contains('showcase-section-furnace'))
      );
      document.body.classList.toggle('showcase-full-mode', fullMode);
    };

    const snapToShowcase = () => {
      if (snappedRef.current || snappingRef.current) return;
      snappedRef.current = true;
      snappingRef.current = true;

      window.clearTimeout(snapTimerRef.current);
      window.scrollTo({
        top: getSectionTop() + getTravel() * 0.5,
        behavior: 'smooth',
      });

      snapTimerRef.current = window.setTimeout(() => {
        snappingRef.current = false;
      }, 760);
    };

    const updateProgress = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = getTravel();
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      section.style.setProperty('--showcase-progress', progress.toFixed(3));
      updateBodyMode();

      if (!snappingRef.current && (rect.top > window.innerHeight * 0.12 || rect.bottom < window.innerHeight * 0.08)) {
        snappedRef.current = false;
      }

      window.clearTimeout(settleTimer);
      if (!snappedRef.current && rect.top > 0 && rect.top < window.innerHeight * 0.72) {
        settleTimer = window.setTimeout(snapToShowcase, 90);
      }
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateProgress);
      }
    };

    const handleWheel = (event) => {
      const rect = section.getBoundingClientRect();
      const enteringFromTop = event.deltaY > 0 && rect.top > 0 && rect.top < window.innerHeight * 0.78;

      if (snappingRef.current || enteringFromTop) {
        event.preventDefault();
      }

      if (enteringFromTop) {
        snappedRef.current = false;
        snapToShowcase();
      }
    };

    const handleTouchEnd = () => {
      const rect = section.getBoundingClientRect();
      if (rect.top > 0 && rect.top < window.innerHeight * 0.72) {
        snappedRef.current = false;
        snapToShowcase();
      }
    };

    updateProgress();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(snapTimerRef.current);
      window.clearTimeout(settleTimer);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchend', handleTouchEnd);
      document.body.classList.remove('showcase-mode', 'showcase-full-mode');
      if (modeClass) {
        document.body.classList.remove(modeClass);
      }
    };
  }, [modeClass, sectionRef]);
};

const LightingShowcase = () => {
  const sectionRef = useRef(null);
  const cards = [
    { title: 'Подвесы', image: '/images/showcase-generated/luma-pendants.png' },
    { title: 'Бра', image: '/images/showcase-generated/luma-sconce.png' },
    { title: 'Доставка', image: '/images/showcase-generated/luma-delivery.png' },
  ];

  useShowcaseSnap(sectionRef);

  return (
    <section className="showcase-section" aria-label="Пример яркого сайта" ref={sectionRef}>
      <div className="showcase-shell">
        <div className="showcase-copy">
          <h2>Вот так может выглядеть Ваш сайт</h2>
          <p>
            Если бренду нужен другой темп, можно резко сменить визуальный язык:
            больше цвета, движения, ритма и характера.
          </p>
          <button
            className="showcase-button"
            onClick={() => document.getElementById('contact-anchor')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Хочу такую подачу
          </button>
        </div>

        <div className="showcase-demo" aria-hidden="true">
          <div className="demo-site-nav">
            <span>Luma</span>
            <span>Каталог</span>
            <span>Материалы</span>
            <span>Заказ</span>
          </div>

          <div className="demo-site-hero">
            <div className="demo-site-copy">
              <p>Витрина</p>
              <h3>Покажем продукт так, чтобы его захотели</h3>
              <span>Соберем витрину, аргументы и путь к заказу в один яркий сценарий.</span>
            </div>
            <div className="demo-product-orbit">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="demo-showcase-grid">
            {cards.map((card, index) => (
              <article className={`demo-tile demo-tile-${index + 1}`} key={card.title}>
                <img src={card.image} alt="" aria-hidden="true" />
                <span>{card.title}</span>
              </article>
            ))}
          </div>

          <div className="demo-metrics">
            <span>01 Коллекции по комнатам</span>
            <span>02 Материалы и размеры</span>
            <span>03 Заказ в один шаг</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const FurnaceShowcase = () => {
  const sectionRef = useRef(null);
  const specs = [
    { title: 'В интерьере', detail: 'Крупный товарный кадр', image: '/images/showcase-generated/furnace-interior.png' },
    { title: 'Параметры', detail: 'Без перегруза и мелкого шума', image: '/images/showcase-generated/furnace-params.png' },
    { title: 'Быстрый заказ', detail: 'Путь к заявке на виду', image: '/images/showcase-generated/furnace-order.png' },
  ];

  useShowcaseSnap(sectionRef, 'showcase-furnace-mode');

  return (
    <section className="showcase-section showcase-section-furnace" aria-label="Пример сайта для печей" ref={sectionRef}>
      <div className="showcase-shell furnace-shell">
        <div className="showcase-copy furnace-copy">
          <h2>А вот так может выглядеть строгий продуктовый сайт</h2>
          <p>
            Когда товар дорогой и технический, мы убираем лишний шум:
            оставляем фактуру, масштаб, доверие и понятный путь к заявке.
          </p>
          <button
            className="showcase-button furnace-button"
            onClick={() => document.getElementById('contact-anchor')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Собрать такой стиль
          </button>
        </div>

        <div className="furnace-demo" aria-hidden="true">
          <div className="furnace-nav">
            <span>Nordfire</span>
            <span>Модели</span>
            <span>Монтаж</span>
            <span>Заказ</span>
          </div>

          <div className="furnace-hero">
            <div className="furnace-product">
              <img src="/images/furnace-cutout.png" alt="" />
            </div>

            <div className="furnace-site-copy">
              <p>Каминные печи</p>
              <h3>Покажем надежность до первого звонка</h3>
              <span>
                В таком формате продукт сразу держит внимание: крупный объект,
                спокойная типографика и аргументы рядом с действием.
              </span>
            </div>
          </div>

          <div className="furnace-spec-grid">
            {specs.map((spec, index) => (
              <article className={`furnace-spec furnace-spec-${index + 1}`} key={spec.title}>
                <img src={spec.image} alt="" aria-hidden="true" />
                <span>
                  <strong>{spec.title}</strong>
                  <small>{spec.detail}</small>
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ShowcaseSection = () => (
  <>
    <LightingShowcase />
    <div className="showcase-black-gap" aria-hidden="true" />
    <FurnaceShowcase />
  </>
);

export default ShowcaseSection;
