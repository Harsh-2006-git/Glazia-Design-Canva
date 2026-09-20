const express = require('express');
const router = express.Router();
const {
  createCanvas,
  getCanvases,
  getCanvasById,
  updateCanvas,
  deleteCanvas
} = require('../controllers/canvasController');
const { optionalAuth } = require('../middleware/auth');

// Canvas REST endpoints
router.route('/')
  .post(optionalAuth, createCanvas)
  .get(optionalAuth, getCanvases);

router.route('/:id')
  .get(optionalAuth, getCanvasById)
  .put(optionalAuth, updateCanvas)
  .delete(optionalAuth, deleteCanvas);

module.exports = router;
