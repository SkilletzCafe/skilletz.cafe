import { BUSINESS, FULL_ADDRESS } from '@/config';

import { BasicPageLayout } from '@/components/BasicPageLayout';

import styles from '@/styles/BasicPage.module.css';

const effectiveDate = 'June 28, 2026';

export default function TermsOfService() {
  return (
    <BasicPageLayout
      title="Terms of Service"
      heading="Terms of Service"
      intro={`Effective ${effectiveDate}. These terms apply to Skillet'z Cafe and Tea-Rek'z websites and digital tools.`}
    >
      <article className={styles.legalCard}>
        <p>
          These Terms of Service govern your use of Skillet&apos;z Cafe and Tea-Rek&apos;z websites,
          staff-facing apps, and other digital tools that link to these terms. By using these
          services, you agree to these terms.
        </p>

        <h2>Restaurant information</h2>
        <p>
          We work to keep menus, hours, pricing, availability, and other information accurate, but
          details may change without notice. Online information does not guarantee item
          availability, wait times, pricing, promotions, or service availability at any specific
          time.
        </p>

        <h2>Third-party ordering and services</h2>
        <p>
          Our websites may link to third-party platforms for online ordering, delivery,
          reservations, maps, payments, app stores, social media, or other services. Those services
          are operated by their respective providers and may have their own terms, fees, policies,
          refund rules, and privacy practices.
        </p>

        <h2>Staff-facing apps and internal tools</h2>
        <p>
          Staff-facing apps such as Tea-Rek&apos;z SOPs are intended for authorized Skillet&apos;z
          Cafe and Tea-Rek&apos;z staff, contractors, owners, and approved testers. These tools
          provide training, reference, checklist, recipe, and operations information. They are not a
          substitute for manager direction, food safety rules, employment policies, or applicable
          law.
        </p>

        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Misuse, disrupt, reverse engineer, or attempt unauthorized access to our services.
          </li>
          <li>Submit false, misleading, unlawful, or harmful information.</li>
          <li>
            Copy or republish content from staff-facing tools outside authorized business use.
          </li>
          <li>Use our services in a way that violates applicable law or third-party rights.</li>
        </ul>

        <h2>Intellectual property</h2>
        <p>
          Website content, brand names, logos, designs, photos, menus, recipes, SOPs, and other
          materials are owned by Skillet&apos;z Cafe LLC, Tea-Rek&apos;z, or their licensors unless
          otherwise noted. You may not use our branding or content in a way that suggests
          endorsement or affiliation without permission.
        </p>

        <h2>No warranties</h2>
        <p>
          Our websites, apps, and digital tools are provided on an “as is” and “as available” basis.
          We do not guarantee that they will be uninterrupted, error-free, or always current.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Skillet&apos;z Cafe LLC and its owners, employees,
          and service providers are not liable for indirect, incidental, special, consequential, or
          punitive damages arising from your use of our websites, apps, or third-party services.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The effective date above shows when they were
          last updated. Continued use of our services after changes are posted means you accept the
          updated terms.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href={`mailto:${BUSINESS.contact.email}`} className={styles.link}>
            {BUSINESS.contact.email}
          </a>
          . You can also write to us at {BUSINESS.name}, {FULL_ADDRESS}.
        </p>
      </article>
    </BasicPageLayout>
  );
}
