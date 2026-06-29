import { BUSINESS, FULL_ADDRESS } from '@/config';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

const effectiveDate = 'June 28, 2026';

export default function PrivacyPolicy() {
  return (
    <BasicPageLayout
      title="Privacy Policy"
      heading="Privacy Policy"
      intro={`Effective ${effectiveDate}. This policy covers Skillet'z Cafe, Tea-Rek'z, our websites, and our staff-facing apps.`}
    >
      <article className={styles.legalCard}>
        <p>
          Skillet&apos;z Cafe LLC operates the Skillet&apos;z Cafe and Tea-Rek&apos;z websites,
          digital ordering links, and staff-facing apps such as Tea-Rek&apos;z SOPs. This Privacy
          Policy explains what information we collect, how we use it, and the choices available to
          you.
        </p>

        <h2>Information we collect</h2>
        <p>Depending on how you interact with us, we may collect:</p>
        <ul>
          <li>
            <strong>Contact information</strong>, such as your name, email address, or phone number
            when you contact us, request catering information, apply for a job, or otherwise choose
            to share it.
          </li>
          <li>
            <strong>Website usage information</strong>, such as pages viewed, device/browser
            details, and approximate location derived from your browser or IP address through
            standard website analytics tools.
          </li>
          <li>
            <strong>Order, reservation, delivery, or payment information</strong> that you provide
            to our third-party service providers when using linked ordering, delivery, reservation,
            or payment services. Those providers process that information under their own privacy
            policies.
          </li>
          <li>
            <strong>Staff app device permissions</strong>, such as optional notifications or
            location permission for staff reminders. Tea-Rek&apos;z SOPs does not sell, share, or
            upload precise staff location to Skillet&apos;z servers; location-based reminders are
            intended to run on the device.
          </li>
        </ul>

        <h2>How we use information</h2>
        <p>We use information to:</p>
        <ul>
          <li>Respond to questions, catering requests, job inquiries, and other messages.</li>
          <li>Operate, maintain, and improve our websites, menus, and digital experiences.</li>
          <li>Provide staff-facing training, SOP, checklist, and reminder functionality.</li>
          <li>Understand aggregate website usage and improve restaurant communications.</li>
          <li>Protect our guests, staff, business operations, and legal rights.</li>
        </ul>

        <h2>Staff-facing apps</h2>
        <p>
          Tea-Rek&apos;z SOPs is an internal reference and training app for authorized staff and
          testers. It provides offline SOP content, search, recipes, settings, and optional local
          reminders. The app is not designed to collect customer data, sell personal information, or
          share user data with advertisers.
        </p>

        <h2>Sharing information</h2>
        <p>
          We do not sell personal information. We may share information with service providers that
          help us operate our websites, analytics, communications, ordering, delivery, reservations,
          payments, payroll, or other business systems; when required by law; or when needed to
          protect rights, safety, and security.
        </p>

        <h2>Third-party services</h2>
        <p>
          Our websites and apps may link to third-party services such as online ordering, delivery,
          reservations, maps, analytics, app stores, or social platforms. Your use of those services
          is governed by their own terms and privacy policies.
        </p>

        <h2>Data retention</h2>
        <p>
          We keep information only as long as reasonably needed for the purposes described above,
          including business, security, accounting, legal, and operational needs.
        </p>

        <h2>Your choices</h2>
        <p>
          You can disable app permissions such as notifications or location access in your device
          settings. You can also use browser settings or extensions to limit cookies and analytics.
          Contact us if you want to request access, correction, or deletion of information you have
          provided directly to us.
        </p>

        <h2>Children&apos;s privacy</h2>
        <p>
          Our websites and staff-facing apps are not directed to children under 13. Tea-Rek&apos;z
          SOPs is intended for staff and authorized testers, not for children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The effective date above shows when
          it was last updated.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this Privacy Policy can be sent to{' '}
          <a href={`mailto:${BUSINESS.contact.email}`} className={styles.link}>
            {BUSINESS.contact.email}
          </a>
          . You can also write to us at {BUSINESS.name}, {FULL_ADDRESS}.
        </p>
      </article>
    </BasicPageLayout>
  );
}
