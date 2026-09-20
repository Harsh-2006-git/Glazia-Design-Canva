const mongoose = require('mongoose');

const validateCanvasPayload = (data, isUpdate = false) => {
  const errors = [];

  // If not update, name, width, height are required
  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Canvas name is required and must be a non-empty string');
    } else if (data.name.length > 120) {
      errors.push('Canvas name cannot exceed 120 characters');
    }
  }

  if (!isUpdate || data.width !== undefined) {
    const width = Number(data.width);
    if (isNaN(width) || width < 100 || width > 4000) {
      errors.push('Canvas width must be a number between 100 and 4000');
    }
  }

  if (!isUpdate || data.height !== undefined) {
    const height = Number(data.height);
    if (isNaN(height) || height < 100 || height > 4000) {
      errors.push('Canvas height must be a number between 100 and 4000');
    }
  }

  if (data.backgroundColor !== undefined) {
    if (typeof data.backgroundColor !== 'string' || data.backgroundColor.trim().length === 0) {
      errors.push('backgroundColor must be a valid color string');
    }
  }

  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== 'string') {
      errors.push('Description must be a string');
    } else if (data.description.length > 500) {
      errors.push('Description cannot exceed 500 characters');
    }
  }

  if (data.elements !== undefined) {
    if (!Array.isArray(data.elements)) {
      errors.push('Elements must be an array');
    } else {
      data.elements.forEach((el, index) => {
        if (!el || typeof el !== 'object') {
          errors.push(`Element at index ${index} must be an object`);
          return;
        }
        if (!el.id || typeof el.id !== 'string') {
          errors.push(`Element at index ${index} must have a valid string id`);
        }
        const ALLOWED_TYPES = ['rectangle', 'circle', 'star', 'triangle', 'diamond', 'hexagon', 'line', 'arrow', 'text', 'badge'];
        if (!ALLOWED_TYPES.includes(el.type)) {
          errors.push(`Element at index ${index} has invalid type: ${el.type}. Allowed types: ${ALLOWED_TYPES.join(', ')}`);
        }
        if (typeof el.x !== 'number' || isNaN(el.x)) {
          errors.push(`Element at index ${index} (${el.id || 'unnamed'}) must have a numeric x position`);
        }
        if (typeof el.y !== 'number' || isNaN(el.y)) {
          errors.push(`Element at index ${index} (${el.id || 'unnamed'}) must have a numeric y position`);
        }
        if (typeof el.width !== 'number' || isNaN(el.width) || el.width < 1) {
          errors.push(`Element at index ${index} (${el.id || 'unnamed'}) must have a positive width`);
        }
        if (typeof el.height !== 'number' || isNaN(el.height) || el.height < 1) {
          errors.push(`Element at index ${index} (${el.id || 'unnamed'}) must have a positive height`);
        }
        if (el.rotation !== undefined && (typeof el.rotation !== 'number' || isNaN(el.rotation))) {
          errors.push(`Element at index ${index} (${el.id || 'unnamed'}) rotation must be a number`);
        }
        if (el.type === 'text' && el.text !== undefined && typeof el.text !== 'string') {
          errors.push(`Element at index ${index} (${el.id || 'unnamed'}) text must be a string`);
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = {
  validateCanvasPayload,
  validateObjectId
};
