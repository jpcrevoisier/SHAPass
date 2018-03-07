window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();
browser.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "https://github.com/jpcrevoisier/SHAPass/wiki"}, function (tab) {
        console.log("New tab launched with https://github.com/jpcrevoisier/SHAPass/wiki");
    });
});
