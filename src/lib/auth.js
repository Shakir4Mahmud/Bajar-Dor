import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// dev mode e bar bar notun connection jate na hoy, tai ekta connection globalThis e rakhchi
if (!globalThis.mongoClient) {
  globalThis.mongoClient = new MongoClient(process.env.BETTER_AUTH_DB_URL);
}

const client = globalThis.mongoClient;
const db = client.db();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: mongodbAdapter(db),
});