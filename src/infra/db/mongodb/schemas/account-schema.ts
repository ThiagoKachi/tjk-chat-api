import { Account } from '@domain/models/account/account';
import mongoose, { Schema } from 'mongoose';

const AccountSchema = new Schema<Account>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ['online', 'offline', 'away'],
      default: 'offline'
    },
    lastSeen: { type: Date, default: Date.now },
    favoritesContacts: { type: [String], default: [] },
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

export const AccountModel = mongoose.models.Account || mongoose.model<Account>('Account', AccountSchema);
