jQuery.sap.require('com.tutorial.service.generic.ODataToJsonService' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageService' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageFactory');

com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageFactory = {

	getInstance : function() {
		var oDataToJsonService;

		oDataToJsonService = com.tutorial.service.generic.ODataToJsonService.newInstance();
		return com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageService.newInstance(oDataToJsonService);
	}
};