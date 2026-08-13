import * as fs from 'fs';
import * as path from 'path';

interface Config {  
    port: number;  
    dbUrl: string;  
    logLevel: string;  
}  

const defaultConfig: Config = {  
    port: 3000,  
    dbUrl: 'mongodb://localhost:27017/myapp',  
    logLevel: 'info'  
};  

function loadConfig(configPath: string): Config {  
    let userConfig: Partial<Config> = {};  
    try {  
        const configFile = fs.readFileSync(path.resolve(configPath), 'utf8');  
        userConfig = JSON.parse(configFile);  
    } catch (error) {  
        console.warn('Could not load configuration file, using defaults.');  
    }  
    return { ...defaultConfig, ...userConfig };  
}  

export { loadConfig, Config };