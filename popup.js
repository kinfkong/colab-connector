var urlRegex = /^https?:\/\/colab\.research\.google\.com/;

let currentStatus = {}
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
  console.log(msg)
  if (msg.cmd === 'status') {
    currentStatus = msg.data
    if (!currentStatus.gColabNetworkAvailable) {
        $('.message').text('网络不通')
    } else if (currentStatus.gColabConnected) {
        $('.message').text('已连接！')
    } else {
        $('.message').text('连接已断开')
    }
    $("#autoconnect").attr('checked', currentStatus.gEnableAutoConnect)
  }
});

$("#autoconnect").change(function() {
    console.log('check box clicked')
    const gEnableAutoConnect = this.checked;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        for (const tab of tabs) {
            if (urlRegex.test(tab.url)) {
                chrome.tabs.sendMessage(tab.id, {cmd: 'update', data: {gEnableAutoConnect}}, null);
              }
        }
      });
});