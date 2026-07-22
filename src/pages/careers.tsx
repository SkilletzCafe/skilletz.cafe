import { BUSINESS, SOCIAL_MEDIA, TEAREKZ_FULL_ADDRESS } from '@/config';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/Careers.module.css';

const openPositions = [
  {
    title: "Tea-Rek'z Barista",
    location: TEAREKZ_FULL_ADDRESS,
    schedule: 'Part-time, after-school and weekend availability preferred',
    status: 'Tea-Rek’z is hiring selectively',
    summary:
      "Skillet'z Cafe is currently fully staffed, but Tea-Rek'z next door is hiring exceptional baristas for premium craft tea, boba, smoothies, and specialty drinks.",
    responsibilities: [
      'Prepare drinks consistently from recipes, with clean measurements and strong attention to texture, sweetness, toppings, and presentation.',
      'Keep the bar, toppings, tools, and guest areas clean, stocked, and ready for rushes.',
      'Serve families, students, and Niles neighbors with patience, speed, and genuine hospitality.',
      'Communicate clearly with teammates and take coaching quickly so every shift gets better.',
    ],
    lookingFor: [
      'Diligent self-starters who do not need to be reminded to move, clean, restock, and help.',
      'People who care about craft: accurate recipes, consistent drinks, and little details done right.',
      'Team-first attitudes: humble, coachable, dependable, and kind under pressure.',
      'Local students and early-career applicants are welcome, especially if you want to grow with us for more than one season.',
    ],
  },
];

const values = [
  {
    title: 'Hospitality',
    description:
      'Guests should feel noticed, welcomed, and taken care of. We move fast, but never cold.',
  },
  {
    title: 'Diligence',
    description:
      'Good work shows up in the small things: clean stations, stocked supplies, and doing the next right task without being chased.',
  },
  {
    title: 'Ownership',
    description:
      'We treat the restaurant like it matters because it does. If something is off, we speak up and help fix it.',
  },
  {
    title: 'Craft',
    description:
      'Food and drinks should be made with skill, care, and consistency. The details are part of the promise.',
  },
  {
    title: 'Teamwork',
    description:
      'No one wins alone here. We help each other, cover gaps, and keep the whole shop moving.',
  },
  {
    title: 'Joy & Gratitude',
    description:
      'Restaurant work is real work. We choose a grateful, steady attitude and create a place people enjoy coming back to.',
  },
];

const emailSubject = encodeURIComponent("Careers - Tea-Rek'z Barista");
const emailBody = encodeURIComponent(
  "Hi Skillet'z team,\n\nI'm interested in the Tea-Rek'z Barista position.\n\nWhy I'm interested:\n\nWhy I would be a strong fit:\n\nMy availability:\n\nRelevant experience:\n"
);

export default function Careers() {
  return (
    <BasicPageLayout
      title="Careers at Skillet'z Cafe"
      heading="Careers at Skillet’z Cafe"
      intro="Skillet’z Cafe has a strong team in place, and Tea-Rek’z is the active hiring focus right now. If you are an exceptional hospitality teammate, we would still love to hear from you."
    >
      <section className={styles.fullWidthSection} aria-labelledby="culture-heading">
        <div className={styles.heroCard}>
          <p className={styles.eyebrow}>Skillet&apos;z Cafe</p>
          <h2 id="culture-heading">A strong team in place — and always raising the bar</h2>
          <p>
            Skillet&apos;z Cafe is not actively filling restaurant roles today because we are
            fortunate to have a strong team in place. That is a good thing: it means our standards
            are high, our team is stable, and we hire thoughtfully instead of urgently.
          </p>
          <p>
            We still want to hear from exceptional hospitality people. Our current hiring focus is
            Tea-Rek&apos;z next door, where we are selectively adding baristas who can help shape
            the standard for craft drinks, clean execution, and warm service.
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {values.map((value) => (
            <article className={styles.valueCard} key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fullWidthSection} aria-labelledby="open-positions-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Current hiring focus</p>
          <h2 id="open-positions-heading">Open Positions</h2>
          <p>
            Skillet&apos;z Cafe has a strong team in place. Tea-Rek&apos;z is hiring selectively,
            and the barista role stays open because the right person is worth making room for.
          </p>
        </div>

        <div className={styles.positionsList}>
          {openPositions.map((position) => (
            <article className={styles.positionCard} key={position.title}>
              <div className={styles.positionHeader}>
                <div>
                  <p className={styles.positionStatus}>{position.status}</p>
                  <h3>{position.title}</h3>
                </div>
                <div className={styles.positionMeta}>
                  <span>{position.location}</span>
                  <span>{position.schedule}</span>
                </div>
              </div>

              <p className={styles.positionSummary}>{position.summary}</p>

              <div className={styles.positionDetailsGrid}>
                <div>
                  <h4>What you will do</h4>
                  <ul>
                    {position.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Who we want</h4>
                  <ul>
                    {position.lookingFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.fullWidthSection} aria-labelledby="apply-heading">
        <div className={styles.applyCard}>
          <div>
            <p className={styles.eyebrow}>How to apply</p>
            <h2 id="apply-heading">Apply for Tea-Rek’z</h2>
            <p>
              No long application is needed. Send a short note with why you are interested in
              Tea-Rek&apos;z, why you would be excellent, your availability, and any relevant
              experience.
            </p>
          </div>
          <div className={styles.applyActions}>
            <a
              className={styles.primaryButton}
              href={`mailto:${BUSINESS.contact.email}?subject=${emailSubject}&body=${emailBody}`}
            >
              Email {BUSINESS.contact.email}
            </a>
            <a
              className={styles.secondaryButton}
              href={SOCIAL_MEDIA.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              DM us on Instagram
            </a>
            <a
              className={styles.secondaryButton}
              href={SOCIAL_MEDIA.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on Facebook
            </a>
          </div>
        </div>
      </section>
    </BasicPageLayout>
  );
}
