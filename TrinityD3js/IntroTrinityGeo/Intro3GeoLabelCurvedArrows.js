console.log("Intro3GeoLabelCurvedArrows.js loaded");

window.Intro3GeoLabelCurvedArrows = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("Intro3GeoLabelCurvedArrows function called");
setTimeout(() => setIsCanceled(false), 10);
    svg.selectAll("*").remove();
    function getPerpendicularLineEquation(x1, y1, x2, y2, x) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const segmentSlope = (y2 - y1) / (x2 - x1);
        const perpSlope = -1 / segmentSlope;
        const c = midY - perpSlope * midX;
        return x * perpSlope + c;
    }



    const delayX = 2000;
    const durationX = 1000 ;
    const delaySpace = delayX + durationX + 2000 ;
    const delayTime = delaySpace + 2500;
    const delayLabel = delayTime  + 2500 ;
    const delayNewlabel = 2500 ; 

// mobile adjustment
    let shiftVectorInf = [-0.4, 0];
    let zeroMobileShift = 0 ;
    let espaceMobileShift = 0 ;
    let markerSize = 12
    //console.log("shifting vecto" , window.innerWidth)
     if (window.innerWidth < 600) {
        //console.log("shifting vecto")
         shiftVectorInf = [-0.6, 0];
         zeroMobileShift = -0.05 ;
         espaceMobileShift = -8 ;
         markerSize = 8 ;
    }
    svg.append("circle").attr("class", "father-dot");
    svg.append("line").attr("class", "linej");
    svg.append("text").attr("class", "label-zero");
    svg.append("text").attr("class", "label-one");
    svg.append("text").attr("class", "sign-holy-spirit");
    svg.append("text").attr("class", "sign-holy-spirit-label");

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

    function computeArcStartPoint(controlX, controlY, radius, angle, arcExtent) {
        const startX = controlX + radius * Math.cos(angle );
        const startY = controlY + radius * Math.sin(angle );
        return { startX, startY };
    }

    function getControlPointAdjustment(initialControlX, initialControlY, radius, angle, arcExtent, targetPoint) {
        const { startX, startY } = computeArcStartPoint(initialControlX, initialControlY, radius, angle, arcExtent);
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
        .attr("y", axes.c2p(0, -0.6 + zeroMobileShift)[1])
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
        .attr("x2", startPoint[0])
        .attr("y2", startPoint[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 2);

    const duration = durationX;
    const frameRate = 60;
    const totalFrames = (durationX / 1000) * frameRate;
    let currentFrame = 0;

    function animateLine() {
        const t = currentFrame / totalFrames;
        linex.attr("x2", startPoint[0] + t * (endPoint[0] - startPoint[0]))
             .attr("y2", startPoint[1] + t * (endPoint[1] - startPoint[1]));
        fatherDot.raise(); // keep dot above
        if (currentFrame < totalFrames) {
            currentFrame++;
            requestAnimationFrame(animateLine);
        }
    }

    setTimeout(() => {
        requestAnimationFrame(animateLine);
    }, delaySpace);

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

    const { adjustedControlX, adjustedControlY } = getControlPointAdjustment(initialControlX, initialControlY, radius, angle + Math.PI + Math.PI / 3, Math.PI / 3, targetPoint);

    const x1 = 1;
    const y1 = 1;
    const x2 = Math.PI;
    const y2 = 0;
    const pivotPoint = axes.c2p(1, getPerpendicularLineEquation(x1, y1, x2, y2, 1));

    const curvePath = d3.path();
    curvePath.moveTo(topPoint[0], topPoint[1]);

    svg.append("path")
        .attr("class", "timex")
        .attr("fill", "none")
        .attr("stroke", "yellow")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow)")
        .attr("d", curvePath.toString());

    const timex = svg.select(".timex");

    for (let x = 0; x <= Math.PI / 3.3; x += 0.01) {
        setTimeout(() => {
            const newPath = d3.path();
            newPath.arc(adjustedControlX, adjustedControlY, radius, angle + Math.PI + Math.PI / 3, angle + Math.PI + Math.PI / 3 + x, false);
            timex.attr("d", newPath.toString());
        },  delayTime + x * 1200);
    }




    svg.append("defs").append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 0 20 20")
        .attr("refX", "10")
        .attr("refY", "10")
        .attr("markerWidth", markerSize)
        .attr("markerHeight", markerSize)
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 20 10 L 0 20 z")
        .attr("fill", "yellow")
        .style("opacity", 0)
        .transition()
        .delay(delayTime)
        .duration(1000)
        .style("opacity", 1);

    const bracePath = d3.path();
    bracePath.moveTo(startPoint[0], startPoint[1] + 20);
    bracePath.lineTo(endPoint[0], endPoint[1] + 20);

    svg.append("path")
        .attr("class", "brace-pi")
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", 2)
        .attr("d", bracePath.toString())
        .style("opacity", 0)
        .transition()
        .delay(delayLabel)
        .duration(1000)
        .style("opacity", 1);

    svg.append("text")
        .attr("class", "label-space-e-pi")
        .attr("x", (startPoint[0] + endPoint[0]) / 2)
        .attr("y", startPoint[1] + 50 + espaceMobileShift)
        .attr("font-size", "24")
        .attr("fill", "grey")
        .attr("text-anchor", "middle")
        .text("e (space)")
        .style("opacity", 0)
        .transition()
        .delay(delayLabel)
        .duration(1000)
        .style("opacity", 1);

    svg.append("text")
        .attr("class", "label-time-e-pi")
        .attr("x", axes.c2p(2.3, 0.8)[0])
        .attr("y", axes.c2p(2.3, 0.8)[1])
        .attr("font-size", "24")
        .attr("fill", "grey")
        .text("e (time)")
        .style("opacity", 0)
        .transition()
        .delay(delayLabel + delayNewlabel)
        .duration(1000)
        .style("opacity", 1);

    svg.append("text")
        .attr("class", "teleology")
        .attr("x", axes.c2p(1.2, 0.4)[0])
        .attr("y", axes.c2p(1.2, 0.4)[1])
        .attr("font-size", "24")
        .attr("fill", "yellow")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .text("σ (teleology)")
        .style("opacity", 0);

    svg.append("text")
        .attr("class", "transition")
        .attr("font-size", "10")
        .text("transition")
        .style("opacity", 0);

    svg.append("rect")
        .attr("class", "large-tick")
        .attr("x", axes.c2p(Math.PI + 0.01, -0.00)[0])
        .attr("y", axes.c2p(Math.PI + 0.01, -0.00)[1])
        .attr("width", 5)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("transform", `translate(-5, -10)`)
        .style("opacity", 0)
        .transition()
        .delay(delayX)
        .duration(durationX)
        .style("opacity", 1);

    svg.append("text")
        .attr("class", "label-x")
        .attr("x", axes.c2p(Math.PI, -0.42)[0])
        .attr("y", axes.c2p(Math.PI, -0.42)[1])
        .attr("font-size", "50")
        .attr("fill", "white")
        .attr("text-anchor", "middle")
        .attr("font-style", "italic")
        .attr("dominant-baseline", "central")
        .text("𝑥")
        .style("opacity", 0)
        .transition()
        .delay(delayX)
        .duration(durationX)
        .style("opacity", 1);


        svg.select(".teleology")
            .transition()
            .delay(delayLabel + 2 * delayNewlabel)
            .duration(1000)
            .style("opacity", 1);



    // Delay the animation start by 1 second
const timeoutId = setTimeout(() => {

                    if (callback && !getIsCanceled()) {
                        //console.log("calling")

                        callback();
                    } 
                }, delayLabel + 2 * delayNewlabel + 1000 + 2000);


// Cancel the timeout in advance because the timer fails to read getIsCancled
const checkCancelLoop = setInterval(() => {
                if (getIsCanceled && getIsCanceled()) {
                    clearTimeout(timeoutId);
                    clearInterval(checkCancelLoop);
                     console.log("cancel loop")
                }

            }, 100);


    
};
