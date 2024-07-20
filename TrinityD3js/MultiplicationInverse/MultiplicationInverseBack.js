console.log("MultiplicationInverseBack.js loaded");

window.MultiplicationInverseBack = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {


 
   svg.selectAll("*").remove();

        function getPerpendicularLineEquation(x1, y1, x2, y2, x) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const segmentSlope = (y2 - y1)/ (x2 - x1);
        const perpSlope = -1 / segmentSlope;
        const c = midY - perpSlope * midX;
        return x * perpSlope + c;
    }

    function getPerpendicularLineEquationScaled(x1, y1, x2, y2, x, xscale,yscale) {
        const midX = (x1/xscale + x2/xscale) / 2;
        const midY = (y1/yscale + y2/yscale) / 2;
        const segmentSlope = (y2/yscale - y1/yscale) / (x2/xscale - x1/xscale);
        const perpSlope = -1 / segmentSlope;
        const c = midY - perpSlope * midX;
        return yscale*((x/xscale) * perpSlope + c);
    }

function calculateMultiplicationCoordinatePoints(numbers) {
    const points = [];
    const length = numbers.length;

    // Initialize the product to 1 (neutral element for multiplication)
    let product = 1;
    let y = 1

    points.push([1, 1]);

    for (let i = 0; i < length; i++) {
        // Calculate the coordinates for the current point
       product *= numbers[i];
         y -= 1 / length;

        const x = product;
        // Update the product for the next iteration
    
        // Push the point into the array
        points.push([x, y]);

 
    }

    return points;
}



    const defaultSetIsCanceled = () => false;
    const defaultGetIsCanceled = () => false;

    // Use provided functions or fall back to defaults
    setIsCanceled = setIsCanceled || defaultSetIsCanceled;
    getIsCanceled = getIsCanceled || defaultGetIsCanceled;

    setTimeout(() => setIsCanceled(false), 10); //setting back to false at start of animation

    // Get the width of the animation container
var containers = document.getElementsByClassName('content-block');
let ratio_mobile = 1;
if (window.innerWidth < 600) {
        ratio_mobile =0.8 ;
    }


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



    const delayTime = 1000; // delay for ex and its brace
    const durationTime = 10000 // duration for ex and its brace


    const totalDuration = delayTime + durationTime + 500;

    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");
    const width = svgWidth * 1;
    const height = svgHeight * 1;

    const axes = {
        xRange: [-5, 5, 1],
        yRange: [-2, 2, 0.5],
        width: width,
        height: height,
        c2p: (x, y) => [width / 2 + (x * width / 10), height / 2 - (y * height / 2.8)]
    };

function transformPoints(points, axes) {
    return points.map(point => {
        if (Array.isArray(point) && point.length === 2) {
            return axes.c2p(point[0], point[1]);
        } else {
            console.warn('Invalid point:', point);
            return null;
        }
    }).filter(point => point !== null);
}

svg.append("circle").attr("class", "father-dot");
svg.append("line").attr("class", "linej");

    const startPoint = axes.c2p(0, 0);
    const endPoint = axes.c2p(1, 0);
    const topPoint = axes.c2p(1, 1);


// mobile adjustment
    let shiftVectorInf = [-0.4, 0];
    let zeroMobileShift = 0 ;
    let espaceMobileShift = 0 ;
    let markerSize = 12
    //console.log("display width of current screen" , window.innerWidth)
     if (window.innerWidth < 600) {
        markerSize = 8 ;
         shiftVectorInf = [-0.6, 0];
         zeroMobileShift = -0.05 ;
         espaceMobileShift = -8 ;
    }



    function computeArcStartPoint(controlX, controlY, radius, angle) {
        const startX = controlX + radius * Math.cos(angle);
        const startY = controlY + radius * Math.sin(angle);

        return { startX, startY };
    }

    function getControlPointAdjustment(initialControlX, initialControlY, radius, angle, targetPoint) {
        const { startX, startY } = computeArcStartPoint(initialControlX, initialControlY, radius, angle);
        const deltaX = targetPoint[0] - startX;
        const deltaY = targetPoint[1] - startY;
        const adjustedControlX = initialControlX + deltaX;
        const adjustedControlY = initialControlY + deltaY;
        return { adjustedControlX, adjustedControlY };
    }


