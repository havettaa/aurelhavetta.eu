define(function () {
    var ctor = function () {
    };

    return {
        activate: function () {

            currentclient.import.status('passed');
            currentclient.approve.status('passed');
            currentclient.match.status('passed');
            currentclient.benchmark.status('current');
            currentclient.deliver.status('tbd');
        },
        displayName: 'Benchmark',
        bindingComplete: function () {
        }
    };
});