define(['plugins/http', 'durandal/app', 'knockout', 'xmla', 'bootstrap'], function (http, app, ko, xmla, bootstrap) {
    //Note: This module exports an object.
    //That means that every module that "requires" it will get the same object instance.
    //If you wish to be able to create multiple instances, instead export a function.
    //See the "welcome" module for an example of function export.

    function compositionComplete(view) {

    var xmla = new Xmla({
        async: false
    });
    var datasourceCache = [];

    var input_url = document.getElementById("input_url");
    var textarea_statement = document.getElementById("textarea_statement");
    var select_datasources = document.getElementById("select_datasources");
    var select_catalogs = document.getElementById("select_catalogs");
    var button_discover = document.getElementById("button_discover");
    var button_execute = document.getElementById("button_execute");
    var section_error = document.getElementById("section_error");
    var section_request = document.getElementById("section_request");
    var section_response = document.getElementById("section_response");
    var section_result = document.getElementById("section_result");

    function addOption(select, value) {
        var option = document.createElement("option");
        option.text = value;
        option.label = value;
        option.value = value;
        select.appendChild(option);
    }

    var select_format = document.getElementById("select_format");
    addOption(select_format, Xmla.PROP_FORMAT_MULTIDIMENSIONAL);
    addOption(select_format, Xmla.PROP_FORMAT_TABULAR);

    var select_axisformat = document.getElementById("select_axisformat");
    addOption(select_axisformat, Xmla.PROP_AXISFORMAT_TUPLE);
    addOption(select_axisformat, Xmla.PROP_AXISFORMAT_CLUSTER);
    addOption(select_axisformat, Xmla.PROP_AXISFORMAT_CUSTOM);

    function setGuiDisabled(disabled) {
        input_url.disabled = disabled;
        select_datasources.disabled = disabled;
        select_catalogs.disabled = disabled;
        button_discover.disabled = disabled;
        if (!disabled && select_catalogs.selectedIndex) {
            textarea_statement.disabled = disabled;
            button_execute.disabled = disabled;
        }
    }

    function getDatasource() {
        return datasourceCache[select_datasources.selectedIndex];
    }

    function clearError() {
        section_error.innerHTML = "";
    }
    function escapeXML(xml) {
        return xml.replace(
            /\&/g, "&amp;"
        ).replace(
            /</g, "&lt;"
        ).replace(
            />/g, "&gt;"
        );
    }
    function setResponse(txt) {
        section_response.innerHTML = escapeXML(txt);
    }
    function setRequest(txt) {
        section_request.innerHTML = escapeXML(txt);
    }

    function showException(exception) {
        if (exception instanceof Xmla.Exception) {
            section_error.innerHTML = "" +
                "<div>code: " + exception.code + "<\/div>" +
                "<div>message: " + exception.message + "<\/div>" +
                "<div>source: " + exception.source + "<\/div>" +
                "<div>helpfile: <a href=\"" + exception.helpfile + "\">" + exception.helpfile + "</a>"
            ;
        }
        else {
            section_error.innerHTML = exception;
        }
    }

    function populateDatasources() {
        section_result.innerHTML = "";
        clearError();
        setGuiDisabled(true);
        try {
            select_datasources.innerHTML = "";
            select_catalogs.innerHTML = "";
            var rowset = xmla.discoverDataSources({ url: input_url.value });
            if (rowset.hasMoreRows()) {
                datasourceCache = rowset.fetchAllAsObject();
                for (var numDataSources = datasourceCache.length, i = 0; i < numDataSources; i++) {
                    addOption(select_datasources, datasourceCache[i].DataSourceName);
                }
                populateCatalogs()
            }
            else {
                section_error.innerHTML = "No datasources found";
            }
        } catch (exception) {
            showException(exception);
        }
        setGuiDisabled(false);
    }

    function populateCatalogs() {
        clearError();
        setResponse("");
        setGuiDisabled(true);
        try {
            select_catalogs.innerHTML = "";
            var datasource = getDatasource();
            var properties = {};
            properties[Xmla.PROP_DATASOURCEINFO] = datasource[Xmla.PROP_DATASOURCEINFO];
            var rowset = xmla.discoverDBCatalogs({
                url: datasource["URL"] ? datasource["URL"] : input_url.value,
                properties: properties
            });
            if (rowset.hasMoreRows()) {
                var catalog;
                while (rowset.hasMoreRows()) {
                    addOption(select_catalogs, rowset.getCatalogName());
                    rowset.next();
                }
            }
            else {
                section_error.innerHTML = "No catalogs found";
            }
        } catch (exception) {
            showException(exception);
        }
        setGuiDisabled(false);
    }

    function fillTableFromRowset(rowset) {
        var tab = document.createElement("table");
        tab.className = "table table-striped table-bordered table-condensed";
        //tab.setAttribute("border", "1");
        section_result.appendChild(tab);
        var c, i, r = tab.insertRow(0), fieldCount = rowset.fieldCount();
        for (i = 0; i < fieldCount; i++) {
            c = r.insertCell(i);
            c.innerHTML = rowset.fieldName(i);
            c.setAttribute("class", "th");
        }
        while (row = rowset.fetchAsArray()) {
            r = tab.insertRow(tab.rows.length);
            for (i = 0; i < fieldCount; i++) {
                c = r.insertCell(i);
                c.innerHTML = rowset.fieldVal(i);
            }
        }
    }

    function fillTableFromDataset(dataset) {
        //debugger;
        var tab = document.createElement("table");
        tab.className = "table table-striped table-bordered table-condensed";
        var rows = tab.rows;
        //tab.setAttribute("border", "1");
        section_result.appendChild(tab);

        function getTupleName(tuple) {
            var name = "", members = tuple.members,
                i, n = members.length
            ;
            for (i = 0; i < n; i++) {
                if (name.length) name += ".";
                name += members[i][Xmla.Dataset.Axis.MEMBER_CAPTION];
            }
            return name;
        }

        var columnCount, cellset = dataset.getCellset(), r, c;
        if (dataset.hasColumnAxis()) {
            var columnAxis = dataset.getColumnAxis();
            columnCount = columnAxis.tupleCount();
            r = tab.insertRow(rows.length);
            columnAxis.eachTuple(function (tuple) {
                c = r.insertCell(r.cells.length);
                c.className = "th";
                c.innerHTML = getTupleName(tuple);
            });
        }
        else {
            columnCount = 1;
        }
        if (dataset.hasRowAxis()) {
            var rowAxis = dataset.getRowAxis();
            //dummy cell to make room for the row headers
            r.insertCell(0);
            rowAxis.eachTuple(function (tuple) {
                r = tab.insertRow(rows.length);
                c = r.insertCell(r.cells.length);
                c.className = "th";
                c.innerHTML = getTupleName(tuple);
                for (i = 0; i < columnCount; i++) {
                    c = r.insertCell(r.cells.length);
                    c.innerHTML = cellset.cellValue();
                    cellset.nextCell();

                }
            });
        }
        else {
            r = tab.insertRow(rows.length);
            for (i = 0; i < columnCount; i++) {
                c = r.insertCell(r.cells.length);
                c.innerHTML = cellset.cellValue();
                cellset.nextCell();
            }
        }
    }

    function executeQuery() {
        clearError();
        section_result.innerHTML = "";
        setResponse("");
        setGuiDisabled(true);
        try {
            var datasource = getDatasource();
            var properties = {};
            properties[Xmla.PROP_DATASOURCEINFO] = datasource[Xmla.PROP_DATASOURCEINFO];
            properties[Xmla.PROP_CATALOG] = select_catalogs.value;
            properties[Xmla.PROP_FORMAT] = select_format.value;
            if (select_format.value === Xmla.PROP_FORMAT_MULTIDIMENSIONAL) {
                properties[Xmla.PROP_AXISFORMAT] = select_axisformat.value;
            }
            var result = xmla.execute({
                url: datasource["URL"] ? datasource["URL"] : input_url.value,
                statement: textarea_statement.value,
                properties: properties
            });
            setRequest(xmla.soapMessage);
            setResponse(xmla.responseText);
            if (result instanceof Xmla.Rowset) {
                fillTableFromRowset(result);
            }
            else
                if (result instanceof Xmla.Dataset) {
                    fillTableFromDataset(result);
                }
        } catch (exception) {
            showException(exception);
        }
        setGuiDisabled(false);
    }

    select_datasources.onchange = populateCatalogs;
    button_discover.onclick = populateDatasources;
    button_execute.onclick = executeQuery;

        require('bootstrap');
    }
    
    return {
        displayName: 'Reports',
        images: ko.observableArray([]),
        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceding
            if (this.images().length > 0) {
                return;
            }

            var that = this;
            return http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'mount ranier', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function(response) {
                that.images(response.items);
            });
        },
        compositionComplete: compositionComplete,
        select: function(item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/detail';
            app.showDialog(item);
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            //return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        }
    };
});