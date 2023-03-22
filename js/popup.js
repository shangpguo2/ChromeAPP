const button = document.getElementById("widget_connect")

button.addEventListener("click", function() {
    // Open a page that contains Javascript to handle Bluetooth devices.
    chrome.tabs.create({ url: "page.html" });
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "cityu") {
        imitateKeyInput(document.getElementsByName("username")[0], "12345 SouthWest 123 Drive");
        imitateKeyInput(document.getElementsByName("password")[0], "Best18985261877");
        sendResponse({farewell: "goodbye"});
      }
    }
  );
