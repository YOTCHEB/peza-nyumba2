import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";

const Contact = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container max-w-4xl py-10">
        <h1 className="font-display text-3xl font-bold">Contact <span className="text-primary">Us</span></h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Have questions, suggestions, or need assistance? We're here to help! Reach out to us through any of the channels below.
        </p>

        {/* Contact Information Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: <HiOutlineMail size={24} className="text-primary" />, title: "Email", value: "yotlab.team@gmail.com", desc: "We'll respond within 24 hours" },
            { icon: <HiOutlinePhone size={24} className="text-primary" />, title: "Phone", value: "+265 996 541 336", desc: "Mon-Sat, 8AM-6PM" },
            { icon: <HiOutlineLocationMarker size={24} className="text-primary" />, title: "Location", value: "Dzaleka, Malawi", desc: "Refugee Camp Area" },
            { icon: <HiOutlineClock size={24} className="text-primary" />, title: "Hours", value: "24/7 Online", desc: "Response within 24hrs" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">{item.icon}</div>
              <h3 className="mt-4 font-display font-bold text-sm">{item.title}</h3>
              <p className="mt-1 font-semibold text-foreground">{item.value}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-bold">Send us a Message</h2>
            <p className="mt-2 text-sm text-muted-foreground">Fill out the form below and we'll get back to you as soon as possible.</p>
            
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input type="text" className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Enter your name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input type="email" className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <input type="tel" className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="+265 ___ ___ ___" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea rows={4} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="How can we help you?" />
              </div>
              <button type="submit" className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20">
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">Frequently Asked Questions</h2>
            {[
              { q: "Is Peza Nyumba free to use?", a: "Yes! Peza Nyumba is 100% free for tenants. You can browse all listings and contact landlords directly without any charges." },
              { q: "How do I list my property?", a: "Simply register for a landlord account, go to your dashboard, and click 'Add Listing'. Fill in the property details and submit for approval." },
              { q: "Are the listings verified?", a: "We review all listings before approval to ensure they meet our quality standards. However, we encourage tenants to visit properties before making payments." },
              { q: "Can I contact landlords directly?", a: "Yes! Each listing has direct contact options via phone call or WhatsApp. No middlemen involved." },
              { q: "Which areas do you cover?", a: "We currently cover Lilongwe, Zomba, and Dzaleka. We're expanding to other cities soon!" },
            ].map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display font-bold text-sm text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
