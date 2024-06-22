console.log("Intro3GeoLabel.js loaded");

window.Intro3GeoLabel = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("Intro3GeoLabel function called");
    setTimeout(() => setIsCanceled(false), 10);
    d3.select("#svg-container svg").selectAll("*").remove();


svg.append("circle").attr("class", "father-dot");
svg.append("line").attr("class", "linej");
svg.append("text").attr("class", "label-zero");
svg.append("text").attr("class", "label-one");
svg.append("text").attr("class", "sign-holy-spirit");
svg.append("text").attr("class", "sign-holy-spirit-label");

// mobile adjustment
    let shiftVectorInf = [-0.4, 0];
    let zeroMobileShift = 0 ;
    //console.log("shifting vecto" , window.innerWidth)
     if (window.innerWidth < 600) {
        //console.log("shifting vecto")
         shiftVectorInf = [-0.6, 0];
         zeroMobileShift = -0.05 ;
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
        .attr("cx", axes.c2p(0, 0)[0])
        .attr("cy", axes.c2p(0, 0)[1])
        .attr("r", 12)
        .attr("fill", "white")
        .style("opacity", 1);

    // Add label "0" below the father_dot
    svg.selectAll(".label-zero")
        .attr("x", axes.c2p(0, 0)[0])
        .attr("y", axes.c2p(0, -0.6 + zeroMobileShift)[1])
        .attr("font-size", "66")
        .attr("fill", "white")
        .attr("font-weight", "regular")
        .attr("text-anchor", "middle")
        .style("opacity", 0)
        .text("0")
        .transition()
        .delay(1000)  // Delay before appearing
        .duration(1000)
        .style("opacity", 1);

    // Update line position
    const linej = svg.selectAll(".linej")
        .attr("x1", axes.c2p(0, 1)[0])
        .attr("y1", axes.c2p(0, 1)[1])
        .attr("x2", axes.c2p(1, 1)[0])
        .attr("y2", axes.c2p(1, 1)[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 5)
        .style("opacity", 1);

    // Add label "1" next to the linej on the right
    svg.selectAll(".label-one")
        //.attr("x", axes.c2p(0.5, 1.25)[0])
        //.attr("y", axes.c2p(0.5, 1.25)[1])
        .attr("x", axes.c2p(1.25, 1.25)[0])
        .attr("y", axes.c2p(1.25, 1.25)[1])
        .attr("font-size", "66")
        .attr("fill", "yellow")
        .attr("font-weight", "regular")
        .attr("text-anchor", "middle")
        //.attr("dominant-baseline", "middle")  // Vertically center the text
        .style("opacity", 0)
        .text("1")
        .transition()
        .delay(3000)  // Delay before appearing
        .duration(1000)
        .style("opacity", 1);

    // Update text positions
    svg.selectAll(".sign-holy-spirit")
            .attr("x", axes.c2p(4, 0)[0])
            .attr("y", axes.c2p(4, 0)[1] + 23) // Shift down by half of its height (22 is half of font size 44, but 11 works)
        .attr("font-size", "66")
        .attr("fill", "yellow")
        .style("opacity", 1)
        .text(">");

    svg.selectAll(".sign-holy-spirit-label")
        .attr("x", axes.c2p(4 + shiftVectorInf[0], 0.4)[0])
        .attr("y", axes.c2p(4 + shiftVectorInf[0], 0.4)[1])
        //.attr("x", axes.c2p(4 + shiftVectorInf[0], -0.6)[0])
        //.attr("y", axes.c2p(4 + shiftVectorInf[0], -0.6)[1])
        .attr("font-size", "62")
        .attr("fill", "yellow")
        .style("opacity", 0)
        .text("+∞")
        .transition()
        .delay(5000)  // Delay before appearing
        .duration(1000)
        .style("opacity", 1)
        ;




// Call to next animation
const timeoutId = setTimeout(() => {

                    if (callback && !getIsCanceled()) {
                        //console.log("calling")

                        callback();
                    } 
                }, 5000+ 1000 + 1000);


// Cancel the timeout in advance 
const checkCancelLoop = setInterval(() => {
                if (getIsCanceled && getIsCanceled()) {
                    clearTimeout(timeoutId);
                    clearInterval(checkCancelLoop);
                }

            }, 100);


};