console.log("trinityQ.js loaded");
window.trinityQ = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("trinityQ function called");
 // Clear the SVG content
svg.selectAll("*").remove();

// Set default functions for setIsCanceled and getIsCanceled
const defaultSetIsCanceled = () => false;
const defaultGetIsCanceled = () => false;

// Use provided functions or fall back to defaults
setIsCanceled = setIsCanceled || defaultSetIsCanceled;
getIsCanceled = getIsCanceled || defaultGetIsCanceled;

// Set back to false at the start of the animation
setTimeout(() => setIsCanceled(false), 10);

// Get the width of the animation container and set SVG dimensions
const containers = document.getElementsByClassName('content-block');
let maxWidth = 800;
let svgHeight = 500;

if (containers.length > 0) {
    const container = containers[0];
    const style = window.getComputedStyle(container);
    const maxContainerWidth = parseInt(style.width);
    maxWidth = Math.min(800, maxContainerWidth);

    if (window.innerWidth < 600) {
        svgHeight = 400;
    }

    svg.attr("width", maxWidth)
       .attr("height", svgHeight)
       .attr("viewBox", `0 0 ${maxWidth} ${svgHeight}`);
} else {
    console.error('No elements found with class "content-block".');
    svg.attr("width", 800)
       .attr("height", 500)
       .attr("viewBox", `0 0 800 500`);
}

// Set dimensions for rectangles and fonts with mobile adjustments
let rectWidth = 5;
let rectHeight = 20;
let fontSizeMathbbN = "72px";

if (window.innerWidth < 600) {
    rectWidth = 2;
    rectHeight = 12;
    fontSizeMathbbN = "48px";
}

// Marker size adjustments
let markerSize = 12;
if (window.innerWidth < 600) {
    markerSize = 8;
}

// Shift vector and arrow size adjustments
let shiftVectorInf = [-0.4, 0];
let size_holy_spirit_arrow = 50;
let height_axes = 5;
let width_axes = 12;
let fontSizeInfinity = 62;
let rFatherDot = 12;
let arrowGapRight = 15;
let strokeWidthInf = 5 ;
let arrowFinalX = 5.8;



if (window.innerWidth < 600) {
    width_axes = 14;
    shiftVectorInf = [-0.8, 0];
    size_holy_spirit_arrow = 30;
    fontSizeInfinity = 40;
    rFatherDot = 8 ;
    arrowGapRight = 10;
    strokeWidthInf = 4;
    arrowFinalX = 5.9 ;
}

// Axes setup


if (window.innerWidth < 600) {

}

const svgWidth = +svg.attr("width");
const svgHeightFinal = +svg.attr("height");
const width = svgWidth * 1;
const height = svgHeightFinal * 1;

const axes = {
    xRange: [-5, 5, 1],
    yRange: [-2, 2, 0.5],
    width: width,
    height: height,
    c2p: (x, y) => [width / 2 + (x * width / width_axes), height / 2 - (y * height / height_axes)]
};

// Key points on the axes
const startPoint = axes.c2p(0, 0);
const endPoint = axes.c2p(1, 0);
const topPoint = axes.c2p(1, 1.5);

const locationLabelN = axes.c2p(-3, -1.5);
const locationLabelQ = axes.c2p(0, -1.5);

// Timing variables for animations
const delayTime = 1000;
const durationTime = 2000;

const delayFirstStep = delayTime + durationTime + 1000;
const durationFirstStep = 2000;

const delayAdjustGridFirstStep = delayFirstStep + durationFirstStep + 1000;
const durationAdjustGridFirstStep = 2000;

const delayFadeOut = 3500;
const durationFadeOut = 1500;

const delaySecondStep = delayAdjustGridFirstStep + durationAdjustGridFirstStep + delayFadeOut + durationFadeOut;
const durationSecondStep = 2000;

const delayAdjustGridSecondStep = delaySecondStep + durationSecondStep + 1500;
const durationAdjustGridSecondStep = 2000;

const delayRemainingSteps = delayAdjustGridSecondStep + durationAdjustGridSecondStep + delayFadeOut + durationFadeOut;
const durationRemainingSteps = 6000;

const N_remaining_steps = 30;
const pauseDuration = durationRemainingSteps / N_remaining_steps * 1 / 5;
const unitDuration = durationRemainingSteps / N_remaining_steps * 4 / 5;

const delayAppearQ = delayRemainingSteps + durationRemainingSteps + 1000;
const durationAppearQ = 1000;

