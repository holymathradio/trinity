console.log("InfinityIntro.js loaded");
window.infinityIntro = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("InfinityIntro function called");
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

    const delayToAnimation = delayToFunction + 5000;
    const delayStartAnimation = delayStartGrid + durationShowGrid +delayToAnimation;

    const durationAnimation = 8000;

    const delayLabelHolySpirit = delayStartAnimation + durationAnimation + 4000;

    const durationLabelHolySpirit = 2000 ;


    const totalDuration = delayLabelHolySpirit + durationLabelHolySpirit + 500;


let animationTimeoutId;
let animationGridTimeoutId;
let animationTransformCircleTimeoutId;
let updateTextTimeoutId;


    let shiftVectorInf = [-0.4, 0];

    let height_axes = 5;
    let fontSizeInfinity = 62;
if (window.innerWidth < 600) {

        shiftVectorInf = [-0.6, 0];
        height_axes = 7 ;
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


// Usage:
//const compressedGrid = createCompressedGrid(svg, axes, grid, compressPlan);



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


/*
// Debug: Transform point (1,0)
const originalPoint = axes.c2p(1, 0);
drawDebugPoint(svg, originalPoint[0], originalPoint[1], "blue");

// Convert to complex coordinates
const complexPoint = p2c(originalPoint[0], originalPoint[1]);

// Apply compression
const compressedComplexPoint = compressPlan(complexPoint, 1);

// Convert back to SVG coordinates
const compressedPoint = axes.c2p(compressedComplexPoint.re, compressedComplexPoint.im);
drawDebugPoint(svg, compressedPoint[0], compressedPoint[1], "yellow", radius=10);

console.log("Original point:", originalPoint);
console.log("Complex point:", complexPoint);
console.log("Compressed complex point:", compressedComplexPoint);
console.log("Compressed point:", compressedPoint);


*/


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

function createTransformGrid(svg, axes, originalGrid, compressPlan, duration = 8000) {
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
           
        return pathElement;
    });
    return { transformedGrid, paths, pathElements };
}



