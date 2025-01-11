# 🚀 **Raftlab-Task Project Documentation**

---

## 🗂️ **Overview**

The **Raftlab-Task** is a robust **GraphQL API** built using **Node.js** and **TypeScript**. It features **real-time communication** with **Socket.IO**, along with advanced **authentication**, seamless **database interaction**, and thorough **data validation**. The project prioritizes **best practices** like linting, formatting, and type safety for maintainable and scalable code.

---

## ✨ **Key Features**

- **🔗 GraphQL API**: Queries, mutations, and real-time subscriptions.
- **📦 MongoDB Integration**: Managed with **Mongoose**.
- **🔐 Authentication & Authorization**: Powered by **JWT**.
- **🛠️ Code Generation**: Automates GraphQL schemas and TypeScript types.
- **💬 Real-time Communication**: Via **Socket.IO**.

---

## 🏗️ **Project Structure**

### 📂 **Root Directory**
- **`.env`**: Stores environment variables.
- **`.gitignore`**: Excludes files from version control.
- **`.prettierrc`**: Config for consistent code formatting.
- **`client.html`**: HTML for testing or frontend development.
- **`codegen.ts`**: Configures GraphQL type generation.
- **`eslint.config.mjs`**: Ensures code quality with ESLint rules.
- **`package.json`**: Metadata, dependencies, and scripts.
- **`readme.md`**: Project overview and documentation.
- **`tsconfig.json`**: TypeScript configuration for compilation.

### 📂 **`/src` Directory**

#### 📁 `config`
- **`index.ts`**: Manages app-level configuration (e.g., environment variables).

#### 📁 `database`
- **`db.ts`**: Connects to **MongoDB** using **Mongoose**.

#### 📁 `models`
- **`index.ts`**: Centralized model exports.
- **`message.ts`**: Defines the Message schema.
- **`room.ts`**: Defines the Chat Room schema.
- **`user.ts`**: Defines the User schema.

#### 📁 `resolvers`
- **`helper/`**: Reusable utilities for resolvers.
- **`individual-resolvers/`**
  - **`message.ts`**: Message resolver functions.
  - **`room.ts`**: Room resolver functions.
  - **`user.ts`**: User resolver functions.
- **`mutations/mutations.ts`**: Handles data modifications.
- **`queries/queries.ts`**: Fetches data.
- **`index.ts`**: Combines all queries and mutations.

#### 📁 `schema`
- **`schema.graphql`**: GraphQL types, queries, and mutations.
- **`typeDefs.ts`**: Exports schema for the server.
- **`types.ts`**: Auto-generated TypeScript types.

#### 📁 `src`
- **`app.ts`**: Initializes Express and middleware.
- **`auth.ts`**: Authentication and authorization logic.
- **`context.ts`**: Defines GraphQL context for resolvers.
- **`server.ts`**: Starts the GraphQL server with **Socket.IO** integration.
- **`socket.io-server.ts`**: Manages real-time communication.

---

## 📚 **Libraries Used**

### **Core Dependencies**
- **`@apollo/server`**: Hosts the GraphQL API.
- **`@graphql-codegen/*`**: Generates TypeScript types from GraphQL schemas.
- **`bcrypt`**: Secure password hashing.
- **`cors`**: Enables Cross-Origin Resource Sharing.
- **`dotenv`**: Manages environment variables.
- **`express`**: Web framework.
- **`graphql`**: Core GraphQL library.
- **`jsonwebtoken`**: Implements JWT-based authentication.
- **`mongoose`**: ODM for MongoDB.
- **`socket.io`**: Real-time communication.

### **Development Dependencies**
- **`eslint`**: Enforces coding standards.
- **`prettier`**: Formats code consistently.
- **`ts-node-dev`**: Runs TypeScript in development mode.
- **`typescript`**: Adds static typing.

---

## 🔧 **Scripts**
Defined in **`package.json`**:

| **Script**   | **Description**                                         |
| ------------ | ------------------------------------------------------- |
| `build`      | Compiles TypeScript into JavaScript.                    |
| `start:prod` | Starts the server in production mode.                   |
| `start:dev`  | Runs the server in development mode with hot-reloading. |
| `lint`       | Checks code quality with ESLint.                        |
| `lint:fix`   | Fixes linting issues automatically.                     |
| `prettier`   | Formats code with Prettier.                             |
| `codegen`    | Generates GraphQL types and resolvers.                  |

---

## 🎉 **Happy Coding!**
📖 **Contact**: For more details, reach out to [ME](ravidholariya620@gmail.com).
