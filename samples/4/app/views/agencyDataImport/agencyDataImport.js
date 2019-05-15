define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    var displayName = "Agency Data Import";
    var statusMessage = ko.observable();
    var isSubmitEnabled = ko.observable(false);
    var importType = ko.observable();
    var inputFilePath = "";

    var uploadFile = function () {
        clearStatusMessage();

        var file = document.getElementById('fileName').files[0];
        var formData = new FormData();
        formData.append("afile", file);

        $.ajax({
            type: "POST",
            url: '../MediaApi/api/FileUpload',
            data: formData,
            contentType: false,
            processData: false,
            success: getPackageName,
            error: afterFailure
        });
    };

    var getData = function () {

    };

    function getPackageName(data, status) {
        inputFilePath = data;

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: "../MediaApi/api/PlatformAttribute/GetAgencyPackageName",
            data: 'client=NL&type=' + importType(),
            dataType: "json",
            success: runPackage
        });
    }

    function runPackage(data, status) {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../MediaIntegration/MediaIntegrationService.svc/RunIntegrationPackage",
            data: JSON.stringify({ 'flatFilePath': inputFilePath, 'packagePath': data }),
            dataType: "json",
            success: afterRunPackageSuccess,
            error: afterFailure
        });
    }

    function afterRunPackageSuccess(data, status) {
        if (data.RunIntegrationPackageResult == 1) {
            displaySuccessMessage();
        }
        else {
            displayFailureMessage();
        }
    }

    function afterFailure(data, status, e) {
        displayFailureMessage();
    }

    function displaySuccessMessage() {
        displayStatusMessage("Import successful");
    }

    function displayFailureMessage() {
        displayStatusMessage("An error occured");
    }

    function displayStatusMessage(message) {
        statusMessage(message);
    }

    function clearStatusMessage() {
        statusMessage("");
    }

    return {
        activate: function () {
            currentclient.import.status('current');
            currentclient.approve.status('tbd');
            currentclient.match.status('tbd');
            currentclient.benchmark.status('tbd');
            currentclient.deliver.status('tbd');
        },
        bindingComplete: function () {
            getData();
        },

        displayName: displayName,
        statusMessage: statusMessage,
        isSubmitEnabled: isSubmitEnabled,
        importType: importType,

        getData: getData,
        uploadFile: uploadFile
    };
});