export function enforceContract(mod) {
  if (!mod.name) mod.name = "unnamed-" + (typeof crypto !== 'undefined' ? crypto.randomUUID() : 'module-' + Date.now());
  if (!mod.version) mod.version = "0.0.0";
  if (!mod.init) mod.init = () => { console.log(`Initialized ${mod.name}`); };
  if (!mod.start) mod.start = () => { console.log(`Started ${mod.name}`); };

  if (!mod.__registered && !mod.foundational) {
    if (typeof Hub !== 'undefined' && Hub.registerModule) {
      Hub.registerModule(mod);
      mod.__registered = true;
    } else {
      console.warn(`Hub not available for ${mod.name}; deferring registration.`);
      mod.__registered = false;
    }
  }

  mod.meta = {
    contract: "v1.1",
    upgraded: true,
    validated: true,
    foundational: !!mod.foundational
  };

  return mod;
}