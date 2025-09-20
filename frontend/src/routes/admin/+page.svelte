<script lang="ts">
  import { onMount } from 'svelte';
  import { BarChart3, MessageSquare, Settings, Upload, Trash2, Users, Wrench, TrendingUp } from 'lucide-svelte';
  
  interface DashboardStats {
    totalMessages: number;
    totalTools: number;
    activeTools: number;
    toolsByCategory: Array<{ _id: string; count: number }>;
    messagesByDay: Array<{ _id: { year: number; month: number; day: number }; count: number }>;
    recentMessages: Array<{ content: string; role: string; timestamp: string }>;
  }
  
  interface ChatAnalytics {
    messagesByRole: Array<{ _id: string; count: number }>;
    activeSessions: number;
    topWords: Array<{ word: string; count: number }>;
    period: string;
  }
  
  let stats: DashboardStats | null = null;
  let analytics: ChatAnalytics | null = null;
  let loading = true;
  let activeTab = 'dashboard';
  
  // Cargar estadísticas del dashboard (datos de prueba)
  async function loadDashboardStats() {
    // Simular carga de datos
    await new Promise(resolve => setTimeout(resolve, 500));
    
    stats = {
      totalMessages: 127,
      totalTools: 4,
      activeTools: 4,
      toolsByCategory: [
        { _id: 'Diseño UI/UX', count: 1 },
        { _id: 'Automatización', count: 1 },
        { _id: 'Desarrollo', count: 1 },
        { _id: 'Desarrollo Móvil', count: 1 }
      ],
      messagesByDay: [
        { _id: { year: 2024, month: 1, day: 15 }, count: 23 },
        { _id: { year: 2024, month: 1, day: 16 }, count: 31 },
        { _id: { year: 2024, month: 1, day: 17 }, count: 28 },
        { _id: { year: 2024, month: 1, day: 18 }, count: 45 }
      ],
      recentMessages: [
        { content: '¿Cómo usar UIZARD para crear prototipos?', role: 'user', timestamp: '2024-01-18T10:30:00Z' },
        { content: 'UIZARD es perfecto para climathones! Te permite convertir bocetos...', role: 'assistant', timestamp: '2024-01-18T10:30:15Z' },
        { content: '¿Qué herramientas recomiendas para mi proyecto de ClimateTech?', role: 'user', timestamp: '2024-01-18T09:45:00Z' },
        { content: 'Para proyectos de ClimateTech te recomiendo empezar con...', role: 'assistant', timestamp: '2024-01-18T09:45:20Z' },
        { content: 'Consejos para climathones de ClimateTech', role: 'user', timestamp: '2024-01-18T08:20:00Z' }
      ]
    };
  }
  
  // Cargar análisis del chat (datos de prueba)
  async function loadChatAnalytics() {
    // Simular carga de datos
    await new Promise(resolve => setTimeout(resolve, 300));
    
    analytics = {
      messagesByRole: [
        { _id: 'user', count: 63 },
        { _id: 'assistant', count: 64 }
      ],
      activeSessions: 12,
      topWords: [
        { word: 'uizard', count: 15 },
        { word: 'climathon', count: 12 },
        { word: 'clima', count: 10 },
        { word: 'herramientas', count: 8 },
        { word: 'prototipo', count: 7 },
        { word: 'cursor', count: 6 },
        { word: 'make', count: 5 },
        { word: 'flutterflow', count: 4 }
      ],
      period: '30 días'
    };
  }
  
  // Poblar base de datos con herramientas por defecto (simulado)
  async function seedDatabase() {
    alert('🔄 Poblando base de datos...\n\n✅ 4 herramientas creadas correctamente:\n• UIZARD (Diseño UI/UX)\n• MAKE (Automatización)\n• Cursor IA (Desarrollo)\n• FlutterFlow (Desarrollo Móvil)\n\nEn la versión final, esto se conectará con la base de datos real.');
    loadDashboardStats();
  }
  
  // Limpiar todos los mensajes del chat (simulado)
  async function clearChat() {
    if (!confirm('¿Estás seguro de que quieres eliminar todos los mensajes del chat?')) {
      return;
    }
    
    alert('🗑️ Chat limpiado correctamente.\n\n127 mensajes eliminados.\n\nEn la versión final, esto eliminará todos los mensajes de la base de datos.');
    loadDashboardStats();
    loadChatAnalytics();
  }
  
  onMount(async () => {
    await Promise.all([
      loadDashboardStats(),
      loadChatAnalytics()
    ]);
    loading = false;
  });
