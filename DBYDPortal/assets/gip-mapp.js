GIPP={
	CONFIG:null
}

GIL={
	TEXT:null
}

var frameValidate = function () {
    return MapValidator.frameValidate();
}

MapValidator={
	overlap: function (frame1, frame2) {
        var overlaping = false;

        var coords1 = frame1.getGeometry().getCoordinates().flat();
        var coords2 = frame2.getGeometry().getCoordinates().flat();

        var frameObj1 = [];
        var frameObj2 = [];

        for (var i = 0; i < 4; i ++) {
            frameObj1.push({ X: coords1[i][0], Y: coords1[i][1] });
            frameObj2.push({ X: coords2[i][0], Y: coords2[i][1] });
        }

        overlaping = this.isFrameIntersecting(frameObj1, frameObj2);
        if (!overlaping)
            return this.isFrameIntersecting(frameObj2, frameObj1);
        else
            return true;
    },

    isFrameIntersecting: function (frameObj1, frameObj2) {
        var isIn = false;

        var dx = null;
        var dy = null;

        var dy1 = null;
        var dy2 = null;
        var dx1 = null;
        var dx2 = null;
        var y1 = null;
        var y2 = null;
        var dy1 = null;
        var dy2 = null;

        for (var i = 0; i < 4; i++) {

            if (isIn)
                break;

            for (var i1 = 0; i1 < 4; i1++) {
                var i2 = (i1 + 1) % 4;
                var i3 = (i2 + 1) % 4;


                dx = frameObj1[i1].X - frameObj1[i2].X;
                dy = frameObj1[i1].Y - frameObj1[i2].Y;

                if (dy == 0) {
                    dy1 = frameObj1[i2].Y - frameObj1[i3].Y;
                    dy2 = frameObj1[i2].Y - frameObj2[i].Y;

                    if (dy1 > 0 && dy2 >= 0)
                        isIn = true;
                    else if (dy1 < 0 && dy2 < 0)
                        isIn = true;
                    else
                        isIn = false;
                }
                if (dx == 0) {
                    dx1 = frameObj1[i2].X - frameObj1[i3].X;
                    dx2 = frameObj1[i2].X - frameObj2[i].X;

                    if (dx1 > 0 && dx2 >= 0)
                        isIn = true;
                    else if (dx1 < 0 && dx2 < 0)
                        isIn = true;
                    else
                        isIn = false;
                }
                else {
                    var k = dy / dx;
                    var q = frameObj1[i1].Y - k * frameObj1[i1].X;

                    y1 = k * frameObj1[i3].X + q;
                    y2 = k * frameObj2[i].X + q;

                    dy1 = y1 - frameObj1[i3].Y;
                    dy2 = y2 - frameObj2[i].Y;

                    if (dy1 > 0 && dy2 >= 0)
                        isIn = true;
                    else if (dy1 < 0 && dy2 < 0)
                        isIn = true;
                    else
                        isIn = false;
                }

                if (!isIn)
                    break
            }
        }

        return isIn;
    },

    traceFeatures: function (traceLine, frameFeaturesChecked, frameTraceIndex) {
        var frameTrace = frameFeaturesChecked[frameTraceIndex].frameTrace;

        for (var i = 0; i < frameTrace.length; i++) {
            if (traceLine.indexOf(frameTrace[i]) == -1) {
                traceLine.push(frameTrace[i])
                traceLine = this.traceFeatures(traceLine, frameFeaturesChecked, frameTrace[i])
            }
        }

        return traceLine;
    },

    checkOverlap: function () {
        if (GIPP.CONFIG.checkOverlap == undefined || GIPP.CONFIG.checkOverlap == 0)
            return true;

        var frameFeatures = frameSource.getFeatures();
        var frameFeaturesCount = frameFeatures.length;
        var frameFeaturesChecked = [];

        if (frameFeaturesCount == 1)
            return true;

        for (var i = 0; i < frameFeaturesCount; i++) {
            frameFeaturesChecked.push({ frameIndex: i, frameTrace: [] })
        }

        for (var i = 0; i < frameFeaturesCount; i++) {
            for (var j = i + 1; j < frameFeaturesCount; j++) {

                if (this.overlap(frameFeatures[i], frameFeatures[j])) {
                    if (frameFeaturesChecked[i].frameTrace.indexOf(j) == -1)
                        frameFeaturesChecked[i].frameTrace.push(j);

                    if (frameFeaturesChecked[i].frameTrace.indexOf(i) == -1)
                        frameFeaturesChecked[j].frameTrace.push(i);
                }
            }
        }

        var traceLine = this.traceFeatures([], frameFeaturesChecked, 0);

        return traceLine.length == frameFeaturesChecked.length;
    },

    checkMaxDistance: function () {

        if (GIPP.CONFIG.maxDistance == undefined || GIPP.CONFIG.maxDistance == 0)
            return true;

        var maxDistance = GIPP.CONFIG.maxDistance;

        var frameFeatures = frameSource.getFeatures();
        var frameFeaturesCount = frameFeatures.length;

        var center = mapOptions.centerTransform;
        var distance = null;
        var point = null;

        for (var i = 0; i < frameFeaturesCount; i++) {
            point = frameFeatures[i].getProperties().center;
            distance = Math.sqrt(Math.pow(center[0] - point[0], 2) + Math.pow(center[1] - point[1], 2));

            if (distance > maxDistance)
                return false;
        }

        return true;
    },

    getCaptureCounts: function () {
        var captureFeatures = captureSource.getFeatures();
        var captureCounts = {};
        var geomType = null;

        captureCounts["Sum"] = 0;
        for (var i = 0; i < captureFeatures.length; i++) {
            geomType = captureFeatures[i].getGeometry().getType();

            if (captureCounts[geomType] == undefined)
                captureCounts[geomType] = 1;
            else
                captureCounts[geomType] = captureCounts[geomType] + 1;

            captureCounts["Sum"] = captureCounts["Sum"] + 1;
        }

        return captureCounts;
    },

    checkMaxGeometries: function () {
        if ((GIPP.CONFIG.maxGeometries == undefined || GIPP.CONFIG.maxGeometries == 0) && (GIPP.CONFIG.maxGeometriesPoint == undefined || GIPP.CONFIG.maxGeometriesPoint == 0) && (GIPP.CONFIG.maxGeometriesLine == undefined || GIPP.CONFIG.maxGeometriesLine == 0) && (GIPP.CONFIG.maxGeometriesPolygon == undefined || GIPP.CONFIG.maxGeometriesPolygon == 0))
            return true;
        var captureCounts = this.getCaptureCounts();

        if (GIPP.CONFIG.maxGeometries != undefined && GIPP.CONFIG.maxGeometries != 0)
            if (captureCounts["Sum"] > GIPP.CONFIG.maxGeometries)
                return false;

        if (GIPP.CONFIG.maxGeometriesPoint != undefined && GIPP.CONFIG.maxGeometriesPoint != 0)
            if (captureCounts["Point"] > GIPP.CONFIG.maxGeometriesPoint)
                return false;

        if (GIPP.CONFIG.maxGeometriesLine != undefined && GIPP.CONFIG.maxGeometriesLine != 0)
            if (captureCounts["LineString"] > GIPP.CONFIG.maxGeometriesLine)
                return false;

        if (GIPP.CONFIG.maxGeometriesPolygon != undefined && GIPP.CONFIG.maxGeometriesPolygon != 0)
            if (captureCounts["Polygon"] > GIPP.CONFIG.maxGeometriesPolygon)
                return false;

        return true;
    },

    getMBR: function (frameFeatures) {
        var TLX = frameFeatures[0].getGeometry().getExtent()[0];
        var TLY = frameFeatures[0].getGeometry().getExtent()[1];
        var BRX = frameFeatures[0].getGeometry().getExtent()[0];
        var BRY = frameFeatures[0].getGeometry().getExtent()[1];

        frameFeatures.forEach(function (feature) {
            var flatGeom = feature.getGeometry().getCoordinates().flat().flat();
            var j = 1;

            for (var i = 0; i < 8; i += 2) {
                if (TLX > flatGeom[i])
                    TLX = flatGeom[i];
                else if (BRX < flatGeom[i])
                    BRX = flatGeom[i];

                if (TLY < flatGeom[j])
                    TLY = flatGeom[j];
                else if (BRY > flatGeom[j])
                    BRY = flatGeom[j];

                j += 2;
            }
        });

        return [TLX, BRY, BRX, TLY];
    },

    frameFeaturesArea: function (maxAreaAllowed,tolerance) {
        var t0 = performance.now();

        //get features
        var frameFeatures = frameSource.getFeatures();
        var frameFeaturesCount = frameFeatures.length;

        if (frameFeaturesCount == 0)
            return 0;

        //calculate grid dimennsion dx,dy
		var flatcoords = frameFeatures[0].getGeometry().getCoordinates().flat();
        var x1 = flatcoords[0][0];
        var y1 = flatcoords[0][1];
        var x2 = flatcoords[1][0];
        var y2 = flatcoords[1][1];
        var x3 = flatcoords[2][0];
        var y3 = flatcoords[3][1];

        var plotbox_H = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        var plotbox_W = Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));

        if (maxAreaAllowed >= frameFeaturesCount * plotbox_W * plotbox_H)
            return 0;

        if (tolerance == undefined) {
            if (frameFeaturesCount < 31)
                tolerance = [5, frameFeaturesCount / 2].sort()[1];
            else
                tolerance = 15;
        }

        var err = 1 - (tolerance / 200);

        dx = plotbox_W * tolerance / (400 * err);
        dy = plotbox_H * tolerance / (400 * err);
        d = [dy, dx].sort()[0];
        dd = d * d;
        d2 = d / 2;

        //calculate MBR
        var extent = this.getMBR(frameFeatures);

        var x = extent[0] + d2;
        var dA_count = 0;

        while (x < extent[2]) {
            var y = extent[1] + d2;

            while (y < extent[3]) {
                for (var i = 0; i < frameFeaturesCount; i++) {
                    if (frameFeatures[i].getGeometry().intersectsCoordinate([x, y])) {
                        dA_count++;
                        break;
                    }
                }
                y += d;
            }

            x += d;
        }

        var ffArea = dA_count * dd;

        var t1 = performance.now();

        console.log([ffArea, frameFeaturesCount, tolerance, (t1 - t0) / 1000]);
        return ffArea;
    },

	
    frameValidate: function () {
        var frameValidateMessage = "";
		
		if(frameCount>0)
		{
			if(frameSource.getFeatures()[0].getProperties().center == undefined)
				return frameValidateMessage;
			
			if(GIPP.CONFIG.maxMapSheet < frameCount)
				return decodeURI(GIL.TEXT.MaxPlotCountMessage).split("+").join(" ");
		}
		else
			return decodeURI(GIL.TEXT.NoPlotCountMessage).split("+").join(" ");
		
		
        if (!this.checkMaxGeometries()) {
            frameValidateMessage += GIL.TEXT.MaxGeometriesMessage;

            if (GIPP.CONFIG.maxGeometries != undefined && GIPP.CONFIG.maxGeometries != 0)
                frameValidateMessage = frameValidateMessage.replace("{T}", GIPP.CONFIG.maxGeometries);
            else
                frameValidateMessage = frameValidateMessage.replace(/ [^\s]+ - \{T\},*/, "");

            if (GIPP.CONFIG.maxGeometriesPoint != undefined && GIPP.CONFIG.maxGeometriesPoint != 0)
                frameValidateMessage = frameValidateMessage.replace("{P}", GIPP.CONFIG.maxGeometriesPoint);
            else
                frameValidateMessage = frameValidateMessage.replace(/ [^\s]+ - \{P\},*/, "");

            if (GIPP.CONFIG.maxGeometriesLine != undefined && GIPP.CONFIG.maxGeometriesLine != 0)
                frameValidateMessage = frameValidateMessage.replace("{L}", GIPP.CONFIG.maxGeometriesLine);
            else
                frameValidateMessage = frameValidateMessage.replace(/ [^\s]+ - \{L\},*/, "");

            if (GIPP.CONFIG.maxGeometriesPolygon != undefined && GIPP.CONFIG.maxGeometriesPolygon != 0)
                frameValidateMessage = frameValidateMessage.replace("{Y}", GIPP.CONFIG.maxGeometriesPolygon);
            else
                frameValidateMessage = frameValidateMessage.replace(/ [^\s]+ - \{Y\},*/, "");

            frameValidateMessage = frameValidateMessage.replace(/\,$/, "") + "\n";
        }

        if (!this.checkMaxDistance()) {
            frameValidateMessage += GIL.TEXT.MaxDistanceMessage.replace("{M}", GIPP.CONFIG.maxDistance) + "\n";
        }

        if (!this.checkOverlap())
            frameValidateMessage += GIL.TEXT.OverlapMessage + "\n";

        var maxallowedArea = GIPP.CONFIG.maxShapeSize;
        var frameArea = this.frameFeaturesArea(maxallowedArea);   
        if (frameArea > maxallowedArea) {
            if (GIL.TEXT.MaxAreaMessage == undefined)
                frameValidateMessage += "MaxAreaExceeded, current area: " + frameArea + "\n";
            else
                frameValidateMessage += GIL.TEXT.MaxAreaMessage.replace("{A}", Math.ceil(frameArea)).replace("{A_C}", Math.ceil(maxallowedArea)) + "\n";
        }


        return frameValidateMessage;
    }
}

