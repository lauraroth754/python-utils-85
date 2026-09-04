# python-utils-85

`python-utils-85` is a collection of high-performance TypeScript utilities designed to bridge common gaps between Python-style data manipulation and native JavaScript environments. This library provides a robust set of helpers to simplify type conversion, array processing, and object schema transformation.

## Features

*   **Pythonic Iterables:** Includes `range()`, `zip()`, and `enumerate()` implementations to bring familiar Python loops to TypeScript.
*   **Deep Object Manipulation:** Advanced deep-merging and path-access utilities modeled after dictionary comprehension patterns.
*   **Strict Type Guards:** Comprehensive set of validators for runtime data integrity, ensuring reliable type narrowing.
*   **Zero-Dependency:** Lightweight footprint designed for seamless integration into both Node.js backends and frontend frameworks.

## Installation

Install the package via npm or yarn:

```bash
npm install python-utils-85
# or
yarn add python-utils-85
```

## Basic Usage

Import the utilities directly into your project to start using them immediately:

```typescript
import { range, zip, getNested } from 'python-utils-85';

// Example: Using range and zip
const keys = ['id', 'name', 'status'];
const values = [1, 'Project Alpha', 'active'];

const data = Object.fromEntries(zip(keys, values));

// Example: Safe nested property access
const config = { api: { timeout: 5000 } };
const timeout = getNested(config, 'api.timeout', 3000);

console.log(data);    // { id: 1, name: 'Project Alpha', status: 'active' }
console.log(timeout); // 5000
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.