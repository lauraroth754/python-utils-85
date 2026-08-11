import { validateInput } from './helpers';

interface Config {
    apiKey: string;
    timeout: number;
}

const config: Config = {
    apiKey: process.env.API_KEY || '',
    timeout: parseInt(process.env.TIMEOUT || '5000', 10),
};

function mainProcessingLoop(input: any) {
    if (!validateInput(input)) {
        throw new Error('Invalid input');
    }
    // main processing logic here
}

export { config, mainProcessingLoop };