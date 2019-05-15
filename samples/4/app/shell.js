define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {

    breadcrumb = ko.observableArray();
    selectedClient = ko.observable('Empty');

    resetListStyles = function (listObj) {
        var nodes = listObj.parentNode.parentNode.childNodes;
        console.log(listObj);
        for (i = 0; i < nodes.length; i++) {
            nodes[i].className = '';
        }
    };

    switchCompactView = function () {
        var applicationHost = document.getElementById('applicationHost');
        if (applicationHost.className == 'compact') {
            applicationHost.className = '';
        } else {
            applicationHost.className = 'compact';
        }
    };

    currentactivity = {
        statustext: ko.observable('Home'),
        matchspots: { visible: ko.observable(false) },
        totalunmatchedcur: { visible: ko.observable(false) },
        totalunmatchedcount: { visible: ko.observable(false) },
        hideall: function () {
            this.matchspots.visible(false);
            this.totalunmatchedcur.visible(false);
            this.totalunmatchedcount.visible(false);
        }
    };

    currentpanel = {
        visible: ko.observable(false)
    };

    currentclient = {
        "import": { status: ko.observable('tbd') },
        approve: { status: ko.observable('tbd') },
        match: { status: ko.observable('tbd') },
        benchmark: { status: ko.observable('tbd') },
        deliver: { status: ko.observable('tbd') }
    };

    loadCss = function (url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    };

    unloadCss = function (url) {
        console.log(url);
        var link = getLinkByHref(url);
        console.log(link);
        if (link != null) {
            link.remove();
        }
    };

    function getLinkByHref(href) {
        var links = document.head.getElementsByTagName('link');
        for (var i = 0; i < links.length; i++) {
            if (links[i].getAttribute('href') == href) {
                return links[i];
            }
        }
    }

    function FillBreadcrumb() {
        breadcrumb.removeAll();
        FillBreadcrumbParent(router.activeInstruction().config);
    }

    function FillBreadcrumbParent(routeObject) {
        // find parent
        var lastDot = routeObject.id.lastIndexOf('.');
        if (lastDot > 0) {
            var parentId = routeObject.id.substring(0, lastDot);
            for (var key in router.routes) {
                if (router.routes[key].id == parentId) {
                    FillBreadcrumbParent(router.routes[key]);
                    break;
                }
            }
        }

        breadcrumb.push({ title: routeObject.title, route: routeObject.route });
    }

    return {
        activate: function () {
            router.map([
                { route: 'home', title: 'Dashboard', moduleId: 'views/dashboard/dashboard', nav: true, id: '2' },
                { route: 'testReport', title: 'testReport', moduleId: 'views/testReport', nav: true, id: '1.1.1' },
                { route: 'Reports', title: 'Reports', moduleId: 'views/reports/reports', nav: true, id: '1.1.1' },
                { route: 'ReportsWrpapper', title: 'Reports Wrapper', moduleId: 'views/reports/reports', nav: true, id: '1.1' },
                { route: ['StatusBoard', ''], title: 'Status Board', moduleId: 'views/statusboard/statusboard', nav: true, id: '1' },
                { route: 'AgencyDataImport', title: 'Agency data import', moduleId: 'views/agencyDataImport/agencyDataImport', nav: true, id: '1.2' },
                { route: 'MarketDataImport', title: 'Market data import', moduleId: 'views/marketDataImport/marketDataImport', nav: true, id: '1.2' },
                { route: 'Benchmark', title: 'Benchmark', moduleId: 'views/benchmark/benchmark', nav: true, id: '1.2' },
                { route: 'Deliver', title: 'Deliver', moduleId: 'views/deliver/deliver', nav: true, id: '1.2' },
                { route: 'Match', title: 'Match', moduleId: 'views/matchmatch/matchmatch', nav: true, id: '1.2' },
                { route: 'DataApproval', title: 'Data Approval', moduleId: 'views/dataApproval/dataApproval', nav: true, id: '1.2' },
                { route: 'SummaryMatch', title: 'Summary Match', moduleId: 'views/summarymatch/summarymatch', nav: true, id: '1.2' },
                { route: 'MatchDetails', title: 'Match Details', moduleId: 'views/matchdetails/matchdetails', nav: true, id: '1.2.1' }
            ]).buildNavigationModel();

            router.on("router:navigation:complete", function () {
                FillBreadcrumb();
            });

            return router.activate();
        },
        compositionComplete: function () {
            currentpanel.visible.notifySubscribers();
        },

        router: router,
        breadcrumb: breadcrumb,
        bc: ko.observableArray([]),

        search: function () {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        }
    };
});