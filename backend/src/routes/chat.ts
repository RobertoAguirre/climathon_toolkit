import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import ChatMessage, { IChatMessage } from '../models/ChatMessage';
import Tool from '../models/Tool';
import { SYSTEM_PROMPT } from '../prompts/climathon-materials';

const router = express.Router();

// Inicializar Anthropic Claude
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Función para generar respuesta con Claude
async function generateAIResponse(userMessage: string, context: IChatMessage[] = []): Promise<string> {
  try {
    // Obtener herramientas disponibles para contexto
    const tools = await Tool.find({ isActive: true }).sort({ order: 1 });
    const toolsContext = tools.map(tool => 
      `- ${tool.name}: ${tool.description} (${tool.category})`
    ).join('\n');

    // Construir el mensaje del sistema con contexto adicional
    const systemMessage = SYSTEM_PROMPT + '\n\nHerramientas disponibles en la plataforma:\n' + toolsContext;

    // Construir el historial de conversación
    const conversationHistory = context.slice(-10).map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    }));

    // Crear el mensaje para Claude
    const messages = [
      ...conversationHistory,
      { role: 'user' as const, content: userMessage }
    ];

    const response = await anthropic.messages.create({
      model: process.env.CHATBOT_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: parseInt(process.env.CHATBOT_MAX_TOKENS || '1000'),
      temperature: parseFloat(process.env.CHATBOT_TEMPERATURE || '0.7'),
      system: systemMessage,
      messages: messages
    });

    return response.content[0]?.type === 'text' ? response.content[0].text : 'Lo siento, no pude generar una respuesta.';
  } catch (error) {
    console.error('Error generando respuesta de Claude:', error);
    return 'Lo siento, hay un problema con el servicio de IA. Por favor, intenta de nuevo.';
  }
}

// POST /api/chat/message - Enviar mensaje al chat
router.post('/message', async (req, res) => {
  try {
    const { content, sessionId = 'default' } = req.body;

    if (!content || typeof content !== 'string') {
      return res.status(400).json({
        error: 'El contenido del mensaje es requerido'
      });
    }

    // Crear mensaje del usuario
    const userMessage = new ChatMessage({
      id: `user_${Date.now()}`,
      content: content.trim(),
      role: 'user',
      sessionId,
      metadata: {
        language: 'es'
      }
    });

    await userMessage.save();

    // Obtener contexto de la conversación
    const context = await ChatMessage.find({ sessionId })
      .sort({ timestamp: -1 })
      .limit(10);

    // Generar respuesta de IA
    const aiResponse = await generateAIResponse(content, context);

    // Crear mensaje de respuesta
    const assistantMessage = new ChatMessage({
      id: `assistant_${Date.now()}`,
      content: aiResponse,
      role: 'assistant',
      sessionId,
      metadata: {
        language: 'es'
      }
    });

    await assistantMessage.save();

    res.json({
      success: true,
      messages: [
        {
          id: userMessage.id,
          content: userMessage.content,
          role: userMessage.role,
          timestamp: userMessage.timestamp
        },
        {
          id: assistantMessage.id,
          content: assistantMessage.content,
          role: assistantMessage.role,
          timestamp: assistantMessage.timestamp
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

// GET /api/chat/history/:sessionId - Obtener historial de chat
router.get('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { limit = 50 } = req.query;

    const messages = await ChatMessage.find({ sessionId })
      .sort({ timestamp: 1 })
      .limit(parseInt(limit as string))
      .select('id content role timestamp metadata');

    res.json({
      success: true,
      messages: messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        role: msg.role,
        timestamp: msg.timestamp
      }))
    });

  } catch (error) {
    console.error('Error obteniendo historial:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo obtener el historial'
    });
  }
});

// DELETE /api/chat/history/:sessionId - Limpiar historial de chat
router.delete('/history/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    await ChatMessage.deleteMany({ sessionId });

    res.json({
      success: true,
      message: 'Historial eliminado correctamente'
    });

  } catch (error) {
    console.error('Error eliminando historial:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      message: 'No se pudo eliminar el historial'
    });
  }
});

// GET /api/chat/suggestions - Obtener sugerencias de preguntas
router.get('/suggestions', async (req, res) => {
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

export default router;
