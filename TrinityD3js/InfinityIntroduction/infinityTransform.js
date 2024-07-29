console.log("infinityTransform.js loaded");
window.infinityTransform = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("infinityTransform function called");
    svg.selectAll("*").remove();

    const defaultSetIsCanceled = () => false;
    const defaultGetIsCanceled = () => false;

    // Use provided functions or fall back to defaults
    setIsCanceled = setIsCanceled || defaultSetIsCanceled;
    getIsCanceled = getIsCanceled || defaultGetIsCanceled;

    setTimeout(() => setIsCanceled(false), 10); //setting back to false at start of animation
    
    // Get the width of the animation container
var containers = document.getElementsByClassName('content-block');

  if (containers.length > 0) {
var container = containers[0]; // Assuming you want the first element with this class

var style = window.getComputedStyle(container);
var maxContainerWidth = parseInt(style.width);
// Set the maximum width to the lesser of 800 or the container's width
var maxWidth = Math.min(800, maxContainerWidth);
let svgHeight =  500;

if (window.innerWidth < 600) {
        svgHeight =  400 ;
    }
// Update the SVG dimensions and viewBox
svg.attr("width", maxWidth)
  .attr("height", svgHeight) // Set this based on your aspect ratio needs
  .attr("viewBox", `0 0 ${maxWidth} ${svgHeight}`);
        svg.selectAll("*").remove();
    } else {
        console.error('No elements found with class "content-block".');
        svg.attr("width", 800)
  .attr("height", 500) // Set this based on your aspect ratio needs
  .attr("viewBox", `0 0 800 500`);
        svg.selectAll("*").remove();
    }

    const fontSize = "36px"; // Set the font size for all labels


    const delayStartGrid = 2000; 

    const durationShowGrid = 1000;

    const delayToFunction = 2000;

    const durationReviseLatex = 3000;

    const delayReviseEquation = delayStartGrid + durationShowGrid + 2000  ;


    const delayToAnimation = 2000;
    const delayStartAnimation = delayStartGrid + durationShowGrid + durationReviseLatex + delayToAnimation;

    const durationAnimation = 12000;


    const delayRemoveLabel = delayStartAnimation + durationAnimation + 2000;
    const durationRemoveLabel = 1500;

    const totalDuration = delayRemoveLabel + durationRemoveLabel + 500;


let animationReverseTimeoutId;
let removeEquationLabelTimeoutId;
let reviseTextTimeoutId;


    let shiftVectorInf = [-0.4, 0];
  let size_holy_spirit_arrow = 50 ;
      let height_axes = 5;
      let shiftVectorInfRight = [0, 0];
    let fontSizeInfinity = 62;

if (window.innerWidth < 600) {

        shiftVectorInf = [-0.6, 0];
        shiftVectorInfRight = [-0.3,0];
        size_holy_spirit_arrow = 30;
        height_axes = 7;
        fontSizeInfinity = 50;
    }

    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");
    const width = svgWidth * 1;
    const height = svgHeight * 1;

    const axes = {
        xRange: [-5, 5, 1],
        yRange: [-2, 2, 0.5],
        width: width,
        height: height,
        c2p: (x, y) => [width / 2 + (x * width / 7), height / 2 - (y * height / height_axes)]
    };


    // Function to convert from pixel coordinates to complex coordinates
    function p2c(x, y) {
        const svgCenter = axes.c2p(0, 0);
        return {
            re: (x - svgCenter[0]) / (axes.width / 7),
            im: -(y - svgCenter[1]) / (axes.height / height_axes)
        };
    }



    const startPoint = axes.c2p(0, 0);
    const endPoint = axes.c2p(Math.PI, 0);

    // Function to create curly brace
    function makeCurlyBrace(x1, y1, x2, y2, w, q, isTop = false) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        var len = Math.sqrt(dx * dx + dy * dy);
        dx = dx / len;
        dy = dy / len;

        var directionFactor = isTop ? -1 : 1;

        var qx1 = x1 + directionFactor * q * w * dy;
        var qy1 = y1 - directionFactor * q * w * dx;
        var qx2 = (x1 - 0.25 * len * dx) + directionFactor * (1 - q) * w * dy;
        var qy2 = (y1 - 0.25 * len * dy) - directionFactor * (1 - q) * w * dx;
        var tx1 = (x1 - 0.5 * len * dx) + directionFactor * w * dy;
        var ty1 = (y1 - 0.5 * len * dy) - directionFactor * w * dx;
        var qx3 = x2 + directionFactor * q * w * dy;
        var qy3 = y2 - directionFactor * q * w * dx;
        var qx4 = (x1 - 0.75 * len * dx) + directionFactor * (1 - q) * w * dy;
        var qy4 = (y1 - 0.75 * len * dy) - directionFactor * (1 - q) * w * dx;

        var smallUpwardPath = `l 0 ${directionFactor * 4}`; // add a longer tick in the middle of the bracket
        var smallFeetDownwardPath = `l 0 ${-directionFactor * 3}`; // add a longer tick in the middle of the bracket

        return (
            "M " + x1 + " " + y1 +
            smallFeetDownwardPath +
            "M " + x1 + " " + y1 +
            " Q " + qx1 + " " + qy1 + " " + qx2 + " " + qy2 +
            " T " + tx1 + " " + ty1 +
            smallFeetDownwardPath +
            " M " + x2 + " " + y2 +
            smallFeetDownwardPath +
            " Q " + qx3 + " " + qy3 + " " + qx4 + " " + qy4 +
            " T " + tx1 + " " + ty1 +
            smallUpwardPath 
        );
    }


