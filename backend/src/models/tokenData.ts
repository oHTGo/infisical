import { Schema, Types, model } from "mongoose";
import {
  TOKEN_EMAIL_CONFIRMATION,
  TOKEN_EMAIL_MFA,
  TOKEN_EMAIL_ORG_INVITATION,
  TOKEN_EMAIL_PASSWORD_RESET,
} from "../variables";

export interface ITokenData {
  type: string;
  email?: string;
  phoneNumber?: string;
  organization?: Types.ObjectId;
  tokenHash: string;
  triesLeft?: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const tokenDataSchema = new Schema<ITokenData>({
  type: {
    type: String,
    enum: [
      TOKEN_EMAIL_CONFIRMATION,
      TOKEN_EMAIL_MFA,
      TOKEN_EMAIL_ORG_INVITATION,
      TOKEN_EMAIL_PASSWORD_RESET,
    ],
    required: true,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  organization: { // organizationInvitation-specific field
    type: Schema.Types.ObjectId,
    ref: "Organization",
  },
  tokenHash: {
    type: String,
    select: false,
    required: true,
  },
  triesLeft: {
    type: Number,
  },
  expiresAt: {
    type: Date,
    expires: 0,
    required: true,
  },
}, {
  timestamps: true,
});

export const TokenData = model<ITokenData>("TokenData", tokenDataSchema);