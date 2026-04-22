export default function HeroBlock({ block }) {
  const style = block.image
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.45)), url(${block.image})`,
      }
    : undefined;
  return (
    <section className="hero" style={style}>
      <div className="hero-inner container">
        {block.title && <h1 className="hero-title">{block.title}</h1>}
        {block.button_text && (
          <a href={block.button_link || "#"} className="btn">
            {block.button_text}
          </a>
        )}
      </div>
    </section>
  );
}