var _baseSite= function () {
    var currentLocation = window.location;
    return currentLocation.protocol + "//" + currentLocation.hostname;
}

var mapOptions = null;
var map = null;

var captureSource = null;
var frameSource = null;
var frameCount = 0;

var allLayers = {};
var captureLayer = null;
var frameLayer = null;

var initialize = function (params,refresh = true, readonly=false) {
    captureSource = null;
    frameSource = null;
    frameCount = 0;
    allLayers = {};
    captureLayer = null;
    frameLayer = null;
    capture = null;
    selectCapture = null;
    selectFrames = null;
    translateCapture = null;
    modifyCapture = null;
    modifyFlag = false;
    addPoint = false;
    addLine = false;
    addPolyLine = false;
    addPolygon = false;
    toggleLegend = false;
    captureType = null;
    capturePointFeature= null;
    renderFlag = false;		
    faultyFeature = null;
    
    GIL.TEXT = params.MapText;
    
    if(refresh==true){
        mapOptions = params.MapOptions;
        GIPP.CONFIG = params.MapConfig;
        GIPP.CONFIG.gipmapServiceUrl = params.MapServicesUrl;
        
        GIPP.CONFIG.checkOverlap=Number(GIPP.CONFIG.checkOverlap);
        GIPP.CONFIG.mapLoadZoom=Number(GIPP.CONFIG.mapLoadZoom);
        GIPP.CONFIG.mapMinZoom=Number(GIPP.CONFIG.mapMinZoom);
        GIPP.CONFIG.maxDistance=Number(GIPP.CONFIG.maxDistance);
        GIPP.CONFIG.maxGeometries=Number(GIPP.CONFIG.maxGeometries);
        GIPP.CONFIG.maxGeometriesLine=Number(GIPP.CONFIG.maxGeometriesLine);
        GIPP.CONFIG.maxGeometriesPoint=Number(GIPP.CONFIG.maxGeometriesPoint);
        GIPP.CONFIG.maxGeometriesPolygon=Number(GIPP.CONFIG.maxGeometriesPolygon);
        GIPP.CONFIG.maxMapSheet=Number(GIPP.CONFIG.maxMapSheet);
        GIPP.CONFIG.maxShapeSize=Number(GIPP.CONFIG.maxShapeSize);
        
        $('#map').children().remove();
        $('#legend').children().remove();
        $('#legend').hide();
        
        if(GIPP.CONFIG.gipmapServiceUrl != undefined && !isEmpty(GIPP.CONFIG.gipmapServiceUrl)){
            url = GIPP.CONFIG.gipmapServiceUrl + 'geo/MapSource?role=' + mapOptions.role;
            $.ajax({
                type: "GET",
                url: url,
                headers: { "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('access_token')}` },
                dataType: "json",
                success: function (response) {
                    initializeSources(response, readonly);
                    renderSourcePanel(response);
                }
            });
        }
        else
            console.log("gipmapServiceUrl is not defined");
    }
};

var resetOptions = function (options) {
    $("#load").show();
    $("#map").hide();
    mapOptions = options;

    if (renderFlag) return;
    setRenderFlag();

    var geojson = new ol.format.GeoJSON;
    if (faultyFeature != null) {
        captureSource.removeFeature(faultyFeature);
        faultyFeature = 0;
    }
    var features = captureSource.getFeatures();
    var json = geojson.writeFeatures(features);

    framesReload(json);
};

var framesCount = function(){
    if(frameSource == null) return 0;

    var frameFeatures = frameSource.getFeatures();
    if(frameFeatures == null) return 0;

    return frameFeatures.length;
}

var isEmpty = function (str) {
    str = str.toString();
    
    if (!str) return true;
    return (str.length === 0 || !str.trim());
};

var initializeSources = function (sources, readonly) {
    // Initialize projection
    var digits = 2;
    var projectionInit = null;
    var centerTransform = null;
    if (GIPP.CONFIG.projectionInitName == null || GIPP.CONFIG.projectionInitName == '')
    {
        centerTransform = [mapOptions.x, mapOptions.y];
    }
    else
    {
        var projectionInitName = GIPP.CONFIG.projectionInitName;
        proj4.defs(projectionInitName, GIPP.CONFIG.projectionInitDef);
        projectionInit = ol.proj.get(projectionInitName);
        centerTransform = ol.proj.transform([mapOptions.x, mapOptions.y], GIPP.CONFIG.projectionInitName, GIPP.CONFIG.projectionDefault);
    }
    mapOptions.centerTransform = centerTransform;

    var mapBounds = null;
    if (!(isEmpty(GIPP.CONFIG.mapBoundminX) || isEmpty(GIPP.CONFIG.mapBoundminY) || isEmpty(GIPP.CONFIG.mapBoundmaxX) || isEmpty(GIPP.CONFIG.mapBoundmaxY)))
        mapBounds = [GIPP.CONFIG.mapBoundminX, GIPP.CONFIG.mapBoundminY, GIPP.CONFIG.mapBoundmaxX, GIPP.CONFIG.mapBoundmaxY];

    var mapMinZoom = GIPP.CONFIG.mapMinZoom;
    var mapLoadZoom = GIPP.CONFIG.mapLoadZoom;
    
    if(!readonly){
        //Open map ------EDIT
        if (mapBounds == null) {
            map = new ol.Map({
                layers: [],
                target: 'map',
                controls: ol.control.defaults().extend([
                    new ol.control.MousePosition({
                        projection: GIPP.CONFIG.projectionDefault,
                        coordinateFormat: function (coordinate) {
                            return ol.coordinate.format(coordinate, '{x}, {y}', digits);
                        }
                    }),
                    new ol.control.ZoomToExtent(),
                    new ol.control.Zoom(),
                    new ol.control.ZoomSlider()
                ]).extend([
                    new toggleVisibleLegendCommand(),
                    new placementPointCommand(),
                    new placementLineCommand(),
                    new placementPolyLineCommand(),
                    new placementPolygonCommand(),
                    new editCommand(),
                    new editSwitchCommand(),
                    new ol.control.ScaleLine({ minWidth: 120 })
                ]),
                view: new ol.View({
                    center: centerTransform,
                    zoom: mapLoadZoom
                })
            });
        }
        else {
            map = new ol.Map({
                layers: [],
                target: 'map',
                controls: ol.control.defaults().extend([
                    new ol.control.MousePosition({
                        projection: GIPP.CONFIG.projectionDefault,
                        coordinateFormat: function (coordinate) {
                            return ol.coordinate.format(coordinate, '{x}, {y}', digits);
                        }
                    }),
                    new ol.control.ZoomToExtent(),
                    new ol.control.Zoom(),
                    new ol.control.ZoomSlider()
                ]).extend([
                    new toggleVisibleLegendCommand(),
                    new placementPointCommand(),
                    new placementLineCommand(),
                    new placementPolyLineCommand(),
                    new placementPolygonCommand(),
                    new editCommand(),
                    new editSwitchCommand(),
                    new ol.control.ScaleLine({ minWidth: 120 })
                ]),
                view: new ol.View({
                    center: centerTransform,
                    zoom: mapLoadZoom,
                    minZoom: mapMinZoom,
                    extent: mapBounds
                })
            });
        }
        
    }
    else{
        //Open map ------READONLY
        if (mapBounds == null) {
            map = new ol.Map({
                layers: [],
                target: 'map',
                controls: ol.control.defaults().extend([
                    new ol.control.MousePosition({
                        projection: GIPP.CONFIG.projectionDefault,
                        coordinateFormat: function (coordinate) {
                            return ol.coordinate.format(coordinate, '{x}, {y}', digits);
                        }
                    }),
                    new ol.control.ZoomToExtent(),
                    new ol.control.Zoom(),
                    new ol.control.ZoomSlider()
                ]).extend([
                    new toggleVisibleLegendCommand(),
                    new ol.control.ScaleLine({ minWidth: 120 })
                ]),
                view: new ol.View({
                    center: centerTransform,
                    zoom: 17
                })
            });
        } else {
            map = new ol.Map({
                layers: [],
                target: 'map',
                controls: ol.control.defaults().extend([
                    new ol.control.MousePosition({
                        projection: GIPP.CONFIG.projectionDefault,
                        coordinateFormat: function (coordinate) {
                            return ol.coordinate.format(coordinate, '{x}, {y}', digits);
                        }
                    }),
                    new ol.control.ZoomToExtent(),
                    new ol.control.Zoom(),
                    new ol.control.ZoomSlider()
                ]).extend([
                    new toggleVisibleLegendCommand(),
                    new ol.control.ScaleLine({ minWidth: 120 })
                ]),
                view: new ol.View({
                    center: centerTransform,
                    zoom: mapLoadZoom,
                    minZoom: mapMinZoom,
                    extent: mapBounds
                })
            });
        }
    }
    
    
    // Prepare layers
    captureSource = new ol.source.Vector({ wrapX: false });

    captureLayer = new ol.layer.Vector({
        source: captureSource,
        zIndex: 90,
        visible: true
    });

    captureSource.on("addfeature", captureAfterChange);
    captureSource.on("changefeature", captureAfterChange);
    captureSource.on("removefeature", captureAfterChange);

    var geoJsonFormat = new ol.format.GeoJSON();
    frameSource = new ol.source.Vector({
        format: geoJsonFormat,
        zIndex: 100
    });

    frameLayer = new ol.layer.Vector({
        source: frameSource,
        visible: true
    });

    // Add layers
    if (sources != null)
        sources.forEach(function (source) {
            var tileSource = null;
            
            if (source.type == 'OSM') {
                tileSource = new ol.source.OSM({ url: '//a.tile.openstreetmap.org/{z}/{x}/{y}.png', crossOrigin: null })
                var osmLayer = new ol.layer.Tile({
                    source: tileSource,
                    visible: (source.flagshow == '1' ? true : false)
                });
                tileSource.on('tileloadend', function () {
                    $("#load").hide();
                });
                map.addLayer(osmLayer);
                allLayers[source.source] = osmLayer;
            }

            if (source.type == 'WMS') {
                var wmsLayer = null;
                if (source.crsid != null && source.crsid != GIPP.CONFIG.projectionDefault) {
                    var wmsSource = new ol.source.ImageWMS({
                        url: source.url,
                        params: { 'LAYERS': source.source, 'EXCEPTIONS': 'XML', 'CRS': source.crsid },
                        serverType: 'geoserver',
                        projection: ol.proj.get(source.crsid)
                    });

                    wmsLayer = new ol.layer.Image({
                        source: wmsSource,
                        visible: (source.flagshow == '1' ? true : false)
                    });

                    wmsSource.on('imageloadend', function () {
                        $("#load").hide();
                    });
                }
                else {
                    var wmsSource = new ol.source.ImageWMS({
                        url: source.url,
                        params: { 'LAYERS': source.source, 'EXCEPTIONS': 'XML' },
                        serverType: 'geoserver',
                    });

                    wmsLayer = new ol.layer.Image({
                        source: wmsSource,
                        visible: (source.flagshow == '1' ? true : false)
                    });
                    wmsSource.on('imageloadend', function () {
                        $("#load").hide();
                    });
                }

                map.addLayer(wmsLayer);
                allLayers[source.source] = wmsLayer;

                wmsLayer.getSource().updateParams({ 'UPDATESEQUENCE': (+new Date() / 1000) });
            }
        });

    map.addLayer(captureLayer);
    map.addLayer(frameLayer);

    map.on("click", mapClick);

    $("#gipmapp-command-edit-switch-element").addClass(function () {
        return "gipmapp-command-disabled";
    });

    $("#gipmapp-command-edit-switch").prop("disabled", true);
    $("#gipmapp-command-edit-switch").prop("title", GIL.TEXT.MapEditVerticesInact);

    $('.ol-scale-line').css('background', 'rgba(0,115,186,0.3)');
    $('.ol-scale-line-inner').css('font-size', '10px');
    $('.ol-scale-line-inner').css('font-family', 'sans-serif');
    $('.ol-scale-line-inner').css('border', '1px solid white');
    $('.ol-scale-line-inner').css('border-top', 'none');
    
    if(readonly) framesRead();
};

// data

var framesReload = function (request) {
    var url = GIPP.CONFIG.epServicesUrl;
    if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0)
        url = GIPP.CONFIG.epServicesUrl + '/api/plotboxcollection/calculate?crsid=' + GIPP.CONFIG.projectionDefault + '&pw=' + mapOptions.pageWidth + '&ph=' + mapOptions.pageHeight;
    else
        url = _baseSite() + GIPP.CONFIG.epServicesUrl + '/api/plotboxcollection/calculate?crsid=' + GIPP.CONFIG.projectionDefault + '&pw=' + mapOptions.pageWidth + '&ph=' + mapOptions.pageHeight;

    $.ajax({
        type: "POST",
        url: url,
        headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('access_token')}` },
        data: request,
        dataType: "json",
        success: function (response) {
            var geojson = new ol.format.GeoJSON;
            var features = geojson.readFeatures(response);
            frameCount = features.length;
            frameSource.clear(true);
            frameSource.addFeatures(features);
            $("#load").hide();
            $("#map").show();
        }
    });
};

var frames = function () {
    var collection = new ol.Collection();
    if(captureSource == null){
        return null;
    }
    captureSource.forEachFeature(function (feature) {
        feature.set("capture", 'true');
    });
    var captureFeatures = captureSource.getFeatures();
    var frameFeatures = frameSource.getFeatures();

    collection.extend(captureFeatures);
    collection.extend(frameFeatures);

    var geojson = new ol.format.GeoJSON;
    var json = geojson.writeFeatures(collection.getArray());
    
    return JSON.parse(json);
};

var framesRead = function (request) {
    
    if(GIPP.CONFIG.gipmapServiceUrl != undefined && !isEmpty(GIPP.CONFIG.gipmapServiceUrl)){
        url = GIPP.CONFIG.gipmapServiceUrl + 'geo/framedataread?requestid=' + mapOptions.parent_fid + '&crsid=' + GIPP.CONFIG.projectionDefault;
        
        if(GIPP.CONFIG.projectionDefault==undefined || GIPP.CONFIG.projectionDefault =='' || mapOptions.parent_fid ==undefined || mapOptions.parent_fid==null)
            return null;
        
        $.ajax({
            type: "POST",
            url: url,
            headers: { "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('access_token')}` },
            data: request,
            dataType: "json",
            success: function (response) {
                if (response == null) return;
                if (response.length == 0) return;

                var geojson = new ol.format.GeoJSON;
                var features = geojson.readFeatures(response);
                frameCount = features.length;
                frameSource.clear(true);
                frameSource.addFeatures(features);
            }
        });
    } 
};
// interactions

