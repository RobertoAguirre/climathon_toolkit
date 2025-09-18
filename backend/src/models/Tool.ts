import mongoose, { Document, Schema } from 'mongoose';

export interface ITool extends Document {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  icon: string;
  features: string[];
  tutorial: {
    title: string;
    duration: string;
    description: string;
    videoUrl?: string;
  };
  useCase: string;
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado';
  price: string;
  isActive: boolean;
  order: number;
  metadata?: {
    website?: string;
    documentation?: string;
    examples?: string[];
  };
}

const ToolSchema = new Schema<ITool>({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  tutorial: {
    title: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    videoUrl: String
  },
  useCase: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Fácil', 'Intermedio', 'Avanzado'],
    required: true
  },
  price: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  metadata: {
    website: String,
    documentation: String,
    examples: [String]
  }
}, {
  timestamps: true
});

// Índices
ToolSchema.index({ category: 1, order: 1 });
ToolSchema.index({ isActive: 1, order: 1 });

export default mongoose.model<ITool>('Tool', ToolSchema);
