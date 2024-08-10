console.log("infinityClosureIntro.js loaded");
window.infinityClosureIntro = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
 


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

    let fontSize = "36px"; // Set the font size for all labels



    const delayAppearE = 2000;
    const durationAppearE = 1000;

    const delayAppearEprime = delayAppearE + durationAppearE + 2000;
    const durationAppearEprime = 1000;


    // Define the heightRectangle variable
    let heightRectangle = 20;

    // Adjust heightRectangle for mobile if needed
    if (window.innerWidth < 600) {
        heightRectangle = 15; 
    }



    const totalDuration = delayAppearEprime + durationAppearEprime + 500;


    let mobileRatio = 1;
    let mobileRatioLight = 1;

    let curlyParameter = 0.55;

    let shiftVectorInf = [-0.4, 0];
    let size_holy_spirit_arrow = 50 ;

    let height_axes = 5;
    let shiftVectorInfRight = [0, 0];
    let fontSizeInfinity = 62;

        let brace_stroke_width = 4;
if (window.innerWidth < 600) {
        brace_stroke_width = 3;
        fontSize = "24px";
    }

if (window.innerWidth < 600) {

        shiftVectorInf = [-0.6, 0];
        size_holy_spirit_arrow = 30;
        shiftVectorInfRight = [-0.3,0];
        //height_axes = 7 ;
        fontSizeInfinity = 50;
        mobileRatio = 0.5;
        mobileRatioLight = 0.85;
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





    // Function to create curly brace
    function makeCurlyBrace(x1, y1, x2, y2, w, q, isTop = false,mobileRatio = 1) {
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

            var smallUpwardPath = `l 0 ${directionFactor * 4 * mobileRatio}`; // add a longer tick in the middle of the bracket
            var smallFeetDownwardPath = `l 0 ${-directionFactor * 3}`; // add a longer tick in the middle of the bracket

        if (mobileRatio < 1) {
            smallUpwardPath = `l 0 ${directionFactor * 0}`;
        }
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
    const startPoint = axes.c2p(0, 0);


    const startPoint_e = axes.c2p(0, 0);
    const endPoint_e = axes.c2p(1, 0);

    const startPoint_eprime = axes.c2p(0, -0.8);
    const endPoint_eprime = axes.c2p(0.66, -0.8);


    // Add the bottom brace (ex)
    const bottomBrace_e = svg.append("path")
        .attr("d", makeCurlyBrace(startPoint_e[0], startPoint_e[1] + 20, endPoint_e[0], endPoint_e[1] + 20, 20, curlyParameter, isTop=false,mobileRatio))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", brace_stroke_width)
        .style("opacity",0)
        .transition()
        .delay(delayAppearE)
        .duration(durationAppearE)
        .style("opacity",1);



    // Add the top left label (e)
    const topLeftLabel = svg.append("text")
        .attr("class", "label-e-father")
        .attr("x", (startPoint_e[0] + endPoint_e[0]) / 2)
        .attr("y", startPoint_e[1] + 70*mobileRatioLight)  // Adjusted y-position for larger font
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("font-size", fontSize)  // Set font size
        .text("e")
        .style("opacity",0)
        .transition()
        .delay(delayAppearE)
        .duration(durationAppearE)
        .style("opacity",1);



    // Add the bottom brace (ex)
    const bottomBrace_eprime = svg.append("path")
        .attr("d", makeCurlyBrace(startPoint_eprime[0], startPoint_eprime[1] + 20, endPoint_eprime[0], endPoint_eprime[1] + 20, 20, curlyParameter, isTop=false,mobileRatio))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", brace_stroke_width)
        .style("opacity",0)
        .transition()
        .delay(delayAppearEprime)
        .duration(durationAppearEprime)
        .style("opacity",1);


    // Add the top right label (e')
    const topRightLabel = svg.append("text")
        .attr("class", "label-e-father")
        .attr("x", (startPoint_eprime[0] + endPoint_eprime[0]) / 2)
        .attr("y", startPoint_eprime[1] + 70*mobileRatioLight)  // Adjusted y-position for larger font
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("font-size", fontSize)  // Set font size
        .text("e'")
        .style("opacity",0)
        .transition()
        .delay(delayAppearEprime)
        .duration(durationAppearEprime)
        .style("opacity",1);

/*
        .transition()
        .delay(delayShift)
        .duration(durationShift)
        .style("opacity", 0);
*/

    // Add the father dot
    const fatherDot = svg.append("circle")
        .attr("class", "father-dot")
        .attr("cx", startPoint[0])
        .attr("cy", startPoint[1])
        .attr("r", 12)
        .attr("fill", "white")
        .style("opacity", 1);


    fatherDot.raise(); // Ensure father-dot stays on top




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



arrowFinalX = 3.2;

// Get the coordinates where you want to place the arrow
const [arrowX, arrowY] = axes.c2p(arrowFinalX, 0);

// Create the arrow
const arrow = createArrowInstant(svg, arrowX + shiftX, arrowY + shiftY, 0, size_holy_spirit_arrow, "yellow");




svg.append("text").attr("class", "sign-holy-spirit-final");

//update
    svg.selectAll(".sign-holy-spirit-final")
        .attr("x", axes.c2p(3 + shiftVectorInf[0], 0.4)[0]+ shiftX)
        .attr("y", axes.c2p(3 + shiftVectorInf[0], 0.4)[1])
        .attr("font-size", fontSizeInfinity)
        .attr("fill", "yellow")
        .text("+∞")
        .style("opacity", 1)
        ;


    // Add the rectangle
    const rectangle_e = svg.append("rect")
        .attr("class", "large-tick")
        .attr("x", axes.c2p(1 + 0.01, -0.00)[0])
        .attr("y", axes.c2p(1 + 0.01, -0.00)[1])
        .attr("width", 5)
        .attr("height", heightRectangle)
        .attr("fill", "white")
        .attr("transform", `translate(-5, ${-heightRectangle/2})`)
        .style("opacity",0)
        .transition()
        .delay(delayAppearE)
        .duration(durationAppearE)
        .style("opacity",1);

    // Add the rectangle
    const rectangle_eprime = svg.append("rect")
        .attr("class", "large-tick")
        .attr("x", axes.c2p(0.66 + 0.01, -0.00)[0])
        .attr("y", axes.c2p(0.66 + 0.01, -0.00)[1])
        .attr("width", 5)
        .attr("height", heightRectangle)
        .attr("fill", "white")
        .attr("transform", `translate(-5, ${-heightRectangle/2})`)
        .style("opacity",0)
        .transition()
        .delay(delayAppearEprime)
        .duration(durationAppearEprime)
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
                    clearInterval(checkCancelLoop);
                }

            }, 100);

};
