import { writable } from "svelte/store";

export function persisted(key, initial) {
  const stored = typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
  const start = stored ? JSON.parse(stored) : initial;

  const store = writable(start);

  store.subscribe((v) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(v));
    }
  });

  return store;
}
