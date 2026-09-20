const mongoose = require('mongoose');

const CanvasElementSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['rectangle', 'circle', 'star', 'triangle', 'diamond', 'hexagon', 'line', 'arrow', 'text', 'badge']
  },
  x: {
    type: Number,
    required: true,
    default: 0
  },
  y: {
    type: Number,
    required: true,
    default: 0
  },
  width: {
    type: Number,
    required: true,
    min: 1,
    default: 100
  },
  height: {
    type: Number,
    required: true,
    min: 1,
    default: 100
  },
  rotation: {
    type: Number,
    default: 0
  },
  fill: {
    type: String,
    default: '#2563eb'
  },
  stroke: {
    type: String,
    default: ''
  },
  strokeWidth: {
    type: Number,
    default: 0,
    min: 0
  },
  cornerRadius: {
    type: Number,
    default: 0,
    min: 0
  },
  text: {
    type: String,
    default: ''
  },
  fontSize: {
    type: Number,
    default: 24,
    min: 6
  },
  fontFamily: {
    type: String,
    default: 'Inter'
  },
  visible: {
    type: Boolean,
    default: true
  }
}, { _id: false });

const CanvasSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Canvas name is required'],
      trim: true,
      maxlength: [120, 'Canvas name cannot exceed 120 characters'],
      default: 'Untitled Canvas'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: ''
    },
    width: {
      type: Number,
      required: [true, 'Canvas width is required'],
      min: [100, 'Width must be at least 100px'],
      max: [4000, 'Width cannot exceed 4000px'],
      default: 1000
    },
    height: {
      type: Number,
      required: [true, 'Canvas height is required'],
      min: [100, 'Height must be at least 100px'],
      max: [4000, 'Height cannot exceed 4000px'],
      default: 650
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    elements: {
      type: [CanvasElementSchema],
      default: []
    },
    thumbnail: {
      type: String,
      default: ''
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Canvas', CanvasSchema);
