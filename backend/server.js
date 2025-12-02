const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const resources = [
    'Table AB',
    'Table C',
    'Room BB'
];

const bookings = [];
let nextId = 1;

function pad(n) {
    return n.toString().padStart(2, '0');
}

function generateSlots() {
    const slots = [];
    const startHour = 9;
    const endHour = 17;
    for (let h = startHour; h < endHour; h++) {
        slots.push(`${pad(h)}:00`);
        slots.push(`${pad(h)}:30`);
    }
    
    slots.push(`${pad(endHour)}:00`);
    return slots;
}

function getAvailableSlots(date, resource) {
    const all = generateSlots();
    const bookedTimes = bookings
        .filter(b => b.date === date && b.resource === resource)
        .map(b => b.time);
    return all.filter(t => !bookedTimes.includes(t));
}

app.get('/', (req, res) => {
    res.send('Booking API: use /api/ endpoints');
});

// GET /api/slots?date=YYYY-MM-DD&resource=Resource+Name
app.get('/api/slots', (req, res) => {
    const { date, resource } = req.query;
    if (!date || !resource) {
        return res.status(400).json({ error: 'Missing query params `date` and `resource`' });
    }
    if (!resources.includes(resource)) {
        return res.status(400).json({ error: 'Unknown resource' });
    }
    const slots = getAvailableSlots(String(date), String(resource));
    res.json({ date, resource, slots });
});

// POST /api/bookings
// body: { resource, date, time, name, email }
app.post('/api/bookings', (req, res) => {
    const { resource, date, time, name, email } = req.body;
    if (!resource || !date || !time || !name || !email) {
        return res.status(400).json({ error: 'Missing , fields are required ' });
    }
    if (!resources.includes(resource)) {
        return res.status(400).json({ error: 'Unknown resource' });
    }
    // conflict detection: exact slot taken
    const conflict = bookings.some(b => b.resource === resource && b.date === date && b.time === time);
    if (conflict) {
        return res.status(409).json({ error: 'This time slot is  already booked' });
    }
    const booking = {
        id: String(nextId++),
        resource,
        date,
        time,
        name,
        email,
        createdAt: new Date().toISOString(),
    };
    bookings.push(booking);
    res.status(201).json(booking);
});

// GET /api/bookings/:date/:resource
app.get('/api/bookings/:date/:resource', (req, res) => {
    const { date, resource } = req.params;
    const results = bookings.filter(b => b.date === date && b.resource === resource);
    res.json(results);
});

// DELETE /api/bookings/:id
app.delete('/api/bookings/:id', (req, res) => {
    const { id } = req.params;
    const idx = bookings.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Bookings are not found' });
    const [removed] = bookings.splice(idx, 1);
    res.json(removed);
});

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Booking API listening at http://localhost:${port}`);
    });
}

module.exports = app;