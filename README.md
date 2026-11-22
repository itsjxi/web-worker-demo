# Web Worker Demo

Shows how moving CPU-heavy work off the main thread keeps the UI responsive. The app finds all primes up to 500,000 inside a **module Web Worker**, and the page stays interactive while it runs.

- `src/worker.js`: validates input, computes the primes, and posts back a result or an error
- `src/main.js`: creates the worker with `new URL('./worker.js', import.meta.url)` and updates the UI on each message

```bash
npm install
npm run dev
```