</script>

<svelte:head>
  <title>Panel de Administración - Climathon Toolkit</title>
</svelte:head>

<div class="min-h-screen bg-white py-8 px-6">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-dark-green mb-2">
        Panel de Administración
      </h1>
      <p class="text-dark-green opacity-80">
        Gestiona el contenido, analiza el uso y administra la plataforma Climathon Toolkit
      </p>
    </div>
    
    <!-- Tabs de navegación -->
    <div class="mb-8">
      <div class="flex space-x-1 bg-grey p-1 rounded-lg">
        <button
          on:click={() => activeTab = 'dashboard'}
          class="flex-1 py-2 px-4 rounded-md transition-colors
            {activeTab === 'dashboard' 
              ? 'bg-white text-dark-green font-medium' 
              : 'text-dark-green opacity-80 hover:text-dark-green'}"
        >
          <BarChart3 class="inline mr-2" size={16} />
          Dashboard
        </button>
        <button
          on:click={() => activeTab = 'analytics'}
          class="flex-1 py-2 px-4 rounded-md transition-colors
            {activeTab === 'analytics' 
              ? 'bg-white text-dark-green font-medium' 
              : 'text-dark-green opacity-80 hover:text-dark-green'}"
        >
          <TrendingUp class="inline mr-2" size={16} />
          Análisis
        </button>
        <button
          on:click={() => activeTab = 'tools'}
          class="flex-1 py-2 px-4 rounded-md transition-colors
            {activeTab === 'tools' 
              ? 'bg-white text-dark-green font-medium' 
              : 'text-dark-green opacity-80 hover:text-dark-green'}"
        >
          <Wrench class="inline mr-2" size={16} />
          Herramientas
        </button>
        <button
          on:click={() => activeTab = 'settings'}
          class="flex-1 py-2 px-4 rounded-md transition-colors
            {activeTab === 'settings' 
              ? 'bg-white text-dark-green font-medium' 
              : 'text-dark-green opacity-80 hover:text-dark-green'}"
        >
          <Settings class="inline mr-2" size={16} />
          Configuración
        </button>
      </div>
    </div>
    
    {#if loading}
      <div class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dark-green"></div>
        <p class="text-grey mt-4">Cargando datos...</p>
      </div>
    {:else}
      <!-- Tab: Dashboard -->
      {#if activeTab === 'dashboard'}
        <div class="space-y-6">
          <!-- Estadísticas principales -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="card text-center">
              <MessageSquare class="w-12 h-12 text-blue mx-auto mb-4" />
              <h3 class="text-2xl font-bold text-dark-green mb-2">
                {stats?.totalMessages || 0}
              </h3>
              <p class="text-dark-green opacity-80">Mensajes Totales</p>
            </div>
            <div class="card text-center">
              <Wrench class="w-12 h-12 text-light-green mx-auto mb-4" />
              <h3 class="text-2xl font-bold text-dark-green mb-2">
                {stats?.activeTools || 0}
              </h3>
              <p class="text-dark-green opacity-80">Herramientas Activas</p>
            </div>
            <div class="card text-center">
              <Users class="w-12 h-12 text-light-purple mx-auto mb-4" />
              <h3 class="text-2xl font-bold text-dark-green mb-2">
                {analytics?.activeSessions || 0}
              </h3>
              <p class="text-dark-green opacity-80">Sesiones Activas</p>
            </div>
          </div>
          
          <!-- Herramientas por categoría -->
          {#if stats?.toolsByCategory}
            <div class="card">
              <h3 class="text-xl font-bold text-dark-green mb-4">Herramientas por Categoría</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {#each stats.toolsByCategory as category}
                  <div class="text-center p-4 bg-grey rounded-lg">
                    <h4 class="font-medium text-dark-green">{category._id}</h4>
                    <p class="text-2xl font-bold text-dark-purple">{category.count}</p>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          
          <!-- Mensajes recientes -->
          {#if stats?.recentMessages}
            <div class="card">
              <h3 class="text-xl font-bold text-dark-green mb-4">Mensajes Recientes</h3>
              <div class="space-y-3">
                {#each stats.recentMessages.slice(0, 5) as message}
                  <div class="flex items-start space-x-3 p-3 bg-grey rounded-lg">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center
                      {message.role === 'user' ? 'bg-dark-purple' : 'bg-light-green'}">
                      <span class="text-white text-sm font-medium">
                        {message.role === 'user' ? 'U' : 'A'}
                      </span>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm text-dark-green">{message.content}</p>
                      <p class="text-xs text-dark-green opacity-80 mt-1">
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/if}
      
      <!-- Tab: Analytics -->
      {#if activeTab === 'analytics'}
        <div class="space-y-6">
          <!-- Mensajes por rol -->
          {#if analytics?.messagesByRole}
            <div class="card">
              <h3 class="text-xl font-bold text-dark-green mb-4">Mensajes por Rol</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each analytics.messagesByRole as role}
                  <div class="text-center p-4 bg-grey rounded-lg">
                    <h4 class="font-medium text-dark-green capitalize">{role._id}</h4>
                    <p class="text-2xl font-bold text-dark-purple">{role.count}</p>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          
          <!-- Palabras más frecuentes -->
          {#if analytics?.topWords}
            <div class="card">
              <h3 class="text-xl font-bold text-dark-green mb-4">Palabras Más Frecuentes</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {#each analytics.topWords.slice(0, 15) as word}
                  <div class="text-center p-3 bg-light-green rounded-lg">
                    <p class="font-medium text-dark-green">{word.word}</p>
                    <p class="text-sm text-dark-purple">{word.count}</p>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/if}
      
      <!-- Tab: Herramientas -->
      {#if activeTab === 'tools'}
        <div class="space-y-6">
          <div class="card">
            <h3 class="text-xl font-bold text-dark-green mb-4">Gestión de Herramientas</h3>
            <div class="space-y-4">
              <button
                on:click={seedDatabase}
                class="btn-primary"
              >
                <Upload class="mr-2" size={16} />
                Poblar Base de Datos
              </button>
              <p class="text-sm text-dark-green opacity-80">
                Esto creará las herramientas por defecto (UIZARD, MAKE, Cursor IA, FlutterFlow) 
                si la base de datos está vacía.
              </p>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Tab: Configuración -->
      {#if activeTab === 'settings'}
        <div class="space-y-6">
          <div class="card">
            <h3 class="text-xl font-bold text-dark-green mb-4">Configuración del Sistema</h3>
            <div class="space-y-4">
              <div class="p-4 bg-grey rounded-lg">
                <h4 class="font-medium text-dark-green mb-2">Limpiar Chat</h4>
                <p class="text-sm text-dark-green opacity-80 mb-3">
                  Elimina todos los mensajes del chat. Esta acción no se puede deshacer.
                </p>
                <button
                  on:click={clearChat}
                  class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                >
                  <Trash2 class="mr-2" size={16} />
                  Limpiar Chat
                </button>
              </div>
              
              <div class="p-4 bg-grey rounded-lg">
                <h4 class="font-medium text-dark-green mb-2">Información del Sistema</h4>
                <div class="text-sm text-dark-green opacity-80 space-y-1">
                  <p>Versión: 1.0.0</p>
                  <p>Entorno: Desarrollo</p>
                  <p>Base de datos: MongoDB</p>
                  <p>IA: OpenAI GPT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>
