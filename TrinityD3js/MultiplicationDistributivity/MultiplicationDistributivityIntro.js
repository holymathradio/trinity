console.log("MultiplicationDistributivityIntro.js loaded");
window.MultiplicationDistributivityIntro = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("MultiplicationDistributivityIntro function called");
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
    const durationTime = 1000; // duration for ex and its brace

    const delayLabel = delayTime + durationTime + 2000 ;
    const durationLabel = 1000;



    const totalDuration = delayLabel + durationLabel + 500;

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


function calculateArcParameters(startDrawPoint, endDrawPoint) {
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
        endAngle: angle + Math.PI + Math.PI / 3 + Math.PI / 3.3,
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




// Multiplication list
const numbers = [1.8, 4/1.8];

//Coordinate of points spread in 1/N xaxis including the start point
const points = calculateMultiplicationCoordinatePoints(numbers);
//console.log(points);


// Get true coordinates through the axes
let newPoints = transformPoints(points,axes);



        /*
        .style("opacity", 0)
        .transition()
        .delay(delayLabel)
        .duration(durationLabel)
        .style("opacity", 1);
        */






    svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 0 20 20")
        .attr("refX", "10")
        .attr("refY", "10")
        .attr("markerWidth", markerSize)
        .attr("markerHeight", markerSize)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 20 10 L 0 20 z")
        .attr("fill", "yellow")
        .style("opacity", 0)
        .transition()
        .delay(delayTime)
        .duration(1000)
        .style("opacity", 1);


    const curvePath = d3.path();
    curvePath.moveTo(topPoint[0], topPoint[1]);

    svg.append("path")
        .attr("class", "timex")
        .attr("fill", "none")
        .attr("stroke", "yellow")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)")
        .attr("d", curvePath.toString());

    const timex = svg.select(".timex");

    for (let x = 0; x <= Math.PI / 3.141; x += 0.01) {
        setTimeout(() => {
            const newPath = d3.path();
            newPath.arc(adjustedControlX, adjustedControlY, radius, angle + Math.PI + Math.PI / 3, angle + Math.PI + Math.PI / 3 + x, false);
            timex.attr("d", newPath.toString());
        },  delayTime + x * 1200);
    }


// Add this function after the existing functions
function drawEquidistantRectanglesInstant(svg, axes, N) {
    const rectWidth = 5;
    const rectHeight = 20;

    for (let i = 0; i <= N; i++) {
        const x = i * (4 / N);
        const [xPos, yPos] = axes.c2p(x, 0);
        
        svg.append("rect")
            .attr("class", "equidistant-rect")
            .attr("x", xPos)
            .attr("y", yPos)
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("fill", "white")
            .attr("transform", `translate(-${rectWidth/2}, -${rectHeight/2})`);
    }
}


function drawEquidistantRectangles(svg, axes, N) {
    const rectWidth = 5;
    const rectHeight = 20;
    const fadeInDuration = 200; // Duration of fade-in animation in milliseconds
    const delayBetweenRects = 100; // Delay between each rectangle appearance

    for (let i = 0; i <= N; i++) {
        const x = i * (4 / N);
        const [xPos, yPos] = axes.c2p(x, 0);
        
        svg.append("rect")
            .attr("class", "equidistant-rect")
            .attr("x", xPos)
            .attr("y", yPos)
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("fill", "white")
            .attr("transform", `translate(-${rectWidth/2}, -${rectHeight/2})`)
            .style("opacity", 0) // Start with opacity 0
            .transition() // Start a transition
            .delay(i * delayBetweenRects) // Delay based on index
            .duration(fadeInDuration) // Duration of the fade-in
            .style("opacity", 1); // Fade to full opacity
    }
}
// In the main function, after creating the SVG and defining the axes, add:
const N = 8; // You can adjust this value to change the number of rectangles

// Reverse the transition after a delay
const timeoutDrawRectanglesId = setTimeout(() => {
    drawEquidistantRectangles(svg, axes, N);
}, delayLabel); // 2000 milliseconds (2 seconds) delay before reversing



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
        .attr("x", axes.c2p(4 , -0.00)[0])
        .attr("y", axes.c2p(4, -0.00)[1])
        .attr("width", 5)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("transform", `translate(-2.5, -10)`);

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