/*
    // Add the yellow line
    const linex = svg.append("line")
        .attr("class", "linex")
        .attr("x1", startPoint[0])
        .attr("y1", startPoint[1])
        .attr("x2", endPoint[0])
        .attr("y2", endPoint[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 2);
*/


    // Add the father dot
    const fatherDot = svg.append("circle")
        .attr("class", "father-dot")
        .attr("cx", startPoint[0])
        .attr("cy", startPoint[1])
        .attr("r", 12)
        .attr("fill", "white")
        .style("opacity", 1);

/*
    // Add the rectangle
    const rectangle = svg.append("rect")
        .attr("class", "large-tick")
        .attr("x", axes.c2p(Math.PI + 0.01, -0.00)[0])
        .attr("y", axes.c2p(Math.PI + 0.01, -0.00)[1])
        .attr("width", 5)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("transform", `translate(-5, -10)`);
        */

    fatherDot.raise(); // Ensure father-dot stays on top


 function createGrid(svg, axes, Ngrid = 10, NlargeGrid = 10, largeGridSpacing = 4) {
    const grid = svg.append("g").attr("class", "grid");

    function createGridLines(range, className, strokeWidth, opacity) {
        // Vertical lines
        grid.selectAll(`.vertical-${className}`)
            .data(range)
            .enter().append("line")
            .attr("class", `vertical-${className}`)
            .attr("x1", d => axes.c2p(d, -Ngrid - NlargeGrid * largeGridSpacing)[0])
            .attr("y1", d => axes.c2p(d, -Ngrid - NlargeGrid * largeGridSpacing)[1])
            .attr("x2", d => axes.c2p(d, Ngrid + NlargeGrid * largeGridSpacing)[0])
            .attr("y2", d => axes.c2p(d, Ngrid + NlargeGrid * largeGridSpacing)[1])
            .style("stroke", "lightblue")
            .style("stroke-width", strokeWidth)
            .style("opacity", opacity);

        // Horizontal lines
        grid.selectAll(`.horizontal-${className}`)
            .data(range)
            .enter().append("line")
            .attr("class", `horizontal-${className}`)
            .attr("x1", d => axes.c2p(-Ngrid - NlargeGrid * largeGridSpacing, d)[0])
            .attr("y1", d => axes.c2p(-Ngrid - NlargeGrid * largeGridSpacing, d)[1])
            .attr("x2", d => axes.c2p(Ngrid + NlargeGrid * largeGridSpacing, d)[0])
            .attr("y2", d => axes.c2p(Ngrid + NlargeGrid * largeGridSpacing, d)[1])
            .style("stroke", "lightblue")
            .style("stroke-width", strokeWidth)
            .style("opacity", opacity);
    }

    // Create tightly spaced grid near origin
    const tightRange = d3.range(-Ngrid, Ngrid + 1, 1);
    createGridLines(tightRange, "tight", 0.5, 1);

    // Create additional spaced out lines
    const largeRange = d3.range(1, NlargeGrid + 1)
        .flatMap(i => [-Ngrid - i * largeGridSpacing, Ngrid + i * largeGridSpacing]);
    createGridLines(largeRange, "large", 1, 1);

    return grid;
}


