import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { HiOutlineMenu, HiX, HiOutlineHeart, HiOutlineHome, HiOutlineViewGrid, HiOutlineInformationCircle, HiOutlineLogin, HiOutlineLogout, HiOutlineUser, HiOutlineShieldCheck, HiOutlineMap } from "react-icons/hi";
import logo from "@/assets/images/peza-logo.png";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home", icon: <HiOutlineHome size={18} /> },
    { to: "/listings", label: "Explore", icon: <HiOutlineViewGrid size={18} /> },
    { to: "/map", label: "Map", icon: <HiOutlineMap size={18} /> },
    { to: "/about", label: "About", icon: <HiOutlineInformationCircle size={18} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-xl shadow-sm shadow-black/5">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="Peza Nyumba Logo" className="h-9 w-9 rounded-xl shadow-sm" />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">Peza Nyumba</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                isActive(l.to)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
              }`}
            >
              {l.icon} {l.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link to="/favorites" className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all ${isActive("/favorites") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"}`}>
              <HiOutlineHeart size={18} /> Saved
            </Link>
          )}
          {user?.role === "landlord" && (
            <Link to="/dashboard" className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all ${isActive("/dashboard") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"}`}>
              <HiOutlineUser size={18} /> Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-all ${isActive("/admin") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"}`}>
              <HiOutlineShieldCheck size={18} /> Admin
            </Link>
          )}
          <div className="ml-2 h-6 w-px bg-border/60" />
          {isAuthenticated ? (
            <button onClick={logout} className="ml-2 flex items-center gap-1.5 rounded-xl border border-border/60 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all">
              <HiOutlineLogout size={18} /> Logout
            </button>
          ) : (
            <Link to="/login" className="ml-2 flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-all hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5">
              <HiOutlineLogin size={18} /> Login
            </Link>
          )}
        </nav>

        <button onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/70 sm:hidden transition-all touch-manipulation" aria-label="Toggle menu">
          {open ? <HiX size={22} /> : <HiOutlineMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 sm:hidden animate-in fade-in duration-200" onClick={() => setOpen(false)} />
      )}

      {/* Mobile menu drawer - slides from left */}
      <div className={`fixed left-0 top-0 z-50 h-full w-[280px] border-r shadow-xl sm:hidden bg-card transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b px-4">
          <span className="font-display text-lg font-bold">Menu</span>
          <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
            <HiX size={24} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-4 overflow-y-auto safe-area-bottom bg-card">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors touch-manipulation ${isActive(l.to) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary/50"}`}>
              {l.icon} {l.label}
            </Link>
          ))}
          {isAuthenticated && (
            <Link to="/favorites" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/50 touch-manipulation">
              <HiOutlineHeart size={18} /> Saved
            </Link>
          )}
          {user?.role === "landlord" && (
            <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/50 touch-manipulation">
              <HiOutlineUser size={18} /> Dashboard
            </Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary/50 touch-manipulation">
              <HiOutlineShieldCheck size={18} /> Admin
            </Link>
          )}
          <div className="my-3 border-t" />
          {isAuthenticated ? (
            <button onClick={() => { logout(); setOpen(false); }} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 touch-manipulation">
              <HiOutlineLogout size={18} /> Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground touch-manipulation">
              <HiOutlineLogin size={18} /> Login / Register
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;