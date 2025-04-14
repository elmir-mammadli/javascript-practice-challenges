# JavaScript Practice Tests

An interactive platform for practicing JavaScript programming challenges with real-time testing and feedback.

## Overview

This application provides a collection of JavaScript coding challenges designed to help developers improve their programming skills. Each challenge includes:

- Problem description in multiple languages (English and Russian)
- Interactive code editor
- Automated test runner
- Solution examples and explanations

## Features

- 🖥️ **Interactive Code Editor**: Write and test your JavaScript solutions in a user-friendly environment
- 🧪 **Real-time Testing**: Run your code against test cases and get immediate feedback
- 🌐 **Multi-language Support**: Switch between English and Russian problem descriptions
- 💾 **Progress Tracking**: Your solutions are saved automatically
- 🔍 **Solution Examples**: View multiple approaches to solving each problem

## Available Challenges

The platform currently includes the following challenges:

- **Book Sorting**: Sort a collection of books by page count
- **Car Rental Pricing**: Calculate rental prices based on various conditions
- **Spy Code**: Implement a function to manipulate secret messages

## Tech Stack

- **Framework**: Next.js 15.3.0
- **Languages**: TypeScript, JavaScript
- **Styling**: TailwindCSS 4
- **UI**: React 19
- **Development**: ESLint, Turbopack

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd javacsript-practice-tests
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
/
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app router structure
│   ├── components/    # Reusable React components
│   │   └── test/      # Components for test runner
│   ├── data/          # Test data and challenges
│   │   └── tests/     # Individual test definitions
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
└── [config files]     # Various configuration files
```

## License

[MIT](LICENSE)
