console.log("MultiplicationDistributivityDownWithTrace.js loaded");

window.MultiplicationDistributivityDownWithTrace = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {


    svg.selectAll("*").remove();

    function getPerpendicularLineEquation(x1, y1, x2, y2, x) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const segmentSlope = (y2 - y1) / (x2 - x1);
        const perpSlope = -1 / segmentSlope;
        const c = midY - perpSlope * midX;
        return x * perpSlope + c;
    }

    function getPerpendicularLineEquationScaled(x1, y1, x2, y2, x, xscale, yscale) {
        const midX = (x1 / xscale + x2 / xscale) / 2;
        const midY = (y1 / yscale + y2 / yscale) / 2;
        const segmentSlope = (y2 / yscale - y1 / yscale) / (x2 / xscale - x1 / xscale);
        const perpSlope = -1 / segmentSlope;
        const c = midY - perpSlope * midX;
        return yscale * ((x / xscale) * perpSlope + c);
    }

    function calculateMultiplicationCoordinatePoints(numbers) {
        const points = [];
        const length = numbers.length;

        let product = 1;
        let y = 1;

        points.push([1, 1]);

        for (let i = 0; i < length; i++) {
            product *= numbers[i];
            y -= 1 / length;

            const x = product;
            points.push([x, y]);
        }

        return points;
    }

    const defaultSetIsCanceled = () => false;
    const defaultGetIsCanceled = () => false;

    setIsCanceled = setIsCanceled || defaultSetIsCanceled;
    getIsCanceled = getIsCanceled || defaultGetIsCanceled;

    setTimeout(() => setIsCanceled(false), 10);

    const containers = document.getElementsByClassName('content-block');
    let ratio_mobile = 1;
    if (window.innerWidth < 600) {
        ratio_mobile = 0.8;
    }

    if (containers.length > 0) {
        const container = containers[0];
        const style = window.getComputedStyle(container);
        const maxContainerWidth = parseInt(style.width);
        const maxWidth = Math.min(800, maxContainerWidth);
        let svgHeight = 500;

        if (window.innerWidth < 600) {
            svgHeight = 400;
        }

        svg.attr("width", maxWidth)
            .attr("height", svgHeight)
            .attr("viewBox", `0 0 ${maxWidth} ${svgHeight}`);
        svg.selectAll("*").remove();
    } else {
        console.error('No elements found with class "content-block".');
        svg.attr("width", 800)
            .attr("height", 500)
            .attr("viewBox", `0 0 800 500`);
        svg.selectAll("*").remove();
    }

    const fontSize = "36px";

    const delayTime = 1000;
    const durationTime = 1000;


    const delayGoingDown = delayTime + durationTime ;
    const durationGoingDown = 4000;

    const totalDuration = delayGoingDown + durationGoingDown + 500;

    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");
    const width = svgWidth * 1;
    const height = svgHeight * 1;

    const axes = {
        xRange: [-5, 5, 1],
        yRange: [-2, 2, 0.5],
        width: width,
        height: height,
        c2p: (x, y) => [width / 2 + (x * width / 10), height / 2 - (y * height / 2.8)]
    };

    function transformPoints(points, axes) {
        return points.map(point => {
            if (Array.isArray(point) && point.length === 2) {
                return axes.c2p(point[0], point[1]);
            } else {
                console.warn('Invalid point:', point);
                return null;
            }
        }).filter(point => point !== null);
    }

    const startPoint = axes.c2p(0, 0);
    const endPoint = axes.c2p(4, 0);
    const topPoint = axes.c2p(1, 1);

    let shiftVectorInf = [-0.4, 0];
    let zeroMobileShift = 0;
    let espaceMobileShift = 0;
    let markerSize = 12;

    if (window.innerWidth < 600) {
        markerSize = 8;
        shiftVectorInf = [-0.6, 0];
        zeroMobileShift = -0.05;
        espaceMobileShift = -8;
    }

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

    function calculateArcParameters(startDrawPoint, endDrawPoint) {
        const midX = (startDrawPoint[0] + endDrawPoint[0]) / 2;
        const midY = (startDrawPoint[1] + endDrawPoint[1]) / 2;
        const dx = endDrawPoint[0] - startDrawPoint[0];
        const dy = endDrawPoint[1] - startDrawPoint[1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = dist / (2 * Math.sin(Math.PI / 6));
        const angle = Math.atan2(dy, dx);
        const initialControlX = midX - radius * Math.sin(angle) + 20;
        const initialControlY = midY + radius * Math.cos(angle) - 23;

        const { adjustedControlX, adjustedControlY } = getControlPointAdjustment(initialControlX, initialControlY, radius, angle + Math.PI + Math.PI / 3, startDrawPoint);

        return {
            adjustedControlX,
            adjustedControlY,
            radius,
            startAngle: angle + Math.PI + Math.PI / 3,
            endAngle: angle + Math.PI + Math.PI / 3 + Math.PI / 3.3,
            counterclockwise: false
        };
    }

    function calculateLabelPosition(startDrawPoint, endDrawPoint, r) {
        const midX = (startDrawPoint[0] + endDrawPoint[0]) / 2;
        const midY = (startDrawPoint[1] + endDrawPoint[1]) / 2;
        const dx = endDrawPoint[0] - startDrawPoint[0];
        const dy = endDrawPoint[1] - startDrawPoint[1];
        const perpDx = -dy;
        const perpDy = dx;
        const length = Math.sqrt(perpDx * perpDx + perpDy * perpDy);
        const normalizedPerpDx = perpDx / length;
        const normalizedPerpDy = perpDy / length;
        const labelX = midX + normalizedPerpDx * r;
        const labelY = midY + normalizedPerpDy * r;
        return [labelX, labelY];
    }

    function generateArcPath(params, startPoint, angle_offset = 0) {
        const path = d3.path();
        path.moveTo(startPoint[0], startPoint[1]);
        path.arc(
            params.adjustedControlX,
            params.adjustedControlY,
            params.radius,
            params.startAngle,
            params.endAngle + angle_offset,
            params.counterclockwise
        );
        return path.toString();
    }

    const linej = svg.append("line")
        .attr("class", "linej")
        .attr("x1", axes.c2p(0, 1)[0])
        .attr("y1", axes.c2p(0, 1)[1])
        .attr("x2", axes.c2p(1, 1)[0])
        .attr("y2", axes.c2p(1, 1)[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 5)
        .style("opacity", 1);

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

    const targetMiddlePoint = axes.c2p(2, 0.5);

    const { adjustedControlX, adjustedControlY } = getControlPointAdjustment(initialControlX, initialControlY, radius, angle + Math.PI + Math.PI / 3, targetPoint);

    const numbers = [1.8, 4 / 1.8];
    const points = calculateMultiplicationCoordinatePoints(numbers);
    let newPoints = transformPoints(points, axes);

    const arcParamsFixed = calculateArcParameters(topPoint, endPoint);

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

    const arrowFixed = svg.append("defs").append("marker")
        .attr("id", "arrow-fixed")
        .attr("viewBox", "0 0 20 20")
        .attr("refX", "10")
        .attr("refY", "10")
        .attr("markerWidth", markerSize )
        .attr("markerHeight", markerSize )
        .attr("orient", "auto-start-reverse")
        .append("path")
        .attr("d", "M 0 0 L 20 10 L 0 20 z")
        .attr("fill", "yellow")
        .style("opacity", 1);

    const timexFixed = svg.append("path")
        .attr("class", "timex-middle")
        .attr("fill", "none")
        .attr("stroke", "yellow")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrow-fixed)")
        .attr("d", generateArcPath(arcParamsFixed, topPoint, angle_offset = 0.05))
        .style("opacity", 1);

    function drawEquidistantRectanglesInstant(svg, axes, N) {
        const rectWidth = 5;
        const rectHeight = 20;

        for (let i = 0; i <= N; i++) {
            const x = i * (4 / N);
            const [xPos, yPos] = axes.c2p(x, 0);

            svg.append("rect")
                .attr("class", "equidistant-rect")
                .attr("x", xPos)
                .attr("y", yPos)
                .attr("width", rectWidth)
                .attr("height", rectHeight)
                .attr("fill", "white")
                .attr("transform", `translate(-${rectWidth / 2}, -${rectHeight / 2})`);
        }
    }

    function drawEquidistantRectangles(svg, axes, N) {
        const rectWidth = 5;
        const rectHeight = 20;
        const fadeInDuration = 200;
        const delayBetweenRects = 100;

        for (let i = 0; i <= N; i++) {
            const x = i * (4 / N);
            const [xPos, yPos] = axes.c2p(x, 0);

            svg.append("rect")
                .attr("class", "equidistant-rect")
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

    const N = 8;

    drawEquidistantRectanglesInstant(svg, axes, N);

    const lineSegment = svg.append("line")
        .attr("class", "moving-segment")
        .attr("x1", startPoint[0])
        .attr("y1", startPoint[1])
        .attr("x2", axes.c2p(4, 0)[0])
        .attr("y2", axes.c2p(4, 0)[1])
        .attr("stroke", "yellow")
        .attr("stroke-width", 2);



    function computeRightPoint(y, topPoint, endPoint, axes) {
    // Convert y to the coordinate system used by axes.c2p
    const [_, yCoord] = axes.c2p(0, y);
    
    // Calculate t based on the y coordinate
    const t = (yCoord - endPoint[1]) / (topPoint[1] - endPoint[1]);
    
    return {
        x: endPoint[0] + t * (topPoint[0] - endPoint[0]),
        y: yCoord
    };
}



function moveSegmentWithDelay(svg, axes, N, forward, durationAnim=3000, endPrior = false) {
    const duration = durationAnim;
    const startTime = Date.now();
    
    // Define the path for the right point
    const rightPointPath = d3.path();
    rightPointPath.moveTo(endPoint[0], endPoint[1]);
    rightPointPath.lineTo(topPoint[0], topPoint[1]);
    const rightPointPathNode = svg.append("path")
        .attr("d", rightPointPath.toString())
        .style("opacity", 0);
    
    function update() {
        const elapsedTime = Date.now() - startTime;
        let progress = elapsedTime / duration;
        
        if (progress > 1) progress = 1;
        
        let t = forward ? progress : 1 - progress;
        
        // If stopAt09 is true and we're moving forward, cap t at 0.9
        if (endPrior && forward && t > 0.9) {
            t = 0.9;
        }
        
        const y = t;
        
        // Update left point of the line segment
        const leftPoint = axes.c2p(0, y);
        
        // Calculate right point along the path
        const rightPoint = computeRightPoint(y, topPoint, endPoint, axes);
        
        // Update line segment
        lineSegment
            .attr("x1", leftPoint[0])
            .attr("y1", leftPoint[1])
            .attr("x2", rightPoint.x)
            .attr("y2", rightPoint.y);
        
        // Check if the line is above axes.c2p(0, 0.95)
        const threshold = axes.c2p(0, 0.95)[1];
        const shouldShowRectangles = leftPoint[1] > threshold;
        
        // Update middle rectangles
        drawMiddleRectangles(svg, axes, N, leftPoint, rightPoint, shouldShowRectangles);
        
        if (progress < 1 && !(endPrior && forward && t >= 0.9)) {
            requestAnimationFrame(update);
        } else {
            rightPointPathNode.remove();
        }
    }
    
    update();
}


// Update left point of the line segment
const leftPointLight = axes.c2p(0, 0.5);
const rightPointLight = computeRightPoint(0.5, topPoint, endPoint, axes)



const leftPointDarker = axes.c2p(0, 0.9);
const rightPointDarker = computeRightPoint(0.9, topPoint, endPoint, axes)


function createMiddleRectangles(svg, axes, N) {
    const rectWidth = 5;
    const rectHeight = 20;

    for (let i = 0; i <= N; i++) {
        const x = i * (4 / N);
        const [xPos, yPos] = axes.c2p(x, 0);

        svg.append("rect")
            .attr("class", i === 0 ? "middle-rect-moving-trace left-extremity-trace" : 
                  i === N ? "middle-rect-moving-trace right-extremity-trace" : "middle-rect-moving-trace")
            .attr("x", xPos)
            .attr("y", yPos)
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("fill", "white")
            .attr("transform", `translate(-${rectWidth / 2}, -${rectHeight / 2})`)
            .style("display", "none");  // Initially hidden
    }
}



function updateMiddleRectangles(svg, axes, N, leftPoint, rightPoint, shouldShowRectangles) {
    const middleRects = svg.selectAll(".middle-rect-moving-trace");
    
    if (shouldShowRectangles) {
        middleRects.style("display", "block");
        
        // Update left extremity rectangle
        svg.select(".middle-rect-moving-trace.left-extremity-trace")
            .attr("x", leftPoint[0])
            .attr("y", leftPoint[1]);

        // Update middle rectangles
        for (let i = 1; i < N; i++) {
            const t = i / N;
            const x = leftPoint[0] * (1 - t) + rightPoint.x * t;
            const y = leftPoint[1] * (1 - t) + rightPoint.y * t;
            
            svg.selectAll(".middle-rect-moving-trace:not(.left-extremity-trace):not(.right-extremity-trace)")
                .filter((d, index) => index === i - 1)
                .attr("x", x)
                .attr("y", y);
        }

        // Update right extremity rectangle
        svg.select(".middle-rect-moving-trace.right-extremity-trace")
            .attr("x", rightPoint.x)
            .attr("y", rightPoint.y);
    } else {
        middleRects.style("display", "none");
    }
}




function moveSegmentWithDelayTrace(svg, axes, N, forward, durationAnim=3000, endPrior = false) {
    const duration = durationAnim;
    const startTime = Date.now();
    
    // Define the path for the right point
    const rightPointPath = d3.path();
    rightPointPath.moveTo(endPoint[0], endPoint[1]);
    rightPointPath.lineTo(topPoint[0], topPoint[1]);
    const rightPointPathNode = svg.append("path")
        .attr("d", rightPointPath.toString())
        .style("opacity", 0);
    
    function update() {
        const elapsedTime = Date.now() - startTime;
        let progress = elapsedTime / duration;
        
        if (progress > 1) progress = 1;
        
        let t = forward ? progress : 1 - progress;

        if (t > 0.9) t = 0.9; // wait at 0.9 in the already drawn segment
        
        // If stopAt09 is true and we're moving forward, cap t at 0.9
        if (endPrior && forward && t > 0.9) {
            t = 0.9;
        }



        const y = t;
        
        // Update left point of the line segment
        const leftPoint = axes.c2p(0, y);
        
        // Calculate right point along the path
        const rightPoint = computeRightPoint(y, topPoint, endPoint, axes);
        
        // Update line segment
        lineSegment
            .attr("x1", leftPoint[0])
            .attr("y1", leftPoint[1])
            .attr("x2", rightPoint.x)
            .attr("y2", rightPoint.y);
        
        // Check if the line is above axes.c2p(0, 0.95)
        const threshold = axes.c2p(0, 0.95)[1];
        const shouldShowRectangles = leftPoint[1] > threshold;


        if (leftPoint[1] > axes.c2p(0, 0.9)[1]) {
            //avoid drawing in other animations by updating elements instead
                       // drawMiddleRectanglesTrace(svg, axes, N, leftPointDarker, rightPointDarker, "dark-trace", "#808080","#808080");
                        svg.selectAll(".dark-trace").style("opacity",1);
                 }


        if (leftPoint[1] > axes.c2p(0, 0.5)[1]) {
            //avoid drawing in other animations by updating elements instead
   //drawMiddleRectanglesTrace(svg, axes, N, leftPointLight, rightPointLight, "light-trace", "#D3D3D3","#D3D3D3");
svg.selectAll(".light-trace").style("opacity",1);
        }
        
        // Update middle rectangles
        updateMiddleRectangles(svg, axes, N, leftPoint, rightPoint, shouldShowRectangles);
        
        if (progress < 1 && !(endPrior && forward && t >= 0.9)) {
            requestAnimationFrame(update);
        } else {
            rightPointPathNode.remove();
        }
    }
    
    update();
}



function drawMiddleRectanglesTrace(svg, axes, N, leftPoint, rightPoint, customClass, color, color_rectangle, opacity=0) {
    const rectWidth = 5;
    const rectHeight = 20;
    
    // Remove existing elements with the custom class
    svg.selectAll(`.${customClass}`).remove();
    
    // Draw left extremity rectangle
    svg.append("rect")
        .attr("class", customClass)
        .attr("x", leftPoint[0])
        .attr("y", leftPoint[1])
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("fill", color_rectangle)
        .attr("transform", `translate(-${rectWidth/2}, -${rectHeight/2})`)
         .style("opacity", opacity);

    // Draw middle rectangles
    for (let i = 1; i < N; i++) {
        const t = i / N;
        const x = leftPoint[0] * (1 - t) + rightPoint.x * t;
        const y = leftPoint[1] * (1 - t) + rightPoint.y * t;
        
        svg.append("rect")
            .attr("class", customClass)
            .attr("x", x)
            .attr("y", y)
            .attr("width", rectWidth)
            .attr("height", rectHeight)
            .attr("fill", color_rectangle)
            .attr("transform", `translate(-${rectWidth/2}, -${rectHeight/2})`)
            .style("opacity", opacity);
    }

    // Draw right extremity rectangle
    svg.append("rect")
        .attr("class", customClass)
        .attr("x", rightPoint.x)
        .attr("y", rightPoint.y)
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("fill", color_rectangle)
        .attr("transform", `translate(-${rectWidth/2}, -${rectHeight/2})`)
        .style("opacity", opacity);

    // Draw line between leftPoint and rightPoint
    svg.append("line")
        .attr("class", customClass)
        .attr("x1", leftPoint[0])
        .attr("y1", leftPoint[1])
        .attr("x2", rightPoint.x)
        .attr("y2", rightPoint.y)
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .style("opacity", opacity);
}

// Add this after creating the svg and before starting animations
createMiddleRectangles(svg, axes, N);

drawMiddleRectanglesTrace(svg, axes, N, leftPointDarker, rightPointDarker, "bar-on-top", "yellow","white",1);

 drawMiddleRectanglesTrace(svg, axes, N, leftPointLight, rightPointLight, "light-trace", "#D3D3D3","#D3D3D3");

 drawMiddleRectanglesTrace(svg, axes, N, leftPointDarker, rightPointDarker, "dark-trace", "#808080","#808080");

// After some delay, move downwards
const timeoutDownWithTraceId = setTimeout(() => {
    moveSegmentWithDelayTrace(svg, axes, N, false,durationGoingDown, endPrior=false);
}, delayGoingDown); // 5000 ms delay as an example

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
        .attr("x", axes.c2p(4 , -0.00)[0])
        .attr("y", axes.c2p(4, -0.00)[1])
        .attr("width", 5)
        .attr("height", 20)
        .attr("fill", "white")
        .attr("transform", `translate(-2.5, -10)`);

    fatherDot.raise();

    const timeoutId = setTimeout(() => {
        if (callback && !getIsCanceled()) {
            callback();
        }
    }, totalDuration);

    const checkCancelLoop = setInterval(() => {
        if (getIsCanceled && getIsCanceled()) {
            clearTimeout(timeoutId);
            clearTimeout(timeoutDownWithTraceId);
            clearInterval(checkCancelLoop);
        }
    }, 100);

};
