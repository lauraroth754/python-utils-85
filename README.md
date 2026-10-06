[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# python-utils-85

`python-utils-85` provides a set of type-safe utilities for managing Python subprocesses, virtual environments, and cross-runtime data serialization within Node.js and TypeScript applications. It simplifies mixed-stack operations by handling Python environment detection, script execution, and output parsing seamlessly.

## Features

- **Virtual Environment Management:** Automatically locate, create, and validate local `.venv` or Conda environments from your TypeScript codebase.
- **Typed Subprocess Runner:** Execute external Python scripts or inline code snippets asynchronously with native JSON object stdout auto-parsing.
- **PyPI Metadata Fetcher:** Query package specs, version histories, and wheel metadata directly using lightweight HTTP helpers.
- **Data Structure Serializer:** Convert complex TypeScript primitives into valid Python literal syntax for dynamic script generation.

## Installation

Install the package via npm:

```bash
npm install python-utils-85
```

Or using pnpm:

```bash
pnpm add python-utils-85
```

## Basic Usage

The following example demonstrates how to verify a virtual environment and execute a Python script with structured inputs:

```typescript
import { PythonRunner, VenvManager } from 'python-utils-85';

async function executePipeline() {
  const venv = new VenvManager({ path: './.venv' });
  
  if (!await venv.exists()) {
    await venv.create({ pythonVersion: '3.10' });
  }

  const runner = new PythonRunner({ 
    pythonPath: venv.getExecutablePath() 
  });

  const response = await runner.runScript<{ status: string; processedCount: number }>(
    './scripts/transform.py',
    {
      args: ['--batch-size', '64'],
      inputData: { items: [1, 2, 3, 4, 5] }
    }
  );

  console.log(`Execution status: ${response.data.status}`);
  console.log(`Items processed: ${response.data.processedCount}`);
}

executePipeline();
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.