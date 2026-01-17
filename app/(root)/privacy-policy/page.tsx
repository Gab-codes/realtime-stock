import { APP_NAME } from "@/lib/utils";

const PrivacyPage = () => {
  return (
    <div className="mt-20 bg-background text-foreground">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            {APP_NAME} Privacy Policy
          </h1>

          <p className="text-foreground/80 mb-6">
            {APP_NAME} is committed to safeguarding your privacy. This policy is
            designed to inform you about how we handle your personal data. We
            encourage you to read through this document to understand our
            approach to personal information.
          </p>

          <div className="mb-8">
            <p className="text-foreground/60 text-sm">
              Effective Date: December 14, 2025
            </p>
            <p className="text-foreground/60 text-sm">Company: {APP_NAME}</p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">
            Purpose of Collecting Personal Information
          </h2>
          <p className="text-foreground/80 mb-6">
            {APP_NAME} gathers personal data to enhance how we deliver, offer,
            and communicate with you about our products and services. Our
            commitment extends to ensuring that your information is never sold
            or rented to third parties. We only share your personal information
            in ways outlined in this policy.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Types of Personal Information Collected
          </h2>
          <p className="text-foreground/80 mb-4">
            {APP_NAME} collects personal data through various interactions with
            you, including account creation, orders, product or service usage,
            website visits, participation in promotions, newsletter
            subscriptions, communications, and feedback in surveys.
          </p>
          <p className="text-foreground/80 mb-4">
            The information we gather includes:
          </p>
          <ul className="list-disc list-inside text-foreground/80 mb-6 space-y-1">
            <li>Names</li>
            <li>Email addresses</li>
            <li>Phone numbers</li>
            <li>Physical addresses</li>
            <li>Preferences</li>
            <li>Billing details</li>
            <li>Demographic details (like language, gender, age)</li>
            <li>Interests</li>
          </ul>
          <p className="text-foreground/80 mb-6">
            For software users, this may include anonymized trading logs or
            preferences, shared only as necessary for services with user
            consent. Occasionally, we might request additional details to
            provide specific services or materials. We may also integrate your
            information with data from partners or other sources.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Use of Cookies</h2>
          <p className="text-foreground/80 mb-6">
            Cookies are small text files stored on your device to record
            information. {APP_NAME} uses cookies to track website activity and
            improve your experience, such as remembering login details and
            preferences.
          </p>
          <p className="text-foreground/80 mb-6">
            We treat cookie-contained information with the same confidentiality
            as other personal data. You can disable cookies through your browser
            settings, though some website functionalities may be affected.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Information from Other Sources
          </h2>
          <p className="text-foreground/80 mb-6">
            We incorporate features and widgets from social media platforms,
            like the Facebook Like button, which may collect your IP address,
            page visits, and set cookies to function correctly. These features
            are governed by the privacy policies of their respective companies.
          </p>
          <p className="text-foreground/80 mb-6">
            We may also receive personal information from third-party services
            and integrate it with our data, following the permissions you grant
            on those platforms. This includes information from social media or
            authentication services used to log into our services. We advise
            reviewing your privacy settings on these platforms to manage the
            information shared with us. Services like Facebook Connect allow you
            to share activities and updates within your network.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Protecting Your Personal Information
          </h2>
          <p className="text-foreground/80 mb-6">
            {APP_NAME} is committed to protecting the privacy of your data
            through physical, electronic, and administrative safeguards. We
            encourage you to secure your personal information while online. We
            comply with FTC Safeguards Rule (16 CFR §314), Gramm-Leach-Bliley
            Act (15 USC §6801 et seq.), and Nevada NRS 603A for data security
            and breach notifications. In case of breaches, we notify affected
            users per law.
          </p>
          <p className="text-foreground/80 mb-6">
            For transactions on {APP_NAME}'s website, an SSL-enabled browser is
            required. {APP_NAME} employs standard Secure Sockets Layer (SSL)
            encryption on pages where financial transactions occur, ensuring the
            confidentiality of your personal and payment details during internet
            transmission.
          </p>
          <p className="text-foreground/80 mb-6">
            Despite {APP_NAME}'s security measures, the inherent risks of
            internet data transmission mean absolute security cannot be
            guaranteed. It's crucial for you to protect your personal data,
            especially by keeping passwords and registration details
            confidential.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            How {APP_NAME} Utilizes Your Personal Data
          </h2>
          <p className="text-foreground/80 mb-4">
            {APP_NAME} processes your personal data for various purposes,
            including:
          </p>
          <ul className="list-disc list-inside text-foreground/80 mb-6 space-y-1">
            <li>
              Processing orders and billing for our products and services, along
              with customer support and account communication.
            </li>
            <li>
              Enhancing our offerings through personalized content, language,
              and location adjustments, plus tailored assistance.
            </li>
            <li>
              Inviting you to participate in surveys for feedback on our
              services and news.
            </li>
            <li>
              Providing updates, promotional content, targeted advertising, and
              special offers based on your preferences.
            </li>
            <li>
              Anonymous reporting for both internal and external analysis.
            </li>
            <li>
              Understanding usage patterns to improve our services and content
              appeal.
            </li>
            <li>Facilitating and moderating discussions in online forums.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">
            Disclosure of Your Information
          </h2>
          <p className="text-foreground/80 mb-6">
            {APP_NAME} might share your data with trusted partners and vendors
            to assist in marketing and communication efforts, under strict
            confidentiality agreements.
          </p>
          <p className="text-foreground/80 mb-6">
            Additionally, your information may be disclosed if legally required,
            or to protect {APP_NAME}'s rights and property, enforce our terms,
            prevent fraud, or ensure the safety of our users and the public. We
            report suspicious activity per BSA/FinCEN if required for AML
            compliance.
          </p>
          <p className="text-foreground/80 mb-6">
            Mobile Information Disclosure: Mobile information will not be shared
            with third parties/affiliates for marketing/promotional purposes.
            Any other mentions in this policy exclude text messaging originator
            opt-in data and consent; this information will not be shared with
            any third parties.
          </p>
          <p className="text-foreground/80 mb-6">
            If you wish to be removed from receiving future communications, you
            can opt out by texting STOP.
          </p>
          <p className="text-foreground/80 mb-6">
            In cases of significant business changes like mergers or
            acquisitions, {APP_NAME} reserves the right to transfer your
            personal data to involved parties.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-foreground/80 mb-6">
            You may request access, correction, or deletion of your data by
            contacting us. For California residents (CCPA), you have rights to
            know, delete, and opt-out of sales (we do not sell data).
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Legal Bases for Data Processing and Disclosure
          </h2>
          <p className="text-foreground/80 mb-6">
            {APP_NAME} may share your information with partners to enhance
            communication with you, under strict data protection agreements. We
            may also disclose your data as necessary by law or to protect our
            rights, comply with legal processes, or ensure the safety of our
            community.
          </p>
          <p className="text-foreground/80 mb-6">
            Your rights concerning your data include requesting information,
            correction, deletion, or revocation of consent for data processing.
            For any communication preferences or data concerns, please contact{" "}
            {APP_NAME} directly.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p className="text-foreground/80 mb-6">
            Our services are for adults; we do not knowingly collect data from
            under-13s per COPPA.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Community Engagement and Legal Compliance
          </h2>
          <p className="text-foreground/80 mb-6">
            For visitors from the European Economic Area (EEA), {APP_NAME}'s
            data collection and processing adhere to specific legal bases, such
            as contractual necessity, legitimate interests, or your consent. We
            are transparent about the legal grounds for processing your data and
            are committed to respecting your privacy rights under applicable
            laws.
          </p>
          <p className="text-foreground/80 mb-6">
            {APP_NAME} provides platforms like blogs and forums for interactive
            engagement. Be mindful that any information shared in these spaces
            becomes public. For removal requests or privacy inquiries, please
            contact {APP_NAME}'s designated data protection office.
          </p>
          <p className="text-foreground/80">
            {APP_NAME} emphasizes privacy across all operations, with specific
            considerations for children's privacy and compliance with regional
            data protection regulations. We continually update our privacy
            practices to ensure your data is handled responsibly and
            transparently.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
