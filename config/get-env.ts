export const getEnv = (
  env: (name: string, defaultValue?: string) => string | undefined,
  name: string,
  defaultValue?: any
) => {
  const result = env(name, defaultValue) ?? process.env[name];
  if (!result) {
    console.log("not found env", name);
  }
  return result ?? defaultValue;
};
