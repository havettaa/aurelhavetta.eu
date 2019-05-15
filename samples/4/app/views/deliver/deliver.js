define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    require(['flex']);

    var ctor = function () {
    };
    
    return {
        activate: function () {
            currentclient.import.status('passed');
            currentclient.approve.status('passed');
            currentclient.match.status('passed');
            currentclient.benchmark.status('passed');
            currentclient.deliver.status('current');
            currentpanel.visible(true);
        },
        displayName: 'Deliver',
        bindingComplete: function () {
            setTimeout(function () {
                var pivot1 = flexmonster.embedPivotComponent("component/html5/", "pivotContainer0", "100%", "300", { configUrl: "app/views/deliver/report.xml" }, "html5");
            }, 1000);
            setTimeout(function () {
                var pivot2 = flexmonster.embedPivotComponent("flexmonster/", "pivotContainer1", "100%", "300", { configUrl: "app/views/deliver/report.xml" }, "html5");
            }, 10000);
        },
        compositionComplete: function () {
            currentpanel.visible.valueHasMutated();
        }
    };
});