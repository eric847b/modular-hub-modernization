# Modular Hub Modernization

Unified strategy implementing contract shim, foundational modules, validator updates, and fallback registration for zero warnings and future-proofing.

**Version:** 1.0.0 · **License:** MIT

## Releases

Tagged releases (`v*`) publish a portable source pack automatically.

```bash
git tag v1.0.0
git push origin v1.0.0
```

See the [Releases page](https://github.com/eric847b/modular-hub-modernization/releases).

## Files
- `core-contract-shim.js`
- `module-wrapper-example.js`
- `fallback-registration.js`

## How it works

| File | Export | Behavior |
|---|---|---|
| `core-contract-shim.js` | `enforceContract(mod)` | Fills missing `name` (`unnamed-<uuid>`), `version` (`0.0.0`), `init`, and `start`; registers non-foundational modules with `Hub.registerModule` if the hub exists, otherwise defers with a warning; stamps `mod.meta = { contract: "v1.1", upgraded, validated, foundational }` |
| `fallback-registration.js` | `setupFallbackRegistration(Hub)` | On `Hub.onBootstrap`, registers any module in `Hub.modules` still marked unregistered |
| `module-wrapper-example.js` | default export | Shows a core module (`error-handling`) wrapped with `enforceContract` |

## Integrating with the userscript suite

1. Copy `core-contract-shim.js` and `fallback-registration.js` into the suite's `Modules/00-Core/` (canonical suite: `eric847b/ai-chat-websites`).
2. Wrap each module export: `export default enforceContract({ name, version, init, start })`.
3. Mark hub-loaded modules `foundational: true` so they are not re-registered.
4. After the hub initializes, call `setupFallbackRegistration(Hub)` once.
5. Run the suite's `npm run sync:registry` and `npm run validate`.

The module shape is the fleet userscript contract (`third-door-os/docs/CONTRACTS.md` §8). Cross-repository architecture: `third-door-os/docs/USERSCRIPT_ECOSYSTEM.md`.

## Caveats

- Missing `name`/`version` are auto-filled; the validator should still flag them so authors fix the source.
- `enforceContract` reads a global `Hub`; in sandboxed userscript managers make sure the hub is exposed before modules load.

**Next steps:** Integrate validator updates, modernize all core modules, add full Hub if missing, enable autonomous evolution.

Repo: https://github.com/eric847b/modular-hub-modernization
