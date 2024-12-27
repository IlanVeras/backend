import { config } from "dotenv";
import http from "http";
import { neon } from "@neondatabase/serverless";

config(); // Carrega as variáveis do arquivo .env

export const sql = neon(process.env.DATABASE_URL);
