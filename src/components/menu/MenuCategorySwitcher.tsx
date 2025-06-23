import React from 'react';

import styles from '@/styles/Menu.module.css';

interface Option {
  key: string;
  label: string;
}

interface MenuCategorySwitcherProps {
  options: Option[];
  selected: string | null;
  onSelect: (key: string | null) => void;
  navRef?: React.RefObject<HTMLElement | null>;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const MenuCategorySwitcher: React.FC<MenuCategorySwitcherProps> = ({
  options,
  selected,
  onSelect,
  navRef,
  onKeyDown,
}) => (
  <nav
    className={styles.categoryNav}
    ref={navRef}
    aria-label="Menu categories"
    role="tablist"
    onKeyDown={onKeyDown}
    tabIndex={0}
  >
    <button
      className={`${styles.categoryButton} ${!selected ? styles.active : ''}`}
      onClick={() => onSelect(null)}
      role="tab"
      aria-selected={!selected}
      aria-controls="menu-items"
    >
      All Categories
    </button>
    {options.map((opt) => (
      <button
        key={opt.key}
        className={`${styles.categoryButton} ${selected === opt.label ? styles.active : ''}`}
        onClick={() => onSelect(opt.label)}
        role="tab"
        aria-selected={selected === opt.label}
        aria-controls="menu-items"
      >
        {opt.label}
      </button>
    ))}
  </nav>
);
