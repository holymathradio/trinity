

window.AdditionTotalOrderFinalScene = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
       console.log("AdditionAssociativityRight function called");
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

    const delayEx = 1000; // delay for ex and its brace
    const durationEx = 1000; // duration for ex and its brace

    const delayInitialSum = delayEx  + durationEx  + 1000; // delay for ex and its brace
    const durationInitialSum = 1000; // duration for ex and its brace


    const totalDuration = delayInitialSum + durationInitialSum + 500;


    let brace_stroke_width = 4;
if (window.innerWidth < 600) {
        brace_stroke_width = 3;
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
        c2p: (x, y) => [width / 2 + (x * width / 10), height / 2 - (y * height / 4)]
    };

    const startPoint = axes.c2p(0, 0);
const initialEndPoint = axes.c2p(Math.PI, 0);
const finalEndPointRight= axes.c2p(4.5, 0);
const finalEndPointLeft = axes.c2p(2, 0);

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

    // Add the yellow line
    const linex = svg.append("line")
        .attr("class", "linex")
        .attr("x1", startPoint[0])
        .attr("y1", startPoint[1])
        .attr("x2", initialEndPoint[0])
        .attr("y2", initialEndPoint[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 2);

      // Add the bottom brace (ex) with delay and duration
    const bottomBrace = svg.append("path")
        .attr("d", makeCurlyBrace(startPoint[0], startPoint[1] + 20, initialEndPoint[0], initialEndPoint[1] + 20, 20, 0.6))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", brace_stroke_width)
        .style("opacity", 1);

    // Add the bottom label (ex) with delay and duration
    svg.append("text")
        .attr("class", "label-e-father")
        .attr("x", (startPoint[0] + initialEndPoint[0]) / 2)
        .attr("y", startPoint[1] + 70)  // Adjusted y-position for larger font
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("font-size", fontSize)  // Set font size
        .html("e<tspan baseline-shift='sub' font-size='0.7em' font-style='italic'>x</tspan>")
        .style("opacity", 1);


    const topBrace = svg.append("path")
        .attr("d", makeCurlyBrace(startPoint[0], startPoint[1] - 20, finalEndPointLeft[0], finalEndPointLeft[1] - 20, 20, 0.6, true))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", brace_stroke_width)
        .style("opacity", 1);

    // Add the top label (e+e') with delay and duration
    const topLabel = svg.append("text")
        .attr("class", "label-e-father")
        .attr("x", (startPoint[0] + finalEndPointLeft[0]) / 2)
        .attr("y", startPoint[1] - 70)  // Adjusted y-position for larger font
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("font-size", fontSize)  // Set font size
        .html("e<tspan baseline-shift='sub' font-size='0.7em' font-style='italic'>y</tspan>")
        .style("opacity", 1);


    // Add the bottom brace R
const topBraceR = svg.append("path")
    .attr("d", makeCurlyBrace(finalEndPointLeft[0], finalEndPointLeft[1] - 20, initialEndPoint[0], initialEndPoint[1] - 20, 20, 0.6,true))
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("stroke-width", brace_stroke_width)
    .style("opacity", 1);

// Add the label for bottomBraceR
const topLabelR = svg.append("text")
    .attr("class", "label-r")
    .attr("x", (initialEndPoint[0] + finalEndPointLeft[0]) / 2)
    .attr("y", initialEndPoint[1] - 70)  // Adjusted y-position for larger font
    .attr("text-anchor", "middle")
    .attr("fill", "gray")
    .attr("font-size", fontSize)  // Set font size
    .attr("font-style", "italic")
    .text("r")
    .style("opacity", 1);


// Add the label for bottomBraceR
const topLabelRBis = svg.append("text")
    .attr("class", "label-r")
    .attr("x", (initialEndPoint[0] + finalEndPointLeft[0]) / 2)
    .attr("y", initialEndPoint[1] - 55)  // Adjusted y-position for larger font
    .attr("text-anchor", "middle")
    .attr("fill", "gray")
    .attr("font-size", fontSize*0.8)  // Set font size
    .html("(e<tspan baseline-shift='sub' font-size='0.7em' font-style='italic'>x</tspan> - e<tspan baseline-shift='sub' font-size='0.7em' font-style='italic'>y</tspan>)")
    .style("opacity", 1);



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
        .attr("x", axes.c2p(Math.PI + 0.01, -0.00)[0])
        .attr("y", axes.c2p(Math.PI + 0.01, -0.00)[1])
        .attr("width", 5)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("transform", `translate(-5, -10)`);

    fatherDot.raise(); // Ensure father-dot stays on top

};
