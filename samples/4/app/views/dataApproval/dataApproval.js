define(['durandal/app', 'durandal/system', 'knockout'], function (app, system, ko) {

    require(['bootstrap']);
    require(['tooltip']);

    /*
    var Case = function (Id, CaseNo, OpenedOn, OpenedBy, Age) {
        var self = this;
        self.Id = ko.observable(Id);
        self.CaseNo = ko.observable(CaseNo);
        self.OpenedOn = ko.observable(OpenedOn);
        self.OpenedBy = ko.observable(OpenedBy);
        self.Age = ko.observable(Age);
        this.Panel = ko.observable(false);
        self.expand = ko.observable();
        self.expand = function () {
            self.Panel(true);
            $.getJSON("Case/CaseIssues/" + Case.Id, function (allData) {
                self.Issues(allData)
            });
        };
        self.collapse = function () {
            self.Panel(false);
        }
    }
    var self = this;
    Cases = ko.observableArray([]);
    //self.Issues = ko.observableArray([]);
    this.Panel = ko.observable(false);
    self.selectedItem = ko.observable(null);
    //$.getJSON("Case/GetCases", function (allData) {
    Cases([{ id: 1, name: 'Name 1' }, { id: 2, name: 'Name 2' }]);
    //});
    self.onSelectRow = function (Case) {
        self.selectedItem(Case);
        //window.location.href = "/Case/Get1/" + Case.Id;
    };
    self.expand = function () {
        debugger
        //self.Panel = ko.observable(this);
        self.Panel(true);
        //$.getJSON("Case/CaseIssues/" + Case.Id, function (allData) {
        //    self.Issues(allData)
        //});
    };
    self.collapse = function () {
        self.Panel(false);
    }
    */

    var clickExpand = function () {
        alert('Expanding... Please click ok to expand.');
    };

    var campaigns = ko.observable();
    var getData = function () {
        campaigns([
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 },
                    { Month: "December", Campaign: "2014 Back to School", StartDate: "1.1.2014", EndDate: "1.1.2014", ReachActual: 222.455, ReachPlan: -23.5, SpendActual: 222.455, SpendPlan: -23.5, GRPActual: 222.455, GRPPlan: -23.5 }
        ]);

        /*ko.utils.arrayForEach(campaigns(), function (item) {
            console.log(item);
        });*/
        //$.getJSON("../MediaData/MediaDataService.svc/DimCampaigns", function (data) {
        //    campaigns(data.value);     });
        /*campaigns([
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>TOTAL</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Brand A</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Campaign A</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Station A</td></tr><tr><td>Station B</td></tr><tr><td>Station C</td></tr><tr><td>Station D</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Campaign B</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Campaign C</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Brand A</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Campaign A</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Campaign B</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Station A</td></tr><tr><td>Station B</td></tr><tr><td>Station C</td></tr><tr><td>Station D</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Campaign C</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 1, CampaignId: 1, CampaignName: '<table><tr><td>Campaign D</td></tr></table>', EndDate: null, ProductId: 0, StartDate: null, TotalCost: 200 },
            { AgencyId: 100, CampaignId: 100, CampaignName: '<table><tr><td>Brand A</td></tr></table>', EndDate: null, ProductId: 100, StartDate: null, TotalCost: 1000 }
        ]);*/
    };
    var displayName = 'Status Board';
    var ctor = function () {

    };

    return {
        activate: function () {
            currentclient.import.status('passed');
            currentclient.approve.status('current');
            currentclient.match.status('tbd');
            currentclient.benchmark.status('tdb');
            currentclient.deliver.status('tbd');
            currentpanel.visible(true);             
        },
        displayName: 'Approve',
        bindingComplete: function () {
            getData();

        },
        displayName: displayName,
        campaigns: campaigns,
        getData: getData,
        clickExpand: clickExpand
    };
});