# SYSTEM INFORMATION CLI

A lightweight, efficient comman-line interface (CLI) built wiht Node.js and TypeScript to quickly retrieve essential system configuration data.

## Features

* **Version Control:** chack the application version
* **operation System:** Retrieve OS platform.
* **Memory:** Display total memory
* **Current Directory:** View the current working directory path.
* **Environment Variable:** active environment API key.
* **Help command:** Informative feedback for each command and its result 

## Prerequisites

Before running this project, ensure you have the following installed:
* **Node.js** (v18.x or higher recommended)
* **npm** (comes packaged with Node) or **yarn**

## Installation & Setup

1. **Clone the resository:**
    ```bash
    git clone git@github.com:deekshithm-vonnue/system-information-CLI.git
    cd CLI
    ```
2. **Initialize npm (if starting fresh):**

    ```bash
    npm init -y
    ```

3. **Install and initialize typescript:**
    ```bash
    npm install -D typescript
    tsc --init
    ```

4. **Install Node.js types and runner:**
   ```bash
   npm install -D ts-node @types/node
   ```

## Development
Run the CLI directly in the development environment using `ts-node` without compiling first.

* **Execute via ts-node:**
  ```bash
  npx ts-node src/index.ts [command]
  ```

## Build
Compile the TypeScript code into production-ready JavaScript.

* **Build the project:**
   ```bash
   npm run build
   ```

## Testing

Execute unit tests to ensure system commands report data accurately.

* **Run test suite:**
  ```bash
  npm test
  ```