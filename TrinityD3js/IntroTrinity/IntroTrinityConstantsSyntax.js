console.log("IntroTrinityConstantsSyntax.js loaded");

window.IntroTrinityConstantsSyntax = function(svg) {
    console.log("IntroTrinityConstantsSyntax function called");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const minDimension = Math.min(width, height);
    const radius = 0.6 * minDimension / 2; // 70% of half the minimum dimension
    const centerX = width / 2;
    const centerY = height / 2;
    const fontSizeRotating = 70;
    const fontSizeInfinity = fontSizeRotating * 1.2; // 1.2 times bigger for infinity
    const initialRotation = Math.PI / 6 + Math.PI;  // Initial rotation by 1/6 of a radian

    // Updated symbols array
    const symbols = ["0", "1", "∞", "<", "×", "+"];

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
            .style("font-size", `${fontSize}px`)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .text(symbols[index]);
    };

    const symbolsSelection = svg.selectAll(".symbol")
        .data(symbols)
        .enter().append("text")
        .attr("class", "symbol")
        .attr("fill", "white")
        .style("opacity", (d) => ["0", "1", "∞"].includes(d) ? 1 : 0);  // Initially show 0, 1, ∞

    symbolsSelection.each(function (d, i) {
        updateSymbolPosition(this, i);
    });

    // Reverse the selection order for +, ×, <
    const delayedSymbols = symbolsSelection.filter((d) => ["+", "×", "<"].includes(d)).nodes().reverse();

    // Apply transitions with delay in reversed order
    d3.selectAll(delayedSymbols)
        .transition()
        .delay((d, i) => (i + 1) * 500)  // Delay of 500ms for each subsequent symbol
        .duration(500)
        .style("opacity", 1);
};
