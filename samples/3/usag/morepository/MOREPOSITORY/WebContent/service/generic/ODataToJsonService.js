jQuery.sap.require('sap.ui.model.odata.ODataModel');
jQuery.sap.require("sap.ui.core.format.DateFormat");

jQuery.sap.declare('com.tutorial.service.generic.ODataToJsonService');

com.tutorial.service.generic.ODataToJsonService = {
	
	newInstance : function(params)
	{
		var config = {
			json : true,
		};

		if (typeof params === "object") {
			config = params;
		}
		
		return new sap.ui.model.odata.ODataModel(m_xsodata, config);
	},

	createLog : function(entity, operation, params, key, extra)
	{
		var queryNew = JSON.stringify(params);
		var queryOld = JSON.stringify(extra);
		var datenow = new Date();
		var tableName = (entity == "MO" ? "Measurement Object" : 
						 entity == "OBJECT_TYPES" ? "Types of Object" :
						 entity == "UOM" ? "UOM" :
						 entity == "AGGREGATIONS" ? "Aggregations" :
						 entity == "MEASUREMENT_FREQUENCY" ? "Frequency of measurement" :
						 entity == "SUSAGE_STATUS" ? "Status of susage" :
						 entity == "USERS_PACKAGES" ? "Users packages" :
						 entity == "PACKAGE" ? "Package" :
						 entity == "PACKAGEMO" ? "MO to Package assignments" :
						 entity == "CRP_D_PROD_SUPPORT.xml" ? "Product detail table" :
						 entity
						);
		
		var logJson = {
			"ID" 			: this.createGUID(),
			"USERID" 		: username,
			"TIMESTAMP"		: datenow,
			"LEVEL" 		: "info",
			"OPERATION" 	: operation,
			"STATUS" 		: "completed",
			"ENTITY" 		: "Z_USAG_" + entity,
			"KEY" 			: key,
			"DESCRIPTION" 	: "Log for " + operation + " of record in table " + tableName + ".",
			"VALUES"		: queryNew,
			"EXTRADATA"		: queryOld
		};
		
		var endpointParam = 'USAG_LOG';
		var oDataService = this.newInstance();

		oDataService.create(endpointParam, logJson, {
			success : "",
			error 	: "",
			merge 	: true,
			async 	: true
		});

	},
	
	createGUID : function()  
	{  
	   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
	      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
	      return v.toString(16);  
	   });  
	},
	
	GetFormattedDate : function()
	{
		var oType = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "YYYY-MM-dd"});
		return oType.format(new Date());		
	}
};
