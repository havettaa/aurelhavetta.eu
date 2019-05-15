//**** Example for basic REQUEST RESPONSE handling
var paramName;
var paramValue;
var headerName;
var headerValue;
var contentType;
//Implementation of GET call
function handleGet() {
	// Retrieve data here and return results in JSON/other format 
	$.response.status = $.net.http.OK;

	var userName = $.session.getUsername();
	var packID = $.request.parameters.get('packID');
	var conn = $.db.getConnection();
	var pstmt;
	var rs;
	var query;
	query = 'SELECT TOP 1	USER, \'Y\', SHARE_EDIT FROM "_SYS_BIC"."usag.morepository/CL_TF_PACK_CHILD_HIER_BC"(\'PLACEHOLDER\' = (\'$$P_NODEID$$\', \'' + packID
			+ '\')) inner join "USAG_PRIVATE"."usag.morepository::Z_USAG_USERS_PACKAGES" on result_node = id_package where user = \'' + userName + '\' order by LEVEL desc';
	pstmt = conn.prepareStatement(query);
	rs = pstmt.executeQuery();
	if (rs.next()) {
		var record = {};
		record.USER = userName;
		record.EDIT = rs.getString(2);
		record.SHARE = rs.getString(3);
	} else {
		var record = {};
		record.USER = userName;
		record.EDIT = 'N';
		record.SHARE = 'N';

	}
	rs.close();
	pstmt.close();
	conn.close();

	return record;

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
				$.response.setBody(JSON.stringify(handleGet()));
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
// Call request processing  
processRequest();