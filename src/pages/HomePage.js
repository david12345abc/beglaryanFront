import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlockRenderer from "../components/blocks/BlockRenderer";
import { fetchMenu, fetchPage, fetchSettings } from "../api";

export default function HomePage() {
  const [settings, setSettings] = useState(null);
  const [menu, setMenu] = useState([]);
  const [page, setPage] = useState(null);

  useEffect(() => {
    Promise.all([fetchSettings(), fetchMenu(), fetchPage("home")])
      .then(([s, m, p]) => {
        setSettings(s);
        setMenu(m);
        setPage(p);
      })
      .catch(() => {});
  }, []);

  const blocks = page?.blocks || [];
  const firstIsHero = blocks[0]?.type === "hero";

  return (
    <>
      <Header settings={settings} menu={menu} dark={!firstIsHero} />
      {blocks.map((b) => (
        <BlockRenderer key={b.id} block={b} />
      ))}
      <Footer settings={settings} />
    </>
  );
}
