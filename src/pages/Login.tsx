import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { HiOutlineLockClosed, HiOutlinePhone } from "react-icons/hi";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!phone || !password) { setError("Please fill in all fields"); return; }
    const success = await login(phone, password);
    if (success) navigate("/");
    else setError("Invalid phone number or password");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-sm">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto">
              <HiOutlineLockClosed size={24} className="text-primary" />
            </div>
            <h1 className="mt-4 text-center font-display text-2xl font-bold">Welcome Back</h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">Sign in to Peza Nyumba</p>

            {error && <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Phone Number</label>
                <div className="relative mt-1">
                  <HiOutlinePhone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-border bg-secondary pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="+265888123456" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Password</label>
                <div className="relative mt-1">
                  <HiOutlineLockClosed size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-border bg-secondary pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="••••••••" />
                </div>
              </div>
              <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20">
                Sign In
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;