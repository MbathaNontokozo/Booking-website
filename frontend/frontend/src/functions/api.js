
const API_BASE_URL = 'https://booking-website-ru6a.onrender.com';

export async function getSlots(date, resource) {
  const res = await fetch(
    `${API_BASE_URL}/api/slots?date=${encodeURIComponent(date)}&resource=${encodeURIComponent(resource)}`
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createBooking(payload) {
  const res = await fetch(`${API_BASE_URL}/api/bookings`, {
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
  const res = await fetch(
    `${API_BASE_URL}/api/bookings/${encodeURIComponent(date)}/${encodeURIComponent(resource)}`
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function cancelBooking(id) {
  const res = await fetch(
    `${API_BASE_URL}/api/bookings/${encodeURIComponent(id)}`,
    { method: 'DELETE' }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
