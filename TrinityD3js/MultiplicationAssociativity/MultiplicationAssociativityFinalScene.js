

window.MultiplicationAssociativityFinalScene = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
       console.log("MultiplicationAssociativityFinalScene function called");
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

function calculateMultiplicationCoordinatePointsLower(numbers,start,end) {
    const points = [];
    const length = numbers.length;

    // Initialize the product to 1 (neutral element for multiplication)
    let product = start;
    let y = end;

    points.push([start, end]);

    for (let i = 0; i < length; i++) {
        // Calculate the coordinates for the current point
       product *= numbers[i];
         y -= end / length;

        const x = product;
        // Update the product for the next iteration
    
        // Push the point into the array
        points.push([x, y]);

 
    }

    return points;
}

// compute the position with a split that end on a particular y
function calculateMultiplicationCoordinatePointsUpper(numbers,start,endstep) {
    const points = [];
    const length = numbers.length;

    // Initialize the product to 1 (neutral element for multiplication)
    let product = start;
    let y = 1;

    points.push([start, y]);

    for (let i = 0; i < length; i++) {
        // Calculate the coordinates for the current point
       product *= numbers[i];
         y -= 1 / (length*endstep);

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
let brace_stroke_width = 4;
if (window.innerWidth < 600) {
        brace_stroke_width = 3;
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

    const delayShift = 1000; // delay for ex and its brace
    const durationshift = 3000; // duration for ex and its brace

    const delayShiftBack = delayShift + durationshift  + 4000; // delay for ex and its brace
    const durationShiftBack = 1500; // duration for ex and its brace

    const delayShiftAgain = delayShiftBack + durationShiftBack + 2000 ;
    const durationShiftAgain = durationshift ; // not used

    const totalDuration = delayShiftAgain + durationShiftAgain + 1000 ;


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
    const endPoint = axes.c2p(4, 0);
    const topPoint = axes.c2p(1, 1);


// mobile adjustment
    let shiftVectorInf = [-0.4, 0];
    let zeroMobileShift = 0 ;
    let espaceMobileShift = 0 ;
    let markerSize = 12
    let ratio_mobile = 1;
    //console.log("display width of current screen" , window.innerWidth)
     if (window.innerWidth < 600) {
        markerSize = 8 ;
         shiftVectorInf = [-0.6, 0];
         zeroMobileShift = -0.05 ;
         espaceMobileShift = -8 ;
         ratio_mobile = 0.8;
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


function calculateArcParameters(startDrawPoint, endDrawPoint, endAngleAdj=3.3) {
    // Calculate the midpoint
    const midX = (startDrawPoint[0] + endDrawPoint[0]) / 2;
    const midY = (startDrawPoint[1] + endDrawPoint[1]) / 2;

    // Calculate the distance between points
    const dx = endDrawPoint[0] - startDrawPoint[0];
    const dy = endDrawPoint[1] - startDrawPoint[1];
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Calculate the radius
    const radius = dist/ (2 * Math.sin(Math.PI / 6));

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
        angle + Math.PI + Math.PI / 3,
        startDrawPoint
    );

    return {
        adjustedControlX,
        adjustedControlY,
        radius,
        startAngle: angle + Math.PI + Math.PI / 3,
        endAngle: angle + Math.PI + Math.PI / 3 + Math.PI / endAngleAdj,
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
        .attr("x1", startPoint[0])
        .attr("y1", startPoint[1])
        .attr("x2", endPoint[0])
        .attr("y2", endPoint[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 2);

    const dx = endPoint[0] - topPoint[0];
    const dy = endPoint[1] - topPoint[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = dist / (2 * Math.sin(Math.PI / 6));
    const midX = (topPoint[0] + endPoint[0]) / 2;
    const midY = (topPoint[1] + endPoint[1]) / 2;
    const angle = Math.atan2(dy, dx);
    const initialControlX = midX - radius * Math.sin(angle) + 20;
    const initialControlY = midY + radius * Math.cos(angle) - 23;
    const targetPoint = axes.c2p(1, 1);

    const targetMiddlePoint = axes.c2p(2, 0.5);

    const { adjustedControlX, adjustedControlY } = getControlPointAdjustment(initialControlX, initialControlY, radius, angle + Math.PI + Math.PI / 3, targetPoint);




// Multiplication list e* (e'*e'')
const numbers = [1.8, 4/1.8];

//Coordinate of points spread in 1/N xaxis including the start point
const points = calculateMultiplicationCoordinatePoints(numbers);


// Get true coordinates through the axes
let newPoints = transformPoints(points,axes);



// Multiplication list e * e' * e''
const numbersSplit = [1.8, 1.8, 4/(1.8*1.8)];

//Coordinate of points spread in 1/N xaxis including the start point
const pointsSplit = calculateMultiplicationCoordinatePoints(numbersSplit);


const pointsSplitRightIni = calculateMultiplicationCoordinatePointsLower(numbersSplit.slice(1),numbersSplit[0],1/2);

const pointsSplitRightFinal = calculateMultiplicationCoordinatePointsLower(numbersSplit.slice(1),numbersSplit[0],2/3);



// Get true coordinates through the axes
let newPointsSplit = transformPoints(pointsSplit,axes);

// Get true coordinates through the axes - for the code
let newPointsRightLeft = transformPoints(pointsSplit,axes);

// Get true coordinates through the axes
let newPointsSplitRightIni = transformPoints(pointsSplitRightIni,axes);


// Multiplication list (e * e') * e''
const numbersSplitCommutedProduct = [1.8*1.8, 4/(1.8*1.8)];

//Coordinate of points spread in 1/N xaxis including the start point
const pointsSplitCommutedProduct = calculateMultiplicationCoordinatePoints(numbersSplitCommutedProduct);
// Get true coordinates through the axes
let newPointsSplitCommutedProduct  = transformPoints(pointsSplitCommutedProduct,axes);



// Multiplication list e * e' * e''
const numbersSplitUpper = [1.8, 1.8];

//Coordinate of points spread in 1/N xaxis including the start point
const pointsSplitUpper = calculateMultiplicationCoordinatePointsUpper(numbersSplitUpper,1,2);

// Get true coordinates through the axes
let newPointsSplitUpper  = transformPoints(pointsSplitUpper,axes);






// Function to append circles to each point
function drawCircles(points) {
    points.forEach(point => {
        for (let i = 0; i < 1; i++) {
            svg.append("circle")
                .attr("cx", point[0] + (i * 10)) // Adjust x coordinate for each circle
                .attr("cy", point[1])
                .attr("r", 5)
                .attr("fill", "blue");
        }
    });
}

// Draw circles at each point in newPointsSplit
//drawCircles(newPointsSplit);
//drawCircles(newPointsSplitUpper);




// Define the arrow marker
svg.append("defs").append("marker")
    .attr("id", "arrow-left")
    .attr("viewBox", "0 0 20 20")
    .attr("refX", "10")
    .attr("refY", "10")
    .attr("markerWidth", markerSize*0.8)
    .attr("markerHeight", markerSize*0.8)
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M 0 0 L 20 10 L 0 20 z")
    .attr("fill", "yellow");



const arcParamsLeftInitial = calculateArcParameters(newPoints[0], newPoints[1]);
const arcParamsLeftFinal = calculateArcParameters(newPointsSplit[0], newPointsSplit[1]);



// First, calculate the arc parameters for both the initial and final arcs
const arcParamsRightInitial = calculateArcParameters(newPoints[1], newPoints[2]);
const arcParamsRightFinal = calculateArcParameters(newPointsSplit[1], newPointsSplit[3]);


// the arc of e'
const arcParamsMiddleInitial = calculateArcParameters(newPointsSplitRightIni[0], newPointsSplitRightIni[1]);
const arcParamsMiddleFinal= calculateArcParameters(newPointsSplit[1], newPointsSplit[2], endAngleAdj=3.2);

// the arc of e''
const arcParamsSplitRightInitial = calculateArcParameters(newPointsSplitRightIni[1], newPointsSplitRightIni[2]);
const arcParamsSplitRightFinal= calculateArcParameters(newPointsSplit[2], newPointsSplit[3]);


// the arc of (e*e')
const arcParamsProductLeftInitial = calculateArcParameters(newPointsSplitCommutedProduct[0], newPointsSplit[2]);
const arcParamsProductLeftFinal = calculateArcParameters(newPointsSplitCommutedProduct[0], newPointsSplitCommutedProduct[1], endAngleAdj=3.15);



// the arc of e becoming (e*e')
const arcParamsUpperSplitLeftInitial = calculateArcParameters(newPointsSplit[0], newPointsSplit[1]);
const arcParamsUpperSplitLeftFinal = calculateArcParameters(newPointsSplitUpper[0], newPointsSplitUpper[1]);



// the arc of e' becoming (e*e')
const arcParamsUpperSplitMiddleInitial = calculateArcParameters(newPointsSplit[1], newPointsSplit[2], endAngleAdj=3.2);
const arcParamsUpperSplitMiddleFinal= calculateArcParameters(newPointsSplitUpper[1], newPointsSplitUpper[2]);



// the arc of e'' becoming the final
const arcParamsCommutedRightInitial = calculateArcParameters(newPointsSplit[2], newPointsSplit[3]);
const arcParamsCommutedRightFinal= calculateArcParameters(newPointsSplitCommutedProduct[1], newPointsSplitCommutedProduct[2]);





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






// Final e left


// Append the initial path to the SVG for the left arc
const transitioningPathLeft = svg.append("path")
    .attr("d", generateArcPath(arcParamsUpperSplitLeftInitial, newPoints[0]))
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow-left)")
    .style("opacity", 1); // Set initial opacity to 1

// Calculate initial and final label positions for the left arc
let r_right = -65*ratio_mobile;

// Calculate initial and final label positions for the left arc
const r_left = -40*ratio_mobile; // You can adjust this value as needed
let r_left_shifted = r_left;

const labelPositionLeftInitial = calculateLabelPosition(newPoints[0], newPoints[1], r_left);
const labelPositionLeftFinal = calculateLabelPosition(newPointsSplit[0], newPointsSplit[1], r_left);



const labelPositionUpperLeftInitial = calculateLabelPosition(newPointsSplit[0], newPointsSplit[1], r_left);
const labelPositionUpperLeftFinal = calculateLabelPosition(newPointsSplitUpper[0], newPointsSplitUpper[1], r_left);



// Add the label to the SVG for the left arc
const transitioningLabelLeft = svg.append("text")
.attr("class", "label-time-e-pi")
    .attr("x", labelPositionUpperLeftInitial[0])
    .attr("y", labelPositionUpperLeftInitial[1])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", fontSize)
    .attr("fill", "grey")
    .text("e")
    .style("opacity", 1);








// Calculate initial and final label positions
const labelPositionRightInitial = calculateLabelPosition(newPoints[1], newPoints[2], r_right);
const labelPositionRightFinal = calculateLabelPosition(newPointsSplit[1], newPointsSplit[3], r_right);







// Label e'


// Define the arrow marker for the middle arc
const arrowMiddle = svg.append("defs").append("marker")
    .attr("id", "arrow-middle")
    .attr("viewBox", "0 0 20 20")
    .attr("refX", "10")
    .attr("refY", "10")
    .attr("markerWidth", markerSize*0.8)
    .attr("markerHeight", markerSize*0.8)
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M 0 0 L 20 10 L 0 20 z")
    .attr("fill", "yellow")
    .style("opacity", 1);

// Create the initial path for the middle arc
const curvePathMiddle = d3.path();
const timexMiddle = svg.append("path")
    .attr("class", "timex-middle")
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow-middle)")
    .attr("d", generateArcPath(arcParamsMiddleFinal, newPointsSplit[1]))
    .style("opacity", 1);

// Add the label for the middle arc
const r_middle = -50 * ratio_mobile; // Adjust as needed
const labelPositionMiddleInitial = calculateLabelPosition(newPointsSplitRightIni[0], newPointsSplitRightIni[1], r_middle);


// change that
const labelPositionMiddleFinal = calculateLabelPosition(newPointsSplit[1], newPointsSplit[2], r_middle);

// the arc of e' becoming (e*e')
const labelPositionUpperMiddleInitial = calculateLabelPosition(newPointsSplit[1], newPointsSplit[2], r_middle);



const labelMiddle = svg.append("text")
    .attr("class", "label-time-e-pi")
    .attr("x", labelPositionMiddleFinal[0])
    .attr("y", labelPositionMiddleFinal[1])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", fontSize)
    .attr("fill", "grey")
    .text("e'")
    .style("opacity", 1);










// e'' Right


// Define the arrow marker for the split right arc
const arrowSplitRight = svg.append("defs").append("marker")
    .attr("id", "arrow-split-right")
    .attr("viewBox", "0 0 20 20")
    .attr("refX", "10")
    .attr("refY", "10")
    .attr("markerWidth", markerSize*0.8)
    .attr("markerHeight", markerSize*0.8)
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M 0 0 L 20 10 L 0 20 z")
    .attr("fill", "yellow")
    .style("opacity", 1);

// Create the initial path for the split right arc
const curvePathSplitRight = d3.path();





const timexSplitRight = svg.append("path")
    .attr("class", "timex-split-right")
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow-split-right)")
    .attr("d", generateArcPath(arcParamsCommutedRightInitial, newPointsSplit[2]))
    

    .style("opacity", 1);

// Add the label for the split right arc
const r_split_right = -50 * ratio_mobile; // Adjust as needed


const labelPositionSplitRightInitial = calculateLabelPosition(newPointsSplitRightIni[1], newPointsSplitRightIni[2], r_split_right);
const labelPositionSplitRightFinal = calculateLabelPosition(newPointsSplit[2], newPointsSplit[3], r_split_right);

const labelPositionCommutedRightInitial = calculateLabelPosition(newPointsSplit[2], newPointsSplit[3], r_split_right);
const labelPositionCommutedRightFinal = calculateLabelPosition(newPointsSplitCommutedProduct[1], newPointsSplitCommutedProduct[2], r_split_right);



const labelSplitRight = svg.append("text")
    .attr("class", "label-time-e-pi")
    .attr("x", labelPositionSplitRightFinal[0])
    .attr("y", labelPositionSplitRightFinal[1])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", fontSize)
    .attr("fill", "grey")
    .text("e''")
    .style("opacity", 1);



const multiplier_bottom = svg.append("text")
    .attr("class", "label-time-e-pi")
    .attr("x", calculateLabelPosition(labelPositionSplitRightFinal,labelPositionMiddleFinal,-6)[0])
    .attr("y", calculateLabelPosition(labelPositionSplitRightFinal,labelPositionMiddleFinal,-6)[1])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", fontSize)
    .attr("fill", "grey")
    .text("*")
    .style("opacity", 1);



const multiplier_upper = svg.append("text")
    .attr("class", "label-time-e-pi")
    .attr("x", calculateLabelPosition(labelPositionMiddleFinal,labelPositionUpperLeftInitial,-6)[0])
    .attr("y", calculateLabelPosition(labelPositionMiddleFinal,labelPositionUpperLeftInitial,-6)[1])
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("font-size", fontSize)
    .attr("fill", "grey")
    .text("*")
    .style("opacity", 1);








  




// Reverse the transition after a delay
//setTimeout(() => {
//    performTransitionCommutedProduct(true);
//   // performTransition(false);
//}, delayShiftBack); // 2000 milliseconds (2 seconds) delay before reversing


// Reverse the transition after a delay
//setTimeout(() => {
//    performTransition(true);
//}, delayShiftAgain); // 2000 milliseconds (2 seconds) delay before reversing





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
        .attr("x", axes.c2p(4 + 0.01, -0.00)[0])
        .attr("y", axes.c2p(4 + 0.01, -0.00)[1])
        .attr("width", 5)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("transform", `translate(-5, -10)`);

    fatherDot.raise(); // Ensure father-dot stays on top


};
