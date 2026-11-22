

const worker = new Worker(
  new URL("./worker.js", import.meta.url),
  { type: "module" }
);

const button = document.querySelector("#calculate");
const status = document.querySelector("#status");
const result = document.querySelector("#result");

button.addEventListener("click", () => {
  status.textContent = "Calculating...";
  button.disabled = true;

  worker.postMessage({
    limit: 500000,
  });
});

// Receive worker response
worker.addEventListener("message", (event) => {
  const { type, result: primes, message } = event.data;

  if (type === "SUCCESS") {
    result.textContent = `Found ${primes.length} primes`;
    status.textContent = "Completed";
  } else {
    status.textContent = message;
  }

  button.disabled = false;
  worker.terminate();
});

// Handle worker errors
worker.addEventListener("error", (error) => {
  console.error("Worker error:", error.message);

  status.textContent = "Something went wrong";
  button.disabled = false;

  worker.terminate();
});

// Handle unexpected message deserialization errors
worker.addEventListener("messageerror", () => {
  status.textContent = "Unable to read worker response";
  button.disabled = false;

  worker.terminate();
});
