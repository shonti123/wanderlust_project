import { PrismaClient } from "@prisma/client";
require('dotenv').config(); // Load environment variables from .env

const fs = require('fs');
console.log("Current Directory:", process.cwd()); // Log the current working directory
console.log(".env File Exists:", fs.existsSync('.env')); // Check if the .env file exists
console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debug the DATABASE_URL

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;