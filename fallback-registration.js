// Fallback auto-registration sweep
export function setupFallbackRegistration(Hub) {
  Hub.onBootstrap(() => {
    Hub.modules = Hub.modules || [];
    Hub.modules.forEach(mod => {
      if (!mod.__registered && !mod.foundational) {
        Hub.registerModule(mod);
        mod.__registered = true;
      }
    });
  });
}

// Example usage: call after Hub is initialized