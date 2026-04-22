import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { adminCreate, adminDelete, adminList, adminUpdate } from "../../api";
import { SCHEMAS } from "./schemas";

const flattenFields = (schema) =>
  schema.fields.flatMap((f) => (f.group ? f.fields : [f]));

function renderField(field, value, onChange, relatedOptions) {
  if (field.type === "textarea") {
    return <textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  }
  if (field.type === "number") {
    return <input type="number" value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} />;
  }
  if (field.type === "checkbox") {
    return <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />;
  }
  if (field.type === "select") {
    return (
      <select value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {field.options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  }
  if (field.type === "image") {
    return (
      <>
        {value && typeof value === "string" && <img src={value} alt="" style={{ maxHeight: 80, marginBottom: 6 }} />}
        <input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0] || null)} />
      </>
    );
  }
  if (field.type === "fk") {
    return (
      <select value={value ?? ""} onChange={(e) => onChange(Number(e.target.value) || "")}>
        <option value="">—</option>
        {(relatedOptions || []).map((o) => (
          <option key={o.id} value={o.id}>{field.optionLabel ? field.optionLabel(o) : `#${o.id}`}</option>
        ))}
      </select>
    );
  }
  return <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
}

export default function ResourceAdmin({ resource }) {
  const { t } = useTranslation();
  const schema = SCHEMAS[resource];
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [related, setRelated] = useState({});
  const [loading, setLoading] = useState(false);

  const reload = () => {
    setLoading(true);
    adminList(resource).then((data) => {
      setItems(Array.isArray(data) ? data : data.results || []);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { reload(); setEditing(null); /* eslint-disable-next-line */ }, [resource]);

  const fkFields = useMemo(
    () => flattenFields(schema).filter((f) => f.type === "fk"),
    [schema]
  );

  useEffect(() => {
    fkFields.forEach((f) => {
      if (!related[f.resource]) {
        adminList(f.resource).then((data) => {
          const list = Array.isArray(data) ? data : data.results || [];
          setRelated((r) => ({ ...r, [f.resource]: list }));
        });
      }
    });
    // eslint-disable-next-line
  }, [schema]);

  const startCreate = () => {
    const draft = {};
    flattenFields(schema).forEach((f) => {
      draft[f.name] = f.type === "checkbox" ? true : f.type === "number" ? 0 : "";
    });
    setEditing(draft);
  };

  const startEdit = (item) => setEditing({ ...item });

  const onSave = async (e) => {
    e.preventDefault();
    const flat = flattenFields(schema);
    const hasFile = flat.some((f) => f.type === "image" && editing[f.name] instanceof File);
    let payload;
    if (hasFile) {
      payload = new FormData();
      flat.forEach((f) => {
        const v = editing[f.name];
        if (v === null || v === undefined) return;
        if (f.type === "image") {
          if (v instanceof File) payload.append(f.name, v);
        } else if (f.type === "checkbox") {
          payload.append(f.name, v ? "true" : "false");
        } else if (v !== "") {
          payload.append(f.name, v);
        }
      });
    } else {
      payload = {};
      flat.forEach((f) => {
        if (f.type === "image") return;
        if (editing[f.name] !== undefined && editing[f.name] !== "") {
          payload[f.name] = editing[f.name];
        }
      });
    }
    try {
      if (editing.id) {
        await adminUpdate(resource, editing.id, payload);
      } else {
        await adminCreate(resource, payload);
      }
      setEditing(null);
      reload();
    } catch (err) {
      alert("Ошибка: " + (err?.response?.data ? JSON.stringify(err.response.data) : err.message));
    }
  };

  const onDelete = async (item) => {
    if (!window.confirm(t("confirm_delete"))) return;
    await adminDelete(resource, item.id);
    reload();
  };

  return (
    <div>
      <div className="admin-header">
        <h2 style={{ margin: 0 }}>{schema.title}</h2>
        <button className="btn" onClick={startCreate}>{t("add")}</button>
      </div>

      {loading ? (
        <div>{t("loading")}</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              {schema.list.map((k) => <th key={k}>{k}</th>)}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {schema.list.map((k) => (
                  <td key={k}>
                    {typeof item[k] === "boolean" ? (item[k] ? "✓" : "—") : String(item[k] ?? "")}
                  </td>
                ))}
                <td>
                  <div className="admin-actions">
                    <button onClick={() => startEdit(item)}>{t("edit")}</button>
                    <button className="danger" onClick={() => onDelete(item)}>{t("delete")}</button>
                  </div>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr><td colSpan={schema.list.length + 1} style={{ textAlign: "center", color: "var(--color-muted)" }}>—</td></tr>
            )}
          </tbody>
        </table>
      )}

      {editing && (
        <form className="admin-form" onSubmit={onSave}>
          {schema.fields.map((f, idx) => {
            if (f.group) {
              return (
                <fieldset key={idx} style={{ border: "1px solid var(--color-border)", padding: 12, borderRadius: 4 }}>
                  <legend style={{ padding: "0 6px" }}>{f.group}</legend>
                  <div className="row">
                    {f.fields.map((sub) => (
                      <label key={sub.name}>
                        {sub.label}
                        {renderField(sub, editing[sub.name], (v) => setEditing({ ...editing, [sub.name]: v }), related[sub.resource])}
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            }
            return (
              <label key={f.name}>
                {f.label}
                {renderField(f, editing[f.name], (v) => setEditing({ ...editing, [f.name]: v }), related[f.resource])}
              </label>
            );
          })}
          <div className="admin-actions">
            <button type="submit" className="primary">{t("save")}</button>
            <button type="button" onClick={() => setEditing(null)}>{t("cancel")}</button>
          </div>
        </form>
      )}
    </div>
  );
}
