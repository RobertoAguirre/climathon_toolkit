<script lang="ts">
  import { ExternalLink, Download, BookOpen, Video, FileText, Globe, Info, Lightbulb, Presentation, Bot } from 'lucide-svelte';
  
  // Interfaces TypeScript
  interface ResourceItem {
    title: string;
    description: string;
    type: string;
    url: string;
    size?: string;
    duration?: string;
  }
  
  interface ResourceCategory {
    category: string;
    icon: any;
    color: string;
    items: ResourceItem[];
  }
  
  // Recursos organizados por categoría
  const resources: ResourceCategory[] = [
    {
      category: 'Material General',
      icon: Info,
      color: 'bg-blue',
      items: [
        {
          title: 'Sitio Web Catalist',
          description: 'Conoce más sobre la iniciativa CATAL1.5°T y climathones',
          type: 'Website',
          url: 'https://catalist-initiative.eco/'
        },
        {
          title: 'Climathons Climate KIC',
          description: 'Plataforma oficial de climathones a nivel mundial',
          type: 'Website',
          url: 'https://climathon.climate-kic.org/'
        },
        {
          title: 'Climathons Latam 2025',
          description: 'Lista de climathones 2025 y enlaces de registro',
          type: 'Website',
          url: 'https://climathon.climate-kic.org/catalist_latam/'
        },
        {
          title: 'Knowledge Hub Climathons',
          description: 'Centro de conocimiento con contenido en español',
          type: 'Website',
          url: 'https://climatekic.notion.site/20babfa61ece464c94adad0fa86e49a6?v=aad3d491fb9242a5b939618938520316'
        }
      ]
    },
    {
      category: 'Ideación y Desarrollo',
      icon: Lightbulb,
      color: 'bg-light-green',
      items: [
        {
          title: 'Climate 101 - Fundamentos',
          description: 'Presentación sobre los fundamentos del cambio climático',
          type: 'Google Slides',
          url: 'https://docs.google.com/presentation/d/1Ig-vQkmi1nXULhv2FMIg7Ulm6DXP5K9Q/edit?slide=id.p1#slide=id.p1'
        },
        {
          title: 'Handbook Emprendedores Climáticos',
          description: 'Manual completo para emprendedores en ClimateTech (inglés)',
          type: 'Website',
          url: 'https://www.climate-kic.org/entrepreneurship/handbook-for-climate-entrepreneurs/'
        },
        {
          title: 'Manual Fundamentos del Emprendimiento',
          description: 'Guía completa sobre los fundamentos del emprendimiento',
          type: 'Google Drive',
          url: 'https://drive.google.com/file/d/1JbZrJLDn2mIoWUoAwvtG0AduwcmUg7Uo/view'
        },
        {
          title: 'Design Thinking Tools',
          description: 'Herramientas de design thinking para climathones',
          type: 'Website',
          url: 'https://climathon.climate-kic.org/catalist-climathons'
        },
        {
          title: 'Herramientas de Ideación Online',
          description: 'Nuestras herramientas favoritas para ideación',
          type: 'Website',
          url: 'https://www.boardofinnovation.com/tools/our-favorite-ideation-tools/'
        }
      ]
    },
    {
      category: 'Pitch Training',
      icon: Presentation,
      color: 'bg-light-purple',
      items: [
        {
          title: 'Slides Impact Pitch',
          description: 'Plantilla de presentación para pitch de impacto',
          type: 'Google Slides',
          url: 'https://docs.google.com/presentation/d/17YP7SU8lARsbgP_Sbmz34lWeuAvC9WEf/edit?usp=sharing&ouid=103815518341617694684&rtpof=true&sd=true'
        },
        {
          title: 'Grabación Explicación Impact Pitch',
          description: 'Video explicativo sobre cómo hacer un pitch de impacto efectivo',
          type: 'Google Drive',
          url: 'https://drive.google.com/file/d/1zK3AON5xgl6iWngsa2bEVlV0MZBlRmIQ/view?usp=drive_link'
        }
      ]
    },
    {
      category: 'Herramientas de IA',
      icon: Bot,
      color: 'bg-grey',
      items: [
        {
          title: 'UIZARD - Prototipado',
          description: 'Crea prototipos rápidos y completos de UI para apps web y móviles',
          type: 'Herramienta',
          url: 'https://uizard.io'
        },
        {
          title: 'MAKE - Automatización',
          description: 'Construye automatizaciones entre diferentes herramientas y aplicaciones',
          type: 'Herramienta',
          url: 'https://make.com'
        },
        {
          title: 'Cursor IA - Desarrollo',
          description: 'Herramienta de programación centrada en IA para crear software sin código',
          type: 'Herramienta',
          url: 'https://cursor.sh'
        },
        {
          title: 'FlutterFlow - Apps Móviles',
          description: 'Herramienta de desarrollo visual sin código para apps móviles y web',
          type: 'Herramienta',
          url: 'https://flutterflow.io'
        }
      ]
    }
  ];

  // Función para obtener el icono según el tipo de archivo
  function getFileIcon(type: string): string {
    switch (type.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'video':
        return '🎥';
      case 'website':
        return '🌐';
      case 'google slides':
        return '📊';
      case 'google drive':
        return '📁';
      case 'herramienta':
        return '🛠️';
      default:
        return '📁';
    }
  }

  // Función para manejar descargas y enlaces externos
  function handleDownload(item: ResourceItem) {
    if (item.url && item.url !== '#') {
      // Todos los enlaces se abren en nueva pestaña
      window.open(item.url, '_blank');
    } else {
      alert('Enlace no disponible aún');
    }
  }
