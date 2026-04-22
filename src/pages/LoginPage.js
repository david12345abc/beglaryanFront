import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login, me } from "../api";

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(username, password);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      const user = await me();
      if (!user.role || !["admin", "superadmin"].includes(user.role)) {
        setError("Нет прав доступа.");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      } else {
        navigate("/admin");
      }
    } catch (e) {
      setError("Неверный логин или пароль.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={onSubmit}>
        <h1>{t("admin_panel")}</h1>
        {error && <div className="error">{error}</div>}
        <label>
          {t("username")}
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          {t("password")}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="btn" disabled={loading} style={{ width: "100%" }}>
          {loading ? t("loading") : t("login")}
        </button>
      </form>
    </div>
  );
}
