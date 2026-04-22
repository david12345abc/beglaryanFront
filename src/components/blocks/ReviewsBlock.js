import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchReviews } from "../../api";

export default function ReviewsBlock({ block }) {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchReviews().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <section className="section reviews">
      <div className="container">
        {block?.title && <h2 className="section-title">{block.title}</h2>}
        <div className="reviews-grid">
          {items.map((r, i) => (
            <article className="review-card" key={r.id}>
              <p>{r.text}</p>
              <div className="review-author">{r.author}</div>
              <div className="review-nav">
                <span>{t("prev")}</span>
                <span>
                  {i + 1} / {items.length}
                </span>
                <span>{t("next")}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
