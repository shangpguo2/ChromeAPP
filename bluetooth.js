const serviceUuid = "00001234-3cfd-4fac-9760-39538679fe39";
const accountCharacteristicUuid = "00001234-5c8c-4ca0-926b-fcd09353540c";
const passwordCharacteristicUuid = "00001234-3a62-403c-b163-22183dcd084f";


document.getElementById("connect-button").addEventListener("click", () => {
    // Request permission to use the Bluetooth API
    navigator.bluetooth.requestDevice({
        filters: [{services: [serviceUuid]}]
    })
    .then(device => {
      // Connect to the GATT server
      return device.gatt.connect();
    })
    .then(server => {
      // Get the GATT characteristic and read the data
      return server.getPrimaryService(serviceUuid)
      .then(service => {
        // Get the GATT characteristic with the account data
        return Promise.all([
          service.getCharacteristic(accountCharacteristicUuid),
          service.getCharacteristic(passwordCharacteristicUuid)
        ]);
      })
      .then(characteristics => {
        // Read the account data from the characteristics
        return Promise.all([
          characteristics[0].readValue(),
          characteristics[1].readValue()
        ]);
      })
        .then(([accountData, passwordData]) => {
          // Convert the data to strings
          const account = new TextDecoder('utf-8').decode(accountData);
          const password = new TextDecoder('utf-8').decode(passwordData);
  
          // Inject the account and password data into the input elements on the target web page
          chrome.runtime.sendMessage({ account, password }, response => {
            // Close the Bluetooth tab once the data has been received
            window.close();
          });
        });
    })
    .catch(error => {
      console.error(error);
    });
  });