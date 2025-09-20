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
      <p class="text-xs text-dark-green font-medium mb-2">Implementado por</p>
      <div class="flex items-center space-x-4">
        <!-- Logos de partners -->
        <div class="partner-logo">
          <img 
            src="/src/lib/assets/Climathon_Logo_Dafodil_RGB.svg" 
            alt="GIZ" 
            class="partner-img"
          />
          <span class="partner-name">GIZ</span>
        </div>
        <div class="partner-logo">
          <img 
            src="/src/lib/assets/Climathon_Logo_Cloud_RGB.svg" 
            alt="ClimateKIC" 
            class="partner-img"
          />
          <span class="partner-name">ClimateKIC</span>
        </div>
        <div class="partner-logo">
          <img 
            src="/src/lib/assets/Climathon_Square Logo_Ink on Dafodil_RGB.svg" 
            alt="Partners" 
            class="partner-img"
          />
          <span class="partner-name">Partners</span>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  .white-bar {
    min-height: 80px; /* Altura mínima para la barra blanca */
  }
  
  .partner-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .partner-img {
    height: 30px;
    width: auto;
    margin-bottom: 4px;
  }
  
  .partner-name {
    font-size: 10px;
    color: var(--dark-green);
    font-weight: 500;
  }
  
  @media (max-width: 768px) {
    .white-bar {
      min-height: 60px;
      padding: 0.5rem 1rem;
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
    
    .partner-img {
      height: 25px;
    }
    
    .partner-name {
      font-size: 9px;
    }
  }
</style>
