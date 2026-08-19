function validateInput(input: any): boolean { return typeof input === 'string' && input.trim() !== ''; }

function processInput(input: any): void { if (!validateInput(input)) { throw new Error('Invalid input'); } console.log(`Processing: ${input}`); }

function mainLoop(inputs: any[]): void { inputs.forEach(input => { try { processInput(input); } catch (error) { console.error(error.message); } }); }

const inputs = ['valid input', '', null, 'another valid input'];
mainLoop(inputs);