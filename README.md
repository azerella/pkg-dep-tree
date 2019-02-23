# pkg-dep-tree

> 🌲 A better `npm list`. 

`npm list` is a really useful tool for visualising your dependency tree. It's quite hard to use within your application and focuses on the `node_modules` folder however. `pkg-dep-tree` aims to empwoer developers to print out **peer dependency** structures given a `package.json` file with support for mono repos.

---

I'm aspiring to make open-source my full-time work. If you like the work that I do, please consider supporting me.

[![Coffee][badge_coffee_donate]](https://www.buymeacoffee.com/adamzerella)
[![PayPal][badge_paypal_donate]](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=G6XEP92DGG63S&currency_code=AUD&source=url)

## Install

```bash
npm i pkg-dep-tree
```

## Usage

### Module

```javascript
const { GetMonoDepTree, PrintTreeTrim } = require( 'pkg-dep-tree' );

(async () => {
    let workspace = Path.join( __dirname, '/../components' );
    let org = '@gov.au';
    let treeObject = await GetMonoDepTree( workspace, 'side-nav', org );

    console.log( await PrintTreeTrim( treeObject ) );
})();
```

### Output

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

## Test

```bash
npm test
```

## Contribute

Don't be scared raise an issue or a pull request! Any contributions, no matter how big or small will land your picture here.

<div style="display:inline;">
  <a href="https://github.com/adamzerella"><img width="64" height="64" src="https://avatars0.githubusercontent.com/u/1501560?s=460&v=4" alt="Adam Zerella"/></a>
</div>

[badge_coffee_donate]: https://adamzerella.com/badges/coffee.svg
[badge_patreon_donate]: https://adamzerella.com/badges/patreon.svg
[badge_paypal_donate]: https://adamzerella.com/badges/paypal.svg