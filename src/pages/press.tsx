import BasicPageLayout from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

const newsArticles = [
  {
    title: 'NBC Bay Area',
    description:
      'Fremont Restaurant Owner Speaks Out After Thief Breaks Into Business, Steals Safe',
    url: 'https://www.nbcbayarea.com/news/local/fremont-restaurant-business-burglary-stolen-safe/3489067/',
  },
  {
    title: 'KRON4',
    description: 'Safe Stolen, Glass Shattered at Fremont Business During Robbery',
    url: 'https://www.kron4.com/news/bay-area/safe-stolen-glass-shattered-at-fremont-business-during-robbery/',
  },
  {
    title: 'KTVU',
    description: "'They took everything': Fremont breakfast cafe burglarized",
    url: 'https://www.ktvu.com/news/they-took-everything-fremont-breakfast-cafe-burglarized',
  },
  {
    title: 'ABC7',
    description: 'Beloved Fremont diner burglarized ahead of restaurant week',
    url: 'https://abc7news.com/fremont-restaurant-week-skilletz-cafe-small-business-crime/14556855/',
  },
  {
    title: 'Mercury News',
    description: "'They stole everything': Fremont diner Skillet'z burglarized",
    url: 'https://www.mercurynews.com/2024/03/23/they-stole-everything-fremont-diner-skilletz-burglarized/',
  },
];

export default function Press() {
  return (
    <BasicPageLayout
      title="In the News"
      heading="In the News"
      intro="Skillet'z Cafe has been featured in local media! Check out some of our recent appearances:"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* YouTube Feature */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>KQED&#39;s Check, Please! Bay Area</h3>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/3ThD2idf0n0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: 8 }}
            ></iframe>
          </div>
        </div>
        {/* Instagram Feature */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Instagram Feature</h3>
          <div style={{ maxWidth: 320, margin: '0 auto' }}>
            <iframe
              src="https://www.instagram.com/p/DIjVR1iJWyM/embed"
              width="320"
              height="440"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              allow="encrypted-media"
              title="Instagram embed"
              style={{ border: 0, borderRadius: 8 }}
            ></iframe>
          </div>
        </div>
        {/* Fremont Bank Article */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Fremont Bank: Partnership in Action</h3>
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#666' }}>
            This 2020 article from Fremont Bank highlights Skillet&#39;z Cafe&#39;s founding story
            and community roots.
          </p>
          <a
            href="https://www.fremontbank.com/resource-center/insights-and-learnings/2020/partnerships-in-action-skilletz-cafe"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            style={{ marginTop: 8, display: 'inline-block' }}
          >
            Read the Article
          </a>
        </div>
        {/* Community Resilience Section */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Community Resilience: March 2024 Burglary</h3>
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#666' }}>
            In March 2024, Skillet&#39;z Cafe was burglarized. We are grateful for the outpouring of
            support from our community and the coverage from local media.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {newsArticles.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
                style={{ fontWeight: 500 }}
              >
                <span style={{ display: 'block', fontSize: '1.05rem' }}>{article.title}</span>
                <span style={{ color: '#666', fontSize: '0.95rem' }}>{article.description}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </BasicPageLayout>
  );
}
