console.log("MultiplicationSigneRuleIntro.js loaded");
window.MultiplicationSigneRuleIntro = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("MultiplicationSigneRuleIntro function called");

    svg.selectAll("*").remove();

    function getPerpendicularLineEquation(x1, y1, x2, y2, x) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + x2) / 2;
        const segmentSlope = (y2 - y1) / (x2 - x1);
        const perpSlope = -1 / segmentSlope;
        const c = midY - perpSlope * midX;
        return x * perpSlope + c;
    }

    svg.append("circle").attr("class", "father-dot");
    svg.append("line").attr("class", "linej");
    svg.append("text").attr("class", "label-zero");
    svg.append("text").attr("class", "label-one");
    svg.append("text").attr("class", "sign-holy-spirit-label");
    svg.append("text").attr("class", "sign-holy-spirit");

    // mobile adjustment
    let shiftVectorInf = [-0.4, 0];
    let zeroMobileShift = 0;
    let espaceMobileShift = 0;
    let markerSize = 12;
  let ratio_mobile = 1 ;

    if (window.innerWidth < 600) {
        markerSize = 8;
        shiftVectorInf = [-0.6, 0];
        zeroMobileShift = -0.05;
        espaceMobileShift = -8;
        arrowGapRight = 10;
        ratio_mobile = 0.7;
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
        c2p: (x, y) => [width / 2 + (x * width / 10), height / 2 - (y * height / 2.8)]
    };



    const defaultSetIsCanceled = () => false;
    const defaultGetIsCanceled = () => false;

    // Use provided functions or fall back to defaults
    setIsCanceled = setIsCanceled || defaultSetIsCanceled;
    getIsCanceled = getIsCanceled || defaultGetIsCanceled;

    setTimeout(() => setIsCanceled(false), 10); //setting back to false at start of animation


// Define the font size parameter for outer labels
let fontSizeOuterLabel = 24*ratio_mobile;
let fontSizeInnerLabel = 24*ratio_mobile; 
let traversingArrowLabelShift = 60*ratio_mobile;
let outerArrowLabelShift = 20*ratio_mobile;
let constantLabelShift = 25*ratio_mobile ;


const shiftOuterCircle = 30*ratio_mobile ;
const shiftInnerCircle = 40*ratio_mobile ;



let radius = 20*ratio_mobile;
let radius_zero = 15*ratio_mobile;

const goldenRatio = (1 + Math.sqrt(5)) / 2*1;

// Define the radius as a variable
let discRadius = 50*ratio_mobile;

