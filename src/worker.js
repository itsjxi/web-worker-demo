
self.addEventListener("message", (event) => {
  try {
    const { limit } = event.data;

    if (!Number.isInteger(limit) || limit < 2) {
      throw new Error("Limit must be an integer >= 2");
    }

    const primes = [];

    for (let num = 2; num <= limit; num++) {
      let isPrime = true;

      for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
          isPrime = false;
          break;
        }
      }

      if (isPrime) {
        primes.push(num);
      }
    }

    self.postMessage({
      type: "SUCCESS",
      result: primes,
    });

  } catch (error) {
    self.postMessage({
      type: "ERROR",
      message: error.message,
    });
  }
});
