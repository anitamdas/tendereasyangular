//This mockupDemoData is a sample data of each route. Each route has a source, a destination. a cost and distance.

var mockupDemoData = [
    { id:1, source: "Dhaka", dest: "Sylhet", dist:51, cost: 100 },
    { id:2, source: "Dhaka", dest: "Pabna", dist:62, cost: 150 },
    { id:3, source: "Pabna", dest: "Sylhet", dist:57, cost: 110 },
    { id:4, source: "Pabna", dest: "Rajshahi", dist:54, cost: 1 },
    { id:5, source: "Sylhet", dest: "Chittagong", dist:51, cost: 1 },
    { id:6, source: "Sylhet", dest: "Rajshahi", dist:55, cost: 1 },
    { id:7, source: "Rajshahi", dest: "Bogura", dist:54, cost: 1 },
    { id:8, source: "Chittagong", dest: "Bogura", dist:53, cost: 1 }
];

var allPaths = [];

//Implementing Depth First Search to get all the paths from one place to another.
//GetAllPaths is a recursive function where the iteration is repeated until source and destination is not the same.
//Each time the source matches and the destionation doesnt, the call is recursively made using destination as source.

function GetAllPaths (source,dest,stack)
{
    if (source == dest && stack.length>0)
    {
        var eachRoute = new Object();
        var pathsTotal = AllRoutes.length;
        eachRoute.pathID = ++pathsTotal;
        eachRoute.pathStr = "";
        eachRoute.pathCost = 0;
        eachRoute.pathDist = 0;
        eachRoute.pathDetails = new Array();
        for (var k=0; k<stack.length;k++)
        {
            var result = $.grep(mockupDemoData, function(e){ return e.id == stack[k]; });
            if (result.length >0)
            {
                eachRoute.pathDetails.push(result[0]);
                eachRoute.pathStr += result[0].source+" - ";
                eachRoute.pathCost += result[0].cost;
                eachRoute.pathDist += result[0].dist;
                if (k == stack.length-1)
                {
                    eachRoute.pathStr += result[0].dest;
                }
            }
        }
        AllRoutes.push(eachRoute);
        return;
    }
    else if (source == dest && stack.length==0)
    {
        var eachRoute = new Object();
        eachRoute.pathStr = source +" - "+ dest;
        eachRoute.pathID = 1;
        eachRoute.pathCost = 0;
        eachRoute.pathDist = 0;
        eachRoute.pathDetails = new Array();
        AllRoutes.push(eachRoute);
    }
    for (var i=0; i <mockupDemoData.length; i++)
    {
        var _source = mockupDemoData[i].source;
        if (_source == source && (stack == undefined || stack.indexOf(mockupDemoData[i].id) <0) )
        {
            stack.push(mockupDemoData[i].id);
            GetAllPaths(mockupDemoData[i].dest,dest,stack);
            stack.pop();
        }
    }
}
//[[1,5,8],[1,6,7],[2,3,5,8],[2,3,6,7],[2,4,7]]
var AllRoutes = new Array();
//GetAllPaths('Dhaka','Bogura',stack);

//Sorting the Array of routes by distance
function SortByDistance(a, b){
    var x = a.pathDist;
    var y = b.pathDist;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}


//Sorting the Array of routes by cost
function SortByCost(a, b){
    var x = a.pathCost;
    var y = b.pathCost;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}


//Implementing Dijkstra's algorithm. There is a problem, it will only give you the shortest path. We need all the paths.

//for (var i=0; i <mockupDemoData.length; i++)
//{
//    var source = mockupDemoData[i].source;
//    var _nodes = {};
//    for (var j=0; j< mockupDemoData.length; j++)
//    {
//        var _source = mockupDemoData[j].source;
//        var _dest = mockupDemoData[j].dest;
//        var _cost = mockupDemoData[j].cost;
//
//        if (source == _source && source != _dest)
//        {
//            _nodes[_dest] = _cost;
//        }
//    }
//    allPlaces[source] = _nodes;
//}
//console.log(JSON.stringify(allPlaces));
//
//var map = allPlaces;
//var graph = new Graph(map);
//
//console.log(graph.findShortestPath('Dhaka', 'Rajshahi'));
// console.log(graph.findShortestPath('a', 'c'));
// console.log(graph.findShortestPath('b', 'a'));
// console.log(graph.findShortestPath('b', 'c', 'b'));
// console.log(graph.findShortestPath('c', 'a', 'b'));
// console.log(graph.findShortestPath('c', 'b', 'a'));