var capture = null;
var selectCapture = null;
var selectFrames = null;
var translateCapture = null;
var modifyCapture = null;

// ineraction modifiers
var modifyFlag = false;
var addPoint = false;
var addLine = false;
var addPolyLine = false;
var addPolygon = false;
var toggleLegend = false;
var captureType = null;
var capturePointFeature= null;

var renderFlag = false;

var toggleVisible = function (source) {
    var layer = allLayers[source];
    if (layer == null) return;

    var visibility = layer.getVisible();
    layer.setVisible(visibility ? false : true);
};

// controls
var renderSourcePanel = function (sources) {
    if (sources == null) return;
    
    sources.forEach(function (source) {
        var html = "<div>" +
            "<input type='checkbox' id='viewVisible" + source.source_id + "' " + (source.flagshow == '1' ? "checked='checked'" : "") + ">" +
            "<span class='ig-label-span'>" + source.descript + "</span>" +
            "</div>";
        $("#legend").append(html);
        $(document).on("change", "#viewVisible" + source.source_id, function () {
            toggleVisible(source.source);
        });
    });
    //$("#load").hide();
};

var clearSwitchHandler= function () {
    //$("#legend").hide();
    if (selectCapture == null) return null;
    if (modifyCapture == null && translateCapture == null) return null;
    if (modifyFlag) {
        map.removeInteraction(modifyCapture);
        modifyCapture = null;

        translateCapture = new ol.interaction.Translate({
            features: selectCapture.getFeatures()
        });
        map.addInteraction(translateCapture);
        translateCapture.on("translateend", captureBeforeChange);

        $("#gipmapp-command-edit-switch-element").removeClass(function () {
            return "gipmapp-command-active";
        });
        modifyFlag = false;
    }
};

