import Image from 'next/image';

import { MenuItemState, MenuItem as MenuItemType } from '@/types/menu';

import styles from '@/styles/Menu.module.css';

interface MenuItemProps {
  item: MenuItemType;
  index: number;
  totalItems: number;
  itemState: MenuItemState;
  onImageLoad: (itemId: string) => void;
  onKeyDown: (e: React.KeyboardEvent, index: number, totalItems: number) => void;
  setRef?: (el: HTMLDivElement | null) => void;
}

export function MenuItem({
  item,
  index,
  totalItems,
  itemState,
  onImageLoad,
  onKeyDown,
  setRef,
}: MenuItemProps) {
  return (
    <div
      key={item.guid}
      className={`${styles.menuItem} ${itemState.isLoaded ? styles.loaded : ''}`}
      role="article"
      aria-labelledby={`item-name-${item.guid}`}
      tabIndex={0}
      ref={setRef}
      data-item-id={item.guid}
      onKeyDown={(e) => onKeyDown(e, index, totalItems)}
    >
      {item.isPopular && (
        <div className={styles.itemBadge} aria-label="Popular item">
          Popular
        </div>
      )}
      <div className={styles.imageContainer}>
        {item.imageUrl ? (
          <>
            {!itemState.isLoaded && <div className={styles.imagePlaceholder} aria-hidden="true" />}
            <Image
              src={item.imageUrl}
              alt={`Photo of ${item.name}`}
              width={1980}
              height={1080}
              className={`${styles.image} ${itemState.isLoaded ? styles.loaded : ''}`}
              onLoad={() => onImageLoad(item.guid)}
              priority={index < 4}
              loader={({ src }) => src}
            />
          </>
        ) : (
          <div className={styles.imagePlaceholder} aria-label="No image available">
            <div className={styles.noImageIcon}>
              <span>No image available</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.itemDetails}>
        <div className={styles.itemHeader}>
          <h3 id={`item-name-${item.guid}`} className={styles.itemName}>
            {item.name}
          </h3>
          <span className={styles.price} aria-label={`Price: $${item.price.toFixed(2)}`}>
            ${item.price.toFixed(2)}
          </span>
        </div>
        {item.description && (
          <p className={styles.description} aria-label={`Description: ${item.description}`}>
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
