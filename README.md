# python-utils-85

`python-utils-85` is a lightweight TypeScript toolkit designed to bridge the gap between Python-style utility patterns and modern JavaScript/TypeScript development. It provides robust, functional-style helpers to streamline data manipulation and environment management in Node.js applications.

## Features

*   **Type-Safe Path Manipulation:** Simplified cross-platform file path resolution that mimics Python’s `os.path` and `pathlib` behavior.
*   **Collection Pipelines:** Efficient array processing utilities including `chunk`, `flatten`, and `unique` to reduce boilerplate data transformation code.
*   **Object Sanitization:** Deep-merge and object-filtering functions that handle complex JSON structures with strict TypeScript inference.
*   **Logger Abstraction:** A lightweight, leveled logging interface that supports structured JSON output for seamless integration with cloud logging services.

## Installation

Install the package via npm:

```bash
npm install python-utils-85
```

Or via yarn:

```bash
yarn add python-utils-85
```

## Basic Usage

Import the required utilities to handle file paths or transform data collections:

```typescript
import { pathJoin, chunk } from 'python-utils-85';

// Join paths safely across OS environments
const configPath = pathJoin('src', 'config', 'settings.json');

// Chunk an array into sub-arrays of a specific size
const items = [1, 2, 3, 4, 5, 6];
const batched = chunk(items, 2); 
// Result: [[1, 2], [3, 4], [5, 6]]
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.