var clearInteraction= function () {
    clearSwitchHandler();

    if (capture != null) map.removeInteraction(capture);
    if (selectCapture != null) map.removeInteraction(selectCapture);
    if (modifyCapture != null) map.removeInteraction(modifyCapture);
    if (translateCapture != null) map.removeInteraction(translateCapture);
    if (selectFrames != null) map.removeInteraction(selectFrames);

    capture = null;
    selectCapture = null;
    modifyCapture = null;
    translateCapture = null;
    selectFrames = null;

    $("#gipmapp-command-polygon-element").removeClass(function () {
        return "gipmapp-command-active";
    });

    $("#gipmapp-command-legend-element").removeClass(function () {
        return "gipmapp-command-active";
    });

    $("#gipmapp-command-point-element").removeClass(function () {
        return "gipmapp-command-active";
    });

    $("#gipmapp-command-polyline-element").removeClass(function () {
        return "gipmapp-command-active";
    });

    $("#gipmapp-command-line-element").removeClass(function () {
        return "gipmapp-command-active";
    });

    $("#gipmapp-command-edit-switch-element").addClass(function () {
        return "gipmapp-command-disabled";
    });
    $("#gipmapp-command-edit-switch").prop("disabled", true);
    $("#gipmapp-command-edit-switch").prop("title", GIL.TEXT.MapEditVerticesInact);
};

