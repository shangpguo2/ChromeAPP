// Get the clear button
const clearButton = document.getElementById("clear");

// Get the switch button
const switchButton = document.getElementById("disable");

clearButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ clear: true })
});

switchButton.addEventListener("click", () => {
  // Enable or disable the extension based on the switch button state
  chrome.management.setEnabled(
    chrome.runtime.id,  // The ID of the current extension
    false,  // The new enabled state
  );
});