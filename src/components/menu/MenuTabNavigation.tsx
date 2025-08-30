import React from 'react';

import { MENU_TAB_CONFIG, MenuTab } from '@/config/menuTabs';

import styles from '@/styles/Menu.module.css';

interface MenuTabNavigationProps {
  selectedTab: MenuTab;
  onTabChange: (tab: MenuTab) => void;
}

export const MenuTabNavigation: React.FC<MenuTabNavigationProps> = ({
  selectedTab,
  onTabChange,
}) => {
  const handleTabClick = (tab: MenuTab) => {
    onTabChange(tab);
  };

  return (
    <div className={styles.tabNav} role="tablist" aria-label="Menu type">
      {MENU_TAB_CONFIG.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.tabButton} ${selectedTab === tab.key ? styles.activeTab : ''}`}
          onClick={() => handleTabClick(tab.key)}
          role="tab"
          aria-selected={selectedTab === tab.key}
          tabIndex={0}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
