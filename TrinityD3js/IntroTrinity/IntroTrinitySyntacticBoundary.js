console.log("IntroTrinitySyntacticBoundary.js loaded");

window.IntroTrinitySyntacticBoundary = function(svg, callback, cancelCallback, getIsCanceled, setIsCanceled) {
    console.log("IntroTrinitySyntacticBoundary function called");
    // Default implementations
    const defaultSetIsCanceled = () => false;
    const defaultGetIsCanceled = () => false;

    // Use provided functions or fall back to defaults
    setIsCanceled = setIsCanceled || defaultSetIsCanceled;
    getIsCanceled = getIsCanceled || defaultGetIsCanceled;

    setTimeout(() => setIsCanceled(false), 10); //setting back to false at start of animation

    //svg.selectAll("*").remove();
    svg.selectAll("*").remove();
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const minDimension = Math.min(width, height);
    const radius = 0.6 * minDimension / 2; // 70% of half the minimum dimension
    const centerX = width / 2;
    const centerY = height / 2;
    const fontSizeRotating = 70;
    const scaleInfinity = 1.3;
    const initialRotation = Math.PI / 6 + Math.PI;  // Initial rotation by 1/6 of a radian plus 180 degrees

    // Updated symbols array
    const symbols = ["0", "1", "∞", "<", "×", "+"];

    const circle = svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-opacity", 0);

    const updateSymbolPosition = (symbol, index, angleOffset = 0, scale = 1) => {
        const angle = initialRotation + (index * Math.PI / 3) + angleOffset;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const fontSize = symbols[index] === "∞" ? fontSizeRotating * scaleInfinity * scale : fontSizeRotating * scale;

        //console.log(`Updating symbol ${index} to scale ${scale}`);
        d3.select(symbol)
            .attr("x", x)
            .attr("y", y)
            .style("font-size", `${fontSize}px`)  // Using .style() for font-size
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .text(symbols[index]);
    };

    const symbolsSelection = svg.selectAll(".symbol")
        .data(symbols)
        .enter().append("text")
        .attr("class", "symbol")
        .attr("fill", "white");

    symbolsSelection.each(function (d, i) {
        updateSymbolPosition(this, i);
    });

    let timer;


// despite efforts, this loop cannot read properly cancel because timer keeps a local copy of sort
    let animateSymbols = () => {
        let angleOffset = 0;
        let scale = 1;
        const minScale = 0.1;




        timer = d3.timer(() => {
            if (getIsCanceled()) {
                console.log("logging inside timer",getIsCanceled());
                timer.stop();
                setIsCanceled(false)
                console.log("logging inside timer",getIsCanceled());
                return ;
            }
            angleOffset += 0.01;
            scale = Math.max(minScale, scale - 0.0015);  // Gradually reduce the scale

            //console.log("Updating symbolCANCELCALLBACK");
            symbolsSelection.each(function (d, i) {
                updateSymbolPosition(this, i, angleOffset, scale);
            });

            const newOpacity = 1 - Math.abs(Math.cos(angleOffset / 4));
            circle.attr("stroke-opacity", newOpacity);

            if (newOpacity >= 0.95) {
                // Stop the timer once the circle is fully white
                timer.stop();

                // Remove the symbols
                symbolsSelection.remove();
                //console.log("logging",getIsCanceled());
                 if ( !getIsCanceled()) {
                // When symbols are very small, display a curved "x" at the center
                svg.append("text")
                    .attr("x", centerX)
                    .attr("y", centerY)
                    .attr("class", "center-symbol")
                    .attr("fill", "white")
                    .style("font-size", `${fontSizeRotating}px`)  // Setting font-size using .style()
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .text("𝑥");  // Use a curved "x" symbol
                }

                if (callback && !getIsCanceled()) {
                    callback();

                } else {              
            }
            }
        });
    };
    // Delay the animation start by 1 second
const timeoutId = setTimeout(animateSymbols, 1000);


// Cancel the timeout in advance because the timer fails to read getIsCancled
const checkCancelLoop = setInterval(() => {
                if (getIsCanceled()) {
                    clearTimeout(timeoutId);
                    clearInterval(checkCancelLoop);
                }
            }, 100);



};
