import HeroBlock from "./HeroBlock";
import AboutBlock from "./AboutBlock";
import ServicesBlock from "./ServicesBlock";
import NewsBlock from "./NewsBlock";
import ReviewsBlock from "./ReviewsBlock";
import ContactCtaBlock from "./ContactCtaBlock";

const MAP = {
  hero: HeroBlock,
  about: AboutBlock,
  services: ServicesBlock,
  news: NewsBlock,
  reviews: ReviewsBlock,
  contact_cta: ContactCtaBlock,
};

function TextBlock({ block }) {
  return (
    <section className="section">
      <div className="container">
        {block.title && <h2 className="section-title">{block.title}</h2>}
        {block.text && <p style={{ color: "var(--color-muted)" }}>{block.text}</p>}
      </div>
    </section>
  );
}

function ImageBlock({ block }) {
  if (!block.image) return null;
  return (
    <section className="section">
      <div className="container">
        <img src={block.image} alt={block.title || ""} />
      </div>
    </section>
  );
}

export default function BlockRenderer({ block }) {
  const Cmp = MAP[block.type] || (block.type === "text" ? TextBlock : block.type === "image" ? ImageBlock : null);
  if (!Cmp) return null;
  return <Cmp block={block} />;
}