function compressPlan(z, t=1) {
    const r = Math.sqrt((z.re) ** 2 + (z.im) ** 2);
    const theta = Math.atan2(z.im, z.re);

    // Apply the compression transformation
    // Use arctangent to compress, but preserve direction
    const compressedR = 4 * Math.atan(r) / Math.PI;

    // Convert back to Cartesian coordinates
    const newX = compressedR * Math.cos(theta);
    const newY = compressedR * Math.sin(theta);

    // Interpolate between original and transformed coordinates
    const interpolatedX = z.re * (1 - t) + newX * t;
    const interpolatedY = z.im * (1 - t) + newY * t;

    return new Complex(interpolatedX, interpolatedY);
}

// Complex number class (if not already defined)
class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }
}



function createCompressedGrid(svg, axes, originalGrid, compressPlan) {
    const compressedGrid = svg.append("g").attr("class", "compressed-grid");



    originalGrid.selectAll("line").each(function() {
        const line = d3.select(this);
        const x1 = parseFloat(line.attr("x1"));
        const y1 = parseFloat(line.attr("y1"));
        const x2 = parseFloat(line.attr("x2"));
        const y2 = parseFloat(line.attr("y2"));

        const z1 = p2c(x1, y1);
        const z2 = p2c(x2, y2);

        // Create multiple points along the line
        const numPoints = 300; // Increase for smoother curves
        const points = [];
        for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            const x = z1.re * (1 - t) + z2.re * t;
            const y = z1.im * (1 - t) + z2.im * t;
            const compressedZ = compressPlan({re: x, im: y}, 1);
            const [px, py] = axes.c2p(compressedZ.re, compressedZ.im);
            points.push([px, py]);
        }

        // Create a line generator
        const lineGenerator = d3.line()
            .curve(d3.curveBasis); // This will make the line smooth

        // Append the path
        compressedGrid.append("path")
            .attr("d", lineGenerator(points))
            .style("fill", "none")
            .style("stroke", "lightblue")
            .style("stroke-width", 1)
            .style("opacity", 1);
    });

    return compressedGrid;
}


function createCompressedGridPaths(axes, originalGrid, compressPlan) {
    const paths = [];


    originalGrid.selectAll("line").each(function() {
        const line = d3.select(this);
        const x1 = parseFloat(line.attr("x1"));
        const y1 = parseFloat(line.attr("y1"));
        const x2 = parseFloat(line.attr("x2"));
        const y2 = parseFloat(line.attr("y2"));

        const z1 = p2c(x1, y1);
        const z2 = p2c(x2, y2);

        const numPoints = 300;
        const originalPoints = [];
        const compressedPoints = [];
        for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            const x = z1.re * (1 - t) + z2.re * t;
            const y = z1.im * (1 - t) + z2.im * t;
            originalPoints.push(axes.c2p(x, y));
            const compressedZ = compressPlan({re: x, im: y}, 1);
            compressedPoints.push(axes.c2p(compressedZ.re, compressedZ.im));
        }

        paths.push({original: originalPoints, compressed: compressedPoints});
    });

    return paths;
}

function createTransformGridFinal(svg, axes, originalGrid, compressPlan, duration = 8000) {
    const paths = createCompressedGridPaths(axes, originalGrid, compressPlan);
    const lineGenerator = d3.line().curve(d3.curveBasis);
    const transformedGrid = svg.append("g").attr("class", "transformed-grid");
    
    const pathElements = paths.map(path => {
        const pathElement = transformedGrid.append("path")
            .attr("d", lineGenerator(path.original))
            .style("fill", "none")
            .style("stroke", "lightblue")
            .style("stroke-width", 1)
            .style("opacity", 1);

        pathElement
        .style("opacity", 1)
        .attr("d",  lineGenerator(path.original.map((point, i) => {
                        
                            return [
                                path.compressed[i][0] ,
                                path.compressed[i][1]
                            ];
                        })));
           
        return pathElement;
    });
    return { transformedGrid, paths, pathElements };
}





