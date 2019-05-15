jQuery.sap.require('com.tutorial.util.Utils' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectPackageTableService');

com.tutorial.service.measureobject.MeasurementObjectPackageTableService = {

	newInstance : function(requestHandler) {
		this.requestHandler = requestHandler;
		return this;
	},

	CONSTANTS : {
		CATALOG_COLLECTION_QUERY : 'PACKTABLE',
		ASYNC : true
	},

	loadModel : function(modelData) {
		var successFunc = modelData['successFunc'];
		var errorFunc = modelData['errorFunc']; 
		var endpointParam = com.tutorial.util.Utils.sprintf(this.CONSTANTS.CATALOG_COLLECTION_QUERY, modelData['endpointParam']);
		
		var curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc);
		var curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc);

		var that = this;
		
		return this.requestHandler.read(endpointParam, {
			async : that.CONSTANTS.ASYNC,
			success : curriedSuccessFunc,
			error : curriedErrorFunc
		});
	},

	updateModel : function(modelData) {
		modelData.updatedData.CHANGED_AT = new Date();
		
		com.tutorial.service.generic.ODataToJsonService.createLog("PACKAGE", "update", modelData['updatedData'], modelData['updatedData']['KEY'], modelData['oldData']);
		var successFunc = modelData.successFunc;
		var errorFunc = modelData.errorFunc;
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "('" + modelData.moKey + "')";
		var modelToSave = modelData.updatedData;
		var curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc);
		var curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc);

		var that = this;
		
		this.requestHandler.update(endpointParam, modelToSave, {
			success : curriedSuccessFunc,
			error : curriedErrorFunc,
			merge : true,
			async : that.CONSTANTS.ASYNC
		});
	},

	removeModel : function(modelData) {
		com.tutorial.service.generic.ODataToJsonService.createLog("PACKAGE", "delete", modelData.moKey, modelData.moKey);
		var successFunc = modelData.successFunc;
		var errorFunc = modelData.errorFunc;
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "('" + modelData.moKey + "')";
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
		
		com.tutorial.service.generic.ODataToJsonService.createLog("PACKAGE", "insert", noteContext['moData'], noteContext['moData']['KEY']);
		var successFunc = noteContext.successFunc;
		var errorFunc = noteContext.errorFunc;
		var moData = noteContext.moData;

		var curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc);
		var curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc);
		var endpointUrl = this.CONSTANTS.CATALOG_COLLECTION_QUERY;

		var that = this;
		
		return this.requestHandler.create(endpointUrl, moData, {
			async : that.CONSTANTS.ASYNC,
			success : curriedSuccessFunc,
			error : curriedErrorFunc
		});
		
	},
};