import fs from 'fs';

export interface DataObject {
    [key: string]: any;
}

export function readJsonFile(filePath: string): DataObject | null {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

export function writeJsonFile(filePath: string, data: DataObject): boolean {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing JSON file:', error);
        return false;
    }
}

export function mergeDataObjects(obj1: DataObject, obj2: DataObject): DataObject {
    return { ...obj1, ...obj2 };
}