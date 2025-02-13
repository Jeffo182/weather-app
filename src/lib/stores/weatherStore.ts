import { writable } from 'svelte/store';

export const city = writable('');
export const weatherData = writable(null);
export const unit = writable('metric');
export const isLoading = writable(false)