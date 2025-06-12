import { PrismaClient } from "@prisma/client";
require('dotenv').config(); // Load environment variables from .env

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;