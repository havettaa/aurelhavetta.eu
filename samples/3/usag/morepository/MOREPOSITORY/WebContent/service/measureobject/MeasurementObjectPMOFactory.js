jQuery.sap.require('com.tutorial.service.generic.ODataToJsonService' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPMOService' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectPMOFactory');

com.tutorial.service.measureobject.MeasurementObjectPMOFactory = {

	getInstance : function() {
		var oDataToJsonService;

		oDataToJsonService = com.tutorial.service.generic.ODataToJsonService.newInstance();
		return com.tutorial.service.measureobject.MeasurementObjectPMOService.newInstance(oDataToJsonService);
	}
};