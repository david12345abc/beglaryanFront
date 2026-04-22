import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { me } from "../../api";

const TABS = [
  { id: "blocks", label: "Блоки" },
  { id: "pages", label: "Страницы" },
  { id: "menu", label: "Меню" },
  { id: "services", label: "Услуги" },
  { id: "news", label: "Новости" },
  { id: "reviews", label: "Отзывы" },
  { id: "settings", label: "Настройки сайта" },
  { id: "users", label: "Пользователи", superadmin: true },
];

export default function AdminLayout({ active, onChange, children }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    me().then(setUser).catch(() => setUser(null)).finally(() => setReady(true));
  }, []);

  if (!ready) return <div style={{ padding: 40 }}>{t("loading")}</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!["admin", "superadmin"].includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <div>
          <strong>{t("admin_panel")}</strong>
          <span style={{ marginLeft: 12, color: "var(--color-muted)" }}>
            {user.username} ({user.role})
          </span>
        </div>
        <button className="btn-outline btn" onClick={logout}>
          {t("logout")}
        </button>
      </div>
      <nav className="admin-nav">
        {TABS.filter((tab) => !tab.superadmin || user.role === "superadmin").map((tab) => (
          <button
            key={tab.id}
            className={active === tab.id ? "active" : ""}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {children}
    </div>
  );
}