// Use discRadius when creating the circles
let discPlusPosition = axes.c2p(goldenRatio, 0);
const discMinusPosition = axes.c2p(-goldenRatio, 0);

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

    function createArrow(svg, x, y, angle, size, color) {
        // Convert angle from degrees to radians
        const rad = angle * Math.PI / 180;
        
        // Calculate end points of the two lines
        const x1 = x + size * Math.cos(rad + 7 * Math.PI / 8);
        const y1 = y + size * Math.sin(rad + 7 * Math.PI / 8);
        const x2 = x + size * Math.cos(rad - 7 * Math.PI / 8);
        const y2 = y + size * Math.sin(rad - 7 * Math.PI / 8);
        
        // Create the arrow using a path element
        svg.append("path")
           .attr("d", `M${x1},${y1} L${x},${y} L${x2},${y2}`)
           .attr("stroke", color)
           .attr("stroke-width", 5)
           .attr("fill", "none");
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


    // Get the coordinates where you want to place the arrow
    const [arrowX, arrowY] = axes.c2p(4, 0);

    // Create the arrow
    createArrow(svg, arrowX, arrowY, 0, 40, "yellow");

    const xScale = d3.scaleLinear().domain([axes.xRange[0], axes.xRange[1]]).range([0, axes.width]);
    const yScale = d3.scaleLinear().domain([axes.yRange[0], axes.yRange[1]]).range([axes.height, 0]);

    const xAxis = d3.axisBottom(xScale).ticks(axes.xRange[2]);
    const yAxis = d3.axisLeft(yScale).ticks(axes.yRange[2]);

    const fontSize = "36px"; // Set the font size for all labels




    const delayPlusMinus = 1000;
    const durationPlusMinus = 1000 

    const delayPlus = delayPlusMinus + durationPlusMinus; // delay for + disc
    const durationPlus = 1000 



    const delayMinus = delayPlusMinus + durationPlusMinus ;
    const durationMinus = 1000 ; // duration for ex and its brace


    const totalDuration = delayPlus + durationPlus + 500;

    svg.selectAll(".axis").remove();

    const xAxisGroup = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height / 2})`)
        .call(xAxis);

    const yAxisGroup = svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${width / 2}, 0)`)
        .call(yAxis);

    xAxisGroup.selectAll("path").style("opacity", 0);
    yAxisGroup.selectAll("path").style("opacity", 0);
    xAxisGroup.selectAll("line, text").style("opacity", 0);
    yAxisGroup.selectAll("line, text").style("opacity", 0);

    const fatherDot = svg.selectAll(".father-dot")
        .attr("cx", axes.c2p(0, 0)[0])
        .attr("cy", axes.c2p(0, 0)[1])
        .attr("r", 12)
        .attr("fill", "white")
        .style("opacity", 1);

    const linej = svg.selectAll(".linej")
        .attr("x1", axes.c2p(0, 1)[0])
        .attr("y1", axes.c2p(0, 1)[1])
        .attr("x2", axes.c2p(1, 1)[0])
        .attr("y2", axes.c2p(1, 1)[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 5)
        .style("opacity", 1);

    /*
    svg.selectAll(".sign-holy-spirit")
        .attr("x", axes.c2p(4, 0)[0])
        .attr("y", axes.c2p(4, 0)[1] ) //+ 23 Shift down by half of its height (22 is half of font size 44, but 11 works)
        .attr("font-size", "66")
        .attr("dominant-baseline", "central")
        .attr("fill", "yellow")
        .style("opacity", 1)
        .text(">");
    */

    const startPoint = axes.c2p(0, 0);
    const endPoint = axes.c2p(Math.PI, 0);
    const topPoint = axes.c2p(1, 1);

    svg.append("defs").append("marker")
        .attr("id", "arrow-signrule")
        .attr("viewBox", "0 0 20 20")
        .attr("refX", "10")
        .attr("refY", "10")
        .attr("markerWidth", markerSize)
        .attr("markerHeight", markerSize)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 20 10 L 0 20 z")
        .attr("fill", "yellow");


    svg.append("circle")
        .attr("class", "disc_plus")
        .attr("cx", discPlusPosition[0])
        .attr("cy", discPlusPosition[1])
        .attr("r", discRadius) // Adjust the radius as needed
        .attr("fill", "#8d801e") // Fill none
        .attr("stroke", "yellow") // Yellow as in original video "#f9f13a"
        .attr("stroke-width", 5)
        .style("opacity", 0)
        .transition()
        .delay(delayPlus)
        .duration(durationPlus)
        .style("opacity", 1);

 
    svg.append("circle")
        .attr("class", "disc_minus")
        .attr("cx", discMinusPosition[0])
        .attr("cy", discMinusPosition[1])
        .attr("r", discRadius) // Adjust the radius as needed
        .attr("fill", "#7f817e") // Fill none
        .attr("stroke", "white") // More solid edge color
        .attr("stroke-width", 5)
        .style("opacity", 0)
        .transition()
        .delay(delayMinus)
        .duration(durationMinus)
        .style("opacity", 1);
/*
    // Add a large centered yellow "+" in the middle of disc_plus
    svg.append("text")
        .attr("class", "disc_plus_text")
        .attr("x", discPlusPosition[0])
        .attr("y", discPlusPosition[1])
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "56px")
        .attr("fill", "yellow")
        .text("+")
        .style("opacity", 0)
        .transition()
        .delay(delayPlus)
        .duration(durationPlus)
        .style("opacity", 1);
*/
const plusGroup = svg.append("g")
    .attr("class", "disc_plus_sign")
    .attr("transform", `translate(${discPlusPosition[0]}, ${discPlusPosition[1]})`)
    .style("opacity", 0);

plusGroup.append("line")
    .attr("x1", -discRadius / 3.5)
    .attr("y1", 0)
    .attr("x2", discRadius / 3.5)
    .attr("y2", 0)
    .attr("stroke", "yellow")
    .attr("stroke-width", 6);

plusGroup.append("line")
    .attr("x1", 0)
    .attr("y1", -discRadius / 3.5)
    .attr("x2", 0)
    .attr("y2", discRadius / 3.5)
    .attr("stroke", "yellow")
    .attr("stroke-width", 6);

plusGroup.transition()
    .delay(delayPlus)
    .duration(durationPlus)
    .style("opacity", 1);

    // Add a large centered white "-" in the middle of disc_minus
    svg.append("text")
        .attr("class", "disc_minus_text")
        .attr("x", discMinusPosition[0])
        .attr("y", discMinusPosition[1])
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-size", "80px")
        .attr("fill", "white")
        .text("-")
        .style("opacity", 0)
        .transition()
        .delay(delayMinus)
        .duration(durationMinus)
        .style("opacity", 1);



    // Add a small "+-" under the father_dot, with "+" in yellow and "-" in white
    svg.append("text")
        .attr("class", "plus-minus-symbol")
        .attr("x", axes.c2p(0, +0.15)[0] - 10) // Adjust the x position to create some space
        .attr("y", axes.c2p(0, +0.15)[1])
        .attr("text-anchor", "middle")
        .attr("font-size", "36px")
        .attr("fill", "yellow")
        .text("+")
        .style("opacity", 0)
        .transition()
        .delay(delayPlusMinus)
        .duration(durationPlusMinus)
        .style("opacity", 1);

    svg.append("text")
        .attr("class", "plus-minus-symbol")
        .attr("x", axes.c2p(0, +0.15)[0] + 10) // Adjust the x position to create some space
        .attr("y", axes.c2p(0, +0.15)[1])
        .attr("text-anchor", "middle")
        .attr("font-size", "36px")
        .attr("fill", "white")
        .text("-")
        .style("opacity", 0)
        .transition()
        .delay(delayPlusMinus)
        .duration(durationPlusMinus)
        .style("opacity", 1);

    fatherDot.raise(); // Ensure father-dot stays on top

    const timeoutId = setTimeout(() => {
        if (callback && !getIsCanceled()) {
            callback();
        }
    }, totalDuration);

    const checkCancelLoop = setInterval(() => {
        if (getIsCanceled && getIsCanceled()) {
            clearTimeout(timeoutId);
            clearInterval(checkCancelLoop);
        }
    }, 100);
};
