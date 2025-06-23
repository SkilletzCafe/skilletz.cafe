import React from 'react';

import { margarine } from '@/config/fonts';

import { MenuItem } from '@/components/menu/MenuItem';

import styles from '@/styles/Menu.module.css';

interface Section {
  guid: string;
  name: string;
  description?: string;
  items: any[];
}

interface MenuSectionsProps {
  sections: Section[];
  selected: string | null;
  getItems: (section: any) => any[];
  itemStates: Record<string, any>;
  menuItemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  observerRef: React.MutableRefObject<IntersectionObserver | null>;
  handleImageLoad: (itemId: string) => void;
  handleMenuItemKeyDown: (e: React.KeyboardEvent, index: number, totalItems: number) => void;
  totalMenuItems: number;
  categoryRefs: React.MutableRefObject<(HTMLHeadingElement | null)[]>;
}

export const MenuSections: React.FC<MenuSectionsProps> = ({
  sections,
  selected,
  getItems,
  itemStates,
  menuItemsRef,
  observerRef,
  handleImageLoad,
  handleMenuItemKeyDown,
  totalMenuItems,
  categoryRefs,
}) =>
  sections
    .filter((section) => !selected || section.name === selected)
    .filter((section) => getItems(section).length > 0)
    .map((section, index) => (
      <section
        key={section.guid}
        className={styles.menuSection}
        aria-labelledby={`category-${section.guid}`}
        style={{ '--section-index': index } as React.CSSProperties}
      >
        <h2
          id={`category-${section.guid}`}
          className={`${styles.categoryTitle} ${margarine.className}`}
          ref={(el) => {
            categoryRefs.current[index] = el;
          }}
        >
          <span className={styles.categoryDecoration}>✦</span>
          {section.name}
          <span className={styles.categoryDecoration}>✦</span>
        </h2>
        {section.description && (
          <p
            className={styles.categoryDescription}
            aria-label={`${section.name} category description`}
          >
            {section.description}
          </p>
        )}
        <div className={styles.menuGrid} role="list" aria-label={`${section.name} menu items`}>
          {getItems(section).map((item, itemIndex) => {
            const itemState = itemStates[item.guid] || {
              isVisible: false,
              isLoaded: true,
            };
            const setItemRef = (el: HTMLDivElement | null) => {
              menuItemsRef.current[itemIndex] = el;
              if (el && observerRef.current) {
                observerRef.current.observe(el);
                el.style.setProperty('--item-index', itemIndex.toString());
              }
            };
            return (
              <MenuItem
                key={item.guid}
                item={item}
                index={itemIndex}
                totalItems={totalMenuItems}
                itemState={itemState}
                onImageLoad={handleImageLoad}
                onKeyDown={handleMenuItemKeyDown}
                setRef={setItemRef}
              />
            );
          })}
        </div>
      </section>
    ));
