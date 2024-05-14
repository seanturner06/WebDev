const express = require('express');
const router = express.Router();

const frontendRouter = require('./frontendRoutes');
const apiRouter = require('./APIroutes');

router.use(frontendRouter);
router.use('/api', apiRouter);

module.exports = router;