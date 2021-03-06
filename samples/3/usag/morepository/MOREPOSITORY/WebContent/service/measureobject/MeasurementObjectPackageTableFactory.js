jQuery.sap.require('com.tutorial.service.generic.ODataToJsonService' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MeasurementObjectPackageTableService' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory');

com.tutorial.service.measureobject.MeasurementObjectPackageTableFactory = {

	getInstance : function() {
		var oDataToJsonService;

		oDataToJsonService = com.tutorial.service.generic.ODataToJsonService.newInstance();
		return com.tutorial.service.measureobject.MeasurementObjectPackageTableService.newInstance(oDataToJsonService);
	}
};