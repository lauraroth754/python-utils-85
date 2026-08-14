import fs from 'fs';
import path from 'path';

interface Config {  [key: string]: any;}

dotenvConfig = () => {
  const envFilePath = path.resolve(__dirname, '.env');
  if (fs.existsSync(envFilePath)) {
    const env = fs.readFileSync(envFilePath, 'utf-8');
    return env;
  }
  return null;
};

const loadConfig = (defaultConfig: Config): Config => {
  const envVariables = dotenvConfig();
  const config: Config = { ...defaultConfig };

  if (envVariables) {
    const entries = envVariables.split('\n');
    entries.forEach(entry => {
      const [key, value] = entry.split('=');
      config[key.trim()] = value.trim();
    });
  }

  return config;
};

export { loadConfig };