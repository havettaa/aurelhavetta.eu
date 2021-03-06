jQuery.sap.require('com.tutorial.util.Utils' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectPMOService');

com.tutorial.service.measureobject.MeasurementObjectPMOService = {

	newInstance : function(requestHandler) {
		this.requestHandler = requestHandler;
		return this;
	},

	CONSTANTS : {
		CATALOG_COLLECTION_QUERY : 'PMO',
		ASYNC : true
	},

	loadModel : function(modelData) {
		var successFunc = modelData['successFunc'];
		var errorFunc = modelData['errorFunc']; 
		var endpointParam = com.tutorial.util.Utils.sprintf(this.CONSTANTS.CATALOG_COLLECTION_QUERY, modelData['endpointParam']);
		
		curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc), curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc), that = this;

		return this.requestHandler.read(endpointParam, {
			async : that.CONSTANTS.ASYNC,
			success : curriedSuccessFunc,
			error : curriedErrorFunc
		});
	},

	updateModel : function(modelData) {
		modelData.updatedData.CHANGED_AT = new Date();
		
		com.tutorial.service.generic.ODataToJsonService.createLog("PACKAGEMO", "update", modelData.updatedData, modelData.moKey);
		var successFunc = modelData.successFunc;
		var errorFunc = modelData.errorFunc;
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "('" + modelData.moKey + "')";
		var modelToSave = modelData.updatedData;
		var curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc);
		var curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc);

		this.requestHandler.update(endpointParam, modelToSave, {
			success : curriedSuccessFunc,
			error : curriedErrorFunc,
			merge : true,
			async : that.CONSTANTS.ASYNC
		});
	},

	removeModel : function(modelData) {
		com.tutorial.service.generic.ODataToJsonService.createLog("PACKAGEMO", "delete", modelData['keyMo'], modelData['keyMo']); 
		var successFunc = modelData['successFunc'];
		var errorFunc = modelData['errorFunc'];
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "(KEY_PACKAGE='"+ modelData['keyPackage'] +"',KEY_MEASUREMENT_OBJECTS='"+ modelData['keyMo'] +"')";
		var curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc);
		var curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc);
		var that = this;

		this.requestHandler.remove(endpointParam, {
			success : curriedSuccessFunc,
			error : curriedErrorFunc,
			async : that.CONSTANTS.ASYNC
		});

	},

	createModel: function(noteContext) {
		noteContext.moData.CHANGED_AT = new Date();
		
		com.tutorial.service.generic.ODataToJsonService.createLog("PACKAGEMO", "insert", noteContext.moData, noteContext['moData']["KEY_PACKAGE"]);
		var successFunc = noteContext.successFunc,
		errorFunc = noteContext.errorFunc,
		moData = noteContext.moData,

		curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc),
		curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc),
		endpointUrl = this.CONSTANTS.CATALOG_COLLECTION_QUERY,
		that = this;

	return this.requestHandler.create(endpointUrl, moData, {
		async : that.CONSTANTS.ASYNC,
		success : curriedSuccessFunc,
		error : curriedErrorFunc
	});
		
	},
};