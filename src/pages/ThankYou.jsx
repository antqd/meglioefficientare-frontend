import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const REDIRECT_SECONDS = 5;

export default function ThankYouPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) navigate("/");
  }, [secondsLeft, navigate]);

  const message =
    location.state?.message ||
    "Grazie! La tua richiesta è stata ricevuta e il nostro team ti ricontatterà a breve.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full rounded-3xl border border-orange-100 bg-white p-8 shadow-lg text-center space-y-4">
        <span className="inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-700 w-16 h-16 text-3xl">
          ✅
        </span>
        <h1 className="text-3xl font-bold text-slate-900">Richiesta inviata correttamente</h1>
        <p className="text-base text-slate-700 leading-relaxed">{message}</p>
        <p className="text-sm text-slate-500">
          Verrai reindirizzato alla home tra <strong>{secondsLeft}</strong> secondi.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            className="rounded-full border border-orange-200 px-5 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-50"
            onClick={() => navigate(-1)}
          >
            Torna indietro
          </button>
          <Link
            to="/"
            className="rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700"
          >
            Vai alla home ora
          </Link>
        </div>
      </div>
    </div>
  );
}
