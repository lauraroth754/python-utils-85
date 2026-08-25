# python-utils-85

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A TypeScript library that brings common Python utility functions to modern JavaScript and TypeScript applications. It focuses on making iteration and data manipulation feel natural for developers familiar with Python's standard library.

## Features
- `range` generator supporting start, stop, step parameters with negative and floating point increments
- Iterator helpers like `chain`, `cycle`, and `zipLongest` for building complex sequences
- `format` function implementing Python's str.format style templating with named and indexed fields
- `deepClone` utility for creating independent copies of nested objects and arrays

## Installation

```bash
npm install python-utils-85
```

## Basic Usage

```typescript
import { range, format, chain } from 'python-utils-85';

const numbers = [...range(1, 10, 2)];
console.log(numbers); // [1, 3, 5, 7, 9]

const greeting = format("Welcome, {user}!", { user: "Developer" });
console.log(greeting);
```