const delayArrowFadeOut = 10000 + delayAppearQ + durationAppearQ - delayRemainingSteps - durationRemainingSteps;
const durationArrowFadeOut = 1500;

const totalDuration = delayAppearQ + durationAppearQ + delayArrowFadeOut + durationArrowFadeOut + 500;




    // Add the father dot
    const fatherDot = svg.append("circle")
        .attr("class", "father-dot")
        .attr("cx", startPoint[0])
        .attr("cy", startPoint[1])
        .attr("r", rFatherDot)
        .attr("fill", "white")
        .style("opacity", 1);


    fatherDot.raise(); // Ensure father-dot stays on top




    function createArrowInstant(svg, x, y, angle, size, color,stroke_width=5) {
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
           .attr("stroke-width", stroke_width)
           .attr("fill", "none")
           .style("opacity",1);

        return arrow;
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


function createBlackMask(svg, axes) {
    const [maskX, maskY] = axes.c2p(5.2, 0);
    const maskWidth = svg.attr("width") - maskX;
    const maskHeight = svg.attr("height");

    svg.append("rect")
        .attr("class", "black-mask")
        .attr("x", maskX)
        .attr("y", 0)
        .attr("width", maskWidth)
        .attr("height", maskHeight)
        .attr("fill", "black")
        .style("opacity", 1);
}


// Create the yellow line
const linej = svg.append("line")
    .attr("class", "liney")
    .attr("x1", axes.c2p(0, 1.5)[0])
    .attr("y1", axes.c2p(0, 1.5)[1])
    .attr("x2", axes.c2p(1, 1.5)[0])
    .attr("y2", axes.c2p(1, 1.5)[1])
    .attr("stroke", "yellow")
    .attr("stroke-width", 4);





// Calculate the shift
const startPointShiftEnd = axes.c2p(3.0, 0);
const endPointShiftEnd = axes.c2p(2.6, 0);
const shiftX = endPointShiftEnd[0] - startPointShiftEnd[0];
const shiftY = 0;




// Get the coordinates where you want to place the arrow
const [arrowX, arrowY] = axes.c2p(arrowFinalX, 0);

// Create the arrow
const arrow = createArrowInstant(svg, arrowX + shiftX, arrowY + shiftY, 0, size_holy_spirit_arrow, "yellow",strokeWidthInf);



// Create the yellow line
const linePositives = svg.append("line")
    .attr("class", "liney")
    .attr("x1", axes.c2p(0, 0)[0])
    .attr("y1", axes.c2p(0, 0)[1])
    .attr("x2", arrowX + shiftX)
    .attr("y2", axes.c2p(arrowFinalX, 0)[1])
    .attr("stroke", "yellow")
    .attr("stroke-width", 2)
    .style("opacity",0);


const infinityLabel = svg.append("text").attr("class", "sign-holy-spirit-trinityq");

//update
    svg.selectAll(".sign-holy-spirit-trinityq")
        .attr("x", axes.c2p(5 + shiftVectorInf[0], 0.4)[0]+ shiftX)
        .attr("y", axes.c2p(5 + shiftVectorInf[0], 0.4)[1])
        .attr("font-size", fontSizeInfinity)
        .attr("fill", "yellow")
        .text("+∞")
        .style("opacity", 1)
        ;





    function drawEquidistantRectanglesInstant(svg, axes, N) {
        const delayBetweenRects = 100;

        for (let i = 0; i <= N; i++) {
            const x = i ;
            const [xPos, yPos] = axes.c2p(x, 0);

            svg.append("rect")
                .attr("class", "unit-tick-rect-q")
                .attr("x", xPos)
                .attr("y", yPos)
                .attr("width", rectWidth)
                .attr("height", rectHeight)
                .attr("fill", "white")
                .attr("transform", `translate(-${rectWidth / 2}, -${rectHeight / 2})`)
                .style("opacity", 1);
        }
    }

    const N = 5;



    // Add mathbb{N} symbol
svg.append("text")
    .attr("class", "mathbb-n")
    .attr("x", locationLabelN[0]) 
    .attr("y", locationLabelN[1]) 
    .attr("text-anchor", "middle") // Align the text to the right
    .attr("dominant-baseline", "baseline") // Align the text to the bottom
    .attr("font-size", fontSizeMathbbN)
    .attr("font-family", "Arial, sans-serif") // You might want to use a specific font that supports mathbb style
    .attr("fill", "yellow")
    .text("ℕ")
    .style("opacity", 1); // Fade in to full opacity

    // Add this after creating the svg and before starting animations


    // Add mathbb{N} symbol
svg.append("text")
    .attr("class", "mathbb-q")
    .attr("x", locationLabelQ[0]) 
    .attr("y", locationLabelQ[1]) 
    .attr("text-anchor", "middle") // Align the text to the right
    .attr("dominant-baseline", "baseline") // Align the text to the bottom
    .attr("font-size", fontSizeMathbbN)
    .attr("font-family", "KaTeX_Main") // Arial, sans-serifYou might want to use a specific font that supports mathbb style
    .attr("fill", "yellow")
    .text("ℚ") // 𝑄 mathbb(Q) 𝔔ℚ
    .style("opacity", 0) // Start with opacity 0
    .transition()
    .delay(delayAppearQ)
    .duration(durationAppearQ)
    .style("opacity", 1); // Fade in to full opacity // Fade in to full opacity



drawEquidistantRectanglesInstant(svg, axes, N);



// First, calculate the arc parameters for both the initial and final arcs
const arcParamsInverseInitial = calculateArcParameters(topPoint, endPoint,adjusting_angle = 1.09);




    // Define the arrow marker
svg.append("defs").append("marker")
    .attr("id", "arrow-right")
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
const transitioningPath = svg.append("path")
    .attr("d", generateArcPath(arcParamsInverseInitial, topPoint))
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow-right)")
        .style("opacity", 0); // Set initial opacity to 1

        let duration = 2000 ;

        let forward = true ;




    // Transition the path
    transitioningPath.transition()
        .delay(delayTime)
        .duration(durationTime)
        .attrTween("d", function() {
            return function(t) {
                t = forward ? t : 1 - t; // Reverse t if not forward
                const interpolatedParams = {
                    adjustedControlX: d3.interpolate(arcParamsInverseInitial.adjustedControlX, arcParamsInverseInitial.adjustedControlX)(t),
                    adjustedControlY: d3.interpolate(arcParamsInverseInitial.adjustedControlY, arcParamsInverseInitial.adjustedControlY)(t),
                    radius: d3.interpolate(arcParamsInverseInitial.radius, arcParamsInverseInitial.radius)(t),
                    startAngle: d3.interpolate(arcParamsInverseInitial.startAngle, arcParamsInverseInitial.startAngle)(t),
                    endAngle: d3.interpolate(arcParamsInverseInitial.startAngle, arcParamsInverseInitial.endAngle)(t),
                    counterclockwise: arcParamsInverseInitial.counterclockwise
                };
                
                const startPoint = [
                    d3.interpolate(topPoint[0], topPoint[0])(t),
                    d3.interpolate(topPoint[1], topPoint[1])(t)
                ];
                
                return generateArcPath(interpolatedParams, startPoint);
            };
        })
        .styleTween("opacity", function() {
        return function(t) {
            return forward ? t  : 1; // Fade out when moving forward, fade in when moving backward
        };
    }) 
    .transition()
    .delay(delayFirstStep-delayTime-durationTime)
    .duration(10)
    .style("opacity", 0);





