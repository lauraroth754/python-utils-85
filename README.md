# python-utils-85

A collection of high-performance TypeScript utilities designed to bridge the gap between Python-style ergonomics and native JavaScript environments. This library streamlines data manipulation and type-safe iteration for complex engineering projects.

## Features

*   **Pythonic Iterables:** Includes robust `range`, `enumerate`, and `zip` functions that mirror Python’s intuitive API while maintaining TypeScript type safety.
*   **Lazy Evaluation:** Implements efficient generator helpers to handle large datasets without exhausting memory buffers.
*   **Deep Merge Utilities:** Provides reliable recursive object merging with explicit support for nested arrays and circular references.
*   **Type-Safe Casting:** Offers strict validation helpers to ensure data integrity when interfacing with untrusted JSON payloads or external APIs.

## Installation

Install the package via npm or yarn:

```bash
npm install python-utils-85
# or
yarn add python-utils-85
```

## Basic Usage

Import the utilities and leverage them in your data transformation pipelines:

```typescript
import { range, enumerate, zip } from 'python-utils-85';

// Create a range and enumerate
for (const [index, value] of enumerate(range(0, 10, 2))) {
  console.log(`Index ${index}: ${value}`);
}

// Zip two arrays together safely
const keys = ['id', 'name'];
const values = [101, 'DevUtils'];

const map = Object.fromEntries(zip(keys, values));
console.log(map); // { id: 101, name: 'DevUtils' }
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under the MIT License. See `LICENSE` for more information.