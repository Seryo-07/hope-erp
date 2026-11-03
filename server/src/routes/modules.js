const express = require('express');
const router = express.Router();
const checkPermission = require('../middleware/checkPermission');

// Protected Customer module route
router.get('/customer', checkPermission('Customer', 'can_view'), (req, res) => {
    res.json({ message: 'Customer module data accessed successfully.' });
});

// Protected Product module route
router.get('/product', checkPermission('Product', 'can_view'), (req, res) => {
    res.json({ message: 'Product module data accessed successfully.' });
});

// Protected Human Resources module route
router.get('/hr', checkPermission('Human Resources', 'can_view'), (req, res) => {
    res.json({ message: 'Human Resources module data accessed successfully.' });
});

// Protected Sales module route
router.get('/sales', checkPermission('Sales', 'can_view'), (req, res) => {
    res.json({ message: 'Sales module data accessed successfully.' });
});

// Protected Reports module route
router.get('/reports', checkPermission('Reports', 'can_view'), (req, res) => {
    res.json({ message: 'Reports module data accessed successfully.' });
});

module.exports = router;