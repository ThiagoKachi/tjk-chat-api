import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ['text', 'image', 'file'],
      default: 'text'
    },
    readBy: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      readAt: { type: Date }
    }],
    attachments: [{
      url: { type: String },
      type: { type: String },
      name: { type: String },
      size: { type: Number }
    }],
    deleted: { type: Boolean, default: false }
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

// Índice para mensagens de uma conversa por ordem cronológica
MessageSchema.index({ conversationId: 1, createdAt: -1 });

export const MessageModel = mongoose.models.Message ||
  mongoose.model('Message', MessageSchema);