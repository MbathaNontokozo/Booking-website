import { useState, useEffect } from "react";
import ResourceSelector from "./components/ResourceSelector";
import DatePicker from "./components/DatePicker";
import AvailabilityView from "./components/AvailabilityView";
import BookingForm from "./components/BookingForm";
import ReservationList from "./components/ReservationList";
import {
    getSlots,
    createBooking,
    getBookings,
    cancelBooking,
} from "./functions/api";

function App() {
    const [resource, setResource] = useState("Table AB");
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            if (!date) return;
            setLoading(true);
            setError(null);
            try {
                const res = await getSlots(date, resource);
                setSlots(res.slots || []);
                const b = await getBookings(date, resource);
                setBookings(b || []);
            } catch (err) {
                setError(err?.message || String(err));
            } finally {
                setLoading(false);
            }
        }
        load(getSlots);
    }, [date, resource]);

    async function handleSubmit(payload) {
        if (!date || !selectedTime) return setError("Select date and time");
        setError(null);
        try {
            const created = await createBooking({
                ...payload,
                date,
                time: selectedTime,
            });

            const res = await getSlots(date, resource);
            setSlots(res.slots || []);
            const b = await getBookings(date, resource);
            setBookings(b || []);
            setSelectedTime(null);
            console.log("created", created);
        } catch (err) {
            setError(err?.message || String(err));
        }
    }

    async function handleCancel(id) {
        try {
            await cancelBooking(id);
            const b = await getBookings(date, resource);
            setBookings(b || []);
            const res = await getSlots(date, resource);
            setSlots(res.slots || []);
        } catch (err) {
            setError(err?.message || String(err));
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Booking and Reservations Site</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                    <ResourceSelector value={resource} onChange={setResource} />
                    <DatePicker value={date} onChange={setDate} />
                </div>
                <div className="md:col-span-2">
                    {loading && <div className="text-sm text-gray-500">Loading...</div>}
                    {error && <div className="text-sm text-orange-600">{error}</div>}

                    <AvailabilityView
                        slots={slots}
                        selected={selectedTime}
                        onSelect={(t) => setSelectedTime(t)}
                    />
                    <BookingForm
                        defaultResource={resource}
                        defaultTime={selectedTime || undefined}
                        onSubmit={handleSubmit}
                    />
                    <ReservationList bookings={bookings} onCancel={handleCancel} />
                </div>
            </div>
        </div>
    );
}

export default App;
