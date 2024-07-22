console.log("Intro3GeoLabelFinalScene.js loaded");

window.Intro3GeoLabelFinalScene = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("Intro3GeoLabelFinalScene function called");
    //setIsCanceled(false)
    svg.selectAll("*").remove();

function getPerpendicularLineEquation(x1, y1, x2, y2, x) {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
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
    let zeroMobileShift = 0 ;
    let espaceMobileShift = 0 ;
    let markerSize = 12
    //console.log("display width of current screen" , window.innerWidth)
     if (window.innerWidth < 600) {
        markerSize = 8 ;
         shiftVectorInf = [-0.6, 0];
         zeroMobileShift = -0.05 ;
         espaceMobileShift = -8 ;
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

    svg.selectAll(".label-zero")
        .attr("x", axes.c2p(0, 0)[0])
        .attr("y", axes.c2p(0, -0.6 + zeroMobileShift )[1])
        .attr("font-size", "66")
        .attr("fill", "white")
        .attr("font-weight", "regular")
        .attr("text-anchor", "middle")
        .style("opacity", 1)
        .text("0");

    const linej = svg.selectAll(".linej")
        .attr("x1", axes.c2p(0, 1)[0])
        .attr("y1", axes.c2p(0, 1)[1])
        .attr("x2", axes.c2p(1, 1)[0])
        .attr("y2", axes.c2p(1, 1)[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 5)
        .style("opacity", 1);

    svg.selectAll(".label-one")
        .attr("x", axes.c2p(1.25, 1.25)[0])
        .attr("y", axes.c2p(1.25, 1.25)[1])
        .attr("font-size", "66")
        .attr("fill", "yellow")
        .attr("font-weight", "regular")
        .attr("text-anchor", "middle")
        .style("opacity", 1)
        .text("1");


            function createArrow(svg, x, y, angle, size, color) {
    // Convert angle from degrees to radians
    const rad = angle * Math.PI / 180;
    
    // Calculate end points of the two lines
    const x1 = x + size * Math.cos(rad + 7*Math.PI / 8);
    const y1 = y + size * Math.sin(rad + 7*Math.PI / 8);
    const x2 = x + size * Math.cos(rad - 7*Math.PI / 8);
    const y2 = y + size * Math.sin(rad - 7*Math.PI / 8);
    
    // Create the arrow using a path element
    svg.append("path")
       .attr("d", `M${x1},${y1} L${x},${y} L${x2},${y2}`)
       .attr("stroke", color)
       .attr("stroke-width", 5)
       .attr("fill", "none");
}

// Get the coordinates where you want to place the arrow
const [arrowX, arrowY] = axes.c2p(4.4, 0);

// Create the arrow
createArrow(svg, arrowX, arrowY, 0, 40, "yellow");

/*
    svg.selectAll(".sign-holy-spirit")
            .attr("x", axes.c2p(4, 0)[0])
            .attr("y", axes.c2p(4, 0)[1] + 23) // Shift down by half of its height (22 is half of font size 44, but 11 works)
        .attr("font-size", "66")
        .attr("fill", "yellow")
        .style("opacity", 1)
        .text(">");
*/



    svg.selectAll(".sign-holy-spirit-label")
        .attr("x", axes.c2p(4 + shiftVectorInf[0], 0.4)[0])
        .attr("y", axes.c2p(4 + shiftVectorInf[0], 0.4)[1])
        .attr("font-size", "62")
        .attr("fill", "yellow")
        .style("opacity", 1)
        .text("+∞");

    const startPoint = axes.c2p(0, 0);
    const endPoint = axes.c2p(Math.PI, 0);
    const topPoint = axes.c2p(1, 1);

    const linex = svg.append("line")
        .attr("class", "linex")
        .attr("x1", startPoint[0])
        .attr("y1", startPoint[1])
        .attr("x2", endPoint[0])
        .attr("y2", endPoint[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 2);

    const dx = endPoint[0] - topPoint[0];
    const dy = endPoint[1] - topPoint[1];
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = dist / (2 * Math.sin(Math.PI / 6));
    const midX = (topPoint[0] + endPoint[0]) / 2;
    const midY = (topPoint[1] + endPoint[1]) / 2;
    const angle = Math.atan2(dy, dx);
    const initialControlX = midX - radius * Math.sin(angle) + 20;
    const initialControlY = midY + radius * Math.cos(angle) - 23;
    const targetPoint = axes.c2p(1, 1);

    const { adjustedControlX, adjustedControlY } = getControlPointAdjustment(initialControlX, initialControlY, radius, angle + Math.PI + Math.PI / 3, targetPoint);

    const curvePath = d3.path();
    curvePath.arc(adjustedControlX, adjustedControlY, radius, angle + Math.PI + Math.PI / 3, angle + Math.PI + Math.PI / 3 + Math.PI / 3.3, false);

    svg.append("path")
        .attr("class", "timex-3geo-final")
        .attr("fill", "none")
        .attr("stroke", "yellow")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow-3geo-final)")
        .attr("d", curvePath.toString());



    svg.append("defs").append("marker")
        .attr("id", "arrow-3geo-final")
        .attr("viewBox", "0 0 20 20")
        .attr("refX", "10")
        .attr("refY", "10")
        .attr("markerWidth", markerSize)
        .attr("markerHeight", markerSize)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 20 10 L 0 20 z")
        .attr("fill", "yellow");

    svg.append("text")
        .attr("class", "label-space-e-pi")
        .attr("x", (startPoint[0] + endPoint[0]) / 2)
        .attr("y", startPoint[1] + 50 + espaceMobileShift)
        .attr("font-size", "24")
        .attr("fill", "grey")
        .attr("text-anchor", "middle")
        .text("e (space)");

    const bracePath = d3.path();
    bracePath.moveTo(startPoint[0], startPoint[1] + 20);
    bracePath.lineTo(endPoint[0], endPoint[1] + 20);

    svg.append("path")
        .attr("class", "brace-pi")
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", 2)
        .attr("d", bracePath.toString())
        .style("opacity", 1);

    svg.append("text")
        .attr("class", "label-time-e-pi")
        .attr("x", axes.c2p(2.3, 0.8)[0])
        .attr("y", axes.c2p(2.3, 0.8)[1])
        .attr("font-size", "24")
        .attr("fill", "grey")
        .text("e (time)")
        .style("opacity", 1);

    svg.append("text")
        .attr("class", "teleology")
        .attr("x", axes.c2p(1.2, 0.4)[0])
        .attr("y", axes.c2p(1.2, 0.4)[1])
        .attr("font-size", "24")
        .attr("fill", "yellow")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .text("σ (teleology)");

    svg.append("rect")
        .attr("class", "large-tick")
        .attr("x", axes.c2p(Math.PI + 0.01, -0.00)[0])
        .attr("y", axes.c2p(Math.PI + 0.01, -0.00)[1])
        .attr("width", 5)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("transform", `translate(-5, -10)`);

    svg.append("text")
        .attr("class", "label-x")
        .attr("x", axes.c2p(Math.PI, -0.42)[0])
        .attr("y", axes.c2p(Math.PI, -0.42)[1])
        .attr("font-size", "50")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("font-style", "italic")
        .attr("dominant-baseline", "central")
        .text("𝑥");

    fatherDot.raise(); // Ensure father-dot stays on top



};