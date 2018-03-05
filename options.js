var currentHostname=false;
function savePrefs()
{
	var hostname=document.querySelector('#hostname');
	var username=document.querySelector('#username');
	var saltStri=document.querySelector('#saltStri');
	var password=document.querySelector('#password');
	var passwlen=document.querySelector('#passwlen');
	var passwres=document.querySelector('#passwres');

	var minCharLst=document.querySelector('#minCharLst');
	var majCharLst=document.querySelector('#majCharLst');
	var numCharLst=document.querySelector('#numCharLst');
	var specCharLst=document.querySelector('#specCharLst');

	shapass.prefs['username']=username.value;
	shapass.prefs['passwlen']=passwlen.value;
	shapass.prefs['saltStri']=saltStri.value;
	shapass.prefs['minCharLst']=minCharLst.checked;
	shapass.prefs['majCharLst']=majCharLst.checked;
	shapass.prefs['numCharLst']=numCharLst.checked;
	shapass.prefs['specCharLst']=specCharLst.checked;
	localStorage.setObject('SHAPass',shapass);
}
var shapass=null;
document.addEventListener('DOMContentLoaded', function()
{
	shapass=new SHAPass();
	prefs=shapass.prefs;

	var hostname=document.querySelector('#hostname');
	var username=document.querySelector('#username');
	var saltStri=document.querySelector('#saltStri');
	var password=document.querySelector('#password');
	var passwlen=document.querySelector('#passwlen');
	var passwres=document.querySelector('#passwres');

	var minCharLst=document.querySelector('#minCharLst');
	var majCharLst=document.querySelector('#majCharLst');
	var numCharLst=document.querySelector('#numCharLst');
	var specCharLst=document.querySelector('#specCharLst');
	
	username.value=prefs.username;
	passwlen.value=prefs.passwlen;
	saltStri.value=prefs.saltStri;

	minCharLst.checked=prefs.minCharLst;
	majCharLst.checked=prefs.majCharLst;
	numCharLst.checked=prefs.numCharLst;
	specCharLst.checked=prefs.specCharLst;

	document.querySelector('#savePrefs').addEventListener('click',
		savePrefs
	);
});