var addCapture= function (type) {
    if (type !== 'None') {
        capture = new ol.interaction.Draw({
            source: captureSource,
            type: type
        });
        map.addInteraction(capture);
        capture.on("drawstart ", captureStartNewFeature);
        capture.on("drawend", captureBeforeNewFeature);          
    }
};

// events
var renderInterval = null;
var clearRenderFlag= function () {
    renderFlag = false;
    if(renderInterval != null) {
        clearInterval(renderInterval);
        renderInterval = null;
    }
};

var setRenderFlag= function () {
    renderFlag = true;
    if(renderInterval == null) {
        renderInterval = setInterval(clearRenderFlag, 500);
    }
};

var mapClick= function (event) {
    if ((captureType == 'Line' || captureType == 'Point') && capture != null)
        if (capture.a.length > 2)
            capture.finishDrawing();
};

var captureStartNewFeature= function (event) {

};

var faultyFeature = null;

var captureBeforeNewFeature= function (event) {
    if (captureType == 'Point' && capture != null)
        capturePointFeature = event.feature;

    if (captureType == 'Line' && capture != null) {
        var geometry = event.feature.getGeometry();
        var startCoord = geometry.getFirstCoordinate();
        var endCoord = geometry.getLastCoordinate();

        if (startCoord[0] == endCoord[0] && startCoord[1] == endCoord[1])
            faultyFeature = event.feature;
    }

    event.feature.set("scale", mapOptions.scale);
    event.feature.set("overlapHorizontalMM", mapOptions.pageOverlap);
    event.feature.set("overlapVerticalMM", mapOptions.pageOverlap);
};

