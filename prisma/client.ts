import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// Check if the Prisma client is defined, otherwise initialize it
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to maintain a singleton instance
  const globalAny: any = global;
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient();
  }
  prisma = globalAny.prisma;
}

export default prisma;
