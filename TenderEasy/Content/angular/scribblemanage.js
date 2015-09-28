/**
 * Created by nirjh on 9/25/2015.
 */

//disable all the UI controls like pen tool and other stuff.
var HideMapControls = function(myMap)
{
    myMap.ui.styleControl(scribblemaps.ControlType.SEARCH,{"display":"none"});
    myMap.ui.styleControl(scribblemaps.ControlType.SEARCH,{"display":"none"});
    myMap.ui.styleControl(scribblemaps.ControlType.FILL_COLOR,{"display":"none"});
    myMap.ui.styleControl(scribblemaps.ControlType.LINE_COLOR,{"display":"none"});
    myMap.ui.styleControl(scribblemaps.ControlType.LINE_SETTINGS,{"display":"none"});
    myMap.ui.styleControl(scribblemaps.ControlType.MAP_TYPE,{"display":"none"});
    myMap.ui.setAvailableTools(['drag']);
    myMap.map.setType('terrain');

}

//Hide the no result found div in html. -Only for demo purposes.
var HideResults = function()
{
    $('#mapHolder').hide();
    $('#tableHolder').hide();
    $('#NoResultsFound').hide();
}
//Show the result div in html. -Only for demo purposes.
var ShowResults = function()
{
    $('#mapHolder').show();
    $('#tableHolder').show();
}


//When an overlay is clicked, showing a custom panel in the UI.
var LoadMyMap = function(myMap)
{
    myMap.map.addListener(scribblemaps.MapEvent.OVERLAY_CLICK,function(event){
        var overlay = event.data;
        var cords = overlay.getCoords();
        var div = document.createElement("div");
        div.style.width = "250px";
        div.style.height = "100px"
        div.style.paddingTop = "10px";
        div.innerHTML = cords;

        myMap.ui.showCustomPanel(div);
    });

}
function get_random_color()
{
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

//PlotRoutes function plots all the coordinates from the location manager lat long data. Clicking on each option will
//render the route in the map.
var PlotRoutes = function(PathRoute,myMap)
{
    //label style for labels
    var labelStyle ={
        lineColor: '#4B6A7B',
        lineOpacity: 1,
        fillColor: '#76A6C2',
        fillOpacity: 1,
        cornerRadius: 5,
        contentPadding: 5
    };
    myMap.draw.label([23.811013,88.411805], PathRoute.pathStr, labelStyle, true);

    if (PathRoute != null)
    {
        myMap.view.setCenter([23.811013,90.411805]);
        myMap.view.setZoom(7);
        myMap.draw.setStyle({ fillColor: get_random_color() });
        var routeDetails = PathRoute.pathDetails;
        for (var j=0; j<routeDetails.length; j++)
        {
            var source = $.grep(locationList, function(e){ return e.name == routeDetails[j].source });
            var dest = $.grep(locationList, function(e){ return e.name == routeDetails[j].dest });
            myMap.draw.line([source[0].loc, dest[0].loc]);
            //myMap.draw.label(source[0].loc, source[0].name, null, true);
            myMap.draw.image(source[0].loc,imageMarkerStyle);
            myMap.draw.mediaMarker(source[0].loc);
            if (j == routeDetails.length-1)
            {
                myMap.draw.mediaMarker(dest[0].loc);
                myMap.draw.image(dest[0].loc,imageMarkerStyle);
                //myMap.draw.label(dest[0].loc, dest[0].name, null, true);
            }
        }
    }
}

//mediaMarker style
var imageMarkerStyle ={
    rotation: 0,
    markerImg: "http://icons.iconarchive.com/icons/artdesigner/webtoys/64/Truck-icon.png",
    markerScale: 0.005,
    markerAnchor: {x: 1, y: 1},
    markerSize: {x: 0.05, y: 0.05}
}
//Plotting all maps.
//This might get a little messy/
var PlotAllRoutes = function(PathRoute,myMap)
{
    for (var i = 0; i < PathRoute.length; i++) {

        myMap.draw.setStyle({ fillColor: get_random_color() });
        var routeDetails = PathRoute[i].pathDetails;
        for (var j=0; j<routeDetails.length; j++)
        {
            var source = $.grep(locationList, function(e){ return e.name == routeDetails[j].source });
            var dest = $.grep(locationList, function(e){ return e.name == routeDetails[j].dest });
            myMap.draw.line([source[0].loc, dest[0].loc]);
            myMap.draw.label(source[0].loc, source[0].name, null, true);
            if (j == routeDetails.length-1)
            {
                myMap.draw.label(dest[0].loc, dest[0].name, null, true);
            }
        }
        //myMap.draw.image(locationList[i].loc,);

        //myMap.draw.label(locationList[i].loc, locationList[i].name, null, true);
        //if (i <locationList.length-1)
        //{
        //    myMap.draw.line([locationList[i].loc, locationList[i+1].loc], { lineColor: "#0000FF" });
        //}
        //myMap.draw.image(locationList[i].loc, {imgSrc:details.youTube});
    }
}



