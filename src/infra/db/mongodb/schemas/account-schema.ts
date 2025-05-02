import { Account } from '@domain/models/account/account';
import { UserStatus } from '@domain/models/user-status';
import mongoose, { Schema } from 'mongoose';

const AccountSchema = new Schema<Account>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: [UserStatus.ONLINE, UserStatus.OFFLINE, UserStatus.AWAY],
      default: UserStatus.OFFLINE
    },
    lastSeen: { type: Date, default: Date.now },
    favoritesContacts: { type: [String], default: [], ref: 'Account' },
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
