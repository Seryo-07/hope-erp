const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load server/.env FIRST

const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app'); // Required AFTER env variables are loaded

let server;
const PORT = 5001;
const baseUrl = `http://localhost:${PORT}/api/modules`;

test.before((t, done) => {
    server = app.listen(PORT, () => done());
});

test.after((t, done) => {
    server.close(() => done());
});

test('S1-DEV-08: Server-Side Module Permission Enforcement', async (t) => {
    await t.test('GET /customer blocks requests without x-user-id header', async () => {
        try {
            const res = await fetch(`${baseUrl}/customer`);
            assert.strictEqual(res.status, 401, 'Should return 401 Unauthorized');
        } catch (err) {
            assert.fail(`Request failed: ${err.message}`);
        }
    });

    await t.test('GET /customer enforces server-side check with invalid user ID', async () => {
        try {
            const res = await fetch(`${baseUrl}/customer`, {
                headers: { 'x-user-id': '00000000-0000-0000-0000-000000000000' }
            });
            assert.strictEqual(res.status, 401, 'Should return 401 Unauthorized for fake user ID');
        } catch (err) {
            assert.fail(`Request failed: ${err.message}`);
        }
    });
});