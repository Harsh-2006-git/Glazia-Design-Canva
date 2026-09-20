const canvasService = require('../services/canvasService');
const { validateCanvasPayload, validateObjectId } = require('../validators/canvasValidator');

// @desc    Create a new canvas
// @route   POST /api/canvases
// @access  Public (or Protected if auth token provided)
const createCanvas = async (req, res, next) => {
  try {
    const { isValid, errors } = validateCanvasPayload(req.body, false);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const userId = req.user ? req.user._id : null;
    const canvas = await canvasService.createCanvas(req.body, userId);

    return res.status(201).json({
      success: true,
      message: 'Canvas created successfully',
      data: canvas
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all canvases
// @route   GET /api/canvases
// @access  Public
const getCanvases = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user) {
      // If authenticated, show user's canvases or public ones
      filter.$or = [{ userId: req.user._id }, { userId: null }];
    }
    const canvases = await canvasService.getCanvases(filter);

    return res.status(200).json({
      success: true,
      count: canvases.length,
      data: canvases
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single canvas by ID
// @route   GET /api/canvases/:id
// @access  Public
const getCanvasById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid canvas ID format',
        errors: ['The provided ID is not a valid MongoDB ObjectId']
      });
    }

    const canvas = await canvasService.getCanvasById(id);

    if (!canvas) {
      return res.status(404).json({
        success: false,
        message: 'Canvas not found',
        errors: [`No canvas found with ID: ${id}`]
      });
    }

    return res.status(200).json({
      success: true,
      data: canvas
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a canvas by ID
// @route   PUT /api/canvases/:id
// @access  Public
const updateCanvas = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid canvas ID format',
        errors: ['The provided ID is not a valid MongoDB ObjectId']
      });
    }

    const { isValid, errors } = validateCanvasPayload(req.body, true);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const existingCanvas = await canvasService.getCanvasById(id);
    if (!existingCanvas) {
      return res.status(404).json({
        success: false,
        message: 'Canvas not found',
        errors: [`Cannot update. No canvas found with ID: ${id}`]
      });
    }

    const updatedCanvas = await canvasService.updateCanvas(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Canvas updated successfully',
      data: updatedCanvas
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a canvas by ID
// @route   DELETE /api/canvases/:id
// @access  Public
const deleteCanvas = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid canvas ID format',
        errors: ['The provided ID is not a valid MongoDB ObjectId']
      });
    }

    const canvas = await canvasService.deleteCanvas(id);

    if (!canvas) {
      return res.status(404).json({
        success: false,
        message: 'Canvas not found',
        errors: [`Cannot delete. No canvas found with ID: ${id}`]
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Canvas deleted successfully',
      data: { id: canvas._id }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCanvas,
  getCanvases,
  getCanvasById,
  updateCanvas,
  deleteCanvas
};
