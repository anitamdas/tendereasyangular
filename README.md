--------------------------------
TenderEasy Assignment
--------------------------------
A simple project made entirely with AngularJS that shows route information from source to destination, plots the results
into map, also shows the result in a tabular form with each route detail.

Requirements:
* Webstorm/Brackets or any kind of HTML editor/IDE that can open up sites from the localhost.
* Internet connection

The entry point of the entire project would be index.html in Views/index.html. The project is a single page application.
Index.html is the actual content holder for the entire project. Using Angular with a little bit of jQuery, the project is
configured to load the other pages dynamically inside the index.html.

For searching the route I have implemented Depth First Search with some mock up data. After searching all the routes I
can sort them by distance or cost. The shortest path contains the sum of the pathcost and distance cost of all it's child routes. When the user will search for a route choosing the source and the destination, the shortest path will be plotted in the map. You can also see the results in a tabular form below. From there you can choose a specific route to plot it in the map.