// First, calculate the arc parameters for both the initial and final arcs
const arcParamsInverseRightInitial= calculateArcParameters(topPoint, endPoint,adjusting_angle = 1.09);

// First, calculate the arc parameters for both the initial and final arcs
const arcParamsInverseLeft = calculateArcParameters(topPoint, endPoint,adjusting_angle = 1.09);




    // Define the arrow marker
const MarkerPathRight = svg.append("defs").append("marker")
    .attr("id", "arrow-inverse-right")
    .attr("viewBox", "0 0 20 20")
    .attr("refX", "10")
    .attr("refY", "10")
    .attr("markerWidth", markerSize )
    .attr("markerHeight", markerSize )
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M 0 0 L 20 10 L 0 20 z")
    .attr("fill", "yellow")
    .style("opacity", 0) // Start with opacity 0
    .transition()
    .delay(delayFirstStep)
    .duration(10)
    .style("opacity", 1); // Fade in to full opacity

// Append the initial path to the SVG
const transitioningPathRight = svg.append("path")
    .attr("d", generateArcPath(arcParamsInverseRightInitial, topPoint))
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow-inverse-right)")
    .style("opacity", 0) // Start with opacity 0
    .transition()
    .delay(delayFirstStep)
    .duration(10)
    .style("opacity", 1); // Fade in to full opacity


    // Define the arrow marker
