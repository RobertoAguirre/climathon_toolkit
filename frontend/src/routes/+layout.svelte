<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Climathon Toolkit - Plataforma para climathones de ClimateTech</title>
  <meta name="description" content="Herramientas de IA, recursos multimedia y asistencia interactiva para participantes de climathones de ClimateTech" />
  <meta name="keywords" content="climate tech, climathon, toolkit, IA, CATAL1.5°T" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="min-h-screen bg-white flex flex-col">
  <!-- Barra blanca superior (1/6 de altura) -->
  <Header />
  
  <!-- Contenido principal -->
  <div class="flex-1 flex">
    <!-- Sidebar verde oscuro -->
    <Sidebar />
    
    <!-- Área de contenido principal -->
    <main class="flex-1 bg-white">
      <slot />
    </main>
  </div>
  
  <!-- Barra blanca inferior (1/6 de altura) -->
  <Footer />
</div>