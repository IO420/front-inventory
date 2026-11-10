"use client";

import React from 'react';
import Link from 'next/link';
import styles from './QuickAccessCard.module.css';

export interface QuickAccessItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'blue' | 'green' | 'purple' | 'orange' | 'cyan' | 'pink';
}

export interface QuickAccessCardProps {
  title?: string;
  items: QuickAccessItem[];
}

export const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
  title = "Accesos Rápidos",
  items,
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.itemList}>
        {items.map((item) => {
          const variantClass = styles[item.variant || 'blue'];

          const content = (
            <>
              <div className={styles.iconWrapper}>{item.icon}</div>
              <div className={styles.textContainer}>
                <span className={styles.itemTitle}>
                  {item.title}
                  {item.subtitle && (
                    <span className={styles.itemSubtitle}> {item.subtitle}</span>
                  )}
                  <span className={styles.chevron}> ›</span>
                </span>
              </div>
            </>
          );

          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.itemBtn} ${variantClass}`}
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`${styles.itemBtn} ${variantClass}`}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAccessCard;