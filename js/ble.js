const btn_connect = document.getElementById("pair")
// function log(msg) {console.log(msg)}

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

async function onButtonClick() {
    // TODO 
    // Maybe displaying plaintext is degerous
    let serviceUuid = "5e37a890-3cfd-4fac-9760-39538679fe39";

    try {
        console.log('Requesting Bluetooth Device...');
        const device = await navigator.bluetooth.requestDevice({
            filters: [{services: [serviceUuid]}]});
    
        console.log('Connecting to GATT Server...');
        const server = await device.gatt.connect();

        console.log('Getting Service...');
        const service = await server.getPrimaryService(serviceUuid);

        console.log('Getting Characteristics...');
        let characteristics = await service.getCharacteristics();
        
        let decoder = new TextDecoder('utf-8'), eid, pwd
        for (let characteristic of characteristics) {
            await characteristic.readValue().then(value => {
              if (!eid)
                eid = decoder.decode(value)
              else
                pwd = decoder.decode(value)
            });
        }
        console.log(eid)
        console.log(pwd)
  
       
        let queryOptions = { active: true, currentWindow: true };
        let tab = await chrome.tabs.query(queryOptions);
      
        chrome.runtime.sendMessage(
  
          { greeting: "cityu" },
          function (response) {
            console.log(response);
          }
        );
        window.location.href = "https://auth.cityu.edu.hk/"
        


    } catch(error) {
        console.log('Argh! ' + error);
    }
}

btn_connect.addEventListener("click", onButtonClick);