# python-utils-85

A collection of lightweight TypeScript utility functions designed to streamline common data transformation and validation tasks. This library focuses on providing robust, type-safe helpers that eliminate boilerplate in daily development.

## Features

*   **Type-Safe Object Deep Merge:** Effortlessly merge nested configuration objects without losing type definitions.
*   **Performance-Optimized Debouncer:** A high-precision utility for handling rapid event inputs with built-in execution cancellation.
*   **Robust Date Formatting:** Streamlined helpers for parsing ISO strings into locale-specific, human-readable formats.
*   **Strict Type Guards:** Essential runtime validation functions to ensure data integrity before processing external API responses.

## Installation

Install the package via npm or yarn:

```bash
npm install python-utils-85
# or
yarn add python-utils-85
```

## Basic Usage

Import the utilities directly into your project files to begin optimizing your workflow:

```typescript
import { deepMerge, debounce } from 'python-utils-85';

// Example: Merging configuration objects
const baseConfig = { api: { timeout: 5000, retries: 3 } };
const userConfig = { api: { timeout: 10000 } };
const finalConfig = deepMerge(baseConfig, userConfig);

// Example: Debouncing a search input handler
const handleSearch = debounce((query: string) => {
  console.log('Fetching results for:', query);
}, 300);

// Use in event listeners
inputElement.addEventListener('input', (e) => handleSearch(e.target.value));
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

Distributed under the MIT License. See `LICENSE` for more information.