function updateTransformGrid(transformedGrid, paths, pathElements, duration = 8000, reverse = false) {
    const lineGenerator = d3.line().curve(d3.curveBasis);

    paths.forEach((path, index) => {
        const pathElement = pathElements[index];

        pathElement
        .style("opacity", 1)
        .transition()
            .duration(duration)
            .attrTween("d", function() {
                return function(t) {
                    const interpolatedPoints = path.original.map((point, i) => {
                        if (reverse) {
                            return [
                                path.compressed[i][0] * (1 - t) + point[0] * t,
                                path.compressed[i][1] * (1 - t) + point[1] * t
                            ];
                        } else {
                            return [
                                point[0] * (1 - t) + path.compressed[i][0] * t,
                                point[1] * (1 - t) + path.compressed[i][1] * t
                            ];
                        }
                    });
                    return lineGenerator(interpolatedPoints);
                };
            });
    });

    return transformedGrid;
}


// The compressed grid will be displayed in red on top of the original grid
//compressedGrid.style("opacity", 1)
//    .style("stroke", "lightblue")
//    .style("stroke-width", 1);

// Make sure the compressed grid is on top
//compressedGrid.raise();
// The transformed grid will be displayed in red on top of the original grid

function drawDebugPoint(svg, x, y, color, radius = 5) {
    svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", radius)
        .attr("fill", color);
}


function transformGrid(svg, axes, originalGrid, compressPlan, duration = 8000) {
    const paths = createCompressedGridPaths(axes, originalGrid, compressPlan);
    const lineGenerator = d3.line().curve(d3.curveBasis);

    const transformedGrid = svg.append("g").attr("class", "transformed-grid");

    paths.forEach(path => {
        const pathElement = transformedGrid.append("path")
            .attr("d", lineGenerator(path.original))
            .style("fill", "none")
            .style("stroke", "lightblue")
            .style("stroke-width", 1)
            .style("opacity", 1);

        pathElement.transition()
            .duration(duration)
            .attrTween("d", function() {
                return function(t) {
                    const interpolatedPoints = path.original.map((point, i) => {
                        return [
                            point[0] * (1 - t) + path.compressed[i][0] * t,
                            point[1] * (1 - t) + path.compressed[i][1] * t
                        ];
                    });
                    return lineGenerator(interpolatedPoints);
                };
            });
    });

    return transformedGrid;
}


// Function to transform the circle
function updateTransformCircleReverse( circle, axes, compressPlan, duration = 8000, reverse = false) {
    const cx = parseFloat(circle.attr("cx"));
    const cy = parseFloat(circle.attr("cy"));
    const z = p2c(cx, cy);
    const compressedZ = compressPlan(z, 1);
    //const [compressedX, compressedY] = axes.c2p(compressedZ.re, compressedZ.im);
    const [compressedX, compressedY] = axes.c2p(2,0);
    const [originalX, originalY] = axes.c2p(51, 0);

    circle.transition()
        .duration(duration)
        .attrTween("cx", function() {
            return function(t) {
                if (reverse) {
                    return compressedX * (1 - t) + originalX * t;
                } else {
                    return cx * (1 - t) + compressedX * t;
                }
            };
        })
        .attrTween("cy", function() {
            return function(t) {
                if (reverse) {
                    return compressedY * (1 - t) + originalY * t;
                } else {
                    return cy * (1 - t) + compressedY * t;
                }
            };
        });
}


function updateLineReverse(line, transformedLine, duration = 8000, reverse = false) {
    const x1 = parseFloat(line.attr("x1"));
    const y1 = parseFloat(line.attr("y1"));
    const x2 = parseFloat(line.attr("x2"));
    const y2 = parseFloat(line.attr("y2"));
    const z1 = p2c(x1, y1);
    const z2 = p2c(x2, y2);
    const numPoints = 100;
    const originalPoints = [];
    const compressedPoints = [];
    
    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const x = z1.re * (1 - t) + z2.re * t;
        const y = z1.im * (1 - t) + z2.im * t;
        originalPoints.push(axes.c2p(x, y));
        const compressedZ = compressPlan({re: x, im: y}, 1);
        compressedPoints.push(axes.c2p(compressedZ.re, compressedZ.im));
    }
    
    const lineGenerator = d3.line().curve(d3.curveBasis);
    
    transformedLine
        .style("opacity", 1)
        .transition()
        .duration(duration)
        .attrTween("d", function() {
            return function(t) {
                const interpolatedPoints = originalPoints.map((point, i) => {
                    if (reverse) {
                        return [
                            compressedPoints[i][0] * (1 - t) + point[0] * t,
                            compressedPoints[i][1] * (1 - t) + point[1] * t
                        ];
                    } else {
                        return [
                            point[0] * (1 - t) + compressedPoints[i][0] * t,
                            point[1] * (1 - t) + compressedPoints[i][1] * t
                        ];
                    }
                });
                return lineGenerator(interpolatedPoints);
            };
        });

    // Show/hide the original line based on reverse
    line.style("opacity", 0);

    return transformedLine;
}



