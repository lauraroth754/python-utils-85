# python-utils-85

`python-utils-85` is a lightweight TypeScript utility library designed to bridge the gap between Python-style data handling and modern JavaScript/TypeScript development. It provides robust, chainable helper functions that simplify common array, object, and string manipulation tasks.

## Features

*   **Pythonic Iterables:** Includes native-feeling implementations of `range()`, `zip()`, and `enumerate()` for cleaner loop management.
*   **Deep Path Access:** Easily query or modify nested object structures using dot-notation strings, similar to Python’s `dict.get()`.
*   **Type-Safe Casting:** Comprehensive casting utilities that ensure data integrity when sanitizing API responses or legacy JSON blobs.
*   **Zero Dependencies:** Built from the ground up with no external dependencies to keep your bundle size minimal and security footprint low.

## Installation

Install the package via npm or yarn:

```bash
npm install python-utils-85
# or
yarn add python-utils-85
```

## Basic Usage

The library is designed for tree-shaking support and immediate integration into existing TypeScript projects:

```typescript
import { range, zip, get } from 'python-utils-85';

// Use range similar to Python
const sequence = range(0, 5); // [0, 1, 2, 3, 4]

// Zip two arrays into an object
const keys = ['id', 'name'];
const values = [1, 'Alice'];
const zipped = zip(keys, values); // { id: 1, name: 'Alice' }

// Safely access nested properties
const data = { user: { profile: { email: 'test@example.com' } } };
const email = get(data, 'user.profile.email'); // 'test@example.com'
```

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.