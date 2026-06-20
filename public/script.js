document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("shorten-form");
  const urlInput = document.getElementById("original-url");
  const submitBtn = document.getElementById("submit-btn");
  const resultContainer = document.getElementById("result-container");
  const shortLink = document.getElementById("short-link");
  const copyBtn = document.getElementById("copy-btn");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalUrl = urlInput.value.trim();
    if (!originalUrl) return;

    // Reset UI
    errorMessage.classList.add("hidden");
    resultContainer.classList.add("hidden");
    submitBtn.classList.add("loading");

    try {
      const response = await fetch("/api/url/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Display success
      const shortUrlStr = `${window.location.origin}/${data.shortCode}`;
      shortLink.href = shortUrlStr;
      shortLink.textContent = shortUrlStr;
      resultContainer.classList.remove("hidden");
    } catch (error) {
      errorMessage.textContent = error.message;
      errorMessage.classList.remove("hidden");
    } finally {
      submitBtn.classList.remove("loading");
    }
  });

  // Copy to clipboard functionality
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(shortLink.href);

      // Visual feedback
      const originalIcon = copyBtn.innerHTML;
      copyBtn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

      setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  });
});
