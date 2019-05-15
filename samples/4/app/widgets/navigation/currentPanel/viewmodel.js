define(['durandal/composition'], function (composition) {
    
    var ctor = function () { };

    ctor.prototype.activate = function (settings) {

        this.settings = settings;
        this.breadcrumb = settings.breadcrumb;     
    };

    return ctor;
});