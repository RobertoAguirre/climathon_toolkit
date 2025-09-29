<script lang="ts">
  // Componente Footer siguiendo las especificaciones del brand kit
  // Barra blanca inferior con partners centrados
</script>

<footer class="white-bar bg-white border-t-2 border-light-green flex items-center justify-center px-6">
  <!-- Partners centrados -->
  <div class="sponsors-container">
      <img 
        src="/sponsors-logos.png" 
        alt="Sponsors y Partners" 
        class="sponsors-img"
      />
  </div>
</footer>

<style>
  .white-bar {
    min-height: 170px; /* Altura mínima para la barra blanca */
  }
  
  .sponsors-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .sponsors-img {
    height: 146px;
    width: auto;
    max-width: 1454px;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    .white-bar {
      min-height: 150px;
      padding: 0.5rem 1rem;
      flex-direction: column;
      text-align: center;
      gap: 0.5rem;
    }
    
    .sponsors-container {
      justify-content: center;
    }
    
    .sponsors-img {
      height: 116px;
      max-width: 1163px;
    }
  }
</style>
