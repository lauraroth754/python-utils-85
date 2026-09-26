# python-utils-85

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Bring the simplicity and power of Python's built-in utilities directly into your TypeScript applications with zero external dependencies. This lightweight library delivers highly optimized, fully type-safe ports of Python staples like `range`, `zip`, and `Counter` to streamline your modern JavaScript and TypeScript workflows.

## Features

* **Pythonic Iterables:** Native TypeScript implementations of `range()`, `zip()`, and `enumerate()` to write cleaner, more expressive loops.
* **Advanced Collections:** High-performance `Counter` and `DefaultMap` classes that replicate Python's `collections` module using ES6 Maps.
* **Type-Safe Helpers:** Strict generic type inference out of the box, ensuring compiler errors instead of runtime bugs.
* **Zero Dependencies:** Compiles to tiny ESM and CommonJS footprints, keeping your production bundle incredibly light.

## Installation

Install the package via npm, yarn, or pnpm:

```bash
npm install python-utils-85
```

```bash
yarn add python-utils-85
```

## Usage

Import and use python-like utilities directly in your TypeScript code:

```typescript
import { range, zip, Counter, DefaultMap } from 'python-utils-85';

// 1. Easy counting with Counter
const fruitBasket = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const counts = new Counter(fruitBasket);
console.log(counts.mostCommon(2)); 
// Output: [ ['apple', 3], ['banana', 2] ]

// 2. Python-style loop mechanics
const names = ['Alice', 'Bob', 'Charlie'];
const scores = [85, 92, 78];

for (const [index, [name, score]] of zip(range(1, 4), zip(names, scores))) {
  console.log(`#${index}: ${name} scored ${score}`);
}

// 3. Auto-initializing DefaultMap
const groups = new DefaultMap<string, number[]>(() => []);
groups.get('math').push(95);
console.log(groups.get('math')); // [95]
```

## License

Distributed under the MIT License. Created by Developer.