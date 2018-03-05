window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();
getLocation = function(href) {
	var l = document.createElement("a");
	l.href = href;
	return l;
};
var currentLocation={};
var currentHostname=null;
var currentDomain=null;
function getDomain()
{
	return currentDomain;
}
browser.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.getSelected(null, function(tab) {
		var l = document.createElement("a");
		l.href = tab.url;
        currentLocation = l;
        currentHostname=currentLocation.hostname;
        splitter=currentHostname.split('.');
		currentDomain=(splitter.length>=2)?splitter[splitter.length-2]+'.'+splitter[splitter.length-1]:splitter[splitter.length-1];
    });
});

// var shapass=new SHAPass();
