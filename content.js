


// from Stack Overflow https://stackoverflow.com/questions/72715756/fill-google-places-form-programatically-from-chrome-extension


function imitateKeyInput(el, keyChar) {
    if (el) {
      const keyboardEventInit = {bubbles:false, cancelable:false, composed:false, key:'', code:'', location:0};
      el.dispatchEvent(new KeyboardEvent("keydown", keyboardEventInit));
      el.value = keyChar;
      el.dispatchEvent(new KeyboardEvent("keyup", keyboardEventInit));
      el.dispatchEvent(new Event('change', {bubbles: true})); // usually not needed
    } else {
      console.log("el is null");    
    }  
}

// Listen for messages from the Bluetooth tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Inject the received data into the input elements on the target web page
    if (message) {
      imitateKeyInput(document.getElementsByName("username")[0], message.account);
      imitateKeyInput(document.getElementsByName("password")[0], message.password);
      document.getElementById("okta-signin-submit").click();
    }
});