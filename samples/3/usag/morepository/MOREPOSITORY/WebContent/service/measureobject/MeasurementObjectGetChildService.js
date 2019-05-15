jQuery.sap.require('com.tutorial.util.Utils' + m_urlVersion);

jQuery.sap.declare('com.tutorial.service.measureobject.MeasurementObjectGetChildService');

com.tutorial.service.measureobject.MeasurementObjectGetChildService = {

	newInstance : function(oDataToJsonService) {
		this.oDataToJsonService = oDataToJsonService;
		return this;
	},

	CONSTANTS : {
		//CATALOG_COLLECTION_QUERY : 'MO_NOT_IN_PACKAGE?$filter=ASSIGNED_MO eq \'2\'',
		CATALOG_COLLECTION_QUERY : 'HIERARCHY_GET_CHILDParameters(PARENT_SEARCH=\'{0}\')/Results',
		ASYNC : true
	},

	loadModel : function(modelData) {
		var successFunc = modelData['successFunc'];
		var errorFunc = modelData['errorFunc']; 
		var endpointParam = com.tutorial.util.Utils.sprintf(this.CONSTANTS.CATALOG_COLLECTION_QUERY, modelData['endpointParam']);
		
		curriedSuccessFunc = com.tutorial.util.Utils.curry(successFunc), curriedErrorFunc = com.tutorial.util.Utils.curry(errorFunc), that = this;

		return this.oDataToJsonService.read(endpointParam, {
			async : that.CONSTANTS.ASYNC,
			success : curriedSuccessFunc,
			error : curriedErrorFunc
		});
	},

	updateModel : function(modelData) {
		com.tutorial.service.generic.ODataToJsonService.createLog("HIERARCHY_GET_CHILD", "update", modelData['updatedData'], modelData['moKey']);
		var successFunc = modelData['successFunc'];
		var errorFunc = modelData['errorFunc'];
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "('" + modelData['moKey'] + "')";
		var modelToSave = modelData['updatedData'];
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
		com.tutorial.service.generic.ODataToJsonService.createLog("HIERARCHY_GET_CHILD", "delete", modelData['moKey'], modelData['moKey']);
		var successFunc = modelData['successFunc'];
		var errorFunc = modelData['errorFunc'];
		var endpointParam = this.CONSTANTS.CATALOG_COLLECTION_QUERY + "('" + modelData['moKey'] + "')";
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
		com.tutorial.service.generic.ODataToJsonService.createLog("HIERARCHY_GET_CHILD", "insert", noteContext['moData'], noteContext['moData']["KEY"]);
		var successFunc = noteContext['successFunc'],
		errorFunc = noteContext['errorFunc'],
		moData = noteContext['moData'],

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