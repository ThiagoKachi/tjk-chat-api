import mongoose, { Schema } from 'mongoose';

const ConversationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['direct', 'group'],
      default: 'direct'
    },
    name: { type: String, default: null },
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    lastMessage: {
      content: { type: String },
      sender: { type: Schema.Types.ObjectId, ref: 'User' },
      timestamp: { type: Date }
    },
    unreadCounts: {
      type: Map,
      of: Number,
      default: {}
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Índice para buscar conversas eficientemente
ConversationSchema.index({ participants: 1 });
// Índice para ordenar conversas por última atualização
ConversationSchema.index({ updatedAt: -1 });

export const ConversationModel = mongoose.models.Conversation ||
  mongoose.model('Conversation', ConversationSchema);
