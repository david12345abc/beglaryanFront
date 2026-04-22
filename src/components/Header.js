import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header({ settings, menu, dark = false }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const setLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    setOpen(false);
    window.location.reload();
  };

  const brandName = settings?.brand_name || "BEGLARYAN";
  const brandSub = settings?.brand_sub || "MEDICAL CENTER";

  return (
    <>
      <header className={`header${dark ? " dark" : ""}`}>
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Home">
            {settings?.logo ? (
              <img src={settings.logo} alt={brandName} style={{ height: 42 }} />
            ) : (
              <div className="brand-mark">B</div>
            )}
            <div className="brand-text">
              <div className="brand-name">{brandName}</div>
              <div className="brand-sub">{brandSub}</div>
            </div>
          </Link>
          <button className="menu-btn" onClick={() => setOpen(true)}>
            <span className="dash" />
            {t("menu")}
          </button>
        </div>
      </header>

      <div
        className={`menu-overlay${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`menu-drawer${open ? " open" : ""}`}>
        <button className="menu-close" onClick={() => setOpen(false)}>×</button>
        <nav className="menu-links">
          {(menu || []).map((m) => (
            <Link key={m.id} to={m.link} onClick={() => setOpen(false)}>
              {m.title}
            </Link>
          ))}
        </nav>
        <div className="menu-lang">
          {["hy", "en", "ru"].map((lng) => (
            <button
              key={lng}
              className={i18n.language === lng ? "active" : ""}
              onClick={() => setLang(lng)}
            >
              {lng}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
