<script lang="ts">
  import { ExternalLink, Play, Download, Star } from 'lucide-svelte';
  
  // Datos detallados de las herramientas de IA
  const tools = [
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
        title: 'Tutorial UIZARD para Hackathones',
        duration: '15 min',
        description: 'Aprende a crear prototipos profesionales en minutos',
        videoId: 'dQw4w9WgXcQ'
      },
      useCase: 'Perfecto para validar ideas de UI rápidamente y presentar conceptos visuales a tu equipo.',
      difficulty: 'Fácil',
      price: 'Gratis (plan básico)',
      website: 'https://uizard.io'
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
        description: 'Conecta herramientas y automatiza procesos repetitivos',
        videoId: 'dQw4w9WgXcQ'
      },
      useCase: 'Ideal para automatizar reportes, notificaciones y flujos de datos entre aplicaciones.',
      difficulty: 'Intermedio',
      price: 'Gratis (plan básico)',
      website: 'https://make.com'
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
        description: 'Crea aplicaciones completas usando inteligencia artificial',
        videoId: 'dQw4w9WgXcQ'
      },
      useCase: 'Revolucionario para crear MVPs funcionales sin conocimientos previos de programación.',
      difficulty: 'Fácil',
      price: 'Gratis (plan básico)',
      website: 'https://cursor.sh'
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
        description: 'Desarrolla apps móviles profesionales sin escribir código',
        videoId: 'dQw4w9WgXcQ'
      },
      useCase: 'Excelente para crear apps móviles nativas que funcionen en iOS y Android.',
      difficulty: 'Intermedio',
      price: 'Gratis (plan básico)',
      website: 'https://flutterflow.io'
    }
  ];
  
  let selectedTool = tools[0];
  
  function selectTool(tool: typeof tools[0]) {
    selectedTool = tool;
  }
</script>

<svelte:head>
  <title>Herramientas IA - CATAL1.5°T Toolkit</title>
</svelte:head>

<div class="min-h-screen bg-white py-8 px-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-dark-green mb-4">
        Herramientas de IA para Hackathones
      </h1>
      <p class="text-xl text-dark-green max-w-3xl mx-auto">
        Domina estas herramientas gratuitas para crear prototipos, automatizaciones 
        y aplicaciones completas durante tu hackathon de ClimateTech.
      </p>
    </div>
    
    <!-- Grid de herramientas -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      {#each tools as tool}
        <button
          on:click={() => selectTool(tool)}
          class="card text-left transition-all duration-200 hover:scale-105
            {selectedTool.id === tool.id ? 'ring-2 ring-dark-purple' : ''}"
        >
          <div class="text-center">
            <div class="w-16 h-16 {tool.color} rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-2xl">{tool.icon}</span>
            </div>
            <h3 class="text-xl font-bold text-dark-green mb-2">
              {tool.name}
            </h3>
            <p class="text-sm text-grey mb-3">
              {tool.category}
            </p>
            <div class="flex items-center justify-center space-x-2 text-xs">
              <span class="px-2 py-1 bg-light-green text-dark-green rounded-full">
                {tool.difficulty}
              </span>
              <span class="px-2 py-1 bg-dark-purple text-white rounded-full">
                {tool.price}
              </span>
            </div>
          </div>
        </button>
      {/each}
    </div>
    
    <!-- Detalles de la herramienta seleccionada -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Información principal -->
      <div class="space-y-6">
        <div class="card">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 {selectedTool.color} rounded-full flex items-center justify-center mr-4">
              <span class="text-xl">{selectedTool.icon}</span>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-dark-green">
                {selectedTool.name}
              </h2>
              <p class="text-grey">{selectedTool.category}</p>
            </div>
          </div>
          
          <p class="text-dark-green mb-4">
            {selectedTool.description}
          </p>
          
          <div class="space-y-3">
            <h3 class="font-semibold text-dark-green">Características principales:</h3>
            <ul class="space-y-2">
              {#each selectedTool.features as feature}
                <li class="flex items-center text-sm text-dark-green">
                  <Star class="w-4 h-4 text-light-green mr-2 flex-shrink-0" />
                  {feature}
                </li>
              {/each}
            </ul>
          </div>
        </div>
        
        <div class="card">
          <h3 class="font-semibold text-dark-green mb-3">Casos de uso en hackathones:</h3>
          <p class="text-sm text-dark-green">
            {selectedTool.useCase}
          </p>
        </div>
      </div>
      
      <!-- Tutorial y acciones -->
      <div class="space-y-6">
        <div class="card">
          <h3 class="font-semibold text-dark-green mb-4">Tutorial</h3>
          <div class="aspect-video bg-dark-green rounded-lg mb-4 overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/{selectedTool.tutorial.videoId}?rel=0&modestbranding=1"
              title="{selectedTool.tutorial.title}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="w-full h-full"
            ></iframe>
          </div>
          <h4 class="font-medium text-dark-green mb-2">
            {selectedTool.tutorial.title}
          </h4>
          <p class="text-sm text-grey mb-3">
            {selectedTool.tutorial.description}
          </p>
          <div class="flex items-center justify-between">
            <span class="text-sm text-dark-green">
              Duración: {selectedTool.tutorial.duration}
            </span>
            <button 
              class="btn-primary"
              on:click={() => window.open(`https://www.youtube.com/watch?v=${selectedTool.tutorial.videoId}`, '_blank')}
            >
              <Play class="mr-2" size={16} />
              Ver en YouTube
            </button>
          </div>
        </div>
        
        <div class="card">
          <h3 class="font-semibold text-dark-green mb-4">Acciones rápidas</h3>
          <div class="space-y-3">
            <button 
              class="btn-primary w-full flex items-center justify-center"
              on:click={() => window.open(selectedTool.website, '_blank')}
            >
              <ExternalLink class="mr-2" size={16} />
              Ir a {selectedTool.name}
            </button>
            <button 
              class="btn-secondary w-full flex items-center justify-center"
              on:click={() => alert('Guía descargada: ' + selectedTool.name + ' - Tutorial completo')}
            >
              <Download class="mr-2" size={16} />
              Descargar Guía
            </button>
            <button 
              class="bg-grey text-dark-green hover:bg-light-green w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              on:click={() => alert('Herramienta marcada como favorita: ' + selectedTool.name)}
            >
              <Star class="mr-2" size={16} />
              Marcar como Favorito
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sección de consejos -->
    <div class="mt-12 card">
      <h2 class="text-2xl font-bold text-dark-green mb-6 text-center">
        Consejos para Hackathones
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">⚡</span>
          </div>
          <h3 class="font-semibold text-dark-green mb-2">Rapidez</h3>
          <p class="text-sm text-grey">
            Usa estas herramientas para crear prototipos en minutos, no horas.
          </p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-light-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🎯</span>
          </div>
          <h3 class="font-semibold text-dark-green mb-2">Enfoque</h3>
          <p class="text-sm text-grey">
            Concéntrate en la idea, deja que la IA maneje la implementación.
          </p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🚀</span>
          </div>
          <h3 class="font-semibold text-dark-green mb-2">Innovación</h3>
          <p class="text-sm text-grey">
            Combina múltiples herramientas para crear soluciones únicas.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
