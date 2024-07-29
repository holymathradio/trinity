console.log("InfinityArrow.js loaded");
window.infinityArrow = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("InfinityArrow function called");
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




    const delayGridOut = 2000; 

    const durationGridOut = 1000;

    const delayReposition = delayGridOut + durationGridOut + 2000;

    const durationReposition = 4000;



    const totalDuration = delayReposition + durationReposition + 500;




    let shiftVectorInf = [-0.4, 0];
    let size_holy_spirit_arrow = 50 ;
    let height_axes = 5;
      let shiftVectorInfRight = [0, 0];
    let fontSizeInfinity = 62;

if (window.innerWidth < 600) {

        shiftVectorInf = [-0.6, 0];
        size_holy_spirit_arrow = 30;
        shiftVectorInfRight = [-0.3,0];
        height_axes = 7;
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
            im: -(y - svgCenter[1]) / (axes.height / 5)
        };
    }



    const startPoint = axes.c2p(0, 0);




    // Add the father dot
    const fatherDot = svg.append("circle")
        .attr("class", "father-dot")
        .attr("cx", startPoint[0])
        .attr("cy", startPoint[1])
        .attr("r", 12)
        .attr("fill", "white")
        .style("opacity", 1);

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
    createGridLines(tightRange, "tight", 1, 1);

    // Create additional spaced out lines
    const largeRange = d3.range(1, NlargeGrid + 1)
        .flatMap(i => [-Ngrid - i * largeGridSpacing, Ngrid + i * largeGridSpacing]);
    createGridLines(largeRange, "large", 1, 1);

    return grid;
}




    function createArrowInstant(svg, x, y, angle, size, color) {
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
           .attr("stroke-width", 5)
           .attr("fill", "none")
           .style("opacity",1);

        return arrow;
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





 // Create all objects at the beginning
const grid = createGrid(svg, axes);
                // Make sure the original grid is visible
grid.style("stroke", "lightblue")
    .style("stroke-width", 1)
    .style("opacity", 1);

// Make sure the grid is behind other elements
grid.lower();


arrowFinalX = 3.2;

// Get the coordinates where you want to place the arrow
const [arrowX, arrowY] = axes.c2p(arrowFinalX, 0);

// Create the arrow
const arrow = createArrowInstant(svg, arrowX, arrowY, 0, size_holy_spirit_arrow, "yellow");








svg.append("text").attr("class", "sign-holy-spirit-arrow");

//update
    svg.selectAll(".sign-holy-spirit-arrow")
        .attr("x", axes.c2p(3 + shiftVectorInf[0]+shiftVectorInfRight[0], 0.4)[0])
        .attr("y", axes.c2p(3 + shiftVectorInf[0], 0.4)[1])
        .attr("font-size", fontSizeInfinity)
        .attr("fill", "yellow")
        .text("+∞")
        .style("opacity", 1)
        ;


grid.transition()
    .delay(delayGridOut)
    .duration(durationGridOut)
    .style("opacity",0);



// Transition the line to the new position
linej.transition()
    .delay(delayReposition)
    .duration(durationReposition)
    .attr("y1", axes.c2p(0, 1.5)[1])
    .attr("y2", axes.c2p(1, 1.5)[1]);

// Calculate the shift
const startPointShiftEnd = axes.c2p(3.0, 0);
const endPointShiftEnd = axes.c2p(2.6, 0);
const shiftX = endPointShiftEnd[0] - startPointShiftEnd[0];
const shiftY = 0;


// Update the arrow position
arrow.transition()
    .delay(delayReposition)
    .duration(durationReposition)
    .attr("transform", `translate(${shiftX}, ${shiftY})`);

// Update the label position
svg.selectAll(".sign-holy-spirit-arrow")
    .transition()
    .delay(delayReposition)
    .duration(durationReposition)
    .attr("x", d => axes.c2p(3 + shiftVectorInf[0] , 0.4)[0] + shiftX)
    .attr("y", d => axes.c2p(3 + shiftVectorInf[0], 0.4)[1] + shiftY)
    .attr("font-size", fontSizeInfinity)
    .attr("fill", "yellow")
    .text("+∞")
    .style("opacity", 1);



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
