import { writable } from 'svelte/store';

// Create a writable store
export const dataStore = writable({
    address: null,
});

export const spinnerStore = writable({
    spinner: false,
});