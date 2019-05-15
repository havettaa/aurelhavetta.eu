define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {
    
    var ctor = function () { };

    var divisions = ko.observable();

    var getData = function () {
        $.getJSON("../MediaData/MediaDataService.svc/DimDivisions", function (data) {
            console.log(data);
            divisions(data.value);

        });
    };
    
    ctor.prototype.activate = function (settings) {

        this.settings = settings;
        this.divisions = divisions;
        //getData();

        this.toggleMainNavigationSubSection = function (data, event) {
            var clicked = $(event.target);
            var button = clicked.is('a') ? clicked : clicked.closest('a');
            var icon = button.find('[class*="fa-angle"]');
            var subSection = button.closest('li').children('ul');

            if (icon.hasClass('fa-angle-down')) {
                icon.removeClass('fa-angle-down');
                icon.addClass('fa-angle-up');
                subSection.show();
            } else {
                icon.removeClass('fa-angle-up');
                icon.addClass('fa-angle-down');
                subSection.hide();
            }
        };
    };

    return ctor;
});