import { JsonValue } from '@prisma/client/runtime/library';
import { JWTPayload } from 'jose';

export interface SessionPayload extends JWTPayload {
  userId: string;
}

export interface UserOut {
  email: string;
}

export interface Poll {
  id: number;
  name: string;
  description: string | null;
  userId: number;
  user: UserOut;
  isClosed: boolean;
  choices: Record<string, number>;
  voteCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionVerifyResponse {
  isAuth: boolean;
  userId?: string;
}
