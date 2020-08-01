let gEnableAutoConnect = true
let gColabNetworkAvailable = true
let gColabConnected = false

const AutoConnectInterval = 60
const CheckNetworkInterval = 10
const UpdateStatusInterval = 1

function hostAvailable(url) {
    console.log('checking: ' + url)
    var req = new XMLHttpRequest();
    req.open('HEAD', url, false);
    try {
        req.send();
    } catch (e) {
        console.log(e);
        return false;
    }
    console.log(req.status);
    return (req.status >= 200 && req.status < 300) || req.status === 405
  }

const autoConnect = () => {
    console.log('trigged auto connect')
    document.querySelector("#top-toolbar > colab-connect-button").shadowRoot.querySelector("#connect").click() 
}
const checkNetwork = () => {
    gColabNetworkAvailable = hostAvailable(location.href)
}
const updateStatus = () => {
    gColabConnected = document.querySelector("#top-toolbar > colab-connect-button").shadowRoot.querySelector("#connect.icon-error") == null
}

setInterval(() => {
    if (gEnableAutoConnect) {
        autoConnect()
    }
}, AutoConnectInterval * 1000)

setInterval(() => {
    checkNetwork()
}, CheckNetworkInterval * 1000)

setInterval(() => {
    updateStatus()
    chrome.runtime.sendMessage({
        cmd: 'status',
        data: {
            gEnableAutoConnect,
            gColabNetworkAvailable,
            gColabConnected,
        }
    }, null);
    
}, UpdateStatusInterval * 1000)

setInterval(() => {
    console.log({
        gEnableAutoConnect,
        gColabNetworkAvailable,
        gColabConnected
    })
}, 10000)


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
    console.log(msg)
    if (msg.cmd === 'update') {
      const data = msg.data;
      gEnableAutoConnect = data.gEnableAutoConnect;
    }
});