const MarkerPathLeft = svg.append("defs").append("marker")
    .attr("id", "arrow-inverse-left")
    .attr("viewBox", "0 0 20 20")
    .attr("refX", "10")
    .attr("refY", "10")
    .attr("markerWidth", markerSize )
    .attr("markerHeight", markerSize )
    .attr("orient", "auto-start-reverse")
    .append("path")
    .attr("d", "M 0 0 L 20 10 L 0 20 z")
    .attr("fill", "yellow")
    .style("opacity", 0) // Start with opacity 0
    .transition()
    .delay(delayFirstStep)
    .duration(10)
    .style("opacity", 1); // Fade in to full opacity

// Append the initial path to the SVG
const transitioningPathLeft = svg.append("path")
    .attr("d", createArc(topPoint, axes.c2p(1,0 ),-Math.PI * 1.38,arrowGap = arrowGapRight))
    .attr("fill", "none")
    .attr("stroke", "yellow")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrow-inverse-left)")
    .style("opacity", 0) // Start with opacity 0
    .transition()
    .delay(delayFirstStep)
    .duration(10)
    .style("opacity", 1); // Fade in to full opacity

// return a list that sums to N in N terms and gives more weight to the first term
function divideSum(N, minRatio = 1.5) {
    let result = [];
    let remainingSum = N;
    let remainingTerms = N;
    let norm = 0 ;

    for (let i = 0; i < N; i++) {
        norm += 1/Math.pow(1.5, i+1);
    }
    console.log(norm);

    for (let i = 0; i < N; i++) {
        let currentTerm;
        if (i === N - 1) {
            // Last term, assign whatever is left
            currentTerm = remainingSum;
        } else {
            currentTerm = N/Math.pow(1.5, i+1)*(1/norm);
        }

        // Round to two decimal places
        currentTerm = Math.round(currentTerm * 100) / 100;

        result.push(currentTerm);
        remainingSum -= currentTerm;
        remainingTerms--;
    }

    return result;
}

progressive_ratio = divideSum(N_remaining_steps);

    // Transition the path
    transition = transitioningPathRight.transition()
        .delay(0)
        .duration(durationFirstStep)
        .attrTween("d", function() {
            return function(t) {

                x_right = 1+t;

                angle_right = -Math.PI * 1.38*(1+0*t*0.5)

                return createArc(topPoint, axes.c2p(x_right,0 ),angle_right,arrowGap = arrowGapRight);
            };
        })
        .transition()
        .delay(delaySecondStep - delayFirstStep-durationFirstStep)
        .duration(durationSecondStep)
        .attrTween("d", function() {
            return function(t) {

                x_right = 2+t;

                angle_right = -Math.PI * 1.38*(1+0*(1+t)*0.5)

                return createArc(topPoint, axes.c2p(x_right,0 ),angle_right,arrowGap = arrowGapRight);
            };
        })

    .transition()
    .delay(delayRemainingSteps - delaySecondStep - durationSecondStep)
    .duration(unitDuration*progressive_ratio[0]*4/5)
    .attrTween("d", function() {
        return function(t) {
            x_right = 3 + t;
                angle_right = -Math.PI * 1.38*(1+0*(1+t)*0.5)
            return createArc(topPoint, axes.c2p(x_right, 0), angle_right, arrowGap = arrowGapRight);
        };
    }) ;




   for (let i = 0; i < N_remaining_steps-1; i++) {
        transition = transition.transition()
            .delay(pauseDuration*progressive_ratio[i+1]*1/5)
            .duration(unitDuration*progressive_ratio[i+1]*4/5)
            .attrTween("d", function() {
                return function(t) {
                    let x_right = 4 + i + t;
                    let angle_right = -Math.PI * 1.38 * (1 + Math.min(1.5,((i + t)/ 15)) * 0.5);
                    return createArc(topPoint, axes.c2p(x_right, 0), angle_right, arrowGap = arrowGapRight);
                };
            });
}


transition.transition()
    .delay(delayArrowFadeOut)
    .duration(durationArrowFadeOut)
    .style("opacity",0);




    // Transition the path
transitionLeft =    transitioningPathLeft.transition()
        .delay(0)
        .duration(durationFirstStep)
        .attrTween("d", function() {
            return function(t) {

                x_right = 1+t;
                x_left = 1/x_right;


                // First, calculate the arc parameters for both the initial and final arcs
                const arcParamsInverseLeftCurrent = calculateArcParameters(topPoint, axes.c2p(x_left,0),adjusting_angle = 1.09);

                return generateArcPath(arcParamsInverseLeftCurrent, topPoint);
            };
        })
        .transition()
        .delay(delaySecondStep - delayFirstStep-durationFirstStep)
        .duration(durationSecondStep)
        .attrTween("d", function() {
            return function(t) {

                x_right = 2+t;
                x_left = 1/x_right;


                // First, calculate the arc parameters for both the initial and final arcs
                const arcParamsInverseLeftCurrent = calculateArcParameters(topPoint, axes.c2p(x_left,0),adjusting_angle = 1.09);

                return generateArcPath(arcParamsInverseLeftCurrent, topPoint);
            };
        })
