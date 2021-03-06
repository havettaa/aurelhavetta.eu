jQuery.sap.require('com.tutorial.util.Utils' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageService');

com.tutorial.service.measureobject.MeasurementObjectMoNotInPackageService = {

	newInstance : function(requestHandler) {
		this.requestHandler = requestHandler;
		return this;
	},

	CONSTANTS : {
		//CATALOG_COLLECTION_QUERY : 'MO_NOT_IN_PACKAGE?$filter=ASSIGNED_MO eq \'2\'',
		CATALOG_COLLECTION_QUERY : 'MO_NOT_IN_PACKAGEParameters(ID_PACKAGE=\'{0}\')/Results',
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
		com.tutorial.service.generic.ODataToJsonService.createLog("MO", "update", modelData['updatedData'], modelData['moKey']);
		var successFunc = modelData['successFunc'];
		var errorFunc = modelData['errorFunc'];
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "('" + modelData['moKey'] + "')";
		var modelToSave = modelData['updatedData'];
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
		com.tutorial.service.generic.ODataToJsonService.createLog("MO", "delete", modelData['moKey'], modelData['moKey']);
		var successFunc = modelData['successFunc'];
		var errorFunc = modelData['errorFunc'];
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "('" + modelData['moKey'] + "')";
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
		com.tutorial.service.generic.ODataToJsonService.createLog("MO", "insert", noteContext['moData'], noteContext['moData']["KEY"]);
		var successFunc = noteContext['successFunc'],
		errorFunc = noteContext['errorFunc'],
		moData = noteContext['moData'],

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