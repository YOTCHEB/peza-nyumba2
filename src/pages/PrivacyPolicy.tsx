import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HiOutlineShieldCheck, HiOutlineDocumentText, HiOutlineLockClosed } from "react-icons/hi";

const PrivacyPolicy = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="pt-16">
          <div className="container max-w-3xl py-10">
        <div className="flex items-center gap-3">
          <HiOutlineLockClosed size={32} className="text-primary" />
          <h1 className="font-display text-3xl font-bold">Privacy Policy</h1>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Last Updated: March 2026</p>

        <div className="prose prose-sm mt-8 text-muted-foreground">
          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">1. Introduction</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Welcome to Peza Nyumba ("we", "our", or "us"). We are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">2. Information We Collect</h2>
            <div className="mt-2 space-y-3 text-sm">
              <div>
                <h3 className="font-semibold text-foreground">2.1 Personal Information</h3>
                <ul className="mt-1 list-disc pl-5 space-y-1">
                  <li>Name and contact details (email, phone number)</li>
                  <li>Property addresses and descriptions (for landlords)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mt-3">2.2 Automatically Collected Information</h3>
                <ul className="mt-1 list-disc pl-5 space-y-1">
                  <li>Device information and IP address</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and time spent on our platform</li>
                  <li>Referral source and exit pages</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">3. How We Use Your Information</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li>To provide and maintain our rental property platform</li>
              <li>To connect tenants with landlords directly</li>
              <li>To verify listings and ensure quality standards</li>
              <li>To send important updates about your account or listings</li>
              <li>To improve our services and user experience</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">4. Information Sharing</h2>
            <p className="mt-2 text-sm leading-relaxed">
              We do NOT sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li><strong>With your consent:</strong> When you choose to share your contact details with landlords or tenants</li>
              <li><strong>Service providers:</strong> With trusted partners who help us operate our platform (e.g., hosting, analytics)</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">5. Data Security</h2>
            <p className="mt-2 text-sm leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">6. Your Rights</h2>
            <p className="mt-2 text-sm leading-relaxed">You have the right to:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">7. Cookies</h2>
            <p className="mt-2 text-sm leading-relaxed">
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">8. Third-Party Links</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Our platform may contain links to third-party websites (e.g., WhatsApp for direct contact). We are not responsible for the privacy practices of these external sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">9. Children's Privacy</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">10. Changes to This Policy</h2>
            <p className="mt-2 text-sm leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">11. Contact Us</h2>
            <p className="mt-2 text-sm leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-2 rounded-lg bg-secondary p-4 text-sm">
              <p>📧 Email: yotlab.team@gmail.com</p>
              <p>📱 Phone: +265 996 541 336</p>
              <p>📍 Location: Dzaleka, Malawi</p>
            </div>
          </section>
        </div>
      </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
