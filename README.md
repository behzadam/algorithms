# 🚀 TypeScript Algorithms and Data Structures

**A comprehensive collection of algorithms, data structures, and coding challenges implemented in TypeScript**

[![GitHub top language](https://img.shields.io/github/languages/top/behzadam/algorithms?style=for-the-badge)](https://github.com/behzadam/algorithms)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b6d0142c6cb448e28ea0dcc88b77b062?style=for-the-badge)](https://app.codacy.com/gh/behzadam/algorithms/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Lines of code](https://img.shields.io/tokei/lines/github/behzadam/algorithms?style=for-the-badge)](https://github.com/behzadam/algorithms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Features](#-features) • [Quick Start](#-getting-started) • [Documentation](#-documentation)

---

## 📋 Table of Contents

<!-- markdownlint-disable MD033 -->
<details>
<summary>Click to expand</summary>
<!-- markdownlint-enable MD033 -->

- [🚀 TypeScript Algorithms and Data Structures](#-typescript-algorithms-and-data-structures)
  - [📋 Table of Contents](#-table-of-contents)
  - [🎯 Introduction](#-introduction)
  - [✨ Features](#-features)
  - [📚 Documentation](#-documentation)
    - [📦 Data Structures](#-data-structures)
    - [🔍 Algorithms](#-algorithms)
      - [🔎 Search Algorithms](#-search-algorithms)
      - [🔄 Sorting Algorithms](#-sorting-algorithms)
    - [💻 Coding Challenges](#-coding-challenges)
      - [👉 Two Pointers](#-two-pointers)
    - [🛠️ Utilities](#️-utilities)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [💻 Development](#-development)
    - [Available Scripts](#available-scripts)
    - [Project Structure](#project-structure)
  - [📝 License](#-license)
  - [📧 Contact](#-contact)

<!-- markdownlint-disable MD033 -->
</details>
<!-- markdownlint-enable MD033 -->

---

## 🎯 Introduction

This repository is a **comprehensive collection** of TypeScript algorithms and data structures designed for educational purposes. It serves as a reference for developers who want to learn, practice, and master TypeScript while understanding fundamental computer science concepts.

> 💡 **Note:** This repository includes code and patterns from the [JavaScript Algorithms](https://github.com/trekhleb/javascript-algorithms) repository, translated and enhanced from JavaScript to TypeScript.

---

## ✨ Features

- 🔍 **Well-documented** code with TypeScript types
- ✅ **Fully tested** with Jest test suites
- 📚 **Educational** focus with clear implementations
- 🎨 **Clean code** following best practices
- 🚀 **Production-ready** implementations
- 🔄 **Regularly updated** with new algorithms and patterns

---

## 📚 Documentation

### 📦 Data Structures

| Data Structure       | Description                          | Implementation                                                       |
| -------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| **HashTable**        | Key-value mapping with hash function | [View Code](src/data-structure/hash-table/hash-table.ts)             |
| **MinHeap**          | Binary heap with minimum root        | [View Code](src/data-structure/heap/min-heap.ts)                     |
| **MaxHeap**          | Binary heap with maximum root        | [View Code](src/data-structure/heap/max-heap.ts)                     |
| **LinkedList**       | Linear collection of nodes           | [View Code](src/data-structure/linked-list/linked-list.ts)           |
| **Queue**            | FIFO (First In First Out) structure  | [View Code](src/data-structure/queue/queue.ts)                       |
| **Stack**            | LIFO (Last In First Out) structure   | [View Code](src/data-structure/stack/stack.ts)                       |
| **MaxPriorityQueue** | Priority queue with max priority     | [View Code](src/data-structure/priority-queue/max-priority-queue.ts) |
| **MinPriorityQueue** | Priority queue with min priority     | [View Code](src/data-structure/priority-queue/min-priority-queue.ts) |
| **Trie**             | Prefix tree for string operations    | [View Code](src/data-structure/trie/trie.ts)                         |
| **BinaryTree**       | Hierarchical tree structure          | [View Code](src/data-structure/tree/binary-tree.ts)                  |

### 🔍 Algorithms

#### 🔎 Search Algorithms

- **[Binary Search](src/algorithms/search/binary-search/binary-search.ts)** - Efficient search in sorted arrays
- **[Linear Search](src/algorithms/search/linear-search/linear-search.ts)** - Simple sequential search

#### 🔄 Sorting Algorithms

- **[Quick Sort](src/algorithms/sort/quick/quick-sort.ts)** - Divide and conquer sorting algorithm
- **[Bubble Sort](src/algorithms/sort/bubble-sort/bubble-sort.ts)** - Simple comparison-based sort
- **[Bubble Sort Simple](src/algorithms/sort/bubble-sort/bubble-sort-simple.ts)** - Simplified bubble sort implementation

### 💻 Coding Challenges

#### 👉 Two Pointers

- **[Pair Sum Sorted](src/code-challanges/two-pointers/pair-sum-sorted.ts)** - Find pairs in sorted array that sum to target

### 🛠️ Utilities

- **[Comparator](src/utils/comparator.ts)** - Comparison functions for sorting and searching
- **[Range](src/utils/range.ts)** - Utility for generating number ranges
- **[Type Definitions](src/types/)** - Common TypeScript type definitions

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **pnpm** (or npm/yarn)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/behzadam/algorithms.git
   cd algorithms
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Run tests**

   ```bash
   pnpm test
   ```

---

## 💻 Development

### Available Scripts

<!-- markdownlint-disable MD033 -->
<details>
<summary><b>Test Commands</b></summary>
<!-- markdownlint-enable MD033 -->

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

<!-- markdownlint-disable MD033 -->
</details>

<details>
<summary><b>Code Quality Commands</b></summary>
<!-- markdownlint-enable MD033 -->

```bash
# Check code formatting
pnpm format:check

# Fix code formatting
pnpm format:fix

# Run ESLint
pnpm lint

# Fix ESLint issues
pnpm lint:fix
```

<!-- markdownlint-disable MD033 -->
</details>
<!-- markdownlint-enable MD033 -->

### Project Structure

```text
algorithms/
├── src/
│   ├── algorithms/          # Algorithm implementations
│   │   ├── search/         # Search algorithms
│   │   └── sort/           # Sorting algorithms
│   ├── code-challanges/    # Coding challenges
│   ├── data-structure/     # Data structure implementations
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── jest.config.js          # Jest configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

- **Email:** [behzad.am@gmail.com](mailto:behzad.am@gmail.com)
- **GitHub:** [@behzadam](https://github.com/behzadam)

---

<!-- markdownlint-disable MD033 -->
<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [behzadam](https://github.com/behzadam)

</div>
<!-- markdownlint-enable MD033 -->
