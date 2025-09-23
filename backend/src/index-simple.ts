import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from './prompts/climathon-materials';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializar Anthropic Claude
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Función para generar respuesta con Claude
async function generateAIResponse(userMessage: string): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: process.env.CHATBOT_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: parseInt(process.env.CHATBOT_MAX_TOKENS || '1000'),
      temperature: parseFloat(process.env.CHATBOT_TEMPERATURE || '0.7'),
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: userMessage }
      ]
    });

    return response.content[0]?.type === 'text' ? response.content[0].text : 'Lo siento, no pude generar una respuesta.';
  } catch (error) {
    console.error('Error generando respuesta de Claude:', error);
    return 'Lo siento, hay un problema con el servicio de IA. Por favor, intenta de nuevo.';
  }
}

// POST /api/chat/message - Enviar mensaje al chat
app.post('/api/chat/message', async (req, res) => {
  try {
    const { content, sessionId = 'default' } = req.body;

    if (!content || typeof content !== 'string') {
      return res.status(400).json({
        error: 'El contenido del mensaje es requerido'
      });
    }

    // Generar respuesta de IA
    const aiResponse = await generateAIResponse(content);

    res.json({
      success: true,
      messages: [
        {
          id: `user_${Date.now()}`,
          content: content.trim(),
          role: 'user',
          timestamp: new Date().toISOString()
        },
        {
          id: `assistant_${Date.now()}`,
          content: aiResponse,
          role: 'assistant',
          timestamp: new Date().toISOString()
        }
      ]
    });

  } catch (error) {
    console.error('Error en chat:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo procesar el mensaje'
    });
  }
});

// GET /api/chat/suggestions - Obtener sugerencias de preguntas
app.get('/api/chat/suggestions', async (req, res) => {
  try {
    const suggestions = [
      '¿Cómo usar UIZARD para crear prototipos rápidamente?',
      '¿Qué es MAKE y cómo automatizar tareas?',
      '¿Cómo desarrollar con Cursor IA sin código?',
      '¿Cómo crear apps móviles con FlutterFlow?',
      'Consejos para climathones de ClimateTech',
      '¿Qué materiales recomiendas para mi proyecto climático?',
      '¿Cómo validar mi idea de negocio climático?',
      '¿Qué es ClimateTech y por qué es importante?',
      '¿Cómo hacer un pitch efectivo para mi proyecto?',
      '¿Dónde puedo encontrar información sobre cambio climático?',
      '¿Qué herramientas de ideación puedo usar?',
      '¿Cómo automatizar procesos con MAKE?',
      '¿Dónde está el material sobre fundamentos del emprendimiento?',
      '¿Cómo usar las herramientas de design thinking?',
      '¿Dónde puedo ver el video de Impact Pitch?',
      '¿Qué es el Knowledge Hub de Climathons?'
    ];

    res.json({
      success: true,
      suggestions
    });

  } catch (error) {
    console.error('Error obteniendo sugerencias:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudieron obtener las sugerencias'
    });
  }
});

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Climathon Toolkit API funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Climathon Toolkit API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      chat: '/api/chat/message',
      suggestions: '/api/chat/suggestions'
    }
  });
});

// Manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
});

// Ruta 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe`
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📱 API disponible en http://localhost:${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🤖 Claude API configurada: ${process.env.ANTHROPIC_API_KEY ? '✅' : '❌'}`);
});

export default app;
