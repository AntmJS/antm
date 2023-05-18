# Quick Start

### Installation

```bash
npm i @antmjs/doc
```

Add the following scripts to your `package.json` file:

```json
{
  "scripts": {
    "start": "antm-doc-start",
    "build": "antm-doc-build"
  }
}
```

### Configuration

Initialize a configuration file named `antm.config.js`:

```ts
import { defineConfig } from '@antmjs/types'

export default defineConfig({
  title: 'antm.js Doc',
  src: join(process.cwd(), './docs'),
  menu: [
    {
      name: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          url: 'introduce',
        },
      ],
    },
  ],
})
```

### Start Dev Server

Run the following command to start a local development server:

```bash
yarn start
```

This command supports hot reloading of both documentation files and configuration files.

### Build for Production

Run the following command to build for production:

```bash
yarn build
```

By default, the build output will be located in the `doc_build` directory.
