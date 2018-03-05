window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();
var bkg = chrome.extension.getBackgroundPage();
console=bkg.console;
var currentDomain=bkg.getDomain();
function save(event)
{
	shapass.hash(event);
	shapass.saveMe();
}
document.addEventListener('DOMContentLoaded', function()
{
	var shapass=new SHAPass();
	shapass.fillFields();
	console.log('dom loaded for SHAPAss : '+currentDomain);
	inputs=document.querySelectorAll('input');
	for(i=0;i<inputs.length;i++)
	{
		inputs[i].addEventListener('change', function(event){shapass.hash(event);shapass.saveMe();});
	}
	document.querySelector('#password').focus();
	// loadDatas();
	// var bookmypass=new bmp();
	
	// bookmypass.init(); // bookmypass_length
/*
	document.querySelector('#bookmypass_hostname').addEventListener('keyup', function(){bookmypass.doit();});
	document.querySelector('#bookmypass_username').addEventListener('keyup', function(){bookmypass.doit();});
	document.querySelector('#bookmypass_password').addEventListener('keyup', function(){bookmypass.doit();});
	document.querySelector('#bookmypass_length').addEventListener('keyup', function(){bookmypass.doit();});
	document.querySelector('#bookmypass_length').addEventListener('change', function(){bookmypass.doit();});
*/	
}, false);
