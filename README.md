# pkg-dep-tree
> 🌲 A better `npm list`.

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
const { GetMonoDepTree } = require( 'pkg-dep-tree' );

(async () => {
    let workspace = Path.join( __dirname, '/../components' );
    let org = '@gov.au';
    
    console.log( await GetMonoDepTree( workspace, 'side-nav', org ) );
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
npm test
```

# Contributors
<div style="display:inline;">
  <a href="https://github.com/adamzerella"><img width="64" height="64" src="https://avatars0.githubusercontent.com/u/1501560?s=460&v=4" alt="Adam Zerella"/></a>
</div>