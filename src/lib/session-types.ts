import { Session } from 'next-auth'

export interface ExtendedSession extends Session {
  user: {
    id: string
    email: string
    name?: string
    role: string
  }
}