define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    
    require(['bootstrap']);
    require(['tooltip']);
   // loadCss('css/matchdetails.css');

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
            currentactivity.statustext('Brand A | Campaign A | Station B');
            currentactivity.hideall();   
            currentactivity.totalunmatchedcur.visible(true);
            currentactivity.totalunmatchedcount.visible(true);
            currentpanel.visible(true);

        },

        bindingComplete: function() {
            //getData();

        },
        compositionComplete: function () {
            currentpanel.visible.valueHasMutated();
        },
        displayName: displayName,
        campaigns: campaigns,
        getData: getData,
        deactivate: function() {
          //  unloadCss('css/matchdetails.css');
        }
    };
});