import { Link } from "react-router-dom";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineChatAlt2 } from "react-icons/hi";
import logo from "@/assets/images/peza-logo.png";

const Footer = () => (
  <footer className="border-t bg-card">
    <div className="container py-10">
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Peza Nyumba Logo" className="h-10 w-10 rounded-full" />
            <span className="font-display text-lg font-bold tracking-tight">Peza Nyumba</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Malawi's premium rental platform. Connecting students, families, and professionals with their perfect home.</p>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">Navigation</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">Home</Link>
            <Link to="/listings" className="text-foreground/70 hover:text-primary transition-colors">Explore Listings</Link>
            <Link to="/map" className="text-foreground/70 hover:text-primary transition-colors">Map View</Link>
            <Link to="/favorites" className="text-foreground/70 hover:text-primary transition-colors">Saved Listings</Link>
            <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground">Legal</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link to="/privacy" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © 2026 Peza Nyumba. All rights reserved. Built with ❤️ in Malawi 🇲🇼
      </div>
    </div>
  </footer>
);

export default Footer;