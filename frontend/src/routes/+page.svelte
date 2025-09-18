<script lang="ts">
  import { onMount } from 'svelte';
  import { Play, ArrowRight, Sparkles } from 'lucide-svelte';
  
  // Datos de las herramientas de IA
  const aiTools = [
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
        videoId: 'dQw4w9WgXcQ' // Video de ejemplo
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
        videoId: 'dQw4w9WgXcQ' // Video de ejemplo
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
        videoId: 'dQw4w9WgXcQ' // Video de ejemplo
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
        videoId: 'dQw4w9WgXcQ' // Video de ejemplo
      },
      useCase: 'Excelente para crear apps móviles nativas que funcionen en iOS y Android.',
      difficulty: 'Intermedio',
      price: 'Gratis (plan básico)',
      website: 'https://flutterflow.io'
    }
  ];
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<svelte:head>
  <title>CATAL1.5°T Toolkit - Bienvenida</title>
</svelte:head>

<div class="min-h-screen bg-white">
  <!-- Sección Hero con fondo verde claro y círculos concéntricos -->
  <section class="relative bg-light-green concentric-circles py-16 px-6">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-6xl font-bold text-dark-green mb-6">
          Bienvenido al
          <span class="block text-dark-purple">CATAL1.5°T Toolkit</span>
        </h1>
        <p class="text-xl text-dark-green max-w-3xl mx-auto mb-8">
          Tu kit de herramientas digital para hackathones de ClimateTech. 
          Herramientas de IA, recursos multimedia y asistencia interactiva 
          para crear MVPs innovadores en tiempo récord.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            class="btn-primary text-lg px-8 py-4 flex items-center justify-center"
            on:click={() => window.location.href = '/tools'}
          >
            <Play class="mr-2" size={24} />
            Ver Tutoriales
          </button>
          <button 
            class="btn-secondary text-lg px-8 py-4 flex items-center justify-center"
            on:click={() => window.location.href = '/chat'}
          >
            <Sparkles class="mr-2" size={24} />
            Chat con IA
            <ArrowRight class="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Sección de Herramientas de IA -->
  <section class="py-16 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-dark-green mb-4">
          Herramientas de IA para Hackathones
        </h2>
        <p class="text-lg text-dark-green max-w-2xl mx-auto">
          Aprende a usar estas herramientas gratuitas para diseñar, prototipar 
          y desplegar MVPs durante tu hackathon.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each aiTools as tool, index}
          <div 
            class="card hover:scale-105 transition-transform duration-300"
            style="animation-delay: {index * 100}ms"
          >
            <div class="text-center">
              <div class="w-16 h-16 {tool.color} rounded-full mx-auto mb-4 flex items-center justify-center">
                <span class="text-dark-green font-bold text-xl">
                  {tool.name.charAt(0)}
                </span>
              </div>
              <h3 class="text-xl font-bold text-dark-green mb-2">
                {tool.name}
              </h3>
              <p class="text-sm text-dark-green mb-3">
                {tool.category}
              </p>
              <p class="text-sm text-grey mb-4">
                {tool.description}
              </p>
              <button 
                class="btn-primary w-full"
                on:click={() => window.location.href = '/tools'}
              >
                Ver Tutorial
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>
  
  <!-- Sección de Videos Multimedia -->
  <section class="py-16 px-6 bg-grey">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-dark-green mb-4">
          Tutoriales Multimedia
        </h2>
        <p class="text-lg text-dark-green max-w-2xl mx-auto">
          Videos educativos para dominar las herramientas de IA y crear 
          prototipos funcionales en minutos.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each aiTools as tool, index}
          <div class="card">
            <div class="aspect-video bg-dark-green rounded-lg mb-4 overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/{tool.tutorial.videoId}?rel=0&modestbranding=1"
                title="{tool.tutorial.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full"
              ></iframe>
            </div>
            <h3 class="text-xl font-bold text-dark-green mb-2">
              Tutorial: {tool.name}
            </h3>
            <p class="text-sm text-grey mb-2">
              {tool.tutorial.description}
            </p>
            <p class="text-xs text-dark-purple mb-4">
              Duración: {tool.tutorial.duration}
            </p>
            <button 
              class="btn-secondary w-full"
              on:click={() => window.open(`https://www.youtube.com/watch?v=${tool.tutorial.videoId}`, '_blank')}
            >
              Ver en YouTube
            </button>
          </div>
        {/each}
        
        <!-- Video adicional para completar los 5 videos -->
        <div class="card">
          <div class="aspect-video bg-dark-green rounded-lg mb-4 overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
              title="Guía Completa CATAL1.5°T Toolkit"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="w-full h-full"
            ></iframe>
          </div>
          <h3 class="text-xl font-bold text-dark-green mb-2">
            Guía Completa
          </h3>
          <p class="text-sm text-grey mb-2">
            Tutorial completo sobre cómo combinar todas las herramientas 
            para crear un MVP exitoso.
          </p>
          <p class="text-xs text-dark-purple mb-4">
            Duración: 45 min
          </p>
          <button 
            class="btn-secondary w-full"
            on:click={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
          >
            Ver en YouTube
          </button>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Sección de Call to Action -->
  <section class="py-16 px-6 bg-dark-green">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-light-green mb-6">
        ¿Listo para tu Hackathon?
      </h2>
      <p class="text-lg text-light-green mb-8">
        Únete a la comunidad de innovadores climáticos y comienza a crear 
        soluciones que marquen la diferencia.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          class="btn-primary text-lg px-8 py-4"
          on:click={() => window.location.href = '/tools'}
        >
          Comenzar Ahora
        </button>
        <button 
          class="bg-transparent border-2 border-light-green text-light-green hover:bg-light-green hover:text-dark-green text-lg px-8 py-4 rounded-lg transition-all duration-200"
          on:click={() => window.location.href = '/resources'}
        >
          Ver Recursos
        </button>
      </div>
    </div>
  </section>
</div>

<style>
  .card {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>