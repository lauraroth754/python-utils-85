# python-utils-85

A collection of lightweight, high-performance TypeScript utility functions designed to bridge the gap between common Python idioms and JavaScript runtime environments. This library streamlines data manipulation and object handling by providing robust, type-safe alternatives to standard Pythonic patterns.

## Features

*   **Dict-like Object Iterators:** Implements `items()`, `keys()`, and `values()` helpers that mirror Python dictionary behavior for seamless object traversal.
*   **Safe Range Generator:** Provides a flexible `range(start, stop, step)` function that yields numbers just like its Python counterpart, perfect for `for-of` loops.
*   **Type-Strict Filtering:** Includes highly optimized array utilities like `compact()` and `groupBy()` with full TypeScript generics support.
*   **Zero-Dependency Core:** Built from the ground up with no external dependencies, ensuring a minimal bundle size for production environments.

## Installation

Install the package via npm:

```bash
npm install python-utils-85
```

Or using yarn:

```bash
yarn add python-utils-85
```

## Basic Usage

Import the utilities directly into your project to start writing more readable, Python-inspired TypeScript code.

```typescript
import { range, items } from 'python-utils-85';

// Using range() for iteration
for (const i of range(0, 10, 2)) {
  console.log(i); // Outputs: 0, 2, 4, 6, 8
}

// Accessing object properties like a dictionary
const user = { name: 'Alice', age: 30 };
for (const [key, value] of items(user)) {
  console.log(`${key}: ${value}`);
}
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Distributed under the MIT License. See `LICENSE` for more information.