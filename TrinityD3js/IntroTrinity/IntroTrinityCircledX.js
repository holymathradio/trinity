console.log("IntroTrinityCircledX.js loaded");

window.IntroTrinityCircledX = function(svg) {
    console.log("IntroTrinityCircledX function called");
    d3.timerFlush()
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const minDimension = Math.min(width, height);
    const radius = 0.6 * minDimension / 2;
    const centerX = width / 2;
    const centerY = height / 2;
    const fontSize = 70;

    // Draw the circle
    svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("stroke", "white");

    // Draw the symbol "x"
    svg.append("text")
        .attr("x", centerX)
        .attr("y", centerY)
        .attr("fill", "white")
        .style("font-size", `${fontSize}px`)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text("𝑥");
};