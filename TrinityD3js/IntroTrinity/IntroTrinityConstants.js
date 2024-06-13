console.log("IntroTrinityConstants.js loaded");

window.IntroTrinityConstants = function(svg) {
    console.log("IntroTrinityConstants function called");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const minDimension = Math.min(width, height);
    const radius = 0.6 * minDimension / 2; // 70% of half the minimum dimension
    
    const centerX = width / 2;
    const centerY = height / 2;
    const fontSizeRotating = 70;
    const fontSizeInfinity = fontSizeRotating * 1.3; // 1.3 times bigger for infinity
    const initialRotation = Math.PI / 6 + Math.PI;  // Initial rotation by 1/6 of a radian

    // Updated symbols array
    const symbols = ["0", "1", "∞"];

    const circle = svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-opacity", 0);

    const updateSymbolPosition = (symbol, index, angleOffset = 0) => {
        const angle = initialRotation + (index * Math.PI / 3) + angleOffset;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const fontSize = symbols[index] === "∞" ? fontSizeInfinity : fontSizeRotating;

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
        .attr("fill", "white")
        .style("opacity", 0); // Initially set to invisible

    symbolsSelection.each(function (d, i) {
        updateSymbolPosition(this, i);
    });

    // Add delays for the symbols' appearance
    symbolsSelection.transition()
        .delay((d, i) => i * 500) // 500ms delay for each subsequent symbol
        .duration(500)
        .style("opacity", 1);
};
