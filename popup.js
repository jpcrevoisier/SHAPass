window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

// Global variables, ensure they are managed carefully
var currentLocation = {};
var currentHostname = null;
var currentDomain = null; // This will be set by the tabs.query callback

// Function to get domain, relies on currentDomain being set
// Ensure this is called only after currentDomain is populated
function getDomain() {
	return currentDomain;
};

browser.tabs.query({currentWindow: true, active: true}, function(tabs) {
    if (tabs[0] && tabs[0].url) {
        console.log(tabs[0].url);
        var l = document.createElement("a");
        l.href = tabs[0].url;
        currentLocation = l;
        currentHostname = currentLocation.hostname;
        var splitter = currentHostname.split('.');
        if (splitter.length >= 2) {
            currentDomain = splitter[splitter.length-2] + '.' + splitter[splitter.length-1];
        } else {
            currentDomain = splitter[splitter.length-1];
        }
        console.log("Current domain set to:", currentDomain); // For debugging
    } else {
        console.error("Could not get current tab URL or tab.");
        // Handle inability to get domain, perhaps show an error in popup
        // For now, currentDomain will remain null
    }
});

var shapass = null; // Will be initialized in DOMContentLoaded

document.addEventListener('DOMContentLoaded', function() {
    var x = 0; // Counter for interval checks
	var intervalID = window.setInterval(function() {
	    console.log("Interval check. currentDomain:", currentDomain, "x:", x); // For debugging
		if (currentDomain !== null || x >= 50) { // Check if currentDomain is set or timeout
			window.clearInterval(intervalID); // Stop the interval
			
			if (currentDomain === null && x >= 50) {
			    console.error("Timeout: SHAPass could not be initialized because currentDomain is null.");
			    var bodyElement = document.querySelector('body');
			    if (bodyElement) { // Check if body element exists
			        bodyElement.innerHTML = "Impossible d'initialiser SHAPass : domaine non détecté.";
			    }
			    return; // Stop further execution
			}
			
			console.log("Initializing SHAPass for domain:", currentDomain); // For debugging
			shapass = new SHAPass(); // Initialize SHAPass object
			shapass.fillFields(); // Populate fields based on domain/defaults

			var inputs = document.querySelectorAll('input');
			for(var i = 0; i < inputs.length; i++) { // Use var for loop counter for wider compatibility
				inputs[i].addEventListener('change', function(event) {
				    if(shapass) {
				        shapass.hash(event);
				        shapass.saveMe();
				    }
				});
			}
			
			var genButton = document.querySelector('#genButton');
			if (genButton) {
			    genButton.addEventListener('click', function(event) {
			        if(shapass) {
			            shapass.hash(event);
			            shapass.saveMe();
			        }
			        self.close(); // Close the popup
			    });
			}
			
			var passwordField = document.querySelector('#password');
			if (passwordField) {
			    passwordField.focus(); // Focus on the password field
			}

		} else {
			x++; // Increment counter if currentDomain is not yet set
		}
	}, 100); // Check every 100ms
}, false);
