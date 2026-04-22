import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { adminSettings, adminSettingsUpdate } from "../../api";

const TEXT_FIELDS = [
  { name: "phone", label: "Телефон" },
  { name: "email", label: "Email" },
  { name: "facebook", label: "Facebook" },
  { name: "instagram", label: "Instagram" },
];

const I18N_GROUPS = [
  { group: "Название бренда", base: "brand_name" },
  { group: "Под-название", base: "brand_sub" },
  { group: "Адрес", base: "address" },
  { group: "Copyright", base: "copyright" },
];

export default function SiteSettingsAdmin() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => { adminSettings().then(setData); }, []);

  if (!data) return <div>{t("loading")}</div>;

  const set = (k, v) => setData({ ...data, [k]: v });

  const onSave = async (e) => {
    e.preventDefault();
    let payload;
    if (logoFile) {
      payload = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (k === "logo") return;
        if (v !== null && v !== undefined) payload.append(k, String(v));
      });
      payload.append("logo", logoFile);
    } else {
      payload = { ...data };
      delete payload.logo;
    }
    await adminSettingsUpdate(payload);
    const fresh = await adminSettings();
    setData(fresh);
    setLogoFile(null);
    alert("Сохранено");
  };

  return (
    <form className="admin-form" onSubmit={onSave}>
      <h2 style={{ margin: 0 }}>Настройки сайта</h2>

      {I18N_GROUPS.map((g) => (
        <fieldset key={g.base} style={{ border: "1px solid var(--color-border)", padding: 12, borderRadius: 4 }}>
          <legend style={{ padding: "0 6px" }}>{g.group}</legend>
          <div className="row">
            {["hy", "en", "ru"].map((lang) => (
              <label key={lang}>
                {lang.toUpperCase()}
                <input
                  value={data[`${g.base}_${lang}`] || ""}
                  onChange={(e) => set(`${g.base}_${lang}`, e.target.value)}
                />
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="row">
        {TEXT_FIELDS.map((f) => (
          <label key={f.name}>
            {f.label}
            <input value={data[f.name] || ""} onChange={(e) => set(f.name, e.target.value)} />
          </label>
        ))}
      </div>

      <label>
        Логотип
        {data.logo && typeof data.logo === "string" && (
          <img src={data.logo} alt="" style={{ maxHeight: 60, marginBottom: 6 }} />
        )}
        <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} />
      </label>

      <div className="admin-actions">
        <button type="submit" className="primary">{t("save")}</button>
      </div>
    </form>
  );
}
