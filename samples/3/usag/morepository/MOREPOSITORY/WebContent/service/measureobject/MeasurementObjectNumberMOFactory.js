jQuery.sap.require('com.tutorial.service.generic.ODataToJsonService' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectNumberMOService' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectNumberMOFactory');

com.tutorial.service.measureobject.MeasurementObjectNumberMOFactory = {

	getInstance : function() {
		var oDataToJsonService;

		oDataToJsonService = com.tutorial.service.generic.ODataToJsonService.newInstance();
		return com.tutorial.service.measureobject.MeasurementObjectNumberMOService.newInstance(oDataToJsonService);
	}
};