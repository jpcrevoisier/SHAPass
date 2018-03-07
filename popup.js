window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();
/*
var bkg = chrome.extension.getBackgroundPage();
console=bkg.console;
*/
// var currentDomain=bkg.getDomain();
function save(event)
{
	shapass.hash(event);
	shapass.saveMe();
}
var currentLocation={};
var currentHostname=null;
var currentDomain=null;
getDomain=function()
{
	// return new Date();
	return currentDomain;
};

browser.tabs.query({currentWindow: true, active: true},
	function(tabs)
	{
		console.log(tabs[0].url);
		var l = document.createElement("a");
		l.href = tabs[0].url;
        currentLocation = l;
        currentHostname=currentLocation.hostname;
        splitter=currentHostname.split('.');
		currentDomain=(splitter.length>=2)?splitter[splitter.length-2]+'.'+splitter[splitter.length-1]:splitter[splitter.length-1];
	}
);

var temp=null;
var x=0;
var shapass=null;

document.addEventListener('DOMContentLoaded', function()
{
	var intervalID = window.setInterval(function()
	{
		if(currentDomain!==null || x>=50)
		{
			console.log(currentDomain,temp, x++, intervalID);
			temp=new Date();
			window.clearInterval(intervalID);
			document.querySelector('#password').focus();
			shapass=new SHAPass();
			shapass.fillFields();
			inputs=document.querySelectorAll('input');
			for(i=0;i<inputs.length;i++)
			{
				inputs[i].addEventListener('change', function(event){shapass.hash(event);shapass.saveMe();});
			}
			document.querySelector('#genButton').addEventListener('click',function(event){shapass.hash(event);shapass.saveMe();self.close();});
			document.querySelector('#password').focus();
		}
		else
		{
			document.querySelector('body').innerHtml="Impossible d'initialiser SHAPass !";
			console.err("Impossible d'initialiser SHAPass !");
		}
	},100);
}, false);
