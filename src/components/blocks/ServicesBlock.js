import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchServices } from "../../api";

export default function ServicesBlock() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    fetchServices().then(setItems).catch(() => setItems([]));
  }, []);

  if (!items.length) {
    return <section className="services" />;
  }

  const go = (delta) => setIdx((i) => (i + delta + items.length) % items.length);

  return (
    <section className="services">
      {items.map((s, i) => {
        const bg = s.image || "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80";
        return (
          <div
            key={s.id}
            className={`services-slide${i === idx ? " active" : ""}`}
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="services-title">{s.title}</div>
          </div>
        );
      })}
      <div className="services-nav container">
        <button onClick={() => go(-1)}>
          <span className="dash" /> {t("prev")}
        </button>
        <button onClick={() => go(1)}>
          {t("next")} <span className="dash" />
        </button>
      </div>
    </section>
  );
}