var captureBeforeChange= function (event) {

};

var captureAfterChange= function (event) {
    if (renderFlag) return;
    setRenderFlag();

    var geojson = new ol.format.GeoJSON;
    if (faultyFeature != null) {
        captureSource.removeFeature(faultyFeature);
        faultyFeature = 0;
    }
    var features = captureSource.getFeatures();
    var json = geojson.writeFeatures(features);

    framesReload(json);
};

var deleteFeature= function (event) {
    if (event.keyCode == 46 && translateCapture != null && selectCapture != null) { //delete key pressed
        map.removeInteraction(translateCapture);
        var features = selectCapture.getFeatures().getArray();
        for (var i = 0; i < features.length && i < 10; i++) {
            captureSource.removeFeature(features[i]);
        }
        selectCapture.getFeatures().clear();
    }
}

document.addEventListener('keydown', deleteFeature, false);

var toggleVisibleLegendCommand = /*@__PURE__*/(function () {
	function toggleVisibleLegendCommand(opt_options) {
		var options = opt_options || {};
		var title = GIL.TEXT.MapOpenLegend;
		var styleid = "gipmapp-command-legend"

		var button = document.createElement('button');
		button.id = styleid;
		button.title = title;

		var element = document.createElement('div');
		element.id = styleid + "-element";
		element.className = styleid + ' ol-selectable ol-control';
		element.appendChild(button);

		ol.control.Control.call(this, {
		  element: element,
		  target: options.target
		});

		button.addEventListener('click', this.toggleVisibleLegendHandler.bind(this), false);
	}

	if ( ol.control.Control ) toggleVisibleLegendCommand.__proto__ = ol.control.Control;
	toggleVisibleLegendCommand.prototype = Object.create( ol.control.Control && ol.control.Control.prototype );
	toggleVisibleLegendCommand.prototype.constructor = toggleVisibleLegendCommand;

	toggleVisibleLegendCommand.prototype.toggleVisibleLegendHandler = function toggleVisibleLegendHandler() {
        $("#legend").toggle();
        clearInteraction();
        if (toggleLegend) {
            $("#gipmapp-command-legend-element").removeClass(function () {
                return "gipmapp-command-active";
            });
            $("#gipmapp-command-legend").blur();
            toggleLegend = false;
        }
        else {
            $("#gipmapp-command-legend-element").addClass(function () {
                return "gipmapp-command-active";
            });
            toggleLegend = true;
            addPoint = false;
            addLine = false;
            addPolyLine = false;
            addPolygon = false;
        }
    }

  return toggleVisibleLegendCommand;
}());

