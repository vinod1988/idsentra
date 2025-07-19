# 🤝 Contributing to Idsentra

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I have a question](#i-have-a-question-)
- [I want to contribute](#i-want-to-contribute-)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Style Guides](#style-guides)
  - [Commit Messages](#commit-messages)
  - [Code Style](#code-style)
- [Join The Project Team](#join-the-project-team-)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## I have a question ❓

Before you ask a question, it is best to search for existing [Issues](https://github.com/idsentra/idsentra/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/idsentra/idsentra/issues/new/choose).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc.), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I want to contribute 💡

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report.

#### How Do I Submit a Good Bug Report?

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/idsentra/idsentra/issues/new?assignees=&labels=bug&template=bug_report.md&title=).
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for Idsentra, **including completely new features and minor improvements to existing functionality**.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Perform a [search](https://github.com/idsentra/idsentra/issues) to see if the enhancement has already been suggested.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/idsentra/idsentra/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description** of the suggested enhancement in as many details as possible.
- **Explain why this enhancement would be useful** to most Idsentra users.
- **Specify which version of Idsentra** you're using.
- **Specify the name and version of the OS** you're using.

### Your First Code Contribution

#### Setting up the Development Environment

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/idsentra.git
   cd idsentra
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch for your changes:
   ```bash
   git checkout -b my-feature-branch
   ```
5. Make your changes and commit them with a descriptive message.
6. Push your changes to your fork and open a pull request.

### Improving The Documentation

Good documentation is crucial for any open-source project. If you see an opportunity to improve the documentation, please open an issue or submit a pull request with your suggested changes.

## Style Guides

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages. Please format your commit messages as follows:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

### Code Style

- We use ESLint and Prettier for code formatting. Please run `npm run lint:fix` before committing.
- All TypeScript files should have proper type definitions.
- Write tests for new features and bug fixes.

## Join The Project Team 👥

If you're interested in becoming a maintainer, please reach out to us via an issue or email. We'd love to have you on board!
