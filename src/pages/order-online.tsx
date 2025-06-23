import { ORDERING_PARTNERS } from '@/config';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

export default function OrderOnline() {
  return (
    <BasicPageLayout
      title="Order Online"
      heading="Order Online"
      intro="Choose how you'd like to order:"
    >
      <div
        className={styles.card}
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}
      >
        {ORDERING_PARTNERS.map((partner) => (
          <a
            key={partner.key}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            style={{
              fontSize: '1.25rem',
              padding: '1rem 2rem',
              background: partner.bgColor,
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            {partner.label}
          </a>
        ))}
      </div>
    </BasicPageLayout>
  );
}
