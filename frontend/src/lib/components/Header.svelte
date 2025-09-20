<script lang="ts">
  // Componente Header siguiendo las especificaciones del brand kit
  // Barra blanca superior con logo Climathon Toolkit a la izquierda
</script>

<header class="white-bar bg-white border-b-2 border-light-green flex items-center justify-between px-6">
  <!-- Logo Climathon Toolkit a la izquierda -->
  <div class="flex items-center">
    <img 
      src="/src/lib/assets/Climathon_Logo_Ink_RGB.svg" 
      alt="Climathon Toolkit" 
      class="logo-img"
    />
  </div>
  
  <!-- Espacio para donantes (top-right) - se puede agregar según necesidad -->
  <div class="flex items-center space-x-4">
    <!-- Aquí se pueden agregar logos de donantes si es necesario -->
 <!--    <span class="text-sm text-dark-green font-medium">#CatalyseClimateTech</span> -->
  </div>
</header>

<style>
  .white-bar {
    min-height: 80px; /* Altura mínima para la barra blanca */
  }
  
  .logo-img {
    height: 60px;
    width: auto;
  }
  
  @media (max-width: 768px) {
    .white-bar {
      min-height: 60px;
      padding: 0.5rem 1rem;
    }
    
    .logo-img {
      height: 50px;
    }
  }
</style>
