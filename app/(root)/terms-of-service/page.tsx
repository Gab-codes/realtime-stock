import React from "react";
import { APP_NAME, APP_URL } from "@/lib/utils";

const TermsOfService = () => {
  return (
    <div className="mt-20 bg-background text-foreground">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            {APP_NAME} Terms of Service
          </h1>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8">
            <p className="text-foreground font-semibold mb-4">
              IMPORTANT – PLEASE CAREFULLY READ AND UNDERSTAND OUR TERMS OF USE
              AND CONDITIONS OF SALE ("TERMS" OR "AGREEMENT") BEFORE ACCESSING
              OR USING, OR PLACING AN ORDER THROUGH OUR SITE. THESE TERMS
              CONTAIN DISCLAIMERS OF WARRANTIES AND LIMITATIONS OF LIABILITIES
              (SEE SECTIONS 15 AND 16). THESE TERMS FORM AN ESSENTIAL BASIS OF
              OUR AGREEMENT.
            </p>
          </div>

          <p className="text-foreground/80 mb-6">
            Your use of {APP_URL}, including any sub-domains thereof, affiliated
            websites, and mobile applications (collectively, the "Site"), which
            are owned and maintained by {APP_NAME} ("{APP_NAME}," "we," "our,"
            "us"), are governed by the policies, terms, and conditions set forth
            below...
          </p>

          <p className="text-foreground/80 mb-6">
            Please read our terms carefully. We offer the Site, including all
            information, tools, products, and services available from the Site
            to you, the user, conditioned upon your acceptance of all terms,
            conditions, policies, and notices stated here.
          </p>

          <p className="text-foreground/80 mb-6">
            By accessing, using, or placing an order over the Site, you agree to
            the terms set forth herein. If you do not agree to these terms and
            conditions in their entirety, you are not authorized to use the Site
            in any manner or form whatsoever.
          </p>

          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8">
            <p className="text-foreground font-semibold mb-4">
              THIS AGREEMENT CONTAINS ARBITRATION AND CLASS ACTION WAIVER
              PROVISIONS THAT WAIVE YOUR RIGHT TO A COURT HEARING, RIGHT TO A
              JURY TRIAL, AND RIGHT TO PARTICIPATE IN A CLASS ACTION.
              ARBITRATION IS MANDATORY AND IS THE EXCLUSIVE REMEDY FOR ANY AND
              ALL DISPUTES UNLESS SPECIFIED BELOW IN SECTION 17 OR IF YOU
              OPT-OUT. PLEASE CAREFULLY REVIEW THE DISPUTE RESOLUTION PROVISIONS
              IN SECTION 17 BELOW WHICH DESCRIBES YOUR RIGHT TO OPT-OUT.
            </p>
          </div>

          <p className="text-foreground/80 mb-6">
            You can review the most current version of the Terms at any time on
            this page (Terms and Conditions | {APP_NAME}). We reserve the right
            to update, change, or replace any part of these Terms by posting
            updates and/or changes to our Site. It is your responsibility to
            check this page periodically for changes.
          </p>

          <p className="text-foreground/80 mb-6 font-semibold">
            YOUR CONTINUED USE OF OR ACCESS TO THE SITE FOLLOWING THE POSTING OF
            ANY CHANGES CONSTITUTES BINDING ACCEPTANCE OF THOSE CHANGES.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Site Use</h2>
          <p className="text-foreground/80 mb-6">
            {APP_NAME}'s Site, products, and services are intended for adults
            only. By using the Site and agreeing to these Terms, you represent
            that you are at least the age of majority in your state or province
            of residence. If you use the Site, you affirm that you have the
            legal capacity to enter into a binding contract with us, and have
            read this Agreement and understand and agree to its terms. For users
            subscribing to our algorithmic trading software, these Terms are
            supplemented by the {APP_NAME.toUpperCase()} User Agreement, which
            governs the revocable license, fees, refunds, and non-discretionary
            copy-trading tools where users retain sole control over trades via
            interface buttons and broker limits.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Changes to these Terms
          </h2>
          <p className="text-foreground/80 mb-6">
            {APP_NAME} reserves the right to update, change, or replace any part
            of these Terms by posting updates and/or changes to our Site. You
            can review the most current version of these Terms at any time by
            visiting this page (Terms and Conditions | {APP_NAME}). It is your
            responsibility to check this page periodically for changes. Your
            continued use of, or access to, the Site following the posting of
            any changes constitutes your binding acceptance of those changes.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Privacy and Security Disclosure
          </h2>
          <p className="text-foreground/80 mb-6">
            {APP_NAME}'s Privacy Policy may be viewed at Privacy Policy |{" "}
            {APP_NAME}. The Privacy Policy is hereby incorporated into these
            Terms by reference and constitutes a part of this Agreement.{" "}
            {APP_NAME} reserves the right to modify the Privacy Policy at its
            sole discretion.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Investment Service and Risk Disclosures
          </h2>
          <p className="text-foreground/80 mb-6">
            {APP_NAME} provides an investment service offering fixed daily
            returns on deposited funds. This service is not investment advice,
            tax advice, legal advice, or insurance advice. By using our
            investment service, you acknowledge that you are participating in a
            financial service with predetermined return rates.
          </p>
          <p className="text-foreground/80 mb-6">
            You alone are solely responsible for determining whether our
            investment service is appropriate for you based on your financial
            situation and risk tolerance. You should consult a registered
            investment advisor, attorney, or tax professional regarding your
            participation in our service and any related financial, legal, or
            tax implications.
          </p>
          <p className="text-foreground/80 mb-6">
            No fiduciary relationship exists between you and {APP_NAME}. We are
            not registered as a CTA under CEA or IA under Advisers Act. Our
            service provides fixed returns as described, not discretionary
            trading or investment recommendations.
          </p>
          <p className="text-foreground/80 mb-6">
            <strong>Risk Warning:</strong> While our service offers fixed daily
            returns, all investments carry inherent risks including but not
            limited to loss of principal. Past performance does not guarantee
            future results. You should only invest funds you can afford to lose.
          </p>
          <p className="text-foreground/80 mb-6">
            Any market data, performance information, or educational content
            provided on the Site is for informational purposes only and should
            not be construed as investment advice or recommendations. Such
            information is impersonal and not tailored to individual
            circumstances.
          </p>
          <p className="text-foreground/80 mb-6">
            Performance data displayed on the Site is supplied by sources
            believed to be reliable, but {APP_NAME} does not guarantee the
            accuracy, completeness, or timeliness of such data. Market
            conditions can change rapidly, and historical data may not reflect
            current or future performance.
          </p>
          <p className="text-foreground/80 mb-6">
            All content on the Site is presented only as of the date published
            or indicated and may be superseded by subsequent market events or
            for other reasons. You are responsible for setting your browser
            cache settings to ensure you receive the most recent data.
          </p>

          <h2 className="text-2xl font-semibold mb-4">No Direct Lending</h2>
          <p className="text-foreground/80 mb-6">
            {APP_NAME} is a financial education and technology company. We do
            not offer any lending services, either personal or business. Your
            ability to obtain loans, including the amount, rate, and other
            terms, will ultimately depend on the determination of third-party
            lenders, which is beyond our control.
          </p>
          <p className="text-foreground/80 mb-6">
            We do not guarantee that you will be qualified for or receive any
            particular offer from any lender.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Securities & Investing Disclosure
          </h2>
          <p className="text-foreground/80 mb-6">
            Stocks and options trading have large potential rewards but also
            large potential risks. You must be aware of the risks and be willing
            to accept them to invest in the stocks and options markets.
          </p>
          <p className="text-foreground/80 mb-6">
            Don't trade with money you can't afford to lose. {APP_NAME} does not
            represent that any account will or is likely to achieve profits or
            losses similar to those discussed on the Site
          </p>
          <p className="text-foreground/80 mb-6">
            The past performance of any trading system or methodology is not
            necessarily indicative of future results. All trades, patterns,
            charts, systems, etc., discussed on the Site are for illustrative
            purposes only and not to be construed as specific advisory
            recommendations. Information contained on the Site is intended for
            informational purposes only.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-foreground/80 mb-6">
            The Site and the content contained herein, as well as all
            copyrights, including without limitation, the text, documents,
            articles, products, software, graphics, photos, sounds, videos,
            interactive features, services, links, User Submissions (as defined
            below), third-party apps, and any other content on the Site
            ("Content") and the trademarks, service marks, and logos contained
            therein are the property of {APP_NAME} and its third-party licensors
            or providers.
          </p>
          <p className="text-foreground/80 mb-6">
            You may access and use the Content and download and/or print out
            copies of any content from the Site solely for your personal,
            non-commercial use.
          </p>
          <p className="text-foreground/80 mb-6">
            If you download or print a copy of the Content for personal use, you
            must retain all copyright and other proprietary notices contained
            therein. You acknowledge that you do not acquire any ownership
            rights by using the Site. {APP_NAME} reserves all rights not
            expressly granted in and to the Site.
          </p>
          <p className="text-foreground/80 mb-6">
            You agree not to circumvent, disable, or otherwise interfere with
            security-related features of the Site or features that prevent or
            restrict use or copying of any Content or enforce limitations on use
            of the Site or the Content therein.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Prohibited Use</h2>
          <p className="text-foreground/80 mb-6">
            In addition to other prohibitions as set forth in these Terms, you
            are prohibited from using the Site or its Content: (a) for any
            unlawful purpose; (b) to solicit others to perform or participate in
            any unlawful acts; (c) to violate any international, federal,
            provincial, or state regulations, rules, laws, or local ordinances;
            (d) to infringe upon or violate our intellectual property rights or
            the intellectual property rights of others; (e) to harass, abuse,
            insult, harm, defame, slander, disparage, intimidate, or
            discriminate based on gender, sexual orientation, religion,
            ethnicity, race, age, national origin, or disability; (f) to submit
            false or misleading information; (g) to upload or transmit viruses
            or any other type of malicious code that will or may be used in any
            way that will affect the functionality or operation of the Service
            or of any related website, other websites, or the Internet; (h) to
            collect or track the personal information of others; (i) to spam,
            phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene
            or immoral purpose; or (k) to interfere with or circumvent the
            security features of the Service or any related website, other
            websites, or the Internet.
          </p>
          <p className="text-foreground/80 mb-6">
            We reserve the right to terminate your use of the Service or any
            related website for violating any of the prohibited uses.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p className="text-foreground/80 mb-6">
            The obligations and liabilities of the parties incurred prior to the
            termination date shall survive the termination of this agreement for
            all purposes.
          </p>
          <p className="text-foreground/80 mb-6">
            These Terms are effective unless and until terminated by either you
            or us. You may terminate these Terms at any time by notifying us
            that you no longer wish to use our Services, or when you cease using
            our Site.
          </p>
          <p className="text-foreground/80 mb-6">
            If in our sole judgment you fail, or we suspect that you have
            failed, to comply with any term or provision of these Terms, we also
            may terminate this agreement at any time without notice and you will
            remain liable for all amounts due up to and including the date of
            termination; and/or accordingly may deny you access to our Services
            (or any part thereof).
          </p>

          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p className="text-foreground/80 mb-6">
            Governing Law: These Terms are governed by Nevada law (NRS), without
            regard to conflicts principles. Federal law (e.g., CFTC) prevails if
            conflicting.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Prohibited Conduct</h2>
          <p className="text-foreground/80 mb-6">
            You agree not to engage in any of the following prohibited
            activities: Copying, distributing, or disclosing any part of the
            Site in any medium, including without limitation by any automated or
            non-automated "scraping";
          </p>
          <p className="text-foreground/80 mb-6">
            Users warrant they are not prohibited under OFAC sanctions or AML
            laws.
          </p>
          <p className="text-foreground/80 mb-6">
            Using any automated system, including without limitation "robots,"
            "spiders," "offline readers," etc., to access the Site in a manner
            that sends more request messages to the {APP_NAME} servers than a
            human can reasonably produce in the same period of time by using a
            conventional online web browser (except that {APP_NAME} grants the
            operators of public search engines revocable permission to use
            spiders to copy materials from the publicly available searchable
            indices of the materials
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
