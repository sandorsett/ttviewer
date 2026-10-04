const form = document.getElementById("thumbnailForm");
const usernameInput = document.getElementById("username");
const thumbnail = document.getElementById("thumbnail");
const status = document.getElementById("status");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (!username) {
    status.textContent = "Please enter a Twitch username.";
    thumbnail.style.display = "none";
    return;
  }

  // Remove characters that shouldn't be part of a Twitch username.
  const cleanUsername = username
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "");

  if (!cleanUsername) {
    status.textContent = "Invalid Twitch username.";
    thumbnail.style.display = "none";
    return;
  }

  status.textContent = `Loading ${cleanUsername}...`;
  thumbnail.style.display = "none";

  // Cache-busting parameter so the browser requests a fresh thumbnail.
  const imageUrl =
    `https://static-cdn.jtvnw.net/previews-ttv/live_user_${cleanUsername}.jpg?t=${Date.now()}`;

  thumbnail.onload = function () {
    status.textContent = `Showing thumbnail for ${cleanUsername}`;
    thumbnail.style.display = "block";
  };

  thumbnail.onerror = function () {
    status.textContent =
      `No thumbnail found for ${cleanUsername}. The channel may be offline or unavailable.`;
    thumbnail.style.display = "none";
  };

  thumbnail.src = imageUrl;
});
