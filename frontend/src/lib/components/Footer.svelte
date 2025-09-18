<script lang="ts">
  // Componente Footer siguiendo las especificaciones del brand kit
  // Barra blanca inferior con partners a la derecha
</script>

<footer class="white-bar bg-white border-t-2 border-light-green flex items-center justify-between px-6">
  <!-- Claim a la izquierda -->
  <div class="flex items-center">
    <p class="text-dark-green text-sm">
      Climate tech innovations are essential to keep global warming close to 1.5° Celsius.
    </p>
  </div>
  
  <!-- Partners a la derecha -->
  <div class="flex items-center space-x-6">
    <div class="text-right">
      <p class="text-xs text-dark-green font-medium mb-1">Implementado por</p>
      <div class="flex items-center space-x-3">
        <!-- Logos de partners - se pueden agregar imágenes reales -->
        <div class="text-xs text-dark-green font-medium">GIZ</div>
        <div class="text-xs text-dark-green font-medium">ClimateKIC</div>
        <div class="text-xs text-dark-green font-medium">Partners</div>
      </div>
    </div>
  </div>
</footer>

<style>
  .white-bar {
    min-height: 80px; /* Altura mínima para la barra blanca */
  }
  
  @media (max-width: 768px) {
    .white-bar {
      min-height: 60px;
      padding: 0.5rem 1rem;
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
  }
</style>
