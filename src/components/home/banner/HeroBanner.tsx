import React from "react";
import styles from "./HeroBanner.module.css";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  title = "Tu negocio en un solo lugar",
  subtitle = "Gestiona, vende y controla todo desde aquí",
}) => {
  return (
    <div className={styles.banner}>

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.illustration}>
        <svg
          className={styles.svgIcon}
          viewBox="0 0 280 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#dce8ff" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#edf4ff" stopOpacity="0.85" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Gráfica de barras */}
          <rect
            x="25"
            y="82"
            width="16"
            height="28"
            rx="4"
            fill="url(#barGrad)"
          />
          <rect
            x="50"
            y="66"
            width="16"
            height="44"
            rx="4"
            fill="url(#barGrad)"
          />
          <rect
            x="75"
            y="48"
            width="16"
            height="62"
            rx="4"
            fill="url(#barGrad)"
          />
          <rect
            x="100"
            y="32"
            width="16"
            height="78"
            rx="4"
            fill="url(#barGrad)"
          />

          {/* Línea curva brillante */}
          <path
            d="M 15 95 Q 65 80, 110 35 T 195 20"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            filter="url(#glow)"
          />

          {/* Tarjeta Flotante / Bolsa moderna */}
          <g transform="translate(160, 25)">
            <rect
              x="0"
              y="15"
              width="68"
              height="75"
              rx="12"
              fill="url(#cardGrad)"
            />
            <path
              d="M 22 15 C 22 4, 46 4, 46 15"
              stroke="#ffffff"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />
            <rect
              x="12"
              y="32"
              width="44"
              height="6"
              rx="3"
              fill="#0867ed"
              opacity="0.3"
            />
            <rect
              x="12"
              y="46"
              width="30"
              height="5"
              rx="2.5"
              fill="#0867ed"
              opacity="0.2"
            />
            <circle cx="50" cy="65" r="7" fill="#34d399" />
            <path
              d="M 47 65 L 49 67 L 53 63"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Destello de luz */}
          <circle cx="195" cy="20" r="4" fill="#ffffff" filter="url(#glow)" />
          <path
            d="M 15 25 L 17 29 L 21 31 L 17 33 L 15 37 L 13 33 L 9 31 L 13 29 Z"
            fill="#ffffff"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroBanner;
