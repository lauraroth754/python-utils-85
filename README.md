# python-utils-85

**A collection of utility functions for streamlining Python development. This library provides commonly used functionalities that can enhance productivity and code efficiency.**

## Features

- **String Manipulation**: Simplifies common string operations like trimming, formatting, and case conversion.
- **Data Validation**: Implements robust functions to validate inputs such as email addresses, URLs, and phone numbers.
- **File Handling**: Provides utilities for reading, writing, and parsing files in various formats including CSV and JSON.
- **Date and Time Operations**: Offers helpers for timezone conversions, date formatting, and calculating time differences.

## Installation

To install `python-utils-85`, ensure you have Python and pip installed, then run the following command:

```bash
pip install python-utils-85
```

## Basic Usage

Here’s a quick example of how to use the key features of `python-utils-85`:

```python
from python_utils import StringUtils, Validator, FileUtils, DateUtils

# String Manipulation
formatted_string = StringUtils.format_string(" hello world ")
print(formatted_string)  # Output: "Hello World"

# Data Validation
is_valid_email = Validator.is_valid_email("example@example.com")
print(is_valid_email)  # Output: True

# File Handling
data = FileUtils.read_json('data.json')
print(data)

# Date and Time Operations
formatted_date = DateUtils.format_date('2023-10-05', '%d-%m-%Y')
print(formatted_date)  # Output: "05-10-2023"
```

## License

![MIT License](https://img.shields.io/badge/license-MIT-green)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 

--- 

Unlock your potential with `python-utils-85` and simplify your Python projects today!