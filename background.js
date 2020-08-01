var urlRegex = /^https?:\/\/colab\.research\.google\.com/;


let currentStatus = {}
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  console.log(msg)
  if (msg.cmd === 'status') {
    currentStatus = msg.data
    if (!currentStatus.gColabNetworkAvailable) {
      chrome.browserAction.setIcon({path:"colab-network-error.png"})
    } else if (currentStatus.gColabConnected) {
      chrome.browserAction.setIcon({path:"colab-connected.png"})
    } else {
      chrome.browserAction.setIcon({path:"colab-disconnected.png"})
    }
  }
});