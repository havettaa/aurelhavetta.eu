jQuery.sap.declare("com.tutorial.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

com.tutorial.util.Formatter = {
	
	_statusStateMap : {
		"P" : "Success",
		"N" : "Warning"
	},

	statusText :  function (value) {
		var bundle = this.getModel("i18n").getResourceBundle();
		return bundle.getText("StatusText" + value, "?");
	},
	
	statusState :  function (value) {
		var map = com.tutorial.util.Formatter._statusStateMap;
		return (value && map[value]) ? map[value] : "None";
	},
	
	date : function (value) {
		if (value) {
			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
			return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},
	
	
	GetUnformattedDate : function()
	{
		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyyMMdd"}); 
		return oDateFormat.format(new Date());
		
	},
	
	GetNewDate : function(value)
	{
		if(value!=null)
			{
			return(value.substr(6, 2) + '/' + value.substr(4, 2) + '/' + value.substr(0, 4));
			}
	},
	
	quantity :  function (value) {
		try {
			return (value) ? parseFloat(value).toFixed(0) : value;
		} catch (err) {
			return "Not-A-Number";
		}
	}
};