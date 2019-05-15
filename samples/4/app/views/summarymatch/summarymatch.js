define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    require(['bootstrap']);
    require(['tooltip']);
    
    var campaigns = ko.observable();
    var getData = function () {
        console.log('getData() called');

        $.getJSON("../MediaData/MediaDataService.svc/DimCampaigns", function (data) {
            campaigns(data.value);
            
        });

    };
    var displayName = 'Summary Match';
    var ctor = function() {

    };

    return {
        activate: function () {
            currentactivity.statustext('Summary Match');
            currentactivity.hideall();
            currentactivity.totalunmatchedcur.visible(true);
            currentactivity.totalunmatchedcount.visible(true);
            
            currentclient.import.status('passed');
            currentclient.approve.status('passed');
            currentclient.match.status('current');
            currentclient.benchmark.status('tbd');
            currentclient.deliver.status('tbd');
            
            currentpanel.visible(true);
        },

        bindingComplete: function() {
           // getData();

        },
        //displayName: displayName,
        campaigns: campaigns,
        getData: getData
};
});