// Create the yellow line
const linej = svg.append("line")
    .attr("class", "liney")
    .attr("x1", axes.c2p(0, 1)[0])
    .attr("y1", axes.c2p(0, 1)[1])
    .attr("x2", axes.c2p(1, 1)[0])
    .attr("y2", axes.c2p(1, 1)[1])
    .attr("stroke", "yellow")
    .attr("stroke-width", 4)
    .style("opacity",0);


function generateFinalTransformedLine(svg, originalLine, axes, compressPlan) {
    const x1 = parseFloat(originalLine.attr("x1"));
    const y1 = parseFloat(originalLine.attr("y1"));
    const x2 = parseFloat(originalLine.attr("x2"));
    const y2 = parseFloat(originalLine.attr("y2"));

    const z1 = p2c(x1, y1);
    const z2 = p2c(x2, y2);

    const numPoints = 100;
    const compressedPoints = [];

    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const x = z1.re * (1 - t) + z2.re * t;
        const y = z1.im * (1 - t) + z2.im * t;
        const compressedZ = compressPlan({re: x, im: y}, 1);
        compressedPoints.push(axes.c2p(compressedZ.re, compressedZ.im));
    }

    const lineGenerator = d3.line().curve(d3.curveBasis);

    const finalTransformedLine = svg.append("path")
        .attr("d", lineGenerator(compressedPoints))
        .style("fill", "none")
        .style("stroke", "yellow")
        .style("stroke-width", 4);

    finalTransformedLine.raise();

    return finalTransformedLine;
}





// Function to transform the line
function transformLine(svg, line, axes, compressPlan, duration = 8000) {
    const x1 = parseFloat(line.attr("x1"));
    const y1 = parseFloat(line.attr("y1"));
    const x2 = parseFloat(line.attr("x2"));
    const y2 = parseFloat(line.attr("y2"));

    const z1 = p2c(x1, y1);
    const z2 = p2c(x2, y2);

    const numPoints = 100;
    const originalPoints = [];
    const compressedPoints = [];

    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const x = z1.re * (1 - t) + z2.re * t;
        const y = z1.im * (1 - t) + z2.im * t;
        originalPoints.push(axes.c2p(x, y));
        const compressedZ = compressPlan({re: x, im: y}, 1);
        compressedPoints.push(axes.c2p(compressedZ.re, compressedZ.im));
    }

    const lineGenerator = d3.line().curve(d3.curveBasis);

    const transformedLine = svg.append("path")
        .attr("d", lineGenerator(originalPoints))
        .style("fill", "none")
        .style("stroke", "yellow")
        .style("stroke-width", 4);
        transformedLine.raise();

    transformedLine.transition()
        .duration(duration)
        .attrTween("d", function() {
            return function(t) {
                const interpolatedPoints = originalPoints.map((point, i) => {
                    return [
                        point[0] * (1 - t) + compressedPoints[i][0] * t,
                        point[1] * (1 - t) + compressedPoints[i][1] * t
                    ];
                });
                return lineGenerator(interpolatedPoints);
            };
        });

    // Hide the original line
    line.transition()
        .duration(duration)
        .style("opacity", 0);


    return transformedLine;
}

    function createArrow(svg, x, y, angle, size, color) {
        // Convert angle from degrees to radians
        const rad = angle * Math.PI / 180;
        
        // Calculate end points of the two lines
        const x1 = x + size * Math.cos(rad + 7 * Math.PI / 8);
        const y1 = y + size * Math.sin(rad + 7 * Math.PI / 8);
        const x2 = x + size * Math.cos(rad - 7 * Math.PI / 8);
        const y2 = y + size * Math.sin(rad - 7 * Math.PI / 8);
        
        // Create the arrow using a path element
        const arrow = svg.append("path")
           .attr("d", `M${x1},${y1} L${x},${y} L${x2},${y2}`)
           .attr("stroke", color)
           .attr("stroke-width", 5)
           .attr("fill", "none")
           .style("opacity",0);

        return arrow;
    }


    arrowFinalX = 3.2;

    // Get the coordinates where you want to place the arrow
    const [arrowX, arrowY] = axes.c2p(arrowFinalX, 0);

    // Create the arrow
    const arrow = createArrow(svg, arrowX, arrowY, 0, size_holy_spirit_arrow, "yellow");


    // Function to make the arrow visible later
    function showArrow(duration = 0) {
    arrow.transition()
        .duration(duration)
        .style("opacity", 1);
    }


    // Add this line after svg.selectAll("*").remove();
                const grid = createGrid(svg, axes);

                // Make sure the original grid is visible
