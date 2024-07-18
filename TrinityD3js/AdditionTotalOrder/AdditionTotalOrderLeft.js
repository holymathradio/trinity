console.log("Intro3GeoLabel.js loaded");

window.AdditionTotalOrderLeft = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
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

    const delayTransition = 1500; // delay for ex and its brace
    const durationTransition = 2000; // duration for ex and its brace

    const totalDuration = delayTransition + durationTransition + 500;

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

    // Force GPU acceleration
    svg.style("transform", "translateZ(0)");

    // Optimize SVG rendering
    svg.attr("shape-rendering", "crispEdges");

    const startPoint = axes.c2p(0, 0);
    const initialEndPoint = axes.c2p(Math.PI, 0);
    const finalEndPointRight = axes.c2p(4.5, 0);
    const finalEndPointLeft = axes.c2p(2, 0);

function makeCurlyBrace(x1, y1, x2, y2, w, q, isTop = false) {
    // Function to ensure a value is a valid number
    const ensureNumber = (val, fallback = 0) => {
        return isNaN(val) || val === undefined ? fallback : val;
    };

    // Ensure all inputs are valid numbers
    x1 = ensureNumber(x1);
    y1 = ensureNumber(y1);
    x2 = ensureNumber(x2);
    y2 = ensureNumber(y2);
    w = ensureNumber(w, 1);  // fallback to 1 if w is invalid
    q = ensureNumber(q, 0.6);  // fallback to 0.6 if q is invalid

    var dx = x1 - x2;
    var dy = y1 - y2;
    var len = Math.sqrt(dx * dx + dy * dy);
    dx = dx / len;
    dy = dy / len;

    var directionFactor = isTop ? -1 : 1;

    var qx1 = ensureNumber(x1 + directionFactor * q * w * dy);
    var qy1 = ensureNumber(y1 - directionFactor * q * w * dx);
    var qx2 = ensureNumber((x1 - 0.25 * len * dx) + directionFactor * (1 - q) * w * dy);
    var qy2 = ensureNumber((y1 - 0.25 * len * dy) - directionFactor * (1 - q) * w * dx);
    var tx1 = ensureNumber((x1 - 0.5 * len * dx) + directionFactor * w * dy);
    var ty1 = ensureNumber((y1 - 0.5 * len * dy) - directionFactor * w * dx);
    var qx3 = ensureNumber(x2 + directionFactor * q * w * dy);
    var qy3 = ensureNumber(y2 - directionFactor * q * w * dx);
    var qx4 = ensureNumber((x1 - 0.75 * len * dx) + directionFactor * (1 - q) * w * dy);
    var qy4 = ensureNumber((y1 - 0.75 * len * dy) - directionFactor * (1 - q) * w * dx);

    var smallUpwardPath = `l 0 ${directionFactor * 4}`;
    var smallFeetDownwardPath = `l 0 ${-directionFactor * 3}`;

    return (
        `M ${x1} ${y1} ` +
        smallFeetDownwardPath +
        `M ${x1} ${y1} ` +
        `Q ${qx1} ${qy1} ${qx2} ${qy2} ` +
        `T ${tx1} ${ty1} ` +
        smallFeetDownwardPath +
        `M ${x2} ${y2} ` +
        smallFeetDownwardPath +
        `Q ${qx3} ${qy3} ${qx4} ${qy4} ` +
        `T ${tx1} ${ty1} ` +
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
        .attr("d", makeCurlyBrace(startPoint[0], startPoint[1] - 20, finalEndPointRight[0], finalEndPointRight[1] - 20, 20, 0.6, true))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", brace_stroke_width)
        .style("opacity", 1);

    // Add the top label (e+e') with delay and duration
    const topLabel = svg.append("text")
        .attr("class", "label-e-father")
        .attr("x", (startPoint[0] + finalEndPointRight[0]) / 2)
        .attr("y", startPoint[1] - 70)  // Adjusted y-position for larger font
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("font-size", fontSize)  // Set font size
        .html("e<tspan baseline-shift='sub' font-size='0.7em' font-style='italic'>y</tspan>")
        .style("opacity", 1);

        // Add the shadow for the top label
const topLabelShadow = svg.append("text")
    .attr("class", "label-e-father-shadow")
    .attr("x", (startPoint[0] + finalEndPointRight[0]) / 2 + 2)  // Slightly offset
    .attr("y", startPoint[1] - 70)  // Same y-position as topLabel
    .attr("text-anchor", "middle")
    .attr("fill", "transparent")  // Make it invisible
    .attr("font-size", fontSize)  // Set font size
    .html("e<tspan baseline-shift='sub' font-size='0.7em' font-style='italic'>y</tspan>")
    .style("opacity", 0);  // Ensure it's fully invisible

    // Add the bottom brace R
    const bottomBraceR = svg.append("path")
        .attr("d", makeCurlyBrace(initialEndPoint[0], initialEndPoint[1] + 20, finalEndPointRight[0], finalEndPointRight[1] + 20, 20, 0.6))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", brace_stroke_width)
        .style("opacity", 1);

    // Add the label for bottomBraceR
    const bottomLabelR = svg.append("text")
        .attr("class", "label-r")
        .attr("x", (initialEndPoint[0] + finalEndPointRight[0]) / 2)
        .attr("y", initialEndPoint[1] + 70)  // Adjusted y-position for larger font
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("font-size", fontSize)  // Set font size
        .attr("font-style", "italic")
        .text("r")
        .style("opacity", 1);

    const bottomLabelRShadow = svg.append("text")
    .attr("class", "label-r-shadow")
    .attr("text-anchor", "middle")
    .attr("fill", "transparent")  // Make it invisible
    .attr("font-size", fontSize)
    .attr("font-style", "italic")
    .text("r")
    .style("opacity", 0);  // Ensure it's fully invisible


    // Function to update the brace and label
    function updateBraceAndLabel(t) {
        const currentEndPoint = [
            finalEndPointRight[0] + t * (finalEndPointLeft[0] - finalEndPointRight[0]),
            finalEndPointRight[1] + t * (finalEndPointLeft[1] - finalEndPointRight[1])
        ];

          // Ensure currentEndPoint values are valid
    if (!isNaN(currentEndPoint[0]) && !isNaN(currentEndPoint[1])) {

        topBrace.attr("d", makeCurlyBrace(startPoint[0], startPoint[1] - 20, currentEndPoint[0], currentEndPoint[1] - 20, 20, 0.6, true));
        
        // Use transform for topLabel
        const topLabelX = (startPoint[0] + currentEndPoint[0]) / 2;
        topLabel.style("transform", `translateX(${topLabelX - topLabel.attr("x")}px)`);
            // Update the shadow label to clean the frames on the right
        topLabelShadow
        .attr("x", topLabelX + 10)  // 2 pixels to the right, adjust as needed
        .style("opacity", 0);  // Keep it invisible

        if (initialEndPoint[0] < currentEndPoint[0]) {
            bottomBraceR
                .attr("d", makeCurlyBrace(initialEndPoint[0], initialEndPoint[1] + 20, currentEndPoint[0], currentEndPoint[1] + 20, 20, 0.6))
                .style("opacity", 1);
            
            const labelX = (initialEndPoint[0] + currentEndPoint[0]) / 2;
            bottomLabelR
                .style("transform", `translateX(${labelX - bottomLabelR.attr("x")}px)`)
                .style("opacity", 1);
        } else if (initialEndPoint[0] >= currentEndPoint[0]) {
            bottomBraceR
                .attr("d", makeCurlyBrace(currentEndPoint[0], currentEndPoint[1] - 20, initialEndPoint[0], initialEndPoint[1] - 20, 20, 0.6, true))
                .style("opacity", 1);
            
            const labelX = (initialEndPoint[0] + currentEndPoint[0]) / 2;
            const labelY = startPoint[1] - 70;

            bottomLabelR
                .style("transform", `translateX(${labelX - bottomLabelR.attr("x")}px) translateY(${labelY - bottomLabelR.attr("y")}px)`)
                .style("opacity", 1);

                        bottomLabelRShadow
            .attr("x", labelX + 10)  // 2 pixels to the right, adjust as needed
            .attr("y", startPoint[1] - 70)
            .style("opacity", 0);  // Keep it invisible
        } else {
            bottomBraceR.style("opacity", 0);
            bottomLabelR.style("opacity", 0);
        }

           } else {
        console.warn('Invalid currentEndPoint:', currentEndPoint);
        // Handle the error case, maybe by not updating the brace in this frame
    }
    }

    // Use requestAnimationFrame for smoother animation
    function animate(startTime) {
        const now = Date.now();
        const progress = Math.min((now - startTime) / durationTransition, 1);
        updateBraceAndLabel(progress);
        
        if (progress < 1) {
            requestAnimationFrame(() => animate(startTime));
        }
    }

    // Start the animation
    setTimeout(() => {
        const startTime = Date.now();
        requestAnimationFrame(() => animate(startTime));
    }, delayTransition);

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

    // Delay the animation start by 1 second
    const timeoutId = setTimeout(() => {
        if (callback && !getIsCanceled()) {
            callback();
        }
    }, totalDuration);

    // Cancel the timeout in advance because the timer fails to read getIsCanceled
    const checkCancelLoop = setInterval(() => {
        if (getIsCanceled && getIsCanceled()) {
            clearTimeout(timeoutId);
            clearInterval(checkCancelLoop);
        }
    }, 100);
};
