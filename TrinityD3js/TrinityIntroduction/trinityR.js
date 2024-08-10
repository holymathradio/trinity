console.log("trinityR.js loaded");
window.trinityR = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("trinityR function called");
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

let rectWidthPi = 5;
let rectHeightPi = 40;

if (window.innerWidth < 600) {
    rectWidth = 2;
    rectHeight = 12;
    fontSizeMathbbN = "48px";
    rectWidthPi = 2;
    rectHeightPi = 30;
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


const locationLabelN = axes.c2p(-3, -1.5);
const locationLabelQ = axes.c2p(0, -1.5);
const locationLabelR = axes.c2p(3,-1.5);




let fontSeriesFormula = "20px"
let fontSizePi = "50px"; // Adjust this size as needed

// formula distance sizing
let gapSumText = 5 ;
let gapFractionText = 25 ; 
let xPi = 0.5 ;
if (window.innerWidth < 600) {
    fontSizePi = "30px"; // Smaller size for mobile devices
    fontSeriesFormula = "15px";
    xPi = 0.4 ;
    gapSumText = 15 ;
    gapFractionText = 35 ; 
}



const delayFirstApproximation = 2000 ;
const durationFirstApproximation = 1000; 

const initialDuration = 1000;
const pauseDuration = 100 ;
const N_approximation_remaining = 97 ;

const durationApproximatePi = 3*initialDuration + 10*pauseDuration + N_approximation_remaining*pauseDuration/50 + N_approximation_remaining*initialDuration / 20 ;


const delayAppearR = delayFirstApproximation + durationFirstApproximation + durationApproximatePi + 1000;
const durationAppearR = 2000;

const totalDuration = delayAppearR + durationAppearR + 1000;


const startPoint = axes.c2p(0, 0);











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
    .style("opacity", 1); // Fade in to full opacity // Fade in to full opacity



// Add mathbb{R} symbol
svg.append("text")
    .attr("class", "mathbb-r")
    .attr("x", locationLabelR[0]) 
    .attr("y", locationLabelR[1]) 
    .attr("text-anchor", "middle") // Align the text to the center
    .attr("dominant-baseline", "baseline") // Align the text to the bottom
    .attr("font-size", fontSizeMathbbN)
    .attr("font-family", "Arial, sans-serif") // You might want to use a specific font that supports mathbb style
    .attr("fill", "yellow")
    .text("ℝ")
    .style("opacity", 0)
    .transition()
    .delay(delayAppearR)
    .duration(durationAppearR)
    .style("opacity",1); // Fade in to full opacity


drawEquidistantRectanglesInstant(svg, axes, N);

function piApproximation(i) {
    let S = 0;
    for (let j = 0; j <= i; j++) {
        S += 8 / ((4 * j + 1) * (4 * j + 3));
    }
    return S;
}


// Then add the arrow and infinity label
linePositives.raise();
svg.selectAll(".unit-tick-rect-q").raise();


arrow.raise(); // This will bring the arrow to the front
infinityLabel.raise(); // This will bring the infinity label to the front

fatherDot.raise();

linePositives
    .style("opacity",1);

const bigPi = svg.append("text")
    .attr("class", "big-pi-symbol")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", "yellow")
    .style("font-size", fontSizePi)
    .style("font-family", "serif")
    .attr("x", axes.c2p(Math.PI,0)[0])
    .attr("y", axes.c2p(Math.PI,xPi)[1])
    .text("π")
    .style("opacity", 0);






function animatePiApproximation(svg, axes, initialDuration = 2000, initialPauseDuration = 1000, N = 10) {

    
    // Create the rectangle
    const rect = svg.append("rect")
        .attr("class", "unit-tick-moving-pi")
        .attr("width", rectWidthPi)
        .attr("height", rectHeightPi)
        .attr("fill", "white")
        .attr("transform", `translate(-${rectWidthPi / 2}, -${rectHeightPi / 2})`)
        .style("opacity", 0);

    // Create label group
    const labelGroup = svg.append("g")
        .attr("class", "pi-approximation-label")
        .attr("fill", "white");

    // Create text elements
    const sumText = labelGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "hanging")
        .style("font-size", fontSeriesFormula);

    const fractionText = labelGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "hanging")
        .style("font-size", fontSeriesFormula)
        .style("opacity",0);

    function updatePositions(i) {
        const [xPos, yPos] = axes.c2p(piApproximation(i), 0);
        rect.attr("x", xPos).attr("y", yPos);
        updateLabel(i, xPos, yPos);
    }

    function updateLabel(i, xPos, yPos) {
        if (i <= 1) {
            sumText.text("");
            fractionText
                .attr("x", xPos)
                .attr("y", yPos + rectHeightPi / 2 + (gapSumText + gapFractionText)/2)
                .text(i === 0 ? "8/3" : "304/105");
        } else {
            sumText
                .attr("x", xPos)
                .attr("y", yPos + rectHeightPi / 2 + gapSumText)
                .text(`Σ(k=0 to ${i})`);
            fractionText
                .attr("x", xPos)
                .attr("y", yPos + rectHeightPi / 2 + gapFractionText)
                .text("8/((4k+1)(4k+3))");
        }
    }

    // Initial position
    updatePositions(0);

    fractionText.transition()
        .delay(delayFirstApproximation)
        .duration(durationFirstApproximation)
        .style("opacity",1);
    

    // Manually animate first 3 values
    rect.transition()
        .delay(delayFirstApproximation)
        .duration(durationFirstApproximation)
        .style("opacity",1)
        .transition()
        .delay(initialPauseDuration)
        .duration(initialDuration)
        .attr("x", axes.c2p(piApproximation(1), 0)[0])
        .attr("y", axes.c2p(piApproximation(1), 0)[1])
        .on("end", () => {
            updatePositions(1);
        })
        .transition()
        .delay(initialPauseDuration)
        .duration(initialDuration)
        .attr("x", axes.c2p(piApproximation(2), 0)[0])
        .attr("y", axes.c2p(piApproximation(2), 0)[1])
        .on("end", () => {
            updatePositions(2);
        })
        .transition()
        .delay(initialPauseDuration)
        .duration(initialDuration)
        .attr("x", axes.c2p(piApproximation(3), 0)[0])
        .attr("y", axes.c2p(piApproximation(3), 0)[1])
        .on("end", () => {
            updatePositions(3);
            // Start the next N approximations
            animateNextN(4, N);
        });

    function animateNextN(start, count) {
        let i = start;
        const duration = initialDuration / 20;
        const pauseDuration = initialPauseDuration / 50;

        function animateStep() {
            if (i >= start + count) {
                displayFinalSum();
                return;
            }

            rect.transition()
                .duration(duration)
                .attr("x", axes.c2p(piApproximation(i), 0)[0])
                .attr("y", axes.c2p(piApproximation(i), 0)[1])
                .on("end", () => {
                    updatePositions(i);
                    i++;
                    setTimeout(animateStep, pauseDuration);
                });
        }

        animateStep();
    }



// In the displayFinalSum function:
function displayFinalSum() {
    const [xPos, yPos] = axes.c2p(Math.PI, 0);

        sumText
            .attr("x", xPos)
            .attr("y", yPos + rectHeightPi / 2 + gapSumText)
            .text("sup n∈ℕ Σ(k=0 to n)");
        fractionText
            .attr("x", xPos)
            .attr("y", yPos + rectHeightPi / 2 + gapFractionText)
            .text("8/((4k+1)(4k+3))");
    
    rect.transition()
        .duration(initialDuration)
        .attr("x", xPos)
        .attr("y", yPos);



            bigPi
    .style("opacity", 1);
}


}



// Usage
animatePiApproximation(svg, axes, pauseDuration, initialDuration, N_approximation_remaining);




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
                    clearInterval(checkCancelLoop);
                }

            }, 100);

};