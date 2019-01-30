# pkg-dep-tree
> 🌲 A better `npm list`.

`npm list` is a really useful tool for visualising your dependency tree. It's quite hard to use within your application and focuses on the `node_modules` folder however. `pkg-dep-tree` aims to empwoer developers to print out **peer dependency** structures given a `package.json` file with support for mono repos.

# Install
```bash
# NPM
npm i -D pkg-dep-tree

# Yarn
yarn add --dev pkg-dep-tree
```

# Usage
## Module
```javascript
const { GetMonoDepTree, PrintTreeTrim } = require( 'pkg-dep-tree' );

(async () => {
    let workspace = Path.join( __dirname, '/../components' );
    let org = '@gov.au';
    let treeObject = await GetMonoDepTree( workspace, 'side-nav', org );

    console.log( await PrintTreeTrim( treeObject ) );
})();
```

### Yields
```bash
├─ core
├─ animate
├─ accordion
│  ├─ animate
│  └─ core
└─ link-list
   ├─ core
   └─ body
      └─ core
```

# Tests
```node
# NPM
npm test

# Yarn
yarn test
```

# Contributors
<div style="display:inline;">
  <a href="https://github.com/adamzerella"><img width="64" height="64" src="https://avatars0.githubusercontent.com/u/1501560?s=460&v=4" alt="Adam Zerella"/></a>
</div>