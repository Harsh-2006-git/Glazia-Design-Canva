const Canvas = require('../models/Canvas');

class CanvasService {
  async createCanvas(data, userId = null) {
    const canvasData = {
      ...data,
      userId: userId || null
    };
    const canvas = await Canvas.create(canvasData);
    return canvas;
  }

  async getCanvases(filter = {}) {
    // Return sorted by most recently updated first, selecting summary fields for lightweight payload
    const canvases = await Canvas.find(filter)
      .select('_id name description width height backgroundColor elements thumbnail createdAt updatedAt')
      .sort({ updatedAt: -1 });
    return canvases;
  }

  async getCanvasById(id) {
    const canvas = await Canvas.findById(id);
    return canvas;
  }

  async updateCanvas(id, data) {
    const updatedCanvas = await Canvas.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
    return updatedCanvas;
  }

  async deleteCanvas(id) {
    const deletedCanvas = await Canvas.findByIdAndDelete(id);
    return deletedCanvas;
  }
}

module.exports = new CanvasService();
