var main = require('../index');
var calc = main.calc;
var draw = main.draw;

var container = document.getElementById('mybox');

// Generate triangle coordinates to fit in a unit square
var coords = calc.generateCoords(60, 60, 60);
coords = calc.scaleCoords(coords);

// Draw the triangle plus a bounding box, and add it to the page
var svg = draw.createSvgContainer({width: '100%', height: '100%'});
var triangle = draw.constructPolygon(coords, {'stroke-width': .02});
var rect = draw.constructRect();
svg.appendChild(triangle);
svg.appendChild(rect);

container.appendChild(svg);