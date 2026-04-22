export default function AboutBlock({ block }) {
  return (
    <section className="about">
      <div className="container">
        {block.title && <h2>{block.title}</h2>}
        {block.text && <p>{block.text}</p>}
      </div>
    </section>
  );
}