</script>

<svelte:head>
  <title>Recursos - Climathon Toolkit</title>
</svelte:head>

<div class="min-h-screen bg-white py-8 px-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-dark-green mb-4">
        Recursos Digitales
      </h1>
      <p class="text-dark-green opacity-80 mb-6 max-w-2xl mx-auto">
        Todo el material que necesitas para prepararte y participar exitosamente 
        en los climathones de ClimateTech Latam 2025.
      </p>
    </div>

    <!-- Recursos por categoría -->
    <div class="space-y-12">
      {#each resources as category}
        <div class="card">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 {category.color} rounded-lg flex items-center justify-center mr-4">
              <svelte:component this={category.icon} class="text-dark-green" size={24} />
            </div>
            <div>
              <h2 class="text-2xl font-bold text-dark-green">
                {category.category}
              </h2>
              <p class="text-dark-green opacity-80">
                {category.items.length} recursos disponibles
              </p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each category.items as item}
              <div 
                class="p-4 bg-white border border-grey rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                on:click={() => handleDownload(item)}
                on:keydown={(e) => e.key === 'Enter' && handleDownload(item)}
                role="button"
                tabindex="0"
              >
                <div class="flex items-start space-x-3">
                  <span class="text-2xl mr-3">{getFileIcon(item.type)}</span>
                  <div>
                    <h3 class="font-semibold text-dark-green text-sm">
                      {item.title}
                    </h3>
                    <p class="text-xs text-dark-green opacity-80">
                      {item.type}
                      {#if item.size}
                        • {item.size}
                      {/if}
                      {#if item.duration}
                        • {item.duration}
                      {/if}
                    </p>
                    <p class="text-xs text-dark-green opacity-80 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
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
      <p class="text-dark-green opacity-80 mb-6 max-w-2xl mx-auto">
        Si no encuentras lo que buscas o necesitas asistencia personalizada, 
        nuestro equipo está aquí para ayudarte.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          class="btn-primary flex items-center justify-center"
          on:click={() => window.location.href = '/chat'}
        >
          <Bot class="mr-2" size={20} />
          Chat con IA
        </button>
        <button 
          class="btn-secondary flex items-center justify-center"
          on:click={() => alert('Contacto: info@climathon-toolkit.org')}
        >
          <ExternalLink class="mr-2" size={20} />
          Contactar Soporte
        </button>
      </div>
    </div>
  </div>
</div>