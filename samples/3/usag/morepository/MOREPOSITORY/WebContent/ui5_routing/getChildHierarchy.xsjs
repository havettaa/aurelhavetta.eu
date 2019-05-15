//**** Example for basic REQUEST RESPONSE handling
var paramName; var paramValue; var headerName; var headerValue; var contentType;
//Implementation of GET call
function handleGet() {
	// Retrieve data here and return results in JSON/other format 
	$.response.status = $.net.http.OK;
	 
	 
	 var keymo = $.request.parameters.get('keyMO');
	 var conn = $.db.getConnection();
	 var pstmt;
	 var rs;
	 var query;
	 var output = {results: [] };
	 query = 'SELECT * FROM "_SYS_BIC"."usag.morepository/CL_TF_WHEREUSEDMO_SCRIPT"(\'PLACEHOLDER\' = (\'$$P_KEY_MO$$\', \'/BA1/B1_PBTP_FDB\'))';
	 pstmt = conn.prepareStatement(query);
	 pstmt.setString(1, keymo);
	 rs = pstmt.executeQuery();

	 while (rs.next()) {
	 var record = {};
	 record.NAME = rs.getString(1);
	 record.KEY = rs.getString(2);
	 record.TECHNICAL_NAME = rs.getString(3);
	 record.DESCRIPTION = rs.getString(4);
	 record.PARENTID = rs.getString(5);
	 record.COUNT_ID = rs.getString(6);
	 record.PRODUCTID_ASSOCIATED = rs.getString(7);
	 record.PRODUCT_NAME = rs.getString(8);
	 record.PARENT_TYPE = rs.getString(9);
	 record.TYPE = rs.getString(10);
	 record.RESULT_NODE = rs.getString(11);
	 output.results.push(record);
	        }
	 rs.close();
	 pstmt.close();
	 conn.close();
	 
	 return output;
	 
	 
}
//Implementation of POST call
function handlePost() {
	var bodyStr = $.request.body ? $.request.body.asString() : undefined;
	if ( bodyStr === undefined ){
		 $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
		 return {"myResult":"Missing BODY"};
	}
	// Extract body insert data to DB and return results in JSON/other format
	$.response.status = $.net.http.CREATED;
    return {"myResult":"POST success"};
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
function processRequest(){
	if (validateInput()){
		try {
		    switch ( $.request.method ) {
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