<script lang="ts">
  import { onMount } from 'svelte';
  import { Send, Bot, User, MessageCircle } from 'lucide-svelte';
  import { apiRequest, config } from '$lib/config';
  
  interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }
  
  let messages: ChatMessage[] = [
    {
      id: '1',
      content: '¡Hola! Soy tu asistente de IA para el Climathon Toolkit. Puedo ayudarte con información sobre las herramientas de IA, recursos para Climathons, y responder preguntas sobre ClimateTech. ¿En qué puedo ayudarte?',
      role: 'assistant',
      timestamp: new Date()
    }
  ];
  
  let inputMessage = '';
  let isLoading = false;
  let chatContainer: HTMLDivElement;
  
  // Función para enviar mensaje
  async function sendMessage() {
    if (!inputMessage.trim() || isLoading) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };
    
    messages = [...messages, userMessage];
    inputMessage = '';
    isLoading = true;
    
    // Scroll al final del chat
    setTimeout(() => {
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
    
    try {
      // Enviar mensaje al backend usando la configuración centralizada
      const data = await apiRequest(config.endpoints.chat, {
        method: 'POST',
        body: JSON.stringify({
          content: userMessage.content,
          sessionId: config.chat.defaultSessionId
        })
      });
      
      if (data.success && data.messages.length >= 2) {
        // Agregar la respuesta del asistente
        const assistantMessage = data.messages[1];
        messages = [...messages, {
          id: assistantMessage.id,
          content: assistantMessage.content,
          role: assistantMessage.role,
          timestamp: new Date(assistantMessage.timestamp)
        }];
      } else {
        // Fallback si hay error en la API
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: generateResponse(userMessage.content),
          role: 'assistant',
          timestamp: new Date()
        };
        messages = [...messages, assistantMessage];
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Determinar el tipo de error y mostrar mensaje apropiado
      let errorMessage = 'Lo siento, hay un problema con el servicio. ';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage += 'No se puede conectar con el servidor. Verifica que el backend esté ejecutándose.';
      } else if (error instanceof Error && error.message.includes('HTTP error')) {
        errorMessage += 'Error del servidor. Intenta de nuevo.';
      } else {
        errorMessage += 'Usando respuestas locales mientras se resuelve el problema.';
      }
      
      // Fallback local si no hay conexión al backend
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: errorMessage + '\n\n' + generateResponse(userMessage.content),
        role: 'assistant',
        timestamp: new Date()
      };
      messages = [...messages, assistantMessage];
    } finally {
      isLoading = false;
    }
    
    // Scroll al final después de la respuesta
    setTimeout(() => {
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }
  
  // Función para generar respuestas (simulada)
  function generateResponse(userInput: string): string {
    const input = userInput.toLowerCase();
    
    // Respuestas sobre UIZARD
    if (input.includes('uizard') || input.includes('diseño') || input.includes('ui') || input.includes('prototipo')) {
      return '🎨 UIZARD es perfecto para Climathons! Te permite convertir bocetos en prototipos interactivos en minutos. Puedes subir una foto de tu sketch y obtener un prototipo funcional. Es ideal para validar ideas rápidamente y presentar conceptos visuales a tu equipo. ¿Quieres que te explique el proceso paso a paso?';
    }
    
    // Respuestas sobre Claude
    if (input.includes('claude') || input.includes('investigación') || input.includes('análisis') || input.includes('contenido')) {
      return '🤖 Claude es excelente para investigación y análisis durante Climathons. Puede ayudarte a analizar datos climáticos, generar contenido para tu proyecto, y realizar investigaciones automatizadas. ¿Qué tipo de investigación necesitas para tu solución de ClimateTech?';
    }
    
    // Respuestas sobre Gamma
    if (input.includes('gamma') || input.includes('presentación') || input.includes('pitch') || input.includes('slides')) {
      return '📊 Gamma es perfecto para crear presentaciones profesionales en Climathons. Puedes generar automáticamente pitch decks, presentaciones interactivas y documentos profesionales. ¿Necesitas ayuda creando una presentación para tu proyecto de ClimateTech?';
    }
    
    // Respuestas sobre Como Comenzar
    if (input.includes('comenzar') || input.includes('inicio') || input.includes('empezar') || input.includes('metodología')) {
      return '🚀 Como Comenzar te guía paso a paso desde el inicio de tu Climathon. Incluye metodología estructurada, plantillas de trabajo, checklist de actividades y recursos de apoyo. ¿Es tu primer Climathon o necesitas refrescar la metodología?';
    }
    
    // Respuestas sobre Whimsical
    if (input.includes('whimsical') || input.includes('diagrama') || input.includes('wireframe') || input.includes('mapa mental')) {
      return '🧠 Whimsical es perfecto para organizar ideas y crear diagramas en Climathons. Puedes crear mapas mentales, wireframes y diagramas de flujo colaborativos. Es ideal para estructurar tu proyecto y comunicar ideas visualmente. ¿Quieres aprender a crear diagramas para tu solución climática?';
    }
    
    // Respuestas sobre climathones
    if (input.includes('climathon') || input.includes('climathon') || input.includes('evento')) {
      return '🚀 Los Climathons de ClimateTech son increíbles para crear soluciones innovadoras! Te recomiendo: 1) Definir un problema climático específico, 2) Usar las herramientas de IA para prototipar rápido, 3) Enfocarte en el impacto real. ¿Tienes alguna idea específica en mente?';
    }
    
    // Respuestas sobre ClimateTech
    if (input.includes('clima') || input.includes('climate') || input.includes('sostenibilidad') || input.includes('verde')) {
      return '🌱 ClimateTech abarca muchas áreas: energías renovables, eficiencia energética, agricultura sostenible, transporte limpio, economía circular, y más. El objetivo es mantener el calentamiento global cerca de 1.5°C. ¿En qué área te interesa trabajar?';
    }
    
    // Respuestas sobre el toolkit
    if (input.includes('toolkit') || input.includes('herramientas') || input.includes('ayuda')) {
      return '🛠️ El Climathon Toolkit te ofrece 5 herramientas principales: Como Comenzar para guía inicial, Whimsical para diagramas y wireframes, UIZARD para prototipos, Claude para investigación y análisis, y Gamma para presentaciones. Todas están diseñadas para Climathons y son gratuitas. ¿Con cuál te gustaría empezar?';
    }
    
    // Respuestas sobre consejos
    if (input.includes('consejo') || input.includes('tip') || input.includes('ayuda') || input.includes('cómo')) {
      return '💡 Para Climathons exitosos: 1) Valida tu idea rápidamente con prototipos, 2) Usa las herramientas de IA para acelerar el desarrollo, 3) Enfócate en el impacto climático real, 4) Prepara un pitch claro. ¿En qué aspecto específico necesitas ayuda?';
    }
    
    // Respuesta por defecto
    return '🤔 Interesante pregunta! Puedo ayudarte con información sobre las herramientas de IA del toolkit (Como Comenzar, Whimsical, UIZARD, Claude, Gamma), consejos para Climathons, o temas relacionados con ClimateTech. ¿Podrías ser más específico sobre lo que necesitas?';
  }
  
  // Función para manejar Enter
  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
  
  onMount(() => {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });
</script>

<svelte:head>
  <title>Asistente IA - Climathon Toolkit</title>
</svelte:head>

<div class="min-h-screen bg-white py-8 px-6">
  <div class="max-w-4xl mx-auto">
    <!-- Header del chat -->
    <div class="text-center mb-8">
      <div class="flex items-center justify-center mb-4">
        <div class="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mr-4">
          <Bot class="text-dark-green" size={32} />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-dark-green">Asistente IA</h1>
          <p class="text-dark-green opacity-80">Climathon Toolkit</p>
        </div>
      </div>
      <p class="text-dark-green max-w-2xl mx-auto">
        Pregúntame sobre las herramientas de IA, recursos para Climathons, 
        o cualquier tema relacionado con ClimateTech.
      </p>
    </div>
    
    <!-- Contenedor del chat -->
    <div class="chat-container p-6 mb-6" bind:this={chatContainer}>
      <div class="space-y-4">
        {#each messages as message}
          <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="flex items-start space-x-3 max-w-3xl">
              {#if message.role === 'assistant'}
                <div class="w-8 h-8 bg-light-green rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot class="text-dark-green" size={16} />
                </div>
              {/if}
              
              <div class="chat-message {message.role}">
                <p class="text-sm leading-relaxed">{message.content}</p>
                <p class="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              
              {#if message.role === 'user'}
                <div class="w-8 h-8 bg-dark-purple rounded-full flex items-center justify-center flex-shrink-0">
                  <User class="text-white" size={16} />
                </div>
              {/if}
            </div>
          </div>
        {/each}
        
        {#if isLoading}
          <div class="flex justify-start">
            <div class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-light-green rounded-full flex items-center justify-center">
                <Bot class="text-dark-green" size={16} />
              </div>
              <div class="chat-message assistant">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-dark-green rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-dark-green rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-dark-green rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    </div>
    
    <!-- Input del chat -->
    <div class="flex space-x-4">
      <div class="flex-1 relative">
        <textarea
          bind:value={inputMessage}
          on:keypress={handleKeyPress}
          placeholder="Escribe tu pregunta aquí..."
          class="w-full p-4 border-2 border-light-green rounded-lg resize-none focus:outline-none focus:border-dark-green"
          rows="3"
          disabled={isLoading}
        ></textarea>
      </div>
      <button
        on:click={sendMessage}
        disabled={!inputMessage.trim() || isLoading}
        class="btn-primary px-6 py-4 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={20} />
      </button>
    </div>
    
    <!-- Sugerencias rápidas -->
    <div class="mt-6">
      <h3 class="text-lg font-medium text-dark-green mb-3">Preguntas frecuentes:</h3>
      <div class="flex flex-wrap gap-2">
        {#each [
          '¿Cómo usar UIZARD para prototipos?',
          '¿Qué es Claude y cómo usarlo?',
          'Consejos para Climathons de ClimateTech',
          '¿Cómo crear presentaciones con Gamma?',
          '¿Cómo comenzar mi Climathon?',
          '¿Cómo crear diagramas con Whimsical?',
          'Herramientas del toolkit'
        ] as suggestion}
          <button
            on:click={() => {
              inputMessage = suggestion;
              sendMessage();
            }}
            class="px-4 py-2 bg-grey text-dark-green rounded-full text-sm hover:bg-light-green transition-colors"
            disabled={isLoading}
          >
            {suggestion}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .chat-container {
    scrollbar-width: thin;
    scrollbar-color: var(--light-green) var(--grey);
  }
  
  .chat-container::-webkit-scrollbar {
    width: 6px;
  }
  
  .chat-container::-webkit-scrollbar-track {
    background: var(--grey);
    border-radius: 3px;
  }
  
  .chat-container::-webkit-scrollbar-thumb {
    background: var(--light-green);
    border-radius: 3px;
  }
  
  .chat-container::-webkit-scrollbar-thumb:hover {
    background: var(--dark-green);
  }
</style>
