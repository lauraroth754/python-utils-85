# python-utils-85

`python-utils-85` is a lightweight TypeScript library designed to provide high-performance utility functions for common data manipulation tasks. It simplifies complex object transformations and string processing, ensuring your codebase remains clean and maintainable.

## Features

*   **Advanced Object Sanitization**: Easily strip sensitive fields or clean nested objects with recursive depth control.
*   **Performance-Optimized Collection Helpers**: High-speed methods for unique array filtering and grouping that outperform standard Lodash iterations.
*   **Robust Type Guards**: Comprehensive runtime validation for complex interface structures, reducing potential `undefined` reference errors.
*   **Zero-Dependency Core**: Built entirely with native TypeScript, ensuring a minimal bundle footprint for both Node.js and browser environments.

## Installation

Install the package via npm or yarn:

```bash
npm install python-utils-85
# or
yarn add python-utils-85
```

## Basic Usage

Import the required utilities directly to leverage strict type checking:

```typescript
import { sanitizeObject, groupBy } from 'python-utils-85';

// Sanitizing sensitive user data
const user = { id: 1, email: 'dev@example.com', password: 'secret_hash' };
const cleanUser = sanitizeObject(user, ['password']);

// Grouping collections
const data = [{ category: 'A', val: 10 }, { category: 'B', val: 20 }, { category: 'A', val: 30 }];
const grouped = groupBy(data, 'category');

console.log(cleanUser); // { id: 1, email: 'dev@example.com' }
```

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.