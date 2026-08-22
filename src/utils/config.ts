interface Config {
  apiBaseUrl: string;
  googleClientId: string;
  googleClientSecret: string;
}

const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};

export default config;
