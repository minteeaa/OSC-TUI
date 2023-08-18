# osc-tui - terminal based OSC application

*for those without the need for a fancy and/or resource heavy frontend.*

### install

dependencies:
```bash
node install
```

run:

```bash
node ./out/index.js
```

or use the included `run.[bat|sh]` files

### future

since this uses typescript as its main language, it would make sense to use a TS-first environment like `bun` or `deno`.

waiting for `bun` to become a more stable alternative to `node`; currently it does not support some terminal features (such as `raw mode`) that would be required to properly use this application.

once `bun` implements these features natively, this application will migrate from `node` to `bun`.