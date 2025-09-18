import mongoose, { Document, Schema } from 'mongoose';

export interface IChatMessage extends Document {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  sessionId?: string;
  metadata?: {
    tool?: string;
    category?: string;
    language?: string;
  };
}

const ChatMessageSchema = new Schema<IChatMessage>({
  id: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  sessionId: {
    type: String,
    required: false
  },
  metadata: {
    tool: String,
    category: String,
    language: {
      type: String,
      default: 'es'
    }
  }
}, {
  timestamps: true
});

// Índices para optimizar consultas
ChatMessageSchema.index({ sessionId: 1, timestamp: -1 });
ChatMessageSchema.index({ role: 1, timestamp: -1 });

export default mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
