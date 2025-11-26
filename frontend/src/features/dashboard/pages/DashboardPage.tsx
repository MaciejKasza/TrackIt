import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../../lib/api";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      setLoading(true);
      setError("");
      try {
        const data = await fetchProfile(token);
        setUser(data);
      } catch (err: any) {
        setError(err.message ?? "Błąd pobierania profilu");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-50">
            TrackIt <span className="text-emerald-400">Dashboard</span>
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-400 hover:text-slate-100"
          >
            Wyloguj
          </button>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <p className="text-slate-100">Jesteś zalogowany 🎉</p>

          {loading && (
            <p className="text-sm text-slate-400">Ładowanie profilu...</p>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          {user && (
            <div>
              <p className="text-xs text-slate-400 mb-2">Dane z tokena:</p>
              <pre className="text-xs bg-slate-950/60 border border-slate-800 rounded-lg p-3 text-slate-200 overflow-auto max-h-60">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
