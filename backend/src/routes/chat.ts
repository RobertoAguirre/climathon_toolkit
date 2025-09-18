import express from 'express';
import OpenAI from 'openai';
import ChatMessage, { IChatMessage } from '../models/ChatMessage';
import Tool from '../models/Tool';

const router = express.Router();

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Sistema de prompts para el asistente de IA
const SYSTEM_PROMPT = `Eres un asistente de IA especializado en el CATAL1.5°T Toolkit, una plataforma para hackathones de ClimateTech. 

Tu función es ayudar a participantes de hackathones a:
1. Usar herramientas de IA como UIZARD, MAKE, Cursor IA y FlutterFlow
2. Crear prototipos y MVPs rápidamente
3. Resolver problemas técnicos y de diseño
4. Proporcionar consejos para hackathones
5. Responder preguntas sobre ClimateTech

Herramientas disponibles:
- UIZARD: Prototipado rápido de UI/UX
- MAKE: Automatizaciones entre aplicaciones
- Cursor IA: Desarrollo con IA
- FlutterFlow: Desarrollo visual de apps móviles

Responde siempre en español, sé conciso pero útil, y enfócate en soluciones prácticas para hackathones.`;

// Función para generar respuesta con IA
async function generateAIResponse(userMessage: string, context: IChatMessage[] = []): Promise<string> {
  try {
    // Obtener herramientas disponibles para contexto
    const tools = await Tool.find({ isActive: true }).sort({ order: 1 });
    const toolsContext = tools.map(tool => 
      `- ${tool.name}: ${tool.description} (${tool.category})`
    ).join('\n');

    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT + '\n\nHerramientas disponibles:\n' + toolsContext },
      ...context.slice(-10).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user' as const, content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: process.env.CHATBOT_MODEL || 'gpt-3.5-turbo',
      messages,
      max_tokens: parseInt(process.env.CHATBOT_MAX_TOKENS || '1000'),
      temperature: parseFloat(process.env.CHATBOT_TEMPERATURE || '0.7'),
    });

    return completion.choices[0]?.message?.content || 'Lo siento, no pude generar una respuesta.';
  } catch (error) {
    console.error('Error generando respuesta de IA:', error);
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
      '¿Cómo usar UIZARD para crear prototipos?',
      '¿Qué es MAKE y cómo automatizar tareas?',
      '¿Cómo desarrollar con Cursor IA?',
      '¿Cómo crear apps móviles con FlutterFlow?',
      'Consejos para hackathones de ClimateTech',
      '¿Qué herramientas recomiendas para mi proyecto?',
      '¿Cómo validar mi idea rápidamente?',
      '¿Qué es ClimateTech?'
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
