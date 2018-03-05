// localStorage.setObject('options.js',new Date());
// var domains=localStorage.getObject('domains', {});

function loadDatas()
{
	browser.tabs.query(
		{active: true, currentWindow: true},
		function(tabs) {
			currentHostname=getLocation(tabs[0].url).hostname;
			log(getLocation(tabs[0].url).hostname);
		}
	);
}

var currentHostname=false;


String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,'');};
function under(a,b)
{
	while(a>b)
	{
		a=a-b;
	}
	return a;
}
function firstOne(str)
{
	for(i=0;i<str.length-1;i++)
	{
		console.log(str.slice(i,i+1));
		if(str.slice(i,i+1)==1)
		{
			return i;
		}
	}
	return 0;
}
Array.prototype.splicex=function(start=0, len=1, elem=null)
{
	console.log(this,start, len, elem);
}

function refill()
{
	var validChars=[];

	hostname=document.querySelector('#hostname');
	username=document.querySelector('#username');
	saltStri=document.querySelector('#saltStri');
	password=document.querySelector('#password');
	passwlen=document.querySelector('#passwlen');
	passwres=document.querySelector('#passwres');


	c=CryptoJS.SHA3(username.value+saltStri.value+password.value+hostname.value).toString();
	while(c.length<=parseInt(passwlen.value)*2)
	{
		c+=c;
	}

	pairs={}
	u=0;
	for(i=0;i<(c.length-2);i=i+2)
	{
		pairs[i/2]=parseInt(c.slice(i,i+2),16);
	}
	buff='';
	for(l=0;l<parseInt(passwlen.value);l++)
	{
		if(validChars.length==0)
		{
			validChars=[];
			selectedChars=document.querySelectorAll('.validChars:checked');
			for(i=0;i<selectedChars.length;i++)
			{
				validChars[i]=selectedChars[i].dataset.chars;
			}
		}
		validIndex=(pairs[l] % (validChars.length));
		
		buff+=validChars[validIndex][pairs[l] % (validChars[validIndex].length)];
		console.log(l, pairs[l], validChars.length, validIndex,  );
		validChars.splice(validIndex, 1);
	}
	console.log(buff);
	y="toto";
	passwres.value=buff;
}
function copy(e)
{
	console.log(e.ctrlKey, e.keyCode, e.key);
	if((e.ctrlKey && (e.keyCode==67 || e.keyCode==88)) || (e.keyCode==13))
	{
		e.preventDefault();
		passwres.style.visibility = "hidden";
		passwres.style.visibility="initial";
		// passwres.focus();
		passwres.select();
		document.execCommand("Copy");
		passwres.style.visibility = "hidden";
	}
}
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
	console.log(shapass);
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

	username.addEventListener('keyup',
		function(event)
		{
			console.log(event.target.id, event.target.type);
			// x.prefs[event.target.id]=event.target.value;
			// localStorage.setObject('SHAPass',x);
		}
	);
	document.querySelector('#savePrefs').addEventListener('click',
		savePrefs
	);
	/*

	hostname.value="mamot.fr";
	username.value="jpcrevoisier";
	password.value="";
	
	hostname.addEventListener('keyup', refill);
	username.addEventListener('keyup', refill);
	password.addEventListener('keyup', refill);
	passwlen.addEventListener('keyup', refill);
	passwlen.addEventListener('change', refill);

	minCharCheck.addEventListener('change', refill);
	majCharCheck.addEventListener('change', refill);
	numCharCheck.addEventListener('change', refill);
	specCharCheck.addEventListener('change', refill);
		
	document.querySelector('body').addEventListener('keyup', copy);
	
	refill();
	*/
});
