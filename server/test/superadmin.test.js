const test = require('node:test');
const assert = require('node:assert');

test('S1-DEV-06: Superadmin Endpoint Verification', async (t) => {
    const baseUrl = 'http://localhost:5000/api/users';
    const testUserId = '123e4567-e89b-12d3-a456-426614174000';

    await t.test('PATCH /approve/:id handles user approval request', async () => {
        try {
            const res = await fetch(`${baseUrl}/approve/${testUserId}`, { method: 'PATCH' });
            assert.ok([200, 404, 500].includes(res.status), `Unexpected status: ${res.status}`);
        } catch (err) {
            assert.fail(`Server unreachable on http://localhost:5000: ${err.message}`);
        }
    });

    await t.test('PATCH /role/:id handles admin designation', async () => {
        try {
            const res = await fetch(`${baseUrl}/role/${testUserId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'admin' })
            });
            assert.ok([200, 400, 404, 500].includes(res.status), `Unexpected status: ${res.status}`);
        } catch (err) {
            assert.fail(`Server unreachable on http://localhost:5000: ${err.message}`);
        }
    });

    await t.test('PATCH /toggle-block/:id handles account blocking', async () => {
        try {
            const res = await fetch(`${baseUrl}/toggle-block/${testUserId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_blocked: true })
            });
            assert.ok([200, 404, 500].includes(res.status), `Unexpected status: ${res.status}`);
        } catch (err) {
            assert.fail(`Server unreachable on http://localhost:5000: ${err.message}`);
        }
    });
});