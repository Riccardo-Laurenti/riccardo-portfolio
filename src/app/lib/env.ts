
function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(` Missing env variable: ${key}`);
  return value;
}

export const env = {
  SANITY_PROJECT_ID: getEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  SANITY_DATASET: getEnv("NEXT_PUBLIC_SANITY_DATASET"),
  SANITY_API_VERSION: getEnv("NEXT_PUBLIC_SANITY_API_VERSION"),
};