var placementPointCommand = /*@__PURE__*/(function () {
	function placementPointCommand(opt_options) {
		var options = opt_options || {};
		var title = GIL.TEXT.MapPlacePoint;
		var styleid = "gipmapp-command-point"

		var button = document.createElement('button');
		button.id = styleid;
		button.title = title;

		var element = document.createElement('div');
		element.id = styleid + "-element";
		element.className = styleid + ' ol-selectable ol-control';
		element.appendChild(button);

		ol.control.Control.call(this, {
		  element: element,
		  target: options.target
		});

		button.addEventListener('click', this.placementPointHandler.bind(this), false);
	}

	if ( ol.control.Control ) placementPointCommand.__proto__ = ol.control.Control;
	placementPointCommand.prototype = Object.create( ol.control.Control && ol.control.Control.prototype );
	placementPointCommand.prototype.constructor = placementPointCommand;

	placementPointCommand.prototype.placementPointHandler = function placementPointHandler() {
		clearInteraction();
        $("#legend").hide();
        if (addPoint) {
            $("#gipmapp-command-point-element").removeClass(function () {
                return "gipmapp-command-active";
            });
            $("#gipmapp-command-point").blur();
            addPoint = false;
        }
        else {
            $("#gipmapp-command-point-element").addClass(function () {
                return "gipmapp-command-active";
            });
            captureType = 'Point';
            addCapture('Point');
            addPoint = true;
            addLine = false;
            addPolyLine = false;
            addPolygon = false;
            toggleLegend = false;
        }
    }

  return placementPointCommand;
}());

var placementLineCommand = /*@__PURE__*/(function () {
	function placementLineCommand(opt_options) {
		var options = opt_options || {};
		var title = GIL.TEXT.MapPlaceLine;
		var styleid = "gipmapp-command-line"

		var button = document.createElement('button');
		button.id = styleid;
		button.title = title;

		var element = document.createElement('div');
		element.id = styleid + "-element";
		element.className = styleid + ' ol-selectable ol-control';
		element.appendChild(button);

		ol.control.Control.call(this, {
		  element: element,
		  target: options.target
		});

		button.addEventListener('click', this.placementLineHandler.bind(this), false);
	}

	if ( ol.control.Control ) placementLineCommand.__proto__ = ol.control.Control;
	placementLineCommand.prototype = Object.create( ol.control.Control && ol.control.Control.prototype );
	placementLineCommand.prototype.constructor = placementLineCommand;

	placementLineCommand.prototype.placementLineHandler = function placementLineHandler() {
		clearInteraction();
        $("#legend").hide();
        if (addLine) {
            $("#gipmapp-command-line-element").removeClass(function () {
                return "gipmapp-command-active";
            });
            $("#gipmapp-command-line").blur();
            addLine = false;
        }
        else {
            $("#gipmapp-command-line-element").addClass(function () {
                return "gipmapp-command-active";
            });
            captureType = 'Line';
            addCapture('LineString');
            addLine = true;
            addPoint = false;
            addPolyLine = false;
            addPolygon = false;
            toggleLegend = false;
        }
    }

  return placementLineCommand;
}());

var placementPolyLineCommand = /*@__PURE__*/(function () {
	function placementPolyLineCommand(opt_options) {
		var options = opt_options || {};
		var title = GIL.TEXT.MapPlacePolyline;
		var styleid = "gipmapp-command-polyline"

		var button = document.createElement('button');
		button.id = styleid;
		button.title = title;

		var element = document.createElement('div');
		element.id = styleid + "-element";
		element.className = styleid + ' ol-selectable ol-control';
		element.appendChild(button);

		ol.control.Control.call(this, {
		  element: element,
		  target: options.target
		});

		button.addEventListener('click', this.placementPolyLineHandler.bind(this), false);
	}

	if ( ol.control.Control ) placementPolyLineCommand.__proto__ = ol.control.Control;
	placementPolyLineCommand.prototype = Object.create( ol.control.Control && ol.control.Control.prototype );
	placementPolyLineCommand.prototype.constructor = placementPolyLineCommand;

	placementPolyLineCommand.prototype.placementPolyLineHandler = function placementPolyLineHandler() {
		clearInteraction();
        $("#legend").hide();
        if (addPolyLine) {
            $("#gipmapp-command-polyline-element").removeClass(function () {
                return "gipmapp-command-active";
            });
            $("#gipmapp-command-polyline").blur();
            addPolyLine = false;
        }
        else {
            $("#gipmapp-command-polyline-element").addClass(function () {
                return "gipmapp-command-active";
            });
            captureType = 'LineString';
            addCapture('LineString');
            addPolyLine = true;
            addPoint = false;
            addLine = false;
            addPolygon = false;
            toggleLegend = false;
        }
    }

  return placementPolyLineCommand;
}());