function calculateArcParameters(startDrawPoint, endDrawPoint, adjusting_angle = 1.1,arcAngleRadians = Math.PI / 3) {
    // Calculate the midpoint
    const midX = (startDrawPoint[0] + endDrawPoint[0]) / 2;
    const midY = (startDrawPoint[1] + endDrawPoint[1]) / 2;
    
    // Calculate the distance between points
    const dx = endDrawPoint[0] - startDrawPoint[0];
    const dy = endDrawPoint[1] - startDrawPoint[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate the radius using the provided angle
    const radius = dist / (2 * Math.sin(arcAngleRadians / 2));
    
    // Calculate the angle
    const angle = Math.atan2(dy, dx);
    
    // Calculate initial control point
    const initialControlX = midX - radius * Math.sin(angle) + 20;
    const initialControlY = midY + radius * Math.cos(angle) - 23;
    
    // Adjust control point using getControlPointAdjustment
    const { adjustedControlX, adjustedControlY } = getControlPointAdjustment(
        initialControlX,
        initialControlY,
        radius,
        angle + Math.PI + arcAngleRadians,
        startDrawPoint
    );
    
    return {
        adjustedControlX,
        adjustedControlY,
        radius,
        startAngle: angle + Math.PI + arcAngleRadians,
        endAngle: angle + Math.PI + arcAngleRadians + arcAngleRadians /adjusting_angle,
        counterclockwise: false
    };
}


function createArc(startPoint, endPoint, angleHeight, arrowGap = 0) {
    // Calculate the midpoint
    const midX = (startPoint[0] + endPoint[0]) / 2;
    const midY = (startPoint[1] + endPoint[1]) / 2;

    // Calculate the distance between points
    const dx = endPoint[0] - startPoint[0];
    const dy = endPoint[1] - startPoint[1];
    const chord = Math.sqrt(dx * dx + dy * dy);

    // Calculate the height of the arc
    const arcHeight = chord * Math.sin(angleHeight / 2) / 2;

    // Calculate the radius
    const radius = arcHeight / (1 - Math.cos(angleHeight / 2));

    // Calculate the angle of the chord
    const angle = Math.atan2(dy, dx);

    // Calculate the control point
    const controlX = midX + Math.cos(angle + Math.PI/2) * radius;
    const controlY = midY + Math.sin(angle + Math.PI/2) * radius;

    // If arrowGap is provided, calculate the end point of the curve
    let curveEndX, curveEndY;
    if (arrowGap > 0) {
        const t = 1 - (arrowGap / chord);
        curveEndX = (1 - t) * (1 - t) * startPoint[0] + 2 * (1 - t) * t * controlX + t * t * endPoint[0];
        curveEndY = (1 - t) * (1 - t) * startPoint[1] + 2 * (1 - t) * t * controlY + t * t * endPoint[1];
    } else {
        curveEndX = endPoint[0];
        curveEndY = endPoint[1];
    }

    // Create the path string
    return `M${startPoint[0]},${startPoint[1]} Q${controlX},${controlY} ${curveEndX},${curveEndY}`;
}


function calculateArcParametersFlat(startDrawPoint, endDrawPoint, flatnessFactor = 1) {
    // Calculate the midpoint
    const midX = (startDrawPoint[0] + endDrawPoint[0]) / 2;
    const midY = (startDrawPoint[1] + endDrawPoint[1]) / 2;
    
    // Calculate the distance between points
    const dx = endDrawPoint[0] - startDrawPoint[0];
    const dy = endDrawPoint[1] - startDrawPoint[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate the radius, adjusted by flatnessFactor
    const radius = (dist / (2 * Math.sin(Math.PI / 6))) * flatnessFactor;
    
    // Calculate the angle
    const angle = Math.atan2(dy, dx);
    
    // Calculate initial control point, adjusted by flatnessFactor
    const initialControlX = midX - (radius * Math.sin(angle) + 20) / flatnessFactor;
    const initialControlY = midY + (radius * Math.cos(angle) - 23) / flatnessFactor;
    
    // Adjust control point using getControlPointAdjustment
    const { adjustedControlX, adjustedControlY } = getControlPointAdjustment(
        initialControlX,
        initialControlY,
        radius,
        angle + Math.PI + Math.PI / 3,
        startDrawPoint
    );
    
    // Adjust the end angle based on flatnessFactor
    const endAngleAdjustment = Math.PI / 3.3 / flatnessFactor;
    
    return {
        adjustedControlX,
        adjustedControlY,
        radius,
        startAngle: angle + Math.PI + Math.PI / 3,
        endAngle: angle + Math.PI + Math.PI / 3 + endAngleAdjustment,
        counterclockwise: false
    };
}


function calculateLabelPosition(startDrawPoint, endDrawPoint, r) {
    // Calculate midpoint
    const midX = (startDrawPoint[0] + endDrawPoint[0]) / 2;
    const midY = (startDrawPoint[1] + endDrawPoint[1]) / 2;

    // Calculate vector from start to end
    const dx = endDrawPoint[0] - startDrawPoint[0];
    const dy = endDrawPoint[1] - startDrawPoint[1];

    // Calculate perpendicular vector
    const perpDx = -dy;
    const perpDy = dx;

    // Normalize perpendicular vector
    const length = Math.sqrt(perpDx * perpDx + perpDy * perpDy);
    const normalizedPerpDx = perpDx / length;
    const normalizedPerpDy = perpDy / length;

    // Calculate label position
    const labelX = midX + normalizedPerpDx * r;
    const labelY = midY + normalizedPerpDy * r;

    return [labelX, labelY];
}

// Create a function to generate the path string
function generateArcPath(params, startPoint) {
    const path = d3.path();
    path.moveTo(startPoint[0], startPoint[1]);
    path.arc(
        params.adjustedControlX,
        params.adjustedControlY,
        params.radius,
        params.startAngle,
        params.endAngle,
        params.counterclockwise
    );
    return path.toString();
}

    const linej = svg.selectAll(".linej")
        .attr("x1", axes.c2p(0, 1)[0])
        .attr("y1", axes.c2p(0, 1)[1])
        .attr("x2", axes.c2p(1, 1)[0])
        .attr("y2", axes.c2p(1, 1)[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 5)
        .style("opacity", 1);




    const linex = svg.append("line")
        .attr("class", "linex")
        .attr("x1", endPoint[0])
        .attr("y1", endPoint[1])
        .attr("x2", endPoint[0])
        .attr("y2", endPoint[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 2);


// First, calculate the arc parameters for both the initial and final arcs
const arcParamsInverseRightInitial= calculateArcParameters(topPoint, endPoint);

// First, calculate the arc parameters for both the initial and final arcs
const arcParamsInverseLeft = calculateArcParameters(topPoint, endPoint);



axes.c2p(1, 0);

    // Define the arrow marker
svg.append("defs").append("marker")
    .attr("id", "arrow-inverse-right")
    .attr("viewBox", "0 0 20 20")
    .attr("refX", "10")
    .attr("refY", "10")
    .attr("markerWidth", markerSize )
    .attr("markerHeight", markerSize )
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M 0 0 L 20 10 L 0 20 z")
    .attr("fill", "yellow");

// Append the initial path to the SVG
const transitioningPathRight = svg.append("path")
    .attr("d", createArc(topPoint, axes.c2p(1+20,0 ),-Math.PI * 1.38*(1+1*0.5),arrowGap = 15)) //parameters from previous scene
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow-inverse-right)")
        .style("opacity", 1); // Set initial opacity to 1


    // Define the arrow marker
svg.append("defs").append("marker")
    .attr("id", "arrow-inverse-left")
    .attr("viewBox", "0 0 20 20")
    .attr("refX", "10")
    .attr("refY", "10")
    .attr("markerWidth", markerSize )
    .attr("markerHeight", markerSize )
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M 0 0 L 20 10 L 0 20 z")
    .attr("fill", "yellow");

// Append the initial path to the SVG
const transitioningPathLeft = svg.append("path")
    .attr("d", generateArcPath(calculateArcParameters(topPoint, axes.c2p(1/(1+20),0), adjusting_angle=1.09), topPoint))
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow-inverse-left)")
        .style("opacity", 1); // Set initial opacity to 1

        let duration = 2000 ;

        let forward = true ;

// Function to create a pair of rectangles
function createRectanglePair(svg, axes, x, name) {
    // Large rectangle
    svg.append("rect")
        .attr("class", "large-rect")
        .attr("x", axes.c2p(x, -0.00)[0])
        .attr("y", axes.c2p(x, -0.00)[1])
        .attr("width", 2)
        .attr("height", 20)
        .attr("fill", "grey")
        .attr("transform", `translate(0, -10)`)
        .style("opacity", 0)
        .attr("name", `${name}-large`);

    // Small rectangle
    svg.append("rect")
        .attr("class", "small-rect")
        .attr("x", axes.c2p(1/x, -0.00)[0])
        .attr("y", axes.c2p(1/x, -0.00)[1])
        .attr("width", 2)
        .attr("height", 20)
        .attr("fill", "grey")
        .attr("transform", `translate(0, -10)`)
        .style("opacity", 0)
        .attr("name", `${name}-small`);
}

function setOpacityForPair(svg, pairName, opacity) {
    // Select and set opacity for the large rectangle
    svg.select(`rect[name="${pairName}-large"]`)
       .style("opacity", opacity);

    // Select and set opacity for the small rectangle
    svg.select(`rect[name="${pairName}-small"]`)
       .style("opacity", opacity);
}

// Create rectangle pairs
createRectanglePair(svg, axes, 4, "pair4");
createRectanglePair(svg, axes, 3, "pair3");
createRectanglePair(svg, axes, 2, "pair2");

    transitioningPathRight.raise();
    transitioningPathLeft.raise();

/*
setOpacityForPair(svg, "pair1", 0.5);  // Set opacity of pair1 to 0.5
setOpacityForPair(svg, "pair2", 0.7);  // Set opacity of pair2 to 0.7
setOpacityForPair(svg, "pair3", 0.3);  // Set opacity of pair3 to 0.3
*/

    // Transition the path
    transitioningPathRight.transition()
        .delay(delayTime)
        .duration(durationTime)
        .attrTween("d", function() {
            return function(t) {

                x_right = 2+(1-t)*19;

                angle_right = -Math.PI * 1.38*(1+(1-t)*0.5)

                if (x_right ==2) {
                    setOpacityForPair(svg, "pair2", 1);
                    setOpacityForPair(svg, "pair3", 0.2);
                    setOpacityForPair(svg, "pair4", 0.2);
                } else if (x_right < 3) {
                    setOpacityForPair(svg, "pair3", 1);
                    setOpacityForPair(svg, "pair4", 0.2);
                } else if (x_right < 4) {
                    setOpacityForPair(svg, "pair4", 1);
                } else {}




                return createArc(topPoint, axes.c2p(x_right,0 ),angle_right,arrowGap = 15);
            };
        });



    // Transition the path
    transitioningPathLeft.transition()
        .delay(delayTime)
        .duration(durationTime)
        .attrTween("d", function() {
            return function(t) {
                
                x_right = 2+(1-t)*19;
                x_left = 1/x_right;


                // First, calculate the arc parameters for both the initial and final arcs
                const arcParamsInverseLeftCurrent = calculateArcParameters(topPoint, axes.c2p(x_left,0), adjusting_angle=1.09);

                return generateArcPath(arcParamsInverseLeftCurrent, topPoint);
            };
        });




    // Add the father dot
    const fatherDot = svg.append("circle")
        .attr("class", "father-dot")
        .attr("cx", startPoint[0])
        .attr("cy", startPoint[1])
        .attr("r", 12)
        .attr("fill", "white")
        .style("opacity", 1);

    // Add the rectangle
    const rectangle = svg.append("rect")
        .attr("class", "large-tick")
        .attr("x", axes.c2p(1 , -0.00)[0])
        .attr("y", axes.c2p(1, -0.00)[1])
        .attr("width", 5)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("transform", `translate(-2.5, -10)`)
        .style("opacity",1);

    fatherDot.raise(); // Ensure father-dot stays on top

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
                    clearTimeout(timeoutDrawRectanglesId);
                    clearInterval(checkCancelLoop);
                }

            }, 100);
};
