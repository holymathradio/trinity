console.log("Intro3GeoLabel.js loaded");

window.AdditionCommutativitySwitchAndSwitchback = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
       console.log("AdditionCommutativityIntro function called");

    const defaultSetIsCanceled = () => false;
    const defaultGetIsCanceled = () => false;

    // Use provided functions or fall back to defaults
    setIsCanceled = setIsCanceled || defaultSetIsCanceled;
    getIsCanceled = getIsCanceled || defaultGetIsCanceled;

    setTimeout(() => setIsCanceled(false), 10); //setting back to false at start of animation
  
    const fontSize = "36px"; // Set the font size for all labels

    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");
    const width = svgWidth * 1;
    const height = svgHeight * 1;

    const delayShift = 1000; // delay for ex and its brace
    const durationshift = 2500; // duration for ex and its brace

    const delayShiftBack = delayShift + durationshift  + 4000; // delay for ex and its brace
    const durationShiftBack = 1500; // duration for ex and its brace

    const delayShiftAgain = delayShiftBack + durationShiftBack + 2000 ;
    const durationShiftAgain = 2500;

    const totalDuration = delayShiftAgain + durationShiftAgain + 1000 ;


    let brace_stroke_width = 4;
if (window.innerWidth < 600) {
        brace_stroke_width = 3;
    }

    const axes = {
        xRange: [-5, 5, 1],
        yRange: [-2, 2, 0.5],
        width: width,
        height: height,
        c2p: (x, y) => [width / 2 + (x * width / 10), height / 2 - (y * height / 4)]
    };

    const startPoint = axes.c2p(0, 0);
    const endPoint = axes.c2p(Math.PI, 0);

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
        .attr("x2", endPoint[0])
        .attr("y2", endPoint[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 2);

    // Add the bottom brace (ex)
    const bottomBrace = svg.append("path")
        .attr("d", makeCurlyBrace(startPoint[0], startPoint[1] + 20, endPoint[0], endPoint[1] + 20, 20, 0.6))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", brace_stroke_width);

    // Add the bottom label (ex)
    svg.append("text")
        .attr("class", "label-e-father")
        .attr("x", (startPoint[0] + endPoint[0]) / 2)
        .attr("y", startPoint[1] + 70)  // Adjusted y-position for larger font
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("font-size", fontSize)  // Set font size
        .html("e<tspan baseline-shift='sub' font-size='0.7em' font-style='italic'>x</tspan>");

    // Add the top left brace (e)
    const midPoint = [startPoint[0] + (endPoint[0]-startPoint[0])*3/5, startPoint[1]];
    const midPointSwitched = [startPoint[0] + (endPoint[0]-startPoint[0])*2/5, startPoint[1]];

    const topLeftBrace = svg.append("path")
        .attr("d", makeCurlyBrace(startPoint[0], startPoint[1] - 20, midPoint[0], midPoint[1] - 20, 20, 0.5, true))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", brace_stroke_width);

    // Add the top left label (e)
    const topLeftLabel = svg.append("text")
        .attr("class", "label-e-father")
        .attr("x", (startPoint[0] + midPoint[0]) / 2)
        .attr("y", startPoint[1] - 60)  // Adjusted y-position for larger font
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("font-size", fontSize)  // Set font size
        .text("e");

    // Add the top right brace (e')
    const topRightBrace = svg.append("path")
        .attr("d", makeCurlyBrace(midPoint[0], midPoint[1] - 20, endPoint[0], endPoint[1] - 20, 20, 0.5, true))
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-width", brace_stroke_width);

    // Add the top right label (e')
    const topRightLabel = svg.append("text")
        .attr("class", "label-e-father")
        .attr("x", (midPoint[0] + endPoint[0]) / 2)
        .attr("y", endPoint[1] - 60)  // Adjusted y-position for larger font
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .attr("font-size", fontSize)  // Set font size
        .text("e'");

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
        .attr("transform", `translate(-5, -10)`)
        ;

    fatherDot.raise(); // Ensure father-dot stays on top


         // Animate braces and labels
    topLeftBrace.transition()
        .delay(delayShift)
        .duration(durationshift)
        .attr("d", makeCurlyBrace(midPointSwitched[0], midPointSwitched[1] - 20, endPoint[0], endPoint[1] - 20, 20, 0.5, true));

    topLeftLabel.transition()
        .delay(delayShift)
        .duration(durationshift)
        .attr("x", (midPointSwitched[0] + endPoint[0]) / 2)
        .attr("y", midPointSwitched[1] - 60);

    topRightBrace.transition()
        .delay(delayShift)
        .duration(durationshift)
        .attr("d", makeCurlyBrace(startPoint[0], startPoint[1] - 20, midPointSwitched[0], midPointSwitched[1] - 20, 20, 0.5, true));

    topRightLabel.transition()
        .delay(delayShift)
        .duration(durationshift)
        .attr("x", (startPoint[0] + midPointSwitched[0]) / 2)
        .attr("y", startPoint[1] - 60);

    // Shift back


     // Animate braces and labels
    topLeftBrace.transition()
        .delay(delayShiftBack)
        .duration(durationShiftBack)
        .attr("d", makeCurlyBrace(startPoint[0], startPoint[1] - 20, midPoint[0], midPoint[1] - 20, 20, 0.5, true));

    topLeftLabel.transition()
        .delay(delayShiftBack)
        .duration(durationShiftBack)
        .attr("x", (startPoint[0] + midPoint[0]) / 2)
        .attr("y", midPointSwitched[1] - 60);

    topRightBrace.transition()
        .delay(delayShiftBack)
        .duration(durationShiftBack)
        .attr("d", makeCurlyBrace(midPoint[0], midPoint[1] - 20, endPoint[0], endPoint[1] - 20, 20, 0.5, true));

    topRightLabel.transition()
        .delay(delayShiftBack)
        .duration(durationShiftBack)
        .attr("x", (midPoint[0] + endPoint[0]) / 2)
        .attr("y", startPoint[1] - 60);


    // Animate braces and labels
    topLeftBrace.transition()
        .delay(delayShiftAgain)
        .duration(durationShiftAgain)
        .attr("d", makeCurlyBrace(midPointSwitched[0], midPointSwitched[1] - 20, endPoint[0], endPoint[1] - 20, 20, 0.5, true));

    topLeftLabel.transition()
        .delay(delayShiftAgain)
        .duration(durationShiftAgain)
        .attr("x", (midPointSwitched[0] + endPoint[0]) / 2)
        .attr("y", midPointSwitched[1] - 60);

    topRightBrace.transition()
        .delay(delayShiftAgain)
        .duration(durationShiftAgain)
        .attr("d", makeCurlyBrace(startPoint[0], startPoint[1] - 20, midPointSwitched[0], midPointSwitched[1] - 20, 20, 0.5, true));

    topRightLabel.transition()
        .delay(delayShiftAgain)
        .duration(durationShiftAgain)
        .attr("x", (startPoint[0] + midPointSwitched[0]) / 2)
        .attr("y", startPoint[1] - 60);




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