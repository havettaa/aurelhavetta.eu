define(function () {
    var ctor = function () {
    };

    return {
        activate: function () {
            currentclient.import.status('passed');
            currentclient.approve.status('passed');
            currentclient.match.status('current');
            currentclient.benchmark.status('tbd');
            currentclient.deliver.status('tbd');            
            currentpanel.visible(true);             
        },
        displayName: 'Match',
        bindingComplete: function () {
        },       
        compositionComplete: function () {   
            currentpanel.visible.valueHasMutated();
        }
    };
});