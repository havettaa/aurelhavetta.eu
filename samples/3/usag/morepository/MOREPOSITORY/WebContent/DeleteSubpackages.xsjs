//**** Example for basic REQUEST RESPONSE handling
var paramName;
var paramValue;
var headerName;
var headerValue;
var contentType;
//Implementation of GET call
function handleGet() {
	// Retrieve data here and return results in JSON/other format 
	var conn = $.db.getConnection();
	$.response.status = $.net.http.OK;
	var username = $.session.getUsername();
	var datenow = new Date().toJSON();
	
	var startTime = new Date().getTime();

	var thePackageTBDeleted = $.request.parameters.get('thePackageTBDeleted');
	var conn = $.db.getConnection();
	var pstmt;
	var pstmt2;
	var rs;
	var rs2;
	var query;
	var query2;
	var output = "";
	
	// INSERT QUERY FOR NEW LOG ITEM
	var queryLogPackageIns;
	var pcallLogPackageIns;	
	var queryLogPackageUpd;
	var pcallLogPackageUpd;
	
	var logPackageId = createGuid();
	var logPackageDescription = "Delete Package";
	var logPackageNote = "";
	
	queryLogPackageIns = 'INSERT INTO "USAG_PRIVATE"."usag.morepository::Z_USAG_LOG" \
		(ID, TIMESTAMP, USERID, LEVEL, OPERATION, STATUS, ENTITY, KEY, DESCRIPTION, NOTE) \
		VALUES \
		( \
		  \'' + 		logPackageId 			+ '\' , \
		  \'' + 		datenow 				+ '\' , \
		  \'' + 		username			  	+ '\' , \
		  \'' + 		"info"	 		  		+ '\' , \
		  \'' + 		"delete"		  		+ '\' , \
		  \'' + 		"not completed"	  		+ '\' , \
		  \'' + 		"Z_USAG_PACKAGE" 		+ '\' , \
		  \'' + 		thePackageTBDeleted		+ '\' , \
	      \'' + 		logPackageDescription 	+ '\' , \
		  \'' + 		"Started" 				+ '\'   \
		)';	
	
	pcallLogPackageIns = conn.prepareCall(queryLogPackageIns);
	pcallLogPackageIns.execute();
	pcallLogPackageIns.close();
	conn.commit();
	
	// INSERT LOG FOR DELETING RECORD FROM PACKAGEMO
	var queryLogPackageMOIns;
	var pcallLogPackageMOIns;	
	var queryLogPackageMOUpd;
	var pcallLogPackageMOUpd;
	var queryLogSel;
	var pcallLogSel;
	
	var logPackageMOId = createGuid();
	var logPackageMODescription = "Delete PackageMO";
	var logPackageMONote = "";
	var rsLogSel;
	var assignedMO = "";
	
	queryLogPackageMOIns = 'INSERT INTO "USAG_PRIVATE"."usag.morepository::Z_USAG_LOG" \
		(ID, TIMESTAMP, USERID, LEVEL, OPERATION, STATUS, ENTITY, KEY, DESCRIPTION, NOTE) \
		VALUES \
		( \
		  \'' + 		logPackageMOId 			+ '\' , \
		  \'' + 		datenow 				+ '\' , \
		  \'' + 		username			  	+ '\' , \
		  \'' + 		"info"	 		  		+ '\' , \
		  \'' + 		"delete"		  		+ '\' , \
		  \'' + 		"not completed"	  		+ '\' , \
		  \'' + 		"Z_USAG_PACKAGEMO" 		+ '\' , \
		  \'' + 		thePackageTBDeleted		+ '\' , \
	      \'' + 		logPackageMODescription + '\' , \
		  \'' + 		"Started" 				+ '\'   \
		)';	
	
	pcallLogPackageMOIns = conn.prepareCall(queryLogPackageMOIns);
	pcallLogPackageMOIns.execute();
	pcallLogPackageMOIns.close();
	conn.commit();
	
	queryLogSel = 'SELECT package.KEY_PACKAGE, package.KEY_MEASUREMENT_OBJECTS, mo.TECHNICAL_NAME FROM "USAG_PRIVATE"."usag.morepository::Z_USAG_PACKAGEMO" as package \
				   JOIN  "USAG_PRIVATE"."usag.morepository::Z_USAG_MO" mo ON mo.KEY = package.KEY_MEASUREMENT_OBJECTS \
				   where key_package = \'' + thePackageTBDeleted + '\'';
	pcallLogSel = conn.prepareStatement(queryLogSel);
	rsLogSel = pcallLogSel.executeQuery();
		
	while (rsLogSel.next()) 
	{
		if (assignedMO != "")
		{
			assignedMO += ", ";
		}
		assignedMO += (rsLogSel.getString(3) + "(key = " + rsLogSel.getString(2) + ")");
	}
	
	assignedMO += "";
	
	
	query = 'DELETE FROM "USAG_PRIVATE"."usag.morepository::Z_USAG_PACKAGEMO" WHERE KEY_PACKAGE =\'' + thePackageTBDeleted + '\'';
	query2 = 'DELETE FROM "USAG_PRIVATE"."usag.morepository::Z_USAG_PACKAGE" WHERE KEY=\'' + thePackageTBDeleted + '\'';
	pstmt = conn.prepareStatement(query);
	pstmt2 = conn.prepareStatement(query2);
	rs = pstmt.executeQuery();
	rs2 = pstmt2.executeQuery();
	
	output = "Count: ";
	
	conn.commit();
	rs.close();
	rs2.close();
	pstmt.close();
	pstmt2.close();
	
	var endPackage = new Date().getTime();		
	var timestampPackage = (endPackage - startTime)/1000;
	
	logPackageNote = "Succesfully finished with total time " + timestampPackage + " seconds. Deleted package key: " + thePackageTBDeleted;
			
	queryLogPackageUpd = 'UPDATE "USAG_PRIVATE"."usag.morepository::Z_USAG_LOG" \
		set \
		  	TIMESTAMP 	= \'' + 	datenow 			+ '\' , \
			LEVEL 		= \'' + 	"info" 				+ '\' , \
			STATUS 		= \'' + 	"completed" 		+ '\' , \
			KEY			= \'' + 	thePackageTBDeleted	+ '\' , \
			NOTE		= \'' + 	logPackageNote		+ '\'   \
		where id 		= \'' + 	logPackageId 		+ '\'';
	
	pcallLogPackageUpd = conn.prepareCall(queryLogPackageUpd);
	pcallLogPackageUpd.execute();
	pcallLogPackageUpd.close();
	conn.commit();
	
	var endPackageMO = new Date().getTime();		
	var timestampPackageMO = (endPackageMO - startTime)/1000;
	
	logPackageMONote = "Succesfully finished with total time " + timestampPackageMO + " seconds. Deleted assignments: " + assignedMO + " for package key: " + thePackageTBDeleted;
			
	queryLogPackageMOUpd = 'UPDATE "USAG_PRIVATE"."usag.morepository::Z_USAG_LOG" \
		set \
		  	TIMESTAMP 	= \'' + 	datenow 			+ '\' , \
			LEVEL 		= \'' + 	"info" 				+ '\' , \
			STATUS 		= \'' + 	"completed" 		+ '\' , \
			KEY			= \'' + 	thePackageTBDeleted	+ '\' , \
			NOTE		= \'' + 	logPackageMONote	+ '\'   \
		where id 		= \'' + 	logPackageMOId 		+ '\'';
	
	pcallLogPackageMOUpd = conn.prepareCall(queryLogPackageMOUpd);
	pcallLogPackageMOUpd.execute();
	pcallLogPackageMOUpd.close();
	conn.commit();

	return output;

}
//Implementation of POST call
function handlePost() {
	var bodyStr = $.request.body ? $.request.body.asString() : undefined;
	if (bodyStr === undefined) {
		$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		return {
			"myResult" : "Missing BODY"
		};
	}
	// Extract body insert data to DB and return results in JSON/other format
	$.response.status = $.net.http.CREATED;
	return {
		"myResult" : "POST success"
	};
}
// Check Content type headers and parameters
function validateInput() {
	/*var i; var j;
	// Check content-type is application/json
	contentType = $.request.contentType;
	if ( contentType === null || contentType.startsWith("application/json") === false){
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 $.response.setBody("Wrong content type request use application/json");
		return false;
	}
	// Extract parameters and process them 
	for (i = 0; i < $.request.parameters.length; ++i) {
	    paramName = $.request.parameters[i].name;
	    paramValue = $.request.parameters[i].value;
	//      Add logic	    
	}
	// Extract headers and process them 
	for (j = 0; j < $.request.headers.length; ++j) {
	    headerName = $.request.headers[j].name;
	    headerValue = $.request.headers[j].value;
	//      Add logic	    
	 }*/
	return true;
}
// Request process 
function processRequest() {
	if (validateInput()) {
		try {
			switch ($.request.method) {
			//Handle your GET calls here
			case $.net.http.GET:
				$.response.setBody((handleGet()));
				break;
			//Handle your POST calls here
			case $.net.http.POST:
				$.response.setBody(JSON.stringify(handlePost()));
				break;
			//Handle your other methods: PUT, DELETE
			default:
				$.response.status = $.net.http.METHOD_NOT_ALLOWED;
				$.response.setBody("Wrong request method");
				break;
			}
			$.response.contentType = "application/json";
		} catch (e) {
			$.response.setBody("Failed to execute action: " + e.toString());
		}
	}
}

function createGuid()  
{  
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {  
      var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
      return v.toString(16);  
   });  
}

// Call request processing  
processRequest();
