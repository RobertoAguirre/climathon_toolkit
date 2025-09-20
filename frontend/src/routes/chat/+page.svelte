<script lang="ts">
  import { onMount } from 'svelte';
  import { Send, Bot, User, MessageCircle } from 'lucide-svelte';
  
  interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }
  
  let messages: ChatMessage[] = [
    {
      id: '1',
      content: '¡Hola! Soy tu asistente de IA para el Climathon Toolkit. Puedo ayudarte con información sobre las herramientas de IA, recursos para climathones, y responder preguntas sobre ClimateTech. ¿En qué puedo ayudarte?',
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
      // Enviar mensaje al backend
      const response = await fetch('http://localhost:3000/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: userMessage.content,
          sessionId: 'default'
        })
      });
      
      const data = await response.json();
      
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
      // Fallback local si no hay conexión al backend
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(userMessage.content),
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
      return '🎨 UIZARD es perfecto para climathones! Te permite convertir bocetos en prototipos interactivos en minutos. Puedes subir una foto de tu sketch y obtener un prototipo funcional. Es ideal para validar ideas rápidamente y presentar conceptos visuales a tu equipo. ¿Quieres que te explique el proceso paso a paso?';
    }
    
    // Respuestas sobre MAKE
    if (input.includes('make') || input.includes('automatización') || input.includes('zapier')) {
      return '⚡ MAKE es genial para automatizar tareas repetitivas durante climathones. Puedes conectar aplicaciones como Telegram, Gmail, Sheets con asistentes de IA para automatizar reportes, notificaciones y flujos de datos. ¿Qué tipo de automatización necesitas para tu proyecto de ClimateTech?';
    }
    
    // Respuestas sobre Cursor IA
    if (input.includes('cursor') || input.includes('programación') || input.includes('código') || input.includes('desarrollo')) {
      return '🤖 Cursor IA es revolucionario para climathones! Puedes crear aplicaciones completas describiendo lo que quieres en lenguaje natural. Es perfecto cuando el tiempo es limitado y necesitas un MVP funcional rápido. ¿Qué tipo de aplicación quieres crear para tu solución climática?';
    }
    
    // Respuestas sobre FlutterFlow
    if (input.includes('flutterflow') || input.includes('móvil') || input.includes('app') || input.includes('mobile')) {
      return '📱 FlutterFlow es excelente para apps móviles en climathones. Tienes una interfaz drag-and-drop que genera código Flutter real, funcionando en iOS y Android. ¿Estás pensando en crear una app móvil para tu solución de ClimateTech?';
    }
    
    // Respuestas sobre climathones
    if (input.includes('climathon') || input.includes('climathon') || input.includes('evento')) {
      return '🚀 Los climathones de ClimateTech son increíbles para crear soluciones innovadoras! Te recomiendo: 1) Definir un problema climático específico, 2) Usar las herramientas de IA para prototipar rápido, 3) Enfocarte en el impacto real. ¿Tienes alguna idea específica en mente?';
    }
    
    // Respuestas sobre ClimateTech
    if (input.includes('clima') || input.includes('climate') || input.includes('sostenibilidad') || input.includes('verde')) {
      return '🌱 ClimateTech abarca muchas áreas: energías renovables, eficiencia energética, agricultura sostenible, transporte limpio, economía circular, y más. El objetivo es mantener el calentamiento global cerca de 1.5°C. ¿En qué área te interesa trabajar?';
    }
    
    // Respuestas sobre el toolkit
    if (input.includes('toolkit') || input.includes('herramientas') || input.includes('ayuda')) {
      return '🛠️ El Climathon Toolkit te ofrece 4 herramientas principales: UIZARD para prototipos, MAKE para automatizaciones, Cursor IA para desarrollo, y FlutterFlow para apps móviles. Todas están diseñadas para climathones y son gratuitas. ¿Con cuál te gustaría empezar?';
    }
    
    // Respuestas sobre consejos
    if (input.includes('consejo') || input.includes('tip') || input.includes('ayuda') || input.includes('cómo')) {
      return '💡 Para climathones exitosos: 1) Valida tu idea rápidamente con prototipos, 2) Usa las herramientas de IA para acelerar el desarrollo, 3) Enfócate en el impacto climático real, 4) Prepara un pitch claro. ¿En qué aspecto específico necesitas ayuda?';
    }
    
    // Respuesta por defecto
    return '🤔 Interesante pregunta! Puedo ayudarte con información sobre las herramientas de IA del toolkit (UIZARD, MAKE, Cursor IA, FlutterFlow), consejos para climathones, o temas relacionados con ClimateTech. ¿Podrías ser más específico sobre lo que necesitas?';
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
        Pregúntame sobre las herramientas de IA, recursos para climathones, 
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
          '¿Qué es MAKE y automatizaciones?',
          'Consejos para climathones de ClimateTech',
          '¿Cómo crear apps con FlutterFlow?',
          '¿Qué es Cursor IA?',
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
