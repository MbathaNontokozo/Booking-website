import { useState } from "react";

export default function ReservationList({
    bookings = [],
    onCancel,
}) {
    const [cancellingId, setCancellingId] = useState(null);

    async function handleCancel(id) {
        const ok = window.confirm("Are you sure you want to cancel this reservation?");
        if (!ok) return;
        try {
            setCancellingId(id);
            const res = onCancel?.(id);
            if (res && typeof res.then === "function") {
                await res;
            }
        } finally {
            setCancellingId(null);
        }
    }

    return (
        <div className="p-6 bg-card shadow-soft rounded-xl border border-border mt-6">
            <div className="text-lg font-semibold text-foreground font-display mb-4">
                Your Reservations
            </div>
            <ul className="mt-3 space-y-3">
                {bookings.length === 0 && (
                    <li className="text-sm text-muted-foreground italic text-center py-8">
                        No reservations yet
                    </li>
                )}
                {bookings.map((b) => (
                    <li
                        key={b.id}
                        className="flex justify-between items-start border-2 border-border rounded-xl p-4 bg-secondary hover:shadow-soft transition-all duration-300"
                    >
                        <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground font-display">
                                {b.name} — {b.resource}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2 space-y-1">
                                <div>📅 {b.date} @ {b.time}</div>
                                <div>✉️ {b.email}</div>
                            </div>
                        </div>
                        <div className="ml-4">
                            <button
                                className="text-destructive hover:text-destructive/80 font-medium text-sm hover:underline disabled:opacity-50 transition-all"
                                onClick={() => handleCancel(b.id)}
                                disabled={cancellingId === b.id}
                            >
                                {cancellingId === b.id
                                    ? "Cancelling..."
                                    : "Cancel"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
