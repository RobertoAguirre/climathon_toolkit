<script lang="ts">
  import { ExternalLink, Play, Star } from 'lucide-svelte';
  
  // Datos detallados de las herramientas de IA
  const tools = [
    {
      id: 'como-comenzar',
      name: 'COMO COMENZAR',
      description: 'Guía paso a paso para iniciar tu proyecto Climathon desde cero',
      category: 'Guía Inicial',
      color: 'bg-light-green',
      icon: '🚀',
      features: [
        'Metodología paso a paso',
        'Plantillas de trabajo',
        'Checklist de actividades',
        'Recursos de apoyo'
      ],
      tutorial: {
        title: 'Guía de Inicio',
        duration: 'Próximamente',
        description: 'Video tutorial para comenzar tu proyecto Climathon',
        videoId: ''
      },
      useCase: 'Perfecto para equipos nuevos que necesitan estructura y dirección clara desde el inicio.',
      difficulty: 'Fácil',
      website: '#'
    },
    {
      id: 'whimsical',
      name: 'WHIMSICAL',
      description: 'Crea diagramas, wireframes y mapas mentales de forma colaborativa',
      category: 'Diseño y Planificación',
      color: 'bg-light-purple',
      icon: '🧠',
      features: [
        'Diagramas de flujo interactivos',
        'Wireframes y prototipos',
        'Mapas mentales colaborativos',
        'Templates para climathones'
      ],
      tutorial: {
        title: 'Tutorial Whimsical para Climathons',
        duration: '20 min',
        description: 'Aprende a crear diagramas y wireframes colaborativos',
        videoId: 'a5wBQQzFYKs'
      },
      useCase: 'Ideal para mapear procesos, crear wireframes y organizar ideas de forma visual durante climathones.',
      difficulty: 'Fácil',
      website: 'https://whimsical.com'
    },
    {
      id: 'uizard',
      name: 'UIZARD',
      description: 'Crea prototipos rápidos y completos de UI para apps web y móviles de forma profesional',
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
        title: 'Tutorial UIZARD para Climathons',
        duration: '15 min',
        description: 'Aprende a crear prototipos profesionales en minutos',
        videoId: 'wHYcHmcTP0I'
      },
      useCase: 'Perfecto para validar ideas de UI rápidamente y presentar conceptos visuales a tu equipo.',
      difficulty: 'Fácil',
      website: 'https://uizard.io'
    },
    {
      id: 'claude',
      name: 'CLAUDE',
      description: 'Asistente de IA para investigación, análisis y creación de contenido',
      category: 'Inteligencia Artificial',
      color: 'bg-grey',
      icon: '🤖',
      features: [
        'Análisis de datos climáticos',
        'Generación de contenido',
        'Investigación automatizada',
        'Soporte en múltiples idiomas'
      ],
      tutorial: {
        title: 'Tutorial Claude para Climathons',
        duration: '12 min',
        description: 'Aprende a usar Claude para investigación y análisis',
        videoId: 'sW8fyQbqtP8'
      },
      useCase: 'Excelente para investigación rápida, análisis de datos y generación de contenido para tu proyecto.',
      difficulty: 'Fácil',
      website: 'https://claude.ai'
    },
    {
      id: 'gamma',
      name: 'GAMMA',
      description: 'Crea presentaciones profesionales y documentos con IA de forma rápida y eficiente',
      category: 'Presentaciones',
      color: 'bg-light-purple',
      icon: '📊',
      features: [
        'Generación automática de presentaciones',
        'Templates profesionales',
        'Colaboración en tiempo real',
        'Exportación múltiple'
      ],
      tutorial: {
        title: 'Tutorial Gamma para Climathons',
        duration: '18 min',
        description: 'Aprende a crear presentaciones impactantes para tu pitch',
        videoId: '4tsm2Hg6WaQ'
      },
      useCase: 'Ideal para crear presentaciones finales, pitch decks y documentos de presentación profesional.',
      difficulty: 'Fácil',
      website: 'https://gamma.app'
    }
  ];
  
  let selectedTool = tools[0];
  
  function selectTool(tool: typeof tools[0]) {
    selectedTool = tool;
  }
</script>

<svelte:head>
  <title>Herramientas IA - Climathon Toolkit</title>
</svelte:head>

<div class="min-h-screen bg-white py-8 px-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-dark-green mb-4">
        Herramientas de IA para Climathons
      </h1>
      <p class="text-xl text-dark-green max-w-3xl mx-auto">
        Domina estas herramientas gratuitas para crear prototipos, automatizaciones 
        y aplicaciones completas durante tu Climathon de ClimateTech.
      </p>
    </div>
    
    <!-- Grid de herramientas -->
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
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
            <p class="text-sm text-dark-green opacity-80 mb-3">
              {tool.category}
            </p>
            <div class="flex items-center justify-center space-x-2 text-xs">
              <span class="px-2 py-1 bg-light-green text-dark-green rounded-full">
                {tool.difficulty}
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
              <p class="text-dark-green opacity-80">{selectedTool.category}</p>
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
          <h3 class="font-semibold text-dark-green mb-3">Casos de uso en Climathons:</h3>
          <p class="text-sm text-dark-green">
            {selectedTool.useCase}
          </p>
        </div>
      </div>
      
      <!-- Tutorial y acciones -->
      <div class="space-y-6">
        <div class="card">
          <h3 class="font-semibold text-dark-green mb-4">Tutorial</h3>
          {#if selectedTool.tutorial.videoId}
            <div class="bg-dark-green rounded-lg mb-4 overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/{selectedTool.tutorial.videoId}?rel=0&modestbranding=1&showinfo=0"
                title="{selectedTool.tutorial.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full"
                style="height: 400px;"
              ></iframe>
            </div>
          {:else}
            <div class="bg-light-green rounded-lg mb-4 p-8 text-center">
              <div class="text-4xl mb-2">{selectedTool.icon}</div>
              <p class="text-dark-green font-medium">Video tutorial próximamente</p>
            </div>
          {/if}
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
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sección de consejos -->
    <div class="mt-12 card">
      <h2 class="text-2xl font-bold text-dark-green mb-6 text-center">
        Consejos para Climathons
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">⚡</span>
          </div>
          <h3 class="font-semibold text-dark-green mb-2">Rapidez</h3>
          <p class="text-sm text-dark-green opacity-80">
            Usa estas herramientas para crear prototipos en minutos, no horas.
          </p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-light-purple rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🎯</span>
          </div>
          <h3 class="font-semibold text-dark-green mb-2">Enfoque</h3>
          <p class="text-sm text-dark-green opacity-80">
            Concéntrate en la idea, deja que la IA maneje la implementación.
          </p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🚀</span>
          </div>
          <h3 class="font-semibold text-dark-green mb-2">Innovación</h3>
          <p class="text-sm text-dark-green opacity-80">
            Combina múltiples herramientas para crear soluciones únicas.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
