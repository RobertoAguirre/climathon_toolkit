<script lang="ts">
  import { ExternalLink, BookOpen, Video, FileText, Globe, Info, Lightbulb, Presentation, Bot } from 'lucide-svelte';
  
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
          description: 'Conoce más sobre la iniciativa CATAL1.5°T y Climathons',
          type: 'Website',
          url: 'https://catalist-initiative.eco/'
        },
        {
          title: 'Climathons Climate KIC',
          description: 'Plataforma oficial de Climathons a nivel mundial',
          type: 'Website',
          url: 'https://climathon.climate-kic.org/'
        },
        {
          title: 'Climathons Latam 2025',
          description: 'Lista de Climathons 2025 y enlaces de registro',
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
          url: 'https://climatekic.notion.site/Handbook-for-Climate-Entrepreneurs-1422de9393fa80898ef9c462484c44ba'
        },
        {
          title: 'Manual Fundamentos del Emprendimiento',
          description: 'Guía completa sobre los fundamentos del emprendimiento',
          type: 'Google Drive',
          url: 'https://drive.google.com/file/d/1JbZrJLDn2mIoWUoAwvtG0AduwcmUg7Uo/view'
        },
        {
          title: 'Design Thinking Tools',
          description: 'Herramientas de design thinking para Climathons',
          type: 'Website',
          url: 'https://climatekic.notion.site/CATAL1-5-T-Climathons-a5a72156137f4419867cf2de499a802a'
        },
        {
          title: 'Herramientas de Ideación Online',
          description: 'Nuestras herramientas favoritas para ideación',
          type: 'Website',
          url: 'https://www.boardofinnovation.com/staff_picks/our-favorite-ideation-tools/'
        },
        {
          title: 'IAR3EES System Innovation',
          description: 'Presentación sobre innovación sistémica para soluciones climáticas',
          type: 'Google Slides',
          url: 'https://docs.google.com/presentation/d/1ozH906HRU2EtSAsYw_fnqPQg7DFwujHM/edit?slide=id.p35&pli=1#slide=id.p35'
        }
      ]
    },
    {
      category: 'Design Thinking',
      icon: Lightbulb,
      color: 'bg-light-purple',
      items: [
        {
          title: 'Circular Idea Pitch',
          description: 'Plantilla para presentar ideas de economía circular en Climathons',
          type: 'PDF',
          url: 'http://file.notion.so/f/f/dee315ea-7965-4f66-8917-15d3ec94b3e1/7872a96e-c182-4fed-b27d-60cf02cb6d66/Circular_idea_pitch.pdf?table=block&id=f8817fc7-bf53-4104-888f-9088a7bdd197&spaceId=dee315ea-7965-4f66-8917-15d3ec94b3e1&expirationTimestamp=1759125600000&signature=jn1LGuzcfSImrnquT1-WRS05VSIg-0OW747EtVl9EPI&downloadName=Circular+idea+pitch.pdf'
        },
        {
          title: 'Circularity Deck',
          description: 'Mazo de cartas con principios de economía circular para diseñar soluciones sostenibles',
          type: 'PDF',
          url: 'https://file.notion.so/f/f/dee315ea-7965-4f66-8917-15d3ec94b3e1/bde8110a-3885-4638-a830-a34fc707d758/Circularity_Deck.pdf?table=block&id=a32f81d4-c930-4bc2-9196-0a4a266075e4&spaceId=dee315ea-7965-4f66-8917-15d3ec94b3e1&expirationTimestamp=1759125600000&signature=olvgFNji-VWe91Daf4qwc1H_p_5XkUk1IWZuJRRI0lA&downloadName=Circularity+Deck.pdf'
        },
        {
          title: 'The Ecosystem View',
          description: 'Marco para analizar ecosistemas y diseñar soluciones sistémicas',
          type: 'PDF',
          url: 'https://file.notion.so/f/f/dee315ea-7965-4f66-8917-15d3ec94b3e1/65ba35b8-cbd4-4ec9-abe3-0a1a84152846/The_ecosystem_view.pdf?table=block&id=a8789f3b-29ce-4b62-923a-e2d0caf7042d&spaceId=dee315ea-7965-4f66-8917-15d3ec94b3e1&expirationTimestamp=1759125600000&signature=7XQxgc32DeI-EmWhmx5xKJCtZODYgqujxoRvtcynHPo&downloadName=The+ecosystem+view.pdf'
        },
        {
          title: 'Business Model Canvas',
          description: 'Plantilla para diseñar modelos de negocio sostenibles y circulares',
          type: 'PDF',
          url: 'http://file.notion.so/f/f/dee315ea-7965-4f66-8917-15d3ec94b3e1/8f5e7583-ee50-4684-b22d-260f8307aab4/the-business-model-canvas-1.pdf?table=block&id=25b47a96-553b-432a-ac87-9b6a72e97b45&spaceId=dee315ea-7965-4f66-8917-15d3ec94b3e1&expirationTimestamp=1759125600000&signature=625wDthDwt2GZkDTdP-aOfHW06VWBRNTV4xd0aseds8&downloadName=the-business-model-canvas-1.pdf'
        },
        {
          title: 'Value Proposition Canvas',
          description: 'Herramienta para definir y validar la propuesta de valor de tu solución climática',
          type: 'PDF',
          url: 'https://file.notion.so/f/f/dee315ea-7965-4f66-8917-15d3ec94b3e1/35e98c5a-ed00-4f82-810d-1dde1be7ecd0/the-value-proposition-canvas-1.pdf?table=block&id=6f599da6-5cb6-4fb0-a537-077535b79cce&spaceId=dee315ea-7965-4f66-8917-15d3ec94b3e1&expirationTimestamp=1759125600000&signature=sG1MWoPqJJPeMFd1EAv8ryDbXKWjM-LBX6NS6U00vi4&downloadName=the-value-proposition-canvas-1.pdf'
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
          title: 'Como Comenzar - Guía Inicial',
          description: 'Guía paso a paso para iniciar tu proyecto Climathon desde cero',
          type: 'Herramienta',
          url: '#'
        },
        {
          title: 'Whimsical - Diagramas y Wireframes',
          description: 'Crea diagramas, wireframes y mapas mentales de forma colaborativa',
          type: 'Herramienta',
          url: 'https://whimsical.com'
        },
        {
          title: 'UIZARD - Prototipado',
          description: 'Crea prototipos rápidos y completos de UI para apps web y móviles',
          type: 'Herramienta',
          url: 'https://uizard.io'
        },
        {
          title: 'Claude - Inteligencia Artificial',
          description: 'Asistente de IA avanzado para investigación, análisis y generación de contenido',
          type: 'Herramienta',
          url: 'https://claude.ai'
        },
        {
          title: 'Gamma - Presentaciones',
          description: 'Crea presentaciones profesionales y documentos interactivos con IA',
          type: 'Herramienta',
          url: 'https://gamma.app'
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

  // Función para abrir enlaces externos
  function openLink(url: string) {
    if (url && url !== '#') {
      window.open(url, '_blank');
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
        en los Climathons de ClimateTech Latam 2025.
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
                on:click={() => openLink(item.url)}
                on:keydown={(e) => e.key === 'Enter' && openLink(item.url)}
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