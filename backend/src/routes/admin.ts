import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import ChatMessage from '../models/ChatMessage';
import Tool from '../models/Tool';

const router = express.Router();

// Configurar multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = process.env.UPLOAD_PATH || './uploads';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') // 10MB por defecto
  },
  fileFilter: (req, file, cb) => {
    // Permitir solo ciertos tipos de archivo
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|mp4|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  }
});

// GET /api/admin/dashboard - Estadísticas del dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalMessages,
      totalTools,
      activeTools,
      recentMessages
    ] = await Promise.all([
      ChatMessage.countDocuments(),
      Tool.countDocuments(),
      Tool.countDocuments({ isActive: true }),
      ChatMessage.find()
        .sort({ timestamp: -1 })
        .limit(10)
        .select('content role timestamp')
    ]);

    // Estadísticas por categoría de herramientas
    const toolsByCategory = await Tool.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Mensajes por día (últimos 7 días)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const messagesByDay = await ChatMessage.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$timestamp' },
            month: { $month: '$timestamp' },
            day: { $dayOfMonth: '$timestamp' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalMessages,
        totalTools,
        activeTools,
        toolsByCategory,
        messagesByDay,
        recentMessages: recentMessages.map(msg => ({
          content: msg.content.substring(0, 100) + (msg.content.length > 100 ? '...' : ''),
          role: msg.role,
          timestamp: msg.timestamp
        }))
      }
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudieron obtener las estadísticas'
    });
  }
});

// GET /api/admin/chat-analytics - Análisis del chat
router.get('/chat-analytics', async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days as string));

    // Mensajes por rol
    const messagesByRole = await ChatMessage.aggregate([
      { $match: { timestamp: { $gte: daysAgo } } },
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    // Sesiones activas
    const activeSessions = await ChatMessage.distinct('sessionId', {
      timestamp: { $gte: daysAgo }
    });

    // Palabras más frecuentes en mensajes de usuario
    const userMessages = await ChatMessage.find({
      role: 'user',
      timestamp: { $gte: daysAgo }
    }).select('content');

    const wordCount: { [key: string]: number } = {};
    userMessages.forEach(msg => {
      const words = msg.content.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 3);
      
      words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });
    });

    const topWords = Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([word, count]) => ({ word, count }));

    res.json({
      success: true,
      analytics: {
        messagesByRole,
        activeSessions: activeSessions.length,
        topWords,
        period: `${days} días`
      }
    });

  } catch (error) {
    console.error('Error obteniendo análisis del chat:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo obtener el análisis del chat'
    });
  }
});

// POST /api/admin/tools/seed - Poblar base de datos con herramientas por defecto
router.post('/tools/seed', async (req, res) => {
  try {
    // Verificar si ya existen herramientas
    const existingTools = await Tool.countDocuments();
    if (existingTools > 0) {
      return res.status(409).json({
        error: 'Base de datos ya poblada',
        message: 'Ya existen herramientas en la base de datos'
      });
    }

    const defaultTools = [
      {
        id: 'uizard',
        name: 'UIZARD',
        description: 'Crea prototipos rápidos y completos de UI para apps web y móviles',
        category: 'Diseño UI/UX',
        color: 'bg-blue',
        icon: '🎨',
        features: [
          'Conversión de bocetos a prototipos',
          'Templates predefinidos',
          'Colaboración en tiempo real',
          'Exportación a código'
        ],
        tutorial: {
          title: 'Tutorial UIZARD para climathones',
          duration: '15 min',
          description: 'Aprende a crear prototipos profesionales en minutos'
        },
        useCase: 'Perfecto para validar ideas de UI rápidamente y presentar conceptos visuales a tu equipo.',
        difficulty: 'Fácil',
        price: 'Gratis (plan básico)',
        order: 1,
        metadata: {
          website: 'https://uizard.io',
          documentation: 'https://help.uizard.io'
        }
      },
      {
        id: 'make',
        name: 'MAKE',
        description: 'Construye automatizaciones entre diferentes herramientas y aplicaciones',
        category: 'Automatización',
        color: 'bg-light-purple',
        icon: '⚡',
        features: [
          'Integración con 1000+ apps',
          'Flujos de trabajo visuales',
          'Triggers automáticos',
          'Análisis de datos'
        ],
        tutorial: {
          title: 'Automatizaciones con MAKE',
          duration: '20 min',
          description: 'Conecta herramientas y automatiza procesos repetitivos'
        },
        useCase: 'Ideal para automatizar reportes, notificaciones y flujos de datos entre aplicaciones.',
        difficulty: 'Intermedio',
        price: 'Gratis (plan básico)',
        order: 2,
        metadata: {
          website: 'https://make.com',
          documentation: 'https://www.make.com/en/help'
        }
      },
      {
        id: 'cursor',
        name: 'Cursor IA',
        description: 'Herramienta de programación centrada en IA para crear software sin código',
        category: 'Desarrollo',
        color: 'bg-light-green',
        icon: '🤖',
        features: [
          'Programación con IA',
          'Generación de código',
          'Debugging automático',
          'Múltiples lenguajes'
        ],
        tutorial: {
          title: 'Desarrollo con Cursor IA',
          duration: '25 min',
          description: 'Crea aplicaciones completas usando inteligencia artificial'
        },
        useCase: 'Revolucionario para crear MVPs funcionales sin conocimientos previos de programación.',
        difficulty: 'Fácil',
        price: 'Gratis (plan básico)',
        order: 3,
        metadata: {
          website: 'https://cursor.sh',
          documentation: 'https://cursor.sh/docs'
        }
      },
      {
        id: 'flutterflow',
        name: 'FlutterFlow',
        description: 'Herramienta de desarrollo visual sin código para apps móviles y web',
        category: 'Desarrollo Móvil',
        color: 'bg-grey',
        icon: '📱',
        features: [
          'Drag & drop visual',
          'Código Flutter real',
          'Integración con APIs',
          'Deploy directo'
        ],
        tutorial: {
          title: 'Apps Móviles con FlutterFlow',
          duration: '30 min',
          description: 'Desarrolla apps móviles profesionales sin escribir código'
        },
        useCase: 'Excelente para crear apps móviles nativas que funcionen en iOS y Android.',
        difficulty: 'Intermedio',
        price: 'Gratis (plan básico)',
        order: 4,
        metadata: {
          website: 'https://flutterflow.io',
          documentation: 'https://docs.flutterflow.io'
        }
      }
    ];

    await Tool.insertMany(defaultTools);

    res.json({
      success: true,
      message: 'Base de datos poblada correctamente',
      toolsCreated: defaultTools.length
    });

  } catch (error) {
    console.error('Error poblando base de datos:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo poblar la base de datos'
    });
  }
});

// POST /api/admin/upload - Subir archivos
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No se subió ningún archivo'
      });
    }

    res.json({
      success: true,
      message: 'Archivo subido correctamente',
      file: {
        filename: req.file.filename,
        originalname: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        path: `/uploads/${req.file.filename}`
      }
    });

  } catch (error) {
    console.error('Error subiendo archivo:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo subir el archivo'
    });
  }
});

// DELETE /api/admin/chat/clear - Limpiar todos los mensajes del chat
router.delete('/chat/clear', async (req, res) => {
  try {
    const result = await ChatMessage.deleteMany({});
    
    res.json({
      success: true,
      message: 'Todos los mensajes del chat han sido eliminados',
      deletedCount: result.deletedCount
    });

  } catch (error) {
    console.error('Error limpiando chat:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo limpiar el chat'
    });
  }
});

export default router;
