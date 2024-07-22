console.log("Intro3Geo.js loaded");

window.Intro3Geo = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
        // Resize the SVG to 800x600
setTimeout(() => setIsCanceled(false), 10);

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





    //let timeoutId;

        svg.append("circle")
        .attr("class", "father-dot")
        .attr("r", 12)
        .attr("fill", "white");

    svg.append("line")
        .attr("class", "linej");
/*
    svg.append("text")
        .attr("class", "sign-holy-spirit")
        .attr("font-size", "66")
        .attr("fill", "yellow")
        .style("opacity", 0)
        .text(">");
*/


            svg.append("text")
        .attr("class", "transition")
        .attr("font-size", "10")
        .attr("fill", "yellow")
        .style("opacity", 0)
        .text("transition");

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


 function createArrow(svg, x, y, angle, size, color) {
    // Convert angle from degrees to radians
    const rad = angle * Math.PI / 180;
    
    // Calculate end points of the two lines
    const x1 = x + size * Math.cos(rad + 7*Math.PI / 8);
    const y1 = y + size * Math.sin(rad + 7*Math.PI / 8);
    const x2 = x + size * Math.cos(rad - 7*Math.PI / 8);
    const y2 = y + size * Math.sin(rad - 7*Math.PI / 8);
    
    // Create the arrow using a path element
    return svg.append("path")
        .attr("class", "sign-holy-spirit")
       .attr("d", `M${x1},${y1} L${x},${y} L${x2},${y2}`)
       .attr("stroke", color)
       .attr("stroke-width", 5)
       .attr("fill", "none")
       .style("opacity",0);
}

// Get the coordinates where you want to place the arrow
const [arrowX, arrowY] = axes.c2p(4.4, 0);

// Create the arrow
createArrow(svg, arrowX, arrowY, 0, 40, "yellow");

        // Create scales
        const xScale = d3.scaleLinear().domain([axes.xRange[0], axes.xRange[1]]).range([0, axes.width]);
        const yScale = d3.scaleLinear().domain([axes.yRange[0], axes.yRange[1]]).range([axes.height, 0]);

        const xAxis = d3.axisBottom(xScale).ticks(axes.xRange[2]);
        const yAxis = d3.axisLeft(yScale).ticks(axes.yRange[2]);

        svg.selectAll(".axis").remove();

        const xAxisGroup = svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(0, ${height / 2})`)
            .call(xAxis);

        const yAxisGroup = svg.append("g")
            .attr("class", "axis")
            .attr("transform", `translate(${width / 2}, 0)`)
            .call(yAxis);

        // Hide axis lines
        xAxisGroup.selectAll("path").style("opacity", 0);
        yAxisGroup.selectAll("path").style("opacity", 0);

        // Hide axis ticks and labels at 0
        xAxisGroup.selectAll("line, text").style("opacity", 0);
        yAxisGroup.selectAll("line, text").style("opacity", 0);

        // Update dot position
        svg.selectAll(".father-dot")
            .attr("cx", axes.c2p(-4.5, 0)[0])
            .attr("cy", axes.c2p(-4.5, 0)[1])
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .transition()
            .duration(4000)
            .attr("cx", axes.c2p(0, 0)[0])
            .attr("cy", axes.c2p(0, 0)[1]);

        // Update line position
        const linej = svg.selectAll(".linej")
            .attr("x1", axes.c2p(-4.5, 1)[0])
            .attr("y1", axes.c2p(-4.5, 1)[1])
            .attr("x2", axes.c2p(-3.5, 1)[0])
            .attr("y2", axes.c2p(-3.5, 1)[1])
            .attr("stroke", "yellow")
            .attr("stroke-width", 5);

        linej.style("opacity", 0)
            .transition()
            .delay(4000)
            .duration(1000)
            .style("opacity", 1)
            .transition()
            .duration(4000)
            .attr("x1", axes.c2p(0, 1)[0])
            .attr("y1", axes.c2p(0, 1)[1])
            .attr("x2", axes.c2p(1, 1)[0])
            .attr("y2", axes.c2p(1, 1)[1]);



        // Update text positions
        const signHolySpirit = svg.selectAll(".sign-holy-spirit")
            .attr("x", axes.c2p(4, 0)[0])
            .attr("y", axes.c2p(4, 0)[1] + 23); // Shift down by half of its height (22 is half of font size 44, but 11 works)



        const shiftVectorInf = [-0.4, 0];
        const signHolySpiritLabel = svg.selectAll(".sign-holy-spirit-label")
            .attr("x", axes.c2p(4 + shiftVectorInf[0], 0.5)[0])
            .attr("y", axes.c2p(4 + shiftVectorInf[0], 0.5)[1]);



    //updateSizes();
    //window.addEventListener("resize", updateSizes);



        svg.select(".sign-holy-spirit")
            .transition()
            .delay(9000)  // Wait for 3 seconds before making the text appear
            .duration(1000)
            .style("opacity", 1);

        

        // Call to next animation
const timeoutId = setTimeout(() => {

                    if (callback && !getIsCanceled()) {
                        //console.log("calling")

                        callback();
                    } 
                }, 10000);


// Cancel the timeout in advance 
const checkCancelLoop = setInterval(() => {
                if (getIsCanceled && getIsCanceled()) {
                    clearTimeout(timeoutId);
                    clearInterval(checkCancelLoop);
                }

            }, 100);


};
