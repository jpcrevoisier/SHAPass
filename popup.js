window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();
var bkg = chrome.extension.getBackgroundPage();
console=bkg.console;
// var currentDomain=bkg.getDomain();
function save(event)
{
	shapass.hash(event);
	shapass.saveMe();
}


document.addEventListener('DOMContentLoaded', function()
{
	document.querySelector('#password').focus();
	var shapass=new SHAPass();
	shapass.fillFields();
	inputs=document.querySelectorAll('input');
	for(i=0;i<inputs.length;i++)
	{
		inputs[i].addEventListener('change', function(event){shapass.hash(event);shapass.saveMe();});
	}
	document.querySelector('#password').focus();
}, false);
