define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    var ctor = function () {
    };
    
    var campaigns = ko.observable();
    var isSpinnerVisible = ko.observable();
    isSpinnerVisible(true);
    var getData = function () {
        console.log('getData() called');

        //$.getJSON("../MediaData/MediaDataService.svc/DimSpots?$top=3", function (data) {
        //    campaigns(data.value);
        //});
        getExtraData(3);
    };

    var getExtraData = function (amount) {
        isSpinnerVisible(true);
        $.ajax({
            type: "GET",
            url: "../MediaData/MediaDataService.svc/DimSpots",
            dataType: "json",
            data: "$top=" + amount,
            xhrFields: { withCredentials: true },
            error: function (xmlHttpRequest, textStatus, errorThrown) { ajaxError(xmlHttpRequest, textStatus, errorThrown); },
            success: function (data) {
                campaigns(data.value);
                isSpinnerVisible(false);
            }
        });
    };
    return {
        getExtraData: getExtraData,
        getExtraData100: function () {
            getExtraData(100);
        },
        getExtraData1000:function() {
            getExtraData(1000);
        },
        getExtraData10000: function () {
            getExtraData(10000);
        },
        getExtraDataAll: function () {
            getExtraData(10000000);
        },
        activate: function () {
            currentclient.import.status('passed');
            currentclient.approve.status('passed');
            currentclient.match.status('passed');
            currentclient.benchmark.status('current');
            currentclient.deliver.status('tbd');
            currentpanel.visible(true);
        },
        displayName: 'Benchmark',
        compositionComplete: function () {
            currentpanel.visible.valueHasMutated();
        },
        bindingComplete: function() {
            getData();
        },
        campaigns: campaigns,
        getData: getData,
        isSpinnerVisible: isSpinnerVisible
    };
});