import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth, UserRole } from "@/lib/auth";
import { HiOutlineUserAdd } from "react-icons/hi";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", password: "", role: "tenant" as UserRole });
  const [error, setError] = useState("");

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.fullName || !form.phone || !form.password) { setError("Please fill in all required fields"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    const success = await register(form);
    if (success) navigate("/");
    else setError("An account with this phone number already exists");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="pt-16">
          <div className="container flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-sm">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto">
              <HiOutlineUserAdd size={24} className="text-primary" />
            </div>
            <h1 className="mt-4 text-center font-display text-2xl font-bold">Create Account</h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">Join Peza Nyumba today</p>

            {error && <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">{error}</div>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Full Name *</label>
                <input type="text" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="John Banda" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Phone Number *</label>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="+265 888 123 456" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Email (optional)</label>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Password *</label>
                <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="At least 6 characters" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">I am a...</label>
                <div className="mt-2 flex gap-3">
                  {(["tenant", "landlord"] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => update("role", role)}
                      className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all ${form.role === role ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}
                    >
                      {role === "tenant" ? "🔍 Tenant" : "🏠 Landlord"}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20">
                Create Account
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;