"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiServerRequest } from '@/actions/apiConfig/config';
import styles from './DashboardCard.module.css';

export interface DashboardCardProps {
  /** Título de la tarjeta (ej. "Stock Bajo", "Productos", "Ventas") */
  title: string;
  /** Endpoint relativo de la API NestJS (ej. "inventory/low-stock") */
  apiEndpoint?: string;
  /** Valor inicial o fijo si no se usa endpoint dinámico */
  fallbackValue?: number | string;
  /** Prop opcional para extraer la propiedad exacta del JSON recibido */
  valueKey?: string; 
  /** Icono o elemento React (ej. Lucide Icon, SVG o emoji) */
  icon: React.ReactNode;
  /** Texto del botón o enlace inferior (ej. "Ver más detalles") */
  actionLabel?: string;
  /** Ruta a la que navega el botón inferior (ej. "/dashboard/inventory?filter=low-stock") */
  actionHref?: string;
  /** Evento click alternativo para abrir un modal o ejecutar una función */
  onActionClick?: () => void;
  /** Variante de color opcional para destacar (ej. "default" | "warning" | "danger" | "success") */
  variant?: 'default' | 'warning' | 'danger' | 'success';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  apiEndpoint,
  fallbackValue = 0,
  valueKey = 'count',
  icon,
  actionLabel,
  actionHref,
  onActionClick,
  variant = 'default',
}) => {
  const [value, setValue] = useState<number | string>(fallbackValue);
  const [loading, setLoading] = useState<boolean>(!!apiEndpoint);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!apiEndpoint) return;

    let isMounted = true;
    setLoading(true);

    // Invocación a tu Server Action que usa Axios + cookies JWT
    apiServerRequest(apiEndpoint)
      .then((res) => {
        if (!isMounted) return;

        if (res.success && res.data !== undefined) {
          const data = res.data;

          // Maneja respuestas primitivas (número directos) u objetos { count: 5 }
          const countVal = typeof data === 'object' && data !== null
            ? data[valueKey] ?? data.total ?? data.count ?? 0
            : data;

          setValue(countVal);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error(`Error en DashboardCard (${apiEndpoint}):`, err);
        if (isMounted) setError(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [apiEndpoint, valueKey]);

  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      {/* Encabezado: Título e Icono */}
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={styles.iconWrapper}>{icon}</div>
      </div>

      {/* Cuerpo principal: Número de registros o Skeleton de carga */}
      <div className={styles.body}>
        {loading ? (
          <div className={styles.skeleton} />
        ) : error ? (
          <span className={styles.errorText}>--</span>
        ) : (
          <h2 className={styles.value}>{value}</h2>
        )}
      </div>

      {/* Pie de tarjeta: Botón o Enlace configurable */}
      {(actionLabel && (actionHref || onActionClick)) && (
        <div className={styles.footer}>
          {actionHref ? (
            <Link href={actionHref} className={styles.actionLink}>
              <span>{actionLabel}</span>
              <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.16 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Link>
          ) : (
            <button type="button" onClick={onActionClick} className={styles.actionButton}>
              <span>{actionLabel}</span>
              <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.16 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;