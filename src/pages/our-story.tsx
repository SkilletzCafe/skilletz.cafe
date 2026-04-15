import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

export default function OurStory() {
  return (
    <BasicPageLayout
      title="Our Story"
      heading="Our Story"
      intro="Watch the story behind Skillet'z Cafe and how we became a neighborhood favorite in historic Niles, Fremont."
    >
      <div
        className={styles.card}
        style={{
          width: '100%',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'left',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Featured Story</h2>
        <p
          style={{
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: 'var(--text-color)',
          }}
        >
          Watch this feature to learn more about Skillet&apos;z Cafe, our story, and what makes our
          place special in Niles.
        </p>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/zMhnb1Hpb0o"
            title="Skillet'z Cafe - Our Story"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 0, borderRadius: 8, width: '100%', aspectRatio: '16 / 9' }}
          ></iframe>
        </div>
      </div>
    </BasicPageLayout>
  );
}
