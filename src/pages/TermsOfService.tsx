import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HiOutlineDocumentText, HiOutlineCheckCircle, HiOutlineExclamation } from "react-icons/hi";

const TermsOfService = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="pt-16">
          <div className="container max-w-3xl py-10">
        <div className="flex items-center gap-3">
          <HiOutlineDocumentText size={32} className="text-primary" />
          <h1 className="font-display text-3xl font-bold">Terms of Service</h1>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Last Updated: March 2026</p>

        <div className="prose prose-sm mt-8 text-muted-foreground">
          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-2 text-sm leading-relaxed">
              By accessing or using Peza Nyumba ("we", "our", or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">2. Description of Service</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Peza Nyumba is a rental property platform that connects landlords with tenants in Malawi. We provide:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li>A platform for landlords to list rental properties</li>
              <li>A search interface for tenants to find properties</li>
              <li>Direct contact channels between landlords and tenants</li>
              <li>Property information and images</li>
            </ul>
            <p className="mt-2 text-sm leading-relaxed">
              <strong>We do NOT:</strong> handle payments, guarantee property quality, act as a real estate agent, or mediate disputes between landlords and tenants.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">3. User Accounts</h2>
            <div className="mt-2 space-y-3 text-sm">
              <div>
                <h3 className="font-semibold text-foreground">3.1 Registration</h3>
                <p className="mt-1">To list properties, you must register for a landlord account. You agree to:</p>
                <ul className="mt-1 list-disc pl-5 space-y-1">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be at least 18 years of age</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mt-3">3.2 Account Responsibilities</h3>
                <p className="mt-1">You are responsible for all activities under your account. We reserve the right to suspend or terminate accounts that violate these terms.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">4. Property Listings</h2>
            <div className="mt-2 space-y-3 text-sm">
              <div className="flex gap-3 rounded-lg bg-primary/5 p-4 border border-primary/20">
                <HiOutlineCheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">For Landlords</h3>
                  <ul className="mt-1 list-disc pl-5 space-y-1">
                    <li>You must own or have legal authority to rent the property</li>
                    <li>All listing information must be accurate and truthful</li>
                    <li>Images must be of the actual property (no stock photos)</li>
                    <li>Rent prices must be clearly stated in Malawi Kwacha (MK)</li>
                    <li>You must respond promptly to tenant inquiries</li>
                    <li>Listings are subject to our approval process</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3 rounded-lg bg-amber-50 p-4 border border-amber-200">
                <HiOutlineExclamation size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">Prohibited Content</h3>
                  <ul className="mt-1 list-disc pl-5 space-y-1">
                    <li>False or misleading property information</li>
                    <li>Discriminatory language or preferences</li>
                    <li>Properties you do not have rights to rent</li>
                    <li>Illegal or fraudulent listings</li>
                    <li>Spam, advertisements, or promotional content</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">5. Tenant Responsibilities</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li>Verify property details before making any payments</li>
              <li>Visit the property in person when possible</li>
              <li>Conduct due diligence on landlords and properties</li>
              <li>Use contact information only for legitimate rental inquiries</li>
              <li>Do not harass or spam landlords</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">6. Payments and Fees</h2>
            <div className="mt-2 rounded-lg bg-secondary p-4 text-sm">
              <p className="font-semibold text-foreground">Important:</p>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>Peza Nyumba is FREE for tenants</li>
                <li>We do NOT process rent payments or security deposits</li>
                <li>All financial transactions occur directly between landlords and tenants</li>
                <li>We recommend never sending money before viewing a property</li>
                <li>Be cautious of advance fee scams</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">7. Disclaimer of Warranties</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Peza Nyumba is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li>The platform will be uninterrupted, secure, or error-free</li>
              <li>Listings are accurate, complete, or current</li>
              <li>Properties meet safety or quality standards</li>
              <li>Landlords or tenants will complete transactions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">8. Limitation of Liability</h2>
            <p className="mt-2 text-sm leading-relaxed">
              Peza Nyumba shall NOT be liable for any indirect, incidental, special, consequential, or punitive damages arising from:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
              <li>Your use of or inability to use the platform</li>
              <li>Any transactions between landlords and tenants</li>
              <li>Fraudulent listings or scams by third parties</li>
              <li>Property conditions or disputes between users</li>
              <li>Any unauthorized access to our servers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">9. Indemnification</h2>
            <p className="mt-2 text-sm leading-relaxed">
              You agree to indemnify and hold harmless Peza Nyumba from any claims, damages, losses, or expenses arising from your use of the platform, your violation of these terms, or your infringement of any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">10. Termination</h2>
            <p className="mt-2 text-sm leading-relaxed">
              We reserve the right to suspend or terminate your account or access to the platform at our sole discretion, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">11. Governing Law</h2>
            <p className="mt-2 text-sm leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Malawi. Any disputes shall be subject to the exclusive jurisdiction of Malawian courts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">12. Changes to Terms</h2>
            <p className="mt-2 text-sm leading-relaxed">
              We may modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We encourage you to review these terms periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-lg font-bold text-foreground">13. Contact Information</h2>
            <p className="mt-2 text-sm leading-relaxed">
              For questions about these Terms of Service, please contact us:
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

export default TermsOfService;
