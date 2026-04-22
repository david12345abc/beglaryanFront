import { useEffect, useState } from "react";
import { fetchNews } from "../../api";

const PLACEHOLDER = "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80";

export default function NewsBlock({ block }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchNews().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <section className="section">
      <div className="container">
        {block?.title && <h2 className="section-title">{block.title}</h2>}
        <div className="news-grid">
          {items.map((n) => (
            <article key={n.id} className="news-card">
              <img src={n.image || PLACEHOLDER} alt={n.title} />
              <h3>{n.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