grid.style("stroke", "lightblue")
    .style("stroke-width", 1)
    .style("opacity", 1);

                // Make sure the grid is behind other elements
                grid.lower();



// Usage:
//const compressedGrid = createCompressedGrid(svg, axes, grid, compressPlan);


let { transformedGrid, paths, pathElements } = createTransformGridFinal(svg, axes, grid, compressPlan);





// Create the yellow circle
const infinityCircle = svg.append("circle")
    .attr("class", "rightmost-circle")
    .attr("cx", axes.c2p(2, 0)[0])
    .attr("cy", axes.c2p(2, 0)[1])
    .attr("r", 7)
    .attr("fill", "yellow")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .style("opacity",1);

    //infinityCircle.raise();




    const transformedLineJ = generateFinalTransformedLine(svg, linej, axes, compressPlan);
               
    fatherDot.raise();


 transformedGrid.raise();
  transformedLineJ.raise();
  fatherDot.raise();
arrow.raise();
// remove

    grid.transition()
        .delay(delayStartGrid)
        .duration(durationShowGrid)
        .style("opacity",0);



svg.append("text").attr("class", "sign-holy-spirit-transform");

    svg.selectAll(".sign-holy-spirit-transform")
        .attr("x", axes.c2p(2.5 + shiftVectorInf[0], 0.4)[0])
        .attr("y", axes.c2p(2.5 + shiftVectorInf[0], 0.4)[1])
        //.attr("x", axes.c2p(4 + shiftVectorInf[0], -0.6)[0])
        //.attr("y", axes.c2p(4 + shiftVectorInf[0], -0.6)[1])
        .attr("font-size", fontSizeInfinity)
        .attr("fill", "yellow")
        .text("+∞")
        .style("opacity", 1)
        ;
function updateHolySpirit(svg, axes, shiftVectorInf, duration = 8000, reverse = false) {
    const holySpirit = svg.select(".sign-holy-spirit-transform");
    const [startX, startY] = axes.c2p(2.5 + shiftVectorInf[0], 0.4);
    const [endX, endY] = axes.c2p(3 + shiftVectorInf[0] + shiftVectorInfRight[0], 0.4);
    const [circleStartX, circleStartY] = axes.c2p(2, 0);
    const [circleEndX, circleEndY] = axes.c2p(51, 0);

    let arrowShown = false; // Flag to ensure showArrow is called only once

    holySpirit.transition()
        .duration(duration)
        .attrTween("x", function() {
            return function(t) {
                if (reverse) {
                    return endX * (1 - t) + startX * t;
                } else {
                    const circleX = circleStartX * (1 - t) + circleEndX * t;
                    const newX = Math.min(circleX + (startX - circleStartX), endX);
                    
                    // Check if we've reached the end position and haven't shown the arrow yet
                    if (circleX >= axes.c2p(arrowFinalX, 0)[0] && !arrowShown) {
                        showArrow(duration=0);
                        arrowShown = true; // Set the flag to true
                    }
                    
                    return newX;
                }
            };
        })
        .attrTween("y", function() {
            return function(t) {
                if (reverse) {
                    return endY * (1 - t) + startY * t;
                } else {
                    const circleY = circleStartY * (1 - t) + circleEndY * t;
                    return Math.min(circleY + (startY - circleStartY), endY);
                }
            };
        });
}



/*
svg.append("text").attr("class", "sign-holy-spirit-intro-final");

    svg.selectAll(".sign-holy-spirit-intro-final")
        .attr("x", axes.c2p(3 + shiftVectorInf[0], 0.4)[0])
        .attr("y", axes.c2p(3 + shiftVectorInf[0], 0.4)[1])
        //.attr("x", axes.c2p(4 + shiftVectorInf[0], -0.6)[0])
        //.attr("y", axes.c2p(4 + shiftVectorInf[0], -0.6)[1])
        .attr("font-size", "62")
        .attr("fill", "yellow")
        .text("+∞")
        .style("opacity", 1)
        ;
*/





// Function to add LaTeX text
function addLatexTextInstant(svg) {
    // Create a group for the text and its background
    const textGroup = svg.append("g")
        .attr("class", "latex-text")
        .attr("transform", "translate(10, 10)")  // Position in top left, with some padding
        .style("opacity", 0);  // Start invisible


    // Add a foreignObject to render HTML content
    const fo = textGroup.append("foreignObject")
        .attr("width", 200)
        .attr("height", 50);

    // Add a div inside the foreignObject for the LaTeX content
    const div = fo.append("xhtml:div")
        .style("color", "lightblue")
        .style("font-size", "16px")
        .style("padding", "10px")
        .attr("id", "transform-equation-latex")
        .html("\\(r \\rightarrow \\arctan(r) \\cdot \\frac{4}{\\pi}\\)");

    // Ensure the text group is on top
    textGroup.raise();

    // Use MathJax to render the LaTeX
    MathJax.typesetPromise([div.node()]).then(() => {
        // Fade in the text group after rendering
        textGroup
            .style("opacity", 1);
    });
}

// Function to revise LaTeX text with fade-out and fade-in
function reviseLatexText() {
    const div = d3.select("#transform-equation-latex");

    // Fade out, change content, then fade back in
    div.transition()
        .duration(durationReviseLatex/2)
        .style("opacity", 0)
        .on("end", () => {
            div.html("\\(r \\rightarrow r\\)");

            // Use MathJax to re-render the LaTeX after updating the content
            MathJax.typesetPromise([div.node()]).then(() => {
                div.transition()
                    .duration(durationReviseLatex/2)
                    .style("opacity", 1);
            });
        });
}

        addLatexTextInstant(svg);





reviseTextTimeoutId = setTimeout(() => {
 reviseLatexText()
}, delayReviseEquation );



animationReverseTimeoutId = setTimeout(() => {
 updateTransformGrid(transformedGrid, paths, pathElements, durationAnimation, reverse = true);
 updateTransformCircleReverse( infinityCircle, axes, compressPlan,durationAnimation,reverse=true);
               
     updateLineReverse(linej,transformedLineJ,durationAnimation,reverse=true);
    transformedLineJ.raise();

        updateHolySpirit(svg, axes, shiftVectorInf, durationAnimation, reverse=false);

}, delayStartAnimation );


function removeLatexText(duration = 1000) {
    const textGroup = d3.select(".latex-text");
    
    if (!textGroup.empty()) {
        textGroup.transition()
            .duration(duration)
            .style("opacity", 0) ;

        setTimeout(() => {
            textGroup.remove()
        },duration);
    }


}




removeEquationLabelTimeoutId = setTimeout(() => {
    removeLatexText(durationRemoveLabel)
}, delayRemoveLabel );


        // Delay the animation start by 1 second
const timeoutId = setTimeout(() => {

                    if (callback && !getIsCanceled()) {
                        //console.log("calling")

                        callback();
                    } 
                }, totalDuration);


// Cancel the timeout in advance because the timer fails to read getIsCancled
const checkCancelLoop = setInterval(() => {
                if (getIsCanceled && getIsCanceled()) {
                    clearTimeout(timeoutId);
                    clearTimeout(animationReverseTimeoutId);
                    clearTimeout(removeEquationLabelTimeoutId);
                    clearTimeout(reviseTextTimeoutId);
                    clearInterval(checkCancelLoop);
                }

            }, 100);

};
