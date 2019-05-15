jQuery.sap.require('com.tutorial.util.Utils' + m_urlVersion);
jQuery.sap.require('com.tutorial.service.generic.ODataToJsonService' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectService');

com.tutorial.service.measureobject.MeasurementObjectService = {

	newInstance : function(oDataToJsonService) {
		this.oDataToJsonService = oDataToJsonService;
		return this;
	},

	CONSTANTS : {
		CATALOG_COLLECTION_QUERY : 'MO',
		ASYNC : true
	},

	loadModel : function(modelData) {
		var successFunc = modelData.successFunc;
		var errorFunc = modelData.errorFunc; 
		var endpointParam = com.tutorial.util.Utils.sprintf(this.CONSTANTS.CATALOG_COLLECTION_QUERY, modelData.endpointParam);
		
		curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc), curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc), that = this;

		return this.oDataToJsonService.read(endpointParam, {
			async : that.CONSTANTS.ASYNC,
			success : curriedSuccessFunc,
			error : curriedErrorFunc
		});
	},

	updateModel : function(modelData) {
		modelData.updatedData.CHANGED_AT = new Date();
		
		com.tutorial.service.generic.ODataToJsonService.createLog("MO", "update", modelData.updatedData, modelData.moKey, modelData.oldData);
		var successFunc = modelData.successFunc;
		var errorFunc = modelData.errorFunc;
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "('" + modelData.moKey + "')";
		var modelToSave = modelData.updatedData;
		var curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc);
		var curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc);

		this.oDataToJsonService.update(endpointParam, modelToSave, {
			success : curriedSuccessFunc,
			error : curriedErrorFunc,
			merge : true,
			async : that.CONSTANTS.ASYNC
		});
	},

	removeModel : function(modelData) {
		com.tutorial.service.generic.ODataToJsonService.createLog("MO", "delete", modelData.moKey, modelData.moKey);
		var successFunc = modelData.successFunc;
		var errorFunc = modelData.errorFunc;
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "('" + modelData.moKey + "')";
		var curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc);
		var curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc);
		var that = this;

		this.oDataToJsonService.remove(endpointParam, {
			success : curriedSuccessFunc,
			error : curriedErrorFunc,
			async : that.CONSTANTS.ASYNC
		});

	},

	createModel: function(noteContext) {
		noteContext.moData.CHANGED_AT = new Date();
				
		com.tutorial.service.generic.ODataToJsonService.createLog("MO", "insert", noteContext.moData, noteContext['moData']["KEY"]);
		var successFunc = noteContext.successFunc,
		errorFunc = noteContext.errorFunc,
		moData = noteContext.moData,
		

		curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc),
		curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc),
		endpointUrl = this.CONSTANTS.CATALOG_COLLECTION_QUERY,
		that = this;

	return this.oDataToJsonService.create(endpointUrl, moData, {
		async : that.CONSTANTS.ASYNC,
		success : curriedSuccessFunc,
		error : curriedErrorFunc
	});
		
	},
};