var placementPolygonCommand = /*@__PURE__*/(function () {
	function placementPolygonCommand(opt_options) {
		var options = opt_options || {};
		var title = GIL.TEXT.MapPlacePolygon;
		var styleid = "gipmapp-command-polygon"

		var button = document.createElement('button');
		button.id = styleid;
		button.title = title;

		var element = document.createElement('div');
		element.id = styleid + "-element";
		element.className = styleid + ' ol-selectable ol-control';
		element.appendChild(button);

		ol.control.Control.call(this, {
		  element: element,
		  target: options.target
		});

		button.addEventListener('click', this.placementPolygonHandler.bind(this), false);
	}

	if ( ol.control.Control ) placementPolygonCommand.__proto__ = ol.control.Control;
	placementPolygonCommand.prototype = Object.create( ol.control.Control && ol.control.Control.prototype );
	placementPolygonCommand.prototype.constructor = placementPolygonCommand;

	placementPolygonCommand.prototype.placementPolygonHandler = function placementPolygonHandler() {
		clearInteraction();
        $("#legend").hide();
        if (addPolygon) {
            $("#gipmapp-command-polygon-element").removeClass(function () {
                return "gipmapp-command-active";
            });
            $("#gipmapp-command-polygon").blur();
            addPolygon = false;
        }
        else {
            $("#gipmapp-command-polygon-element").addClass(function () {
                return "gipmapp-command-active";
            });
            captureType = 'Polygon';
            addCapture('Polygon');
            addPolygon = true;
            addPoint = false;
            addLine = false;
            addPolyLine = false;
            toggleLegend = false;
        }
    }

  return placementPolygonCommand;
}());
	
var editCommand = /*@__PURE__*/(function () {
	function editCommand(opt_options) {
		var options = opt_options || {};
		var title = GIL.TEXT.MapEditMode;
		var styleid = "gipmapp-command-edit"

		var button = document.createElement('button');
		button.id = styleid;
		button.title = title;

		var element = document.createElement('div');
		element.id = styleid + "-element";
		element.className = styleid + ' ol-selectable ol-control';
		element.appendChild(button);

		ol.control.Control.call(this, {
		  element: element,
		  target: options.target
		});

		button.addEventListener('click', this.editHandler.bind(this), false);
	}

	if ( ol.control.Control ) editCommand.__proto__ = ol.control.Control;
	editCommand.prototype = Object.create( ol.control.Control && ol.control.Control.prototype );
	editCommand.prototype.constructor = editCommand;

	editCommand.prototype.editHandler = function editHandler() {
		clearInteraction();
        $("#legend").hide();
				   
        selectCapture = new ol.interaction.Select({
            layers: [captureLayer]
            //style: selectedStyle
        });
        map.addInteraction(selectCapture);
        selectCapture.on('select', function (event) {
            if (modifyCapture != null) map.removeInteraction(modifyCapture);
            if (translateCapture != null) map.removeInteraction(translateCapture);
            if (modifyFlag) {
                modifyCapture = new ol.interaction.Modify({
                    features: selectCapture.getFeatures()
                });
                map.addInteraction(modifyCapture);
                modifyCapture.on("modifyend", captureBeforeChange);
            }
            else {
                translateCapture = new ol.interaction.Translate({
                    features: selectCapture.getFeatures()
                });
                $("#gipmapp-command-edit-switch-element").removeClass(function () {
                    return "gipmapp-command-disabled";
                });

                $("#gipmapp-command-edit-switch").prop("disabled", false);
                $("#gipmapp-command-edit-switch").prop("title", GIL.TEXT.MapEditVertices);
                addPoint = false;
                addLine = false;
                addPolyLine = false;
                addPolygon = false;
                toggleLegend = false;
                map.addInteraction(translateCapture);
                translateCapture.on("translateend", captureBeforeChange);
            }
        });
    }

  return editCommand;
}());

var editSwitchCommand = /*@__PURE__*/(function () {
	function editSwitchCommand(opt_options) {
		var options = opt_options || {};
		var title = GIL.TEXT.MapEditVertices;
		var styleid = "gipmapp-command-edit-switch"

		var button = document.createElement('button');
		button.id = styleid;
		button.title = title;

		var element = document.createElement('div');
		element.id = styleid + "-element";
		element.className = styleid + ' ol-selectable ol-control';
		element.appendChild(button);

		ol.control.Control.call(this, {
		  element: element,
		  target: options.target
		});

		button.addEventListener('click', this.editSwitchHandler.bind(this), false);
	}

	if ( ol.control.Control ) editSwitchCommand.__proto__ = ol.control.Control;
	editSwitchCommand.prototype = Object.create( ol.control.Control && ol.control.Control.prototype );
	editSwitchCommand.prototype.constructor = editSwitchCommand;

	editSwitchCommand.prototype.editSwitchHandler = function editSwitchHandler() {
		$("#legend").hide();
        if (selectCapture == null) return null;
        if (modifyCapture == null && translateCapture == null) return null;

        if (modifyFlag) {
            map.removeInteraction(modifyCapture);
            modifyCapture = null;

            translateCapture = new ol.interaction.Translate({
                features: selectCapture.getFeatures()
            });
            map.addInteraction(translateCapture);
            translateCapture.on("translateend", captureBeforeChange);

            $("#gipmapp-command-edit-switch-element").removeClass(function () {
                return "gipmapp-command-active";
            });
            modifyFlag = false;
        }
        else {
            map.removeInteraction(translateCapture);
            translateCapture = null;

            modifyCapture = new ol.interaction.Modify({
                features: selectCapture.getFeatures()
            });
            map.addInteraction(modifyCapture);
            modifyCapture.on("modifyend", captureBeforeChange);

            $("#gipmapp-command-edit-switch-element").addClass(function () {
                return "gipmapp-command-active";
            });

            modifyFlag = true;
        }
    }

  return editSwitchCommand;
}());



