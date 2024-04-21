const express = require('express');
const router = express.Router();
const { incrementViewCount } = require('../controllers/viewController');
const { fetchData, fetchUserVisits } = require('../controllers/dataController');

router.post('/increment-view-count', incrementViewCount);
router.get('/data', fetchData);
router.get('/user-visits/:id', fetchUserVisits);

module.exports = router;
