define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    
    require(['bootstrap']);
    require(['tooltip']);
    
    var campaigns = ko.observable();
    var getData = function () {
        $.getJSON("../MediaData/MediaDataService.svc/DimCampaigns", function (data) {
            campaigns(data.value);
            
        });

    };
    var displayName = 'Status Board';
    var ctor = function() {

    };

    return {
        activate: function() {
            currentactivity.statustext('<i class="fa fa-th-large"></i> Status Board');
            currentactivity.hideall();
            currentactivity.matchspots.visible(true);

            currentpanel.visible(false);

        },

        bindingComplete: function() {
            //getData();

        },
        compositionComplete: function() {
            $('#example').tooltip({
                trigger: "hover"
            });
            
            $('#ex2').tooltip({
                trigger: "hover"
            });
            
            $('#ttlink').tooltip('show');
        },
    displayName: displayName,
        campaigns: campaigns,
        getData: getData
};
});