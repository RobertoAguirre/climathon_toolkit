<script lang="ts">
  import { page } from '$app/stores';
  import { MessageCircle, Video, Home, Settings, Users } from 'lucide-svelte';
  
  // Navegación del sidebar siguiendo el brand kit
  const navigation = [
    { name: 'Inicio', href: '/', icon: Home },
    { name: 'Herramientas IA', href: '/tools', icon: Video },
    { name: 'Asistente IA', href: '/chat', icon: MessageCircle },
    { name: 'Recursos', href: '/resources', icon: Users },
    { name: 'Admin', href: '/admin', icon: Settings }
  ];
  
  $: currentPath = $page.url.pathname;
</script>

<nav class="sidebar">
  <!-- Logo en el sidebar -->
  <div class="mb-8">
    <h2 class="logo text-light-green text-xl">
      CATAL<span class="logo-degree">1.5°</span>T
    </h2>
    <p class="text-light-green text-sm mt-2 opacity-80">
      ClimateTech Toolkit
    </p>
  </div>
  
  <!-- Navegación principal -->
  <ul class="space-y-2">
    {#each navigation as item}
      <li>
        <a 
          href={item.href}
          class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
            {currentPath === item.href 
              ? 'bg-light-purple text-dark-green font-medium' 
              : 'text-light-green hover:bg-light-green hover:text-dark-green'}"
        >
          <svelte:component this={item.icon} size={20} />
          <span>{item.name}</span>
        </a>
      </li>
    {/each}
  </ul>
  
  <!-- Información del proyecto -->
  <div class="mt-8 p-4 bg-dark-purple rounded-lg">
    <h3 class="text-white font-medium mb-2">Sobre el Proyecto</h3>
    <p class="text-light-green text-sm">
      Plataforma toolkit para participantes de hackathones de ClimateTech con herramientas de IA y recursos multimedia.
    </p>
  </div>
  
  <!-- Partners/Donors info -->
  <div class="mt-4 p-4 bg-grey rounded-lg">
    <h4 class="text-dark-green font-medium mb-2 text-sm">Financiado por</h4>
    <div class="text-xs text-dark-green space-y-1">
      <div>• GIZ</div>
      <div>• ClimateKIC</div>
      <div>• Partners regionales</div>
    </div>
  </div>
</nav>

<style>
  .sidebar {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }
  
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      top: 0;
      left: -100%;
      z-index: 50;
      transition: left 0.3s ease;
    }
    
    .sidebar.open {
      left: 0;
    }
  }
</style>
