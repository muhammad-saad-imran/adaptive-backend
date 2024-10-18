# Adaptive Insurance

## Table of Contents

- [About](#about)
- [Technology](#technology)
- [Installation](#installation)
- [Configuration](#configuration)
- [Packages Used](#packages)

## About

The Adaptive Insurance Website is a platform designed to provide tailored electric insurance solutions for businesses

## Technology

This project uses Next.js, to build a highly performant, scalable, and SEO-friendly web application.

## Installation

Instructions on how to install the project locally:

```bash
# Clone the repository
git clone https://github.com/ahsanbilalas/adaptive.git

# Navigate to the project directory
cd adaptive

# Install dependencies
npm install

# Start the project
npm start
```

## Configuration

You will need these enviornment variable configurations for the project to work.

```bash
NEXT_PUBLIC_SMARTY_KEY=SmartyStreets-api-client-key
NEXT_PUBLIC_ADAPTIVE_API_URL=https://your-api-url/
NEXT_PUBLIC_AUTOCOMPLETE_API_URL=https://us-autocomplete-pro.api.smarty.com/lookup
NEXT_PUBLIC_ASCEND_PROGRAMS_URL=https://sandbox.dashboard.useascend.com/programs
```

## Packages

- **react-redux**: Enables easy state management across components.
- **@reduxjs/toolkit**: Simplifies Redux state management with a set of tools and best practices.
- **dayjs**: For handling date and time manipulation.
- **formik**: Helps in building and managing forms with ease, including validation and state management.
- **lodash**: Utility library for common JavaScript functions like deep cloning, debouncing, and array manipulation.
- **@react-input/mask**: For masking input fields to enforce specific formats (e.g., phone numbers, dates).
- **react-hot-toast**: Provides lightweight and customizable toast notifications in React apps.
- **react-top-loading-bar**: Adds a customizable, animated loading bar at the top of the page to indicate loading states.
- **styled-components**: Enables writing CSS directly in JavaScript to style React components with a clean and dynamic approach.
- **yup**: A validation schema builder for managing and validating inputs
