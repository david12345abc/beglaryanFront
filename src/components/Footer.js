export default function Footer({ settings }) {
  const copyright = settings?.copyright || "© 2026 All rights reserved";
  return (
    <footer className="footer">
      <p>{copyright}</p>
      <div className="footer-social">
        {settings?.facebook && (
          <a href={settings.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.4-2 2-2h2V2c-.4-.1-1.7-.3-3.2-.3C10.8 1.7 9 3.6 9 7v3H6v4h3v8h4z" />
            </svg>
          </a>
        )}
        {settings?.instagram && (
          <a href={settings.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
        )}
      </div>
    </footer>
  );
}