.transition()
    .delay(delayRemainingSteps - delaySecondStep - durationSecondStep)
    .duration(unitDuration*progressive_ratio[0]*4/5)
    .attrTween("d", function() {
        return function(t) {
            x_right = 3 + t;
                x_left = 1/x_right;


                // First, calculate the arc parameters for both the initial and final arcs
                const arcParamsInverseLeftCurrent = calculateArcParameters(topPoint, axes.c2p(x_left,0),adjusting_angle = 1.09);

                return generateArcPath(arcParamsInverseLeftCurrent, topPoint);
        };
    });


   for (let i = 0; i < N_remaining_steps-1; i++) {
        transitionLeft = transitionLeft.transition()
            .delay(pauseDuration*progressive_ratio[i+1]*1/5)
            .duration(unitDuration*progressive_ratio[i+1]*4/5)
            .attrTween("d", function() {
                return function(t) {
                    let x_right = 4 + i + t;
                x_left = 1/x_right;


                // First, calculate the arc parameters for both the initial and final arcs
                const arcParamsInverseLeftCurrent = calculateArcParameters(topPoint, axes.c2p(x_left,0),adjusting_angle = 1.09);

                return generateArcPath(arcParamsInverseLeftCurrent, topPoint);
                };
            });
}


transitionLeft.transition()
    .delay(delayArrowFadeOut)
    .duration(durationArrowFadeOut)
    .style("opacity",0);





function drawInitialRectangles(svg, axes, N) {

    for (let i = 1; i <= N; i++) {
        const [xPos, yPos] = axes.c2p(i, 0);
        svg.append("rect")
            .attr("class", "unit-half-tick-rect-q")
            .attr("x", xPos)
            .attr("y", yPos)
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("fill", "white")
            .attr("transform", `translate(-${rectWidth / 2}, -${rectHeight / 2})`)
            .style("opacity", 0);
    }
}

function transformRectangles(svg, axes,N, denominator,duration,delayFadeOut,durationFadeOut) {
    svg.selectAll(".unit-half-tick-rect-q")
    .attr("x", (d, i) => {
            const newX = (i + 1) ; // (i + 1) because we start from 1, not 0
            const [xPos, yPos] = axes.c2p(newX, 0);
            return xPos;
        })

    .style("opacity",1);


    svg.selectAll(".unit-half-tick-rect-q")
        .transition()
        .duration(duration) // 1 second transition
        .attr("x", (d, i) => {
            const newX = (i + 1) / denominator; // (i + 1) because we start from 1, not 0
            const [xPos, yPos] = axes.c2p(newX, 0);
            return xPos;
        })
        .transition()
        .delay(delayFadeOut)
        .duration(durationFadeOut)
        .style("opacity",0)


}

// Usage
const N_halfs = 20;
drawInitialRectangles(svg, axes, N_halfs);

// After drawEquidistantRectanglesInstant(svg, axes, N);
createBlackMask(svg, axes);

// Then add the arrow and infinity label
linePositives.raise();
svg.selectAll(".unit-tick-rect-q").raise();


arrow.raise(); // This will bring the arrow to the front
infinityLabel.raise(); // This will bring the infinity label to the front

fatherDot.raise();

// Call this function when you want to transform the rectangles
// For example, you might want to add a delay or trigger it on a button click
const transformHalfTimeoutId = setTimeout(() => transformRectangles(svg, axes, N_halfs,2,durationAdjustGridFirstStep,delayFadeOut, durationFadeOut), delayAdjustGridFirstStep); // Transform after 2 seconds



// Call this function when you want to transform the rectangles
// For example, you might want to add a delay or trigger it on a button click
const transformThirdTimeoutId =setTimeout(() => transformRectangles(svg, axes, N_halfs,3,durationAdjustGridSecondStep,delayFadeOut, durationFadeOut), delayAdjustGridSecondStep); // Transform after 2 seconds



linePositives.transition()
    .delay(delayAppearQ)
    .duration(durationAppearQ*3)
    .style("opacity",1);





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
                    clearTimeout(transformHalfTimeoutId); //cancel the planned update
                    clearTimeout(transformThirdTimeoutId);
                    clearInterval(checkCancelLoop);
                }

            }, 100);

};