function updateTransformGrid(transformedGrid, paths, pathElements, duration = 8000) {
    const lineGenerator = d3.line().curve(d3.curveBasis);


    paths.forEach((path,index) => {

        const pathElement = pathElements[index];
        /*
        const pathElement = transformedGrid.append("path")
            .attr("d", lineGenerator(path.original))
            .style("fill", "none")
            .style("stroke", "lightblue")
            .style("stroke-width", 1)
            .style("opacity", 1);
            */

        pathElement
        .style("opacity", 1)
        .transition()
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






// Create the yellow line
const linej = svg.append("line")
    .attr("class", "liney")
    .attr("x1", axes.c2p(0, 1)[0])
    .attr("y1", axes.c2p(0, 1)[1])
    .attr("x2", axes.c2p(1, 1)[0])
    .attr("y2", axes.c2p(1, 1)[1])
    .attr("stroke", "yellow")
    .attr("stroke-width", 4);


function createTransformedLine(svg, line, axes, compressPlan) {
    const x1 = parseFloat(line.attr("x1"));
    const y1 = parseFloat(line.attr("y1"));
    const x2 = parseFloat(line.attr("x2"));
    const y2 = parseFloat(line.attr("y2"));

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

    const transformedLine = svg.append("path")
        .attr("d", lineGenerator(compressedPoints))
        .style("fill", "none")
        .style("stroke", "yellow")
        .style("stroke-width", 4)
        .style("opacity", 0);

    return transformedLine;
}

// Function to transform the circle
function updateTransformCircle(circle, axes, compressPlan, duration = 8000) {
    const cx = parseFloat(circle.attr("cx"));
    const cy = parseFloat(circle.attr("cy"));

    const z = p2c(cx, cy);
    const compressedZ = compressPlan(z, 1);
    //const [compressedX, compressedY] = axes.c2p(compressedZ.re, compressedZ.im);
    const [compressedX, compressedY] = axes.c2p(2,0);

    circle.transition()
        .duration(duration)
        .attrTween("cx", function() {
            return function(t) {
                return cx * (1 - t) + compressedX * t;
            };
        })
        .attrTween("cy", function() {
            return function(t) {
                return cy * (1 - t) + compressedY * t;
            };
        });
}



function updateLine(line, transformedLine, duration=8000) {
 
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

    const lineGenerator = d3.line()
            .curve(d3.curveBasis);

    transformedLine
        .style("opacity",1)
        .transition()
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

    return transformedLine

}


// Create the yellow circle
const infinityCircle = svg.append("circle")
    .attr("class", "rightmost-circle")
    .attr("cx", axes.c2p(51, 0)[0])
    .attr("cy", axes.c2p(51, 0)[1])
    .attr("r", 7)
    .attr("fill", "yellow")
    .attr("stroke", "black")
    .attr("stroke-width", 1);



// create objects

 // Create all objects at the beginning
    const grid = createGrid(svg, axes);
    grid.style("opacity", 0);



let { transformedGrid, paths, pathElements } = createTransformGrid(svg, axes, grid, compressPlan);

    //const transformedGrid = createTransformedGrid(svg, axes, grid, compressPlan);
    transformedGrid.style("opacity", 0);

    //const linej = createLine(svg, axes); creating 
    const transformedLineJ = createTransformedLine(svg, linej, axes, compressPlan);
    transformedLineJ.style("opacity", 0);



animationGridTimeoutId = setTimeout(() => {


                // Make sure the original grid is visible
grid.style("opacity", 0)
    .style("stroke", "lightblue")
    .style("stroke-width", 1)
    .transition()
    .delay(0)
    .duration(durationShowGrid)
    .style("opacity", 1);

                // Make sure the grid is behind other elements
                grid.lower();



// Usage:
animationTimeoutId = setTimeout(() => {
    transformedGrid.style("opacity", 1);
    updateTransformGrid(transformedGrid, paths, pathElements, durationAnimation);

     updateLine(linej,transformedLineJ,durationAnimation);
    transformedLineJ.raise();


    fatherDot.raise()
}, durationShowGrid + delayToAnimation);



    fatherDot.raise(); // Ensure father-dot stays on top
                }, delayStartGrid);




animationTransformCircleTimeoutId = setTimeout(() => {
                //updated
                updateTransformCircle( infinityCircle, axes, compressPlan,durationAnimation);
                    
                }, delayStartAnimation);




svg.append("text").attr("class", "sign-holy-spirit-intro");

//update
    svg.selectAll(".sign-holy-spirit-intro")
        .attr("x", axes.c2p(2.5 + shiftVectorInf[0], 0.4)[0])
        .attr("y", axes.c2p(2.5 + shiftVectorInf[0], 0.4)[1])
        //.attr("x", axes.c2p(4 + shiftVectorInf[0], -0.6)[0])
        //.attr("y", axes.c2p(4 + shiftVectorInf[0], -0.6)[1])
        .attr("font-size", fontSizeInfinity)
        .attr("fill", "yellow")
        .style("opacity", 0)
        .text("+∞")
        .transition()
        .delay(delayLabelHolySpirit)  // Delay before appearing
        .duration(durationLabelHolySpirit)
        .style("opacity", 1)
        ;



// Create a group for the text and its background
const textGroup = svg.append("g")
        .attr("class", "latex-text-intro")
        .attr("transform", "translate(10, 10)")  // Position in top left, with some padding
        .style("opacity", 0);  // Start invisible


// Function to add LaTeX text
function updateAddLatexText(svg) {

    //textGroup = svg.selectAll(".latex-text-intro")


    // Add a foreignObject to render HTML content
    const fo = textGroup.append("foreignObject")
        .attr("width", 200)
        .attr("height", 50);

    // Add a div inside the foreignObject for the LaTeX content
    const div = fo.append("xhtml:div")
        .style("color", "lightblue")
        .style("font-size", "16px")
        .style("padding", "10px")
        .html("\\(r \\rightarrow \\arctan(r) \\cdot \\frac{4}{\\pi}\\)");

    // Ensure the text group is on top
    textGroup.raise();

    // Use MathJax to render the LaTeX
    MathJax.typesetPromise([div.node()]).then(() => {
        // Fade in the text group after rendering
        textGroup.transition()
            .duration(1000)
            .style("opacity", 1);
    });
}


updateTextTimeoutId =    setTimeout(() => {

        updateAddLatexText(svg);
    }, delayStartGrid + durationShowGrid + delayToFunction);


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
                    clearTimeout(animationTimeoutId);
                    //if (animationgridTimeoutId) {clearTimeout(animationgridTimeoutId);}
                    clearTimeout(animationTransformCircleTimeoutId);
                    clearTimeout(updateTextTimeoutId);
                    
                    clearInterval(checkCancelLoop);
                }

            }, 100);

};
