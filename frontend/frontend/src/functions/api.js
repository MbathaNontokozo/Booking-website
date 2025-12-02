// Get API base URL from environment variable or use relative path for dev
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function getSlots(date, resource) {
  const res = await fetch(`${https://booking-website-ru6a.onrender.com}/api/slots?date=${encodeURIComponent(date)}&resource=${encodeURIComponent(resource)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createBooking(payload) {
  const res = await fetch(`${https://booking-website-ru6a.onrender.com}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || res.statusText);
  }
  return res.json();
}

export async function getBookings(date, resource) {
  const res = await fetch(`${https://booking-website-ru6a.onrender.com}/api/bookings/${encodeURIComponent(date)}/${encodeURIComponent(resource)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function cancelBooking(id) {
  const res = await fetch(`${https://booking-website-ru6a.onrender.com}/api/bookings/${encodeURIComponent(id)}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
