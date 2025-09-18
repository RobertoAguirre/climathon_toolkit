import express from 'express';
import Tool, { ITool } from '../models/Tool';

const router = express.Router();

// GET /api/tools - Obtener todas las herramientas
router.get('/', async (req, res) => {
  try {
    const { category, active } = req.query;

    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (active !== undefined) {
      query.isActive = active === 'true';
    }

    const tools = await Tool.find(query)
      .sort({ order: 1, name: 1 })
      .select('-__v');

    res.json({
      success: true,
      tools: tools.map(tool => ({
        id: tool.id,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        color: tool.color,
        icon: tool.icon,
        features: tool.features,
        tutorial: tool.tutorial,
        useCase: tool.useCase,
        difficulty: tool.difficulty,
        price: tool.price,
        isActive: tool.isActive,
        order: tool.order,
        metadata: tool.metadata
      }))
    });

  } catch (error) {
    console.error('Error obteniendo herramientas:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudieron obtener las herramientas'
    });
  }
});

// GET /api/tools/:id - Obtener herramienta específica
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const tool = await Tool.findOne({ id });

    if (!tool) {
      return res.status(404).json({
        error: 'Herramienta no encontrada',
        message: `No existe una herramienta con ID: ${id}`
      });
    }

    res.json({
      success: true,
      tool: {
        id: tool.id,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        color: tool.color,
        icon: tool.icon,
        features: tool.features,
        tutorial: tool.tutorial,
        useCase: tool.useCase,
        difficulty: tool.difficulty,
        price: tool.price,
        isActive: tool.isActive,
        order: tool.order,
        metadata: tool.metadata
      }
    });

  } catch (error) {
    console.error('Error obteniendo herramienta:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo obtener la herramienta'
    });
  }
});

// GET /api/tools/categories - Obtener categorías disponibles
router.get('/categories', async (req, res) => {
  try {
    const categories = await Tool.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      categories: categories.sort()
    });

  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudieron obtener las categorías'
    });
  }
});

// POST /api/tools - Crear nueva herramienta (solo admin)
router.post('/', async (req, res) => {
  try {
    const toolData = req.body;

    // Validar datos requeridos
    const requiredFields = ['id', 'name', 'description', 'category', 'color', 'icon', 'features', 'tutorial', 'useCase', 'difficulty', 'price'];
    
    for (const field of requiredFields) {
      if (!toolData[field]) {
        return res.status(400).json({
          error: 'Datos incompletos',
          message: `El campo ${field} es requerido`
        });
      }
    }

    // Verificar si ya existe una herramienta con ese ID
    const existingTool = await Tool.findOne({ id: toolData.id });
    if (existingTool) {
      return res.status(409).json({
        error: 'Herramienta duplicada',
        message: `Ya existe una herramienta con ID: ${toolData.id}`
      });
    }

    const tool = new Tool(toolData);
    await tool.save();

    res.status(201).json({
      success: true,
      message: 'Herramienta creada correctamente',
      tool: {
        id: tool.id,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        color: tool.color,
        icon: tool.icon,
        features: tool.features,
        tutorial: tool.tutorial,
        useCase: tool.useCase,
        difficulty: tool.difficulty,
        price: tool.price,
        isActive: tool.isActive,
        order: tool.order,
        metadata: tool.metadata
      }
    });

  } catch (error) {
    console.error('Error creando herramienta:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo crear la herramienta'
    });
  }
});

// PUT /api/tools/:id - Actualizar herramienta (solo admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const tool = await Tool.findOneAndUpdate(
      { id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!tool) {
      return res.status(404).json({
        error: 'Herramienta no encontrada',
        message: `No existe una herramienta con ID: ${id}`
      });
    }

    res.json({
      success: true,
      message: 'Herramienta actualizada correctamente',
      tool: {
        id: tool.id,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        color: tool.color,
        icon: tool.icon,
        features: tool.features,
        tutorial: tool.tutorial,
        useCase: tool.useCase,
        difficulty: tool.difficulty,
        price: tool.price,
        isActive: tool.isActive,
        order: tool.order,
        metadata: tool.metadata
      }
    });

  } catch (error) {
    console.error('Error actualizando herramienta:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo actualizar la herramienta'
    });
  }
});

// DELETE /api/tools/:id - Eliminar herramienta (solo admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const tool = await Tool.findOneAndDelete({ id });

    if (!tool) {
      return res.status(404).json({
        error: 'Herramienta no encontrada',
        message: `No existe una herramienta con ID: ${id}`
      });
    }

    res.json({
      success: true,
      message: 'Herramienta eliminada correctamente'
    });

  } catch (error) {
    console.error('Error eliminando herramienta:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo eliminar la herramienta'
    });
  }
});

export default router;
