export default function ContactCtaBlock({ block }) {
  return (
    <section className="cta">
      {block.title && <h2>{block.title}</h2>}
      {block.button_text && (
        <a href={block.button_link || "#"} className="btn">
          {block.button_text}
        </a>
      )}
    </section>
  );
}
