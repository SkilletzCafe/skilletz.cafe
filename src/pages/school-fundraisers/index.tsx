import Link from 'next/link';

import { BUSINESS, FULL_ADDRESS, PAGES } from '@/config';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

const bookingPath = PAGES.schoolFundraiserBooking.path;
const pageDescription =
  "Plan a Skillet'z Spirit Night school fundraiser in Fremont. Local schools can book Thursday or Friday dinner fundraiser nights and receive 15% of eligible in-store sales from participating guests.";

export default function SchoolFundraisers() {
  return (
    <BasicPageLayout
      title="School Fundraiser Nights"
      heading="School Fundraiser Nights"
      intro="Bring your school community together for dinner in Historic Niles while raising money for students."
      description={pageDescription}
    >
      <section className={styles.featureCard}>
        <p>
          Skillet&apos;z Spirit Night is our local dine-to-donate fundraiser program for schools,
          PTAs, student groups, clubs, and teams in Fremont and the surrounding community.
        </p>
        <p>
          Pick an available Thursday or Friday evening, invite your families to dine in with us, and
          we&apos;ll donate <strong>15% of eligible in-store sales</strong> from participating
          fundraiser guests back to your group.
        </p>
        <Link href={bookingPath} className={styles.ctaButton}>
          Book a School Fundraiser Night
        </Link>
      </section>

      <section className={styles.card}>
        <h2>How It Works</h2>
        <ul className={styles.checkList}>
          <li>Book an available Thursday or Friday evening.</li>
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
          We&apos;re a family-owned breakfast, brunch, and dinner restaurant in the Niles District,
          and we love supporting local students. Fundraiser nights are designed to be simple for
          organizers, fun for families, and sustainable for our dining room so regular guests can
          still enjoy a great visit.
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
          Use the booking link below to request your fundraiser night. After you book, our team will
          follow up with confirmation details and simple language your school can share with
          families.
        </p>
        <Link href={bookingPath} className={styles.ctaButton}>
          Schedule Your Fundraiser
        </Link>
        <p className={styles.smallNote}>
          Questions first? Email us at{' '}
          <a href={`mailto:${BUSINESS.contact.email}`}>{BUSINESS.contact.email}</a>.
        </p>
      </section>
    </BasicPageLayout>
  );
}
