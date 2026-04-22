import { useState } from "react";
import AdminLayout from "./admin/AdminLayout";
import ResourceAdmin from "./admin/ResourceAdmin";
import SiteSettingsAdmin from "./admin/SiteSettingsAdmin";

export default function AdminPage() {
  const [tab, setTab] = useState("blocks");

  return (
    <AdminLayout active={tab} onChange={setTab}>
      {tab === "settings" ? <SiteSettingsAdmin /> : <ResourceAdmin resource={tab} />}
    </AdminLayout>
  );
}
