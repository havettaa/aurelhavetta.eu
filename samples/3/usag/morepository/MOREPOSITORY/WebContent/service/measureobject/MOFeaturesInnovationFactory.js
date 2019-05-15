jQuery.sap.require('com.tutorial.service.generic.ODataToJsonService' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.measureobject.MOFeaturesInnovationService' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MOFeaturesInnovationFactory');

com.tutorial.service.measureobject.MOFeaturesInnovationFactory = {

	getInstance : function() {
		var oDataToJsonService;

		oDataToJsonService = com.tutorial.service.generic.ODataToJsonService.newInstance();
		return com.tutorial.service.measureobject.MOFeaturesInnovationService.newInstance(oDataToJsonService);
	}
};