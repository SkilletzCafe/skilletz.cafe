import Link from 'next/link';

import { BUSINESS, FULL_ADDRESS, PAGES } from '@/config';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

const bookingPath = PAGES.schoolFundraiserBooking.path;
const pageDescription =
  "Dine with Skillet'z, part of Skillet'z Cares: school fundraisers in Fremont with 15% of eligible participating in-store sales donated to your group, excluding tax and tip.";

export default function SchoolFundraisers() {
  return (
    <BasicPageLayout
      title="Skillet'z Cares | School Fundraisers"
      heading="Skillet'z Cares"
      intro="Dine with Skillet'z. Support local students."
      description={pageDescription}
    >
      <section className={styles.featureCard}>
        <p>A welcoming table. A shared meal. A practical way to help our neighbors.</p>
        <p>
          At Skillet&apos;z, we believe hospitality means caring for people—both at our tables and
          beyond our doors. Dine with Skillet&apos;z, part of Skillet&apos;z Cares, brings local
          families together over dinner while helping schools and student groups raise funds for the
          opportunities they want to give their students.
        </p>
        <p>
          Pick an available Thursday or Friday evening, invite your families to dine in with us, and
          we&apos;ll donate <strong>15% of eligible in-store sales</strong> from participating
          fundraiser guests to your group, excluding tax and tip.
        </p>
        <Link href={bookingPath} className={styles.ctaButton}>
          Request a Fundraiser Date
        </Link>
      </section>

      <section className={styles.card}>
        <h2>How It Works</h2>
        <ul className={styles.checkList}>
          <li>Request an available Thursday or Friday evening.</li>
          <li>Your fundraiser runs during dinner from 5:00 PM to 8:00 PM.</li>
          <li>Families dine in at Skillet&apos;z and mention your fundraiser when ordering.</li>
          <li>
            Skillet&apos;z donates 15% of eligible in-store sales from participating guests,
            excluding tax and tip.
          </li>
        </ul>
      </section>

      <section className={styles.card}>
        <h2>Fundraiser Guidelines</h2>
        <ul className={styles.checkList}>
          <li>Thursday and Friday evenings only.</li>
          <li>One school, party, or student group per evening.</li>
          <li>Fundraiser window: 5:00 PM–8:00 PM.</li>
          <li>Eligible sales are in-store only; online delivery orders do not apply.</li>
          <li>Guests must mention the school or fundraiser when ordering.</li>
          <li>Offer does not include tax, tip, gift cards, or other promotions unless approved.</li>
        </ul>
      </section>

      <section className={styles.card}>
        <h2>Why Skillet&apos;z?</h2>
        <p>
          We&apos;re a family-owned restaurant in the Niles District, grateful for the families who
          make Skillet&apos;z part of their lives. We want that gratitude to take practical shape:
          welcoming people, doing our work with care, and using what we have to serve our neighbors.
        </p>
        <p>
          We welcome inquiries from schools, PTAs, student groups, clubs, and teams across Fremont,
          Union City, Newark, and neighboring communities. We host one fundraising group per evening
          so our team can care well for your supporters and our other guests.
        </p>
        <p>
          Skillet&apos;z Cafe is located at <strong>{FULL_ADDRESS}</strong>. Dinner service is
          available Thursday through Sunday, with school fundraiser bookings reserved for Thursday
          and Friday evenings.
        </p>
      </section>

      <section className={styles.featureCard}>
        <h2>Ready to Pick a Date?</h2>
        <p>
          Tell us what your students are working toward. Use the booking link below to request a
          fundraiser date, and our team will follow up to confirm the details and provide wording
          you can share with families.
        </p>
        <Link href={bookingPath} className={styles.ctaButton}>
          Request a Fundraiser Date
        </Link>
        <p className={styles.smallNote}>
          Questions first? Email us at{' '}
          <a href={`mailto:${BUSINESS.contact.email}`}>{BUSINESS.contact.email}</a>.
        </p>
      </section>
    </BasicPageLayout>
  );
}
