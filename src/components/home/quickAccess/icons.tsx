export const POSIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="posGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
    <path
      d="M10 12h5l4.5 18h18.5l4-14H18"
      stroke="url(#posGrad)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="21" cy="36" r="3.5" fill="url(#posGrad)" />
    <circle cx="34" cy="36" r="3.5" fill="url(#posGrad)" />
    <path d="M20 18h20v6H20z" fill="url(#posGrad)" opacity="0.3" />
  </svg>
);

export const InventoryIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="invGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
    <path d="M24 6L8 14v20l16 8 16-8V14L24 6z" fill="url(#invGrad)" />
    <path d="M24 6l16 8-16 8-16-8 16-8z" fill="#ffffff" opacity="0.25" />
    <path d="M24 22v20" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
    <rect
      x="27"
      y="27"
      width="7"
      height="6"
      rx="1.5"
      fill="#ffffff"
      opacity="0.9"
    />
  </svg>
);

export const TagIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6b21a8" />
      </linearGradient>
    </defs>
    <path
      d="M26 8L40 22L24 38L10 24V8H26Z"
      fill="url(#tagGrad)"
      transform="rotate(15 24 24)"
    />
    <circle cx="18" cy="18" r="3" fill="#ffffff" />
  </svg>
);

export const BookIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#c2410c" />
      </linearGradient>
    </defs>
    <path
      d="M8 12c4-2 10-2 16 2 6-4 12-4 16-2v24c-4-2-10-2-16 2-6-4-12-4-16-2V12z"
      fill="url(#bookGrad)"
    />
    <path
      d="M24 14v24"
      stroke="#ffffff"
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export const ReportsIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="repGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
    </defs>
    <rect
      x="8"
      y="26"
      width="8"
      height="14"
      rx="2"
      fill="url(#repGrad)"
      opacity="0.75"
    />
    <rect
      x="20"
      y="18"
      width="8"
      height="22"
      rx="2"
      fill="url(#repGrad)"
      opacity="0.9"
    />
    <rect x="32" y="10" width="8" height="30" rx="2" fill="url(#repGrad)" />
  </svg>
);

export const NewProductIcon = () => (
  <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="newProdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
    </defs>
    {/* Caja 3D / Producto */}
    <path d="M24 6L8 14v20l16 8 16-8V14L24 6z" fill="url(#newProdGrad)" />
    <path d="M24 6l16 8-16 8-16-8 16-8z" fill="#ffffff" opacity="0.25" />
    {/* Círculo de añadir con signo + */}
    <circle cx="34" cy="34" r="9" fill="#ffffff" />
    <circle cx="34" cy="34" r="8" fill="url(#newProdGrad)" />
    <path
      d="M34 30v8M30 34h8"
      stroke="#ffffff"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);
