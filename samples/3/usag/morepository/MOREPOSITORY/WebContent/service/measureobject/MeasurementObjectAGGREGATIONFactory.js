jQuery.sap.require('com.tutorial.service.generic.ODataToJsonService' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectAGGREGATIONService' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectAGGREGATIONFactory');

com.tutorial.service.measureobject.MeasurementObjectAGGREGATIONFactory = {

	getInstance : function() {
		var oDataToJsonService;

		oDataToJsonService = com.tutorial.service.generic.ODataToJsonService.newInstance();
		return com.tutorial.service.measureobject.MeasurementObjectAGGREGATIONService.newInstance(oDataToJsonService);
	}
};