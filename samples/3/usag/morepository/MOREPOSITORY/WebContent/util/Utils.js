jQuery.sap.declare('com.tutorial.util.Utils');

/*
 * Curry a function so that every function returns a new function -- partial
 * application is also possible
 */
com.tutorial.util.Utils = {
	curry : function() {
		var slice = Array.prototype.slice, allArgs = slice.call(arguments, 0), appliedFunc = allArgs[0] && typeof allArgs[0] === 'function' ? allArgs[0] : null, oldArgs = slice.call(allArgs, 1);

		jQuery.sap.assert(typeof appliedFunc === 'function', 'Type of ' + appliedFunc + ' should be a function!');

		return function() {
			var newArgs = slice.call(arguments, 0), execArgs = oldArgs.concat(newArgs);
			return appliedFunc.apply(null, execArgs);
		};
	},

	getNonNull : function(subject, defaultSubject) {
		if (typeof subject === 'undefined' || subject === null) {
			return defaultSubject;
		}

		return subject;
	},

	sprintf : function(format) {
		var args = Array.prototype.slice.call(arguments, 1);

		return format.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	},

	extractUrlParamater : function(urlParamName) {
		var params = [], urlParamValue = '';
		var regexp = new RegExp(urlParamName, "gi");
		params = window.location.search.substr(1).split("&");
		for (var i = 0; i < params.length; i++) {
			if (params[i].search(regexp) != -1) {
				var localArray = params[i].split('=');
				if (localArray.length == 2) {
					urlParamValue = localArray[1];
					break;
				}
			}
		}
		return urlParamValue;
	}
};