<script lang="ts">
  import { ExternalLink, Download, BookOpen, Video, FileText, Globe } from 'lucide-svelte';
  
  // Recursos organizados por categoría
  const resources = [
    {
      category: 'Documentación',
      icon: BookOpen,
      color: 'bg-blue',
      items: [
        {
          title: 'Guía de Inicio Rápido',
          description: 'Todo lo que necesitas saber para comenzar con el toolkit',
          type: 'PDF',
          size: '2.3 MB',
          url: '#'
        },
        {
          title: 'Manual de Herramientas IA',
          description: 'Documentación completa de todas las herramientas disponibles',
          type: 'PDF',
          size: '5.1 MB',
          url: '#'
        },
        {
          title: 'Mejores Prácticas para Hackathones',
          description: 'Consejos y estrategias para maximizar tu productividad',
          type: 'PDF',
          size: '1.8 MB',
          url: '#'
        }
      ]
    },
    {
      category: 'Videos Tutoriales',
      icon: Video,
      color: 'bg-light-green',
      items: [
        {
          title: 'Introducción al CATAL1.5°T Toolkit',
          description: 'Tour completo de la plataforma y sus funcionalidades',
          type: 'Video',
          duration: '12 min',
          url: '#'
        },
        {
          title: 'UIZARD: Prototipado en 15 minutos',
          description: 'Aprende a crear prototipos profesionales rápidamente',
          type: 'Video',
          duration: '15 min',
          url: '#'
        },
        {
          title: 'MAKE: Automatizaciones Básicas',
          description: 'Conecta aplicaciones y automatiza tareas repetitivas',
          type: 'Video',
          duration: '20 min',
          url: '#'
        },
        {
          title: 'Cursor IA: Desarrollo sin Código',
          description: 'Crea aplicaciones completas usando inteligencia artificial',
          type: 'Video',
          duration: '25 min',
          url: '#'
        },
        {
          title: 'FlutterFlow: Apps Móviles',
          description: 'Desarrolla apps nativas con interfaz visual',
          type: 'Video',
          duration: '30 min',
          url: '#'
        }
      ]
    },
    {
      category: 'Plantillas',
      icon: FileText,
      color: 'bg-light-purple',
      items: [
        {
          title: 'Plantilla de Pitch Deck',
          description: 'Presentación profesional para tu proyecto de ClimateTech',
          type: 'PPTX',
          size: '8.2 MB',
          url: '#'
        },
        {
          title: 'Canvas de Modelo de Negocio',
          description: 'Estructura para definir tu propuesta de valor',
          type: 'PDF',
          size: '1.5 MB',
          url: '#'
        },
        {
          title: 'Checklist de Validación',
          description: 'Lista de verificación para validar tu idea',
          type: 'PDF',
          size: '0.8 MB',
          url: '#'
        }
      ]
    },
    {
      category: 'Enlaces Útiles',
      icon: Globe,
      color: 'bg-grey',
      items: [
        {
          title: 'ClimateKIC',
          description: 'Red europea de innovación climática',
          type: 'Website',
          url: 'https://www.climate-kic.org'
        },
        {
          title: 'GIZ',
          description: 'Cooperación alemana para el desarrollo sostenible',
          type: 'Website',
          url: 'https://www.giz.de'
        },
        {
          title: 'UIZARD',
          description: 'Herramienta de prototipado con IA',
          type: 'Website',
          url: 'https://uizard.io'
        },
        {
          title: 'MAKE',
          description: 'Plataforma de automatización',
          type: 'Website',
          url: 'https://make.com'
        },
        {
          title: 'Cursor IA',
          description: 'Editor de código con IA',
          type: 'Website',
          url: 'https://cursor.sh'
        },
        {
          title: 'FlutterFlow',
          description: 'Desarrollo visual de apps',
          type: 'Website',
          url: 'https://flutterflow.io'
        }
      ]
    }
  ];
  
  function getFileIcon(type: string) {
    switch (type) {
      case 'PDF':
        return '📄';
      case 'Video':
        return '🎥';
      case 'PPTX':
        return '📊';
      case 'Website':
        return '🌐';
      default:
        return '📁';
    }
  }
  
  function handleDownload(item: any) {
    if (item.type === 'Website') {
      window.open(item.url, '_blank');
    } else {
      // Simular descarga
      alert(`📥 Descargando: ${item.title}\n\nTipo: ${item.type}\nTamaño: ${item.size || item.duration}\n\nEn la versión final, este archivo se descargaría automáticamente.`);
    }
  }
</script>

<svelte:head>
  <title>Recursos - CATAL1.5°T Toolkit</title>
</svelte:head>

<div class="min-h-screen bg-white py-8 px-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-dark-green mb-4">
        Recursos y Documentación
      </h1>
      <p class="text-xl text-dark-green max-w-3xl mx-auto">
        Accede a guías, tutoriales, plantillas y enlaces útiles para maximizar 
        tu productividad durante hackathones de ClimateTech.
      </p>
    </div>
    
    <!-- Grid de recursos por categoría -->
    <div class="space-y-12">
      {#each resources as category}
        <div class="card">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 {category.color} rounded-full flex items-center justify-center mr-4">
              <svelte:component this={category.icon} class="text-dark-green" size={24} />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-dark-green">
                {category.category}
              </h2>
              <p class="text-grey">
                {category.items.length} recursos disponibles
              </p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each category.items as item}
              <div class="p-4 border-2 border-grey rounded-lg hover:border-light-green transition-colors">
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-center">
                    <span class="text-2xl mr-3">{getFileIcon(item.type)}</span>
                    <div>
                      <h3 class="font-semibold text-dark-green text-sm">
                        {item.title}
                      </h3>
                      <p class="text-xs text-grey">
                        {item.type}
                        {#if item.size}
                          • {item.size}
                        {/if}
                        {#if item.duration}
                          • {item.duration}
                        {/if}
                      </p>
                    </div>
                  </div>
                </div>
                
                <p class="text-sm text-dark-green mb-4">
                  {item.description}
                </p>
                
                <button
                  on:click={() => handleDownload(item)}
                  class="w-full btn-primary text-sm py-2 flex items-center justify-center"
                >
                  {#if item.type === 'Website'}
                    <ExternalLink class="mr-2" size={14} />
                    Visitar
                  {:else}
                    <Download class="mr-2" size={14} />
                    Descargar
                  {/if}
                </button>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Sección de contacto -->
    <div class="mt-16 card text-center">
      <h2 class="text-2xl font-bold text-dark-green mb-4">
        ¿Necesitas Ayuda Adicional?
      </h2>
      <p class="text-grey mb-6 max-w-2xl mx-auto">
        Si no encuentras lo que buscas o necesitas asistencia personalizada, 
        nuestro equipo está aquí para ayudarte.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          class="btn-primary"
          on:click={() => window.location.href = '/chat'}
        >
          <MessageSquare class="mr-2" size={16} />
          Chat con IA
        </button>
        <button 
          class="btn-secondary"
          on:click={() => alert('📧 Contacto de soporte:\n\nEmail: support@catalyst-toolkit.org\nTeléfono: +1 (555) 123-4567\n\nHorario: Lunes a Viernes, 9:00 - 18:00')}
        >
          <ExternalLink class="mr-2" size={16} />
          Contactar Soporte
        </button>
      </div>
    </div>
  </div>
</div>
