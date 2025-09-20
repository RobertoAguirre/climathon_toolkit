import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tool from '../models/Tool';

// Cargar variables de entorno
dotenv.config();

const seedDatabase = async () => {
  try {
    // Conectar a MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/catalyst_toolkit';
    await mongoose.connect(mongoURI);
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existen herramientas
    const existingTools = await Tool.countDocuments();
    if (existingTools > 0) {
      console.log('⚠️  Ya existen herramientas en la base de datos');
      process.exit(0);
    }

    // Datos de las herramientas por defecto
    const defaultTools = [
      {
        id: 'uizard',
        name: 'UIZARD',
        description: 'Crea prototipos rápidos y completos de UI para apps web y móviles',
        category: 'Diseño UI/UX',
        color: 'bg-blue',
        icon: '🎨',
        features: [
          'Conversión de bocetos a prototipos',
          'Templates predefinidos',
          'Colaboración en tiempo real',
          'Exportación a código'
        ],
        tutorial: {
          title: 'Tutorial UIZARD para climathones',
          duration: '15 min',
          description: 'Aprende a crear prototipos profesionales en minutos'
        },
        useCase: 'Perfecto para validar ideas de UI rápidamente y presentar conceptos visuales a tu equipo.',
        difficulty: 'Fácil',
        price: 'Gratis (plan básico)',
        order: 1,
        metadata: {
          website: 'https://uizard.io',
          documentation: 'https://help.uizard.io'
        }
      },
      {
        id: 'make',
        name: 'MAKE',
        description: 'Construye automatizaciones entre diferentes herramientas y aplicaciones',
        category: 'Automatización',
        color: 'bg-light-purple',
        icon: '⚡',
        features: [
          'Integración con 1000+ apps',
          'Flujos de trabajo visuales',
          'Triggers automáticos',
          'Análisis de datos'
        ],
        tutorial: {
          title: 'Automatizaciones con MAKE',
          duration: '20 min',
          description: 'Conecta herramientas y automatiza procesos repetitivos'
        },
        useCase: 'Ideal para automatizar reportes, notificaciones y flujos de datos entre aplicaciones.',
        difficulty: 'Intermedio',
        price: 'Gratis (plan básico)',
        order: 2,
        metadata: {
          website: 'https://make.com',
          documentation: 'https://www.make.com/en/help'
        }
      },
      {
        id: 'cursor',
        name: 'Cursor IA',
        description: 'Herramienta de programación centrada en IA para crear software sin código',
        category: 'Desarrollo',
        color: 'bg-light-green',
        icon: '🤖',
        features: [
          'Programación con IA',
          'Generación de código',
          'Debugging automático',
          'Múltiples lenguajes'
        ],
        tutorial: {
          title: 'Desarrollo con Cursor IA',
          duration: '25 min',
          description: 'Crea aplicaciones completas usando inteligencia artificial'
        },
        useCase: 'Revolucionario para crear MVPs funcionales sin conocimientos previos de programación.',
        difficulty: 'Fácil',
        price: 'Gratis (plan básico)',
        order: 3,
        metadata: {
          website: 'https://cursor.sh',
          documentation: 'https://cursor.sh/docs'
        }
      },
      {
        id: 'flutterflow',
        name: 'FlutterFlow',
        description: 'Herramienta de desarrollo visual sin código para apps móviles y web',
        category: 'Desarrollo Móvil',
        color: 'bg-grey',
        icon: '📱',
        features: [
          'Drag & drop visual',
          'Código Flutter real',
          'Integración con APIs',
          'Deploy directo'
        ],
        tutorial: {
          title: 'Apps Móviles con FlutterFlow',
          duration: '30 min',
          description: 'Desarrolla apps móviles profesionales sin escribir código'
        },
        useCase: 'Excelente para crear apps móviles nativas que funcionen en iOS y Android.',
        difficulty: 'Intermedio',
        price: 'Gratis (plan básico)',
        order: 4,
        metadata: {
          website: 'https://flutterflow.io',
          documentation: 'https://docs.flutterflow.io'
        }
      }
    ];

    // Insertar herramientas
    await Tool.insertMany(defaultTools);
    console.log(`✅ ${defaultTools.length} herramientas creadas correctamente`);

    console.log('🎉 Base de datos poblada exitosamente');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
    process.exit(1);
  }
};

// Ejecutar el script
seedDatabase();
