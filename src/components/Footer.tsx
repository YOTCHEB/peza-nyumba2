import { Link } from "react-router-dom";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineChatAlt2 } from "react-icons/hi";
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from "react-icons/fi";
import logo from "@/assets/images/peza-logo.png";
import footerBg from "@/assets/images/bg1.jpg";

const Footer = () => (
  <footer className="relative">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <img 
        src={footerBg} 
        alt="Footer background" 
        className="w-full h-full object-cover"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/95 to-black/90" />
    </div>
    
    {/* Decorative Glow Elements */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]" />
    
    <div className="container relative py-16">
      {/* Main Footer Content */}
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-5">
            <img src={logo} alt="Peza Nyumba Logo" className="h-11 w-11 rounded-xl shadow-lg" />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">Peza Nyumba</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
            Malawi's #1 rental platform. We connect students, families, and professionals 
            with their perfect home — no agency fees, no hassle.
          </p>
          
          {/* Contact Info */}
          <div className="space-y-3">
            <a href="tel:+265996541336" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <HiOutlinePhone size={18} className="text-primary" />
              </div>
              <span>+265 996 541 336</span>
            </a>
            <a href="mailto:info@pezanyumba.mw" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <HiOutlineMail size={18} className="text-primary" />
              </div>
              <span>yotlab.team@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <HiOutlineLocationMarker size={18} className="text-primary" />
              </div>
              <span>Dzaleka Refugee Camp , Malawi</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-5">Quick Links</h4>
          <div className="space-y-3">
            <Link to="/" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Home</Link>
            <Link to="/listings" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Explore Listings</Link>
            <Link to="/map" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Map View</Link>
            <Link to="/favorites" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Saved Listings</Link>
            <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">About Us</Link>
            <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Contact</Link>
          </div>
        </div>

        {/* Property Types */}
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-5">Properties</h4>
          <div className="space-y-3">
            <Link to="/listings?type=House" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Houses</Link>
            <Link to="/listings?type=Room" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Rooms</Link>
            <Link to="/listings?type=Apartment" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Apartments</Link>
            <Link to="/listings?type=Bedsitter" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Bedsitters</Link>
            <Link to="/listings?type=Shop/Office" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">Commercial</Link>
            <Link to="/listings" className="block text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all">View All</Link>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-5">Stay Updated</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe for latest listings and tips
          </p>
          <div className="flex gap-2 mb-6">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 rounded-xl border border-border/60 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:shadow-md hover:shadow-primary/25 transition-all">
              →
            </button>
          </div>
          
          {/* Social Links */}
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-4">Follow Us</h4>
          <div className="flex gap-3">
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-white text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all">
              <FiFacebook size={18} />
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-white text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all">
              <FiInstagram size={18} />
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-white text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all">
              <FiTwitter size={18} />
            </a>
            <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-white text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all">
              <FiLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-border/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © 2026 Peza Nyumba. All rights reserved. Built with <span className="text-primary">❤️</span> in Malawi 🇲🇼
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;