requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap.min',
        'tooltip': '../lib/bootstrap/js/tooltip',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'xmla': '../lib/xmla/Xmla',
        'flex': '../flexmonster/flexmonster'

    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'tooltip': {
            deps: ['jquery', 'bootstrap'],
            exports: 'jQuery'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'durandal/viewEngine'], function (system, app, viewLocator, viewEngine) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'Generics';

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();
        //viewLocator.useConvention('viewmodels', '../views');
        //viewEngine.viewExtension = '/';

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('shell', 'entrance');
    });
});