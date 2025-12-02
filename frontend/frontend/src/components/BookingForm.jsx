import { useState } from "react";

export default function BookingForm({ defaultTime, defaultResource, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  const canSubmit = !!name && !!email && !!defaultTime && !!defaultResource;

  async function submit() {
    setLocalError(null);
    if (!canSubmit) {
      setLocalError("Please fill in your name, email and select a time slot");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    try {
      setSubmitting(true);
      const result = onSubmit?.({
        name,
        email,
        time: defaultTime,
        resource: defaultResource,
      });
      if (result && typeof result.then === "function") {
        await result;
      }
      setName("");
      setEmail("");
    } catch (err) {
      setLocalError(err?.message || String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-6 bg-pink-50 border-2 border-pink-200 rounded-xl shadow-md mt-6">
      <div className="text-xl font-bold text-pink-600 mb-4">Complete Your Booking</div>

      <div className="mt-3 p-4 bg-pink-100 rounded-lg text-sm text-pink-800 font-semibold">
        <div className="flex items-center justify-between mb-2">
          <span>Resource:</span>
          <span className="font-bold">{defaultResource || "-"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Time:</span>
          <span className="font-bold">{defaultTime || "-"}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-semibold text-pink-600 mb-2">Name & Surname</label>
          <input
            placeholder="Enter your full name"
            className="w-full border border-pink-300 bg-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-pink-600 mb-2">Email Address</label>
          <input
            placeholder="your.email@example.com"
            type="email"
            className="w-full border border-pink-300 bg-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {localError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm rounded-lg border border-red-200 font-semibold">
          {localError}
        </div>
      )}

      <button
        className="mt-6 w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        onClick={submit}
        disabled={submitting || !canSubmit}
      >
        {submitting ? "Confirming..." : "Confirm Booking"}
      </button>
    </div>
  );
}
