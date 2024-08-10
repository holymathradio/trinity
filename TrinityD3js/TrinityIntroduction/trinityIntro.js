console.log("trinityIntro.js loaded");
window.trinityIntro = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
 
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



// Set timing and appearance variables
const delayAppearTick = 4000;
const durationAppearTick = 2000;
const delayAppearN = delayAppearTick + durationAppearTick + 1000;
const durationAppearN = 1000;
const totalDuration = delayAppearN + durationAppearN + 500;

// Set dimensions for rectangles and fonts with mobile adjustments
let rectWidth = 5;
let rectHeight = 20;
let fontSizeMathbbN = "72px";

if (window.innerWidth < 600) {
    rectWidth = 2;
    rectHeight = 12;
    fontSizeMathbbN = "48px";
}

// Set other variables with mobile adjustments
let shiftVectorInf = [-0.4, 0];
let size_holy_spirit_arrow = 50;
let height_axes = 5;
let width_axes = 12;
let fontSizeInfinity = 62;
let rFatherDot = 12;
let strokeWidthInf = 5 ;
let arrowFinalX = 5.8;

if (window.innerWidth < 600) {
    width_axes = 14;
    shiftVectorInf = [-0.8, 0];
    size_holy_spirit_arrow = 30;
    fontSizeInfinity = 40;
    rFatherDot = 8 ;
    strokeWidthInf = 4;
    arrowFinalX = 5.9 ;
}

// Define SVG width and height based on calculated dimensions
const svgWidth = +svg.attr("width");
const width = svgWidth;
const height = svgHeight;

// Define axes with conversion function
const axes = {
    xRange: [-5, 5, 1],
    yRange: [-2, 2, 0.5],
    width: width,
    height: height,
    c2p: (x, y) => [width / 2 + (x * width / width_axes), height / 2 - (y * height / height_axes)]
};

// Calculate start point and label positions
const startPoint = axes.c2p(0, 0);
const locationLabelN = axes.c2p(-3, -1.5);




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





svg.append("text").attr("class", "sign-holy-spirit-trinity-intro");

//update
    svg.selectAll(".sign-holy-spirit-trinity-intro")
        .attr("x", axes.c2p(5 + shiftVectorInf[0], 0.4)[0]+ shiftX)
        .attr("y", axes.c2p(5 + shiftVectorInf[0], 0.4)[1])
        .attr("font-size", fontSizeInfinity)
        .attr("fill", "yellow")
        .text("+∞")
        .style("opacity", 1)
        ;





    function drawEquidistantRectangles(svg, axes, N,duration) {

        const fadeInDuration = duration/N;
        const delayBetweenRects = 100;

        for (let i = 0; i <= N; i++) {
            const x = i ;
            const [xPos, yPos] = axes.c2p(x, 0);

            svg.append("rect")
                .attr("class", "unit-tick-rect-trinity-intro")
                .attr("x", xPos)
                .attr("y", yPos)
                .attr("width", rectWidth)
                .attr("height", rectHeight)
                .attr("fill", "white")
                .attr("transform", `translate(-${rectWidth / 2}, -${rectHeight / 2})`)
                .style("opacity", 0)
                .transition()
                .delay(i * delayBetweenRects)
                .duration(fadeInDuration)
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
    .style("opacity", 0) // Start with opacity 0
    .transition()
    .delay(delayAppearN)
    .duration(durationAppearN)
    .style("opacity", 1); // Fade in to full opacity

// Add this after creating the svg and before starting animations


// Delay the animation start by 1 second
const timeoutIdUp = 
    setTimeout(() => {
drawEquidistantRectangles(svg, axes, N,durationAppearTick);
}, delayAppearTick); // 5000 ms delay as an example


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
                    clearTimeout(timeoutIdUp);
                    clearInterval(checkCancelLoop);
                }

            }, 100);

};
