import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUsers, HiOutlineShieldCheck, HiOutlineChatAlt2, HiOutlineDeviceMobile, HiOutlineGlobe, HiOutlineDocumentText, HiOutlineArrowRight } from "react-icons/hi";
import { HiOutlineBolt } from "react-icons/hi2";
const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="pt-16">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 sm:py-24">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <HiOutlineGlobe size={14} />
            Made for Malawi
          </div>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            About <span className="text-primary">Peza Nyumba</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Peza Nyumba (meaning "Find a House" in Chichewa) is revolutionizing how people find rental properties in Malawi. We connect landlords directly with tenants — no middlemen, no hidden fees.
          </p>
        </div>
      </div>

      <div className="container max-w-5xl py-12">
        {/* Mission & Vision */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-5">
              <HiOutlineHome size={24} className="text-primary" />
            </div>
            <h2 className="font-display text-xl font-bold">Our Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To simplify house hunting in Malawi by providing a free, mobile-friendly platform where tenants can browse listings and contact landlords directly via phone or WhatsApp. We believe everyone deserves easy access to quality housing information.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-5">
              <HiOutlineUsers size={24} className="text-primary" />
            </div>
            <h2 className="font-display text-xl font-bold">Who We Serve</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Students looking for affordable rooms near campus, families seeking spacious houses, professionals wanting convenient locations, and landlords who need reliable tenants. We serve everyone across Lilongwe, Zomba, and Dzaleka.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "100%", label: "Free for Tenants", icon: <HiOutlineGlobe size={20} /> },
            { value: "24/7", label: "Online Access", icon: <HiOutlineDeviceMobile size={20} /> },
            { value: "0", label: "Hidden Fees", icon: <HiOutlineShieldCheck size={20} /> },
            { value: "100%", label: "Direct Contact", icon: <HiOutlineChatAlt2 size={20} /> },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-center">Why Choose Peza Nyumba?</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <HiOutlineBolt size={22} className="text-amber-500" />,
                title: "Fast & Easy",
                desc: "Find and contact landlords in minutes. No lengthy processes or paperwork.",
                color: "from-amber-500/10 to-orange-500/10",
              },
              {
                icon: <HiOutlineGlobe size={22} className="text-primary" />,
                title: "100% Free",
                desc: "Browse unlimited listings and contact landlords at zero cost.",
                color: "from-primary/10 to-primary/5",
              },
              {
                icon: <HiOutlineDeviceMobile size={22} className="text-blue-500" />,
                title: "Mobile Optimized",
                desc: "Designed for smartphones, works even on slow internet connections.",
                color: "from-blue-500/10 to-cyan-500/10",
              },
              {
                icon: <HiOutlineChatAlt2 size={22} className="text-green-500" />,
                title: "Direct WhatsApp",
                desc: "One tap to message landlords directly on WhatsApp. No intermediaries.",
                color: "from-green-500/10 to-emerald-500/10",
              },
              {
                icon: <HiOutlineShieldCheck size={22} className="text-purple-500" />,
                title: "Verified Listings",
                desc: "All listings are reviewed before approval to ensure quality standards.",
                color: "from-purple-500/10 to-violet-500/10",
              },
              {
                icon: <HiOutlineHome size={22} className="text-red-500" />,
                title: "Local Focus",
                desc: "Built for Malawi with prices in Kwacha and areas you know.",
                color: "from-red-500/10 to-rose-500/10",
              },
            ].map((feature, i) => (
              <div key={i} className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary mb-4">{feature.icon}</div>
                  <h3 className="font-display font-bold text-sm">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Areas */}
        <div className="mt-16 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-background p-8">
          <h2 className="font-display text-xl font-bold text-center">Areas We Cover</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Lilongwe", "Zomba", "Dzaleka"].map((city) => (
              <span key={city} className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                <HiOutlineHome size={16} />
                {city}
              </span>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Expanding to more cities across Malawi soon!
          </p>
        </div>

        {/* Legal & Contact */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">Legal Information</h2>
            <p className="mt-2 text-sm text-muted-foreground">Read our policies and terms to understand how we protect your data and serve you better.</p>
            <div className="mt-4 space-y-3">
              <Link to="/privacy" className="flex items-center justify-between rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                <div className="flex items-center gap-3">
                  <HiOutlineShieldCheck size={20} className="text-primary" />
                  <span className="text-sm font-medium">Privacy Policy</span>
                </div>
                <HiOutlineArrowRight size={18} className="text-muted-foreground" />
              </Link>
              <Link to="/terms" className="flex items-center justify-between rounded-xl border border-border p-4 transition-all hover:border-primary/30 hover:bg-primary/5">
                <div className="flex items-center gap-3">
                  <HiOutlineDocumentText size={20} className="text-primary" />
                  <span className="text-sm font-medium">Terms of Service</span>
                </div>
                <HiOutlineArrowRight size={18} className="text-muted-foreground" />
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">Get in Touch</h2>
            <p className="mt-2 text-sm text-muted-foreground">Have questions or need help? We're here to assist you.</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">📧</span>
                yotlab.team@gmail.com
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">📱</span>
                +265 996 541 336
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">📍</span>
                Dzaleka Refugee Camp, Malawi
              </div>
              <Link to="/contact" className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20">
                Send us a Message
                <HiOutlineArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;