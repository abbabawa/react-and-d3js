import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ScatterPlot = (props) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Dimensions
    let dimensions = {
      width: 1000,
      height: 500,
      margins: 30,
    };

    dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

    svgRef.current.innerHTML = "";
    // SELECTIONS
    const container = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", dimensions.width + "px")
      .attr("height", dimensions.height + "px");

    // clear all previous content on refresh
    const everything = container.select("div");
    console.log(everything);
    everything.remove();

    // const container = svg
    //   .append("g")
    //   .classed("container", true)
    //   .attr(
    //     "transform",
    //     `translate(${dimensions.margins}, ${dimensions.margins})`
    //   );

    // Draw Circle
    // container.append("circle").attr("r", 25);

    // container
    //   .append("rect")
    //   .attr("x", 100)
    //   .attr("y", 100)
    //   .attr("width", 10)
    //   .attr("height", 10);
    // container.append("circle").attr("cx", 200).attr("cy", 100).attr("r", 5);
    // container
    //   .append("line")
    //   .attr("x1", 300)
    //   .attr("y1", 100)
    //   .attr("x2", 400)
    //   .attr("y2", 200)
    //   .attr("stroke", "#000");

    var circles, xScale, yScale, rScale;
    var rValues = [2, 15];
    d3.csv("./boston-housing.csv").then(function (data) {
      //   console.log(data);

      let xMinMax = d3.extent(data, function (d) {
        return parseFloat(d.poor);
      });

      let yMinMax = d3.extent(data, function (d) {
        // console.log(d);
        return parseFloat(d.rooms);
      });
      console.log(yMinMax);

      let rMinMax = d3.extent(data, function (d) {
        return parseFloat(d.value);
      });

      xScale = d3
        .scaleLinear()
        .domain([xMinMax[0], xMinMax[1]])
        .range([
          dimensions.margins + rValues[1],
          dimensions.width - dimensions.margins - rValues[1],
        ]);

      yScale = d3
        .scaleLinear()
        .domain([yMinMax[1], yMinMax[0]])
        .range([
          dimensions.margins + rValues[1],
          dimensions.height - dimensions.margins - rValues[1],
        ]);

      rScale = d3
        .scaleLinear()
        .domain([rMinMax[0], rMinMax[1]])
        .range([rValues[0], rValues[1]]);

      let cScale = d3.scaleOrdinal().domain([0, 1]).range(["#333", "#FF6600"]);

      circles = container
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", 0)
        .attr("cy", function (d) {
          return yScale(d.rooms);
        })
        .attr("r", 0)
        .attr("fill", function (d) {
          return cScale(d.charles);
        })
        .style("opacity", function (d) {
          return d.charles == 1 ? 1 : 0.3;
        });

      let xAxis = d3.axisBottom(xScale).tickValues([xMinMax[0], xMinMax[1]]);
      let yAxis = d3.axisLeft(yScale).tickValues([yMinMax[0], yMinMax[1]]);

      let xAxisG = container
        .append("g")
        .attr("id", "xAxis")
        .attr("class", "axis");
      let yAxisG = container
        .append("g")
        .attr("id", "yAxis")
        .attr("class", "axis");

      xAxisG
        .call(xAxis)
        .attr(
          "transform",
          "translate(0," + (dimensions.height - dimensions.margins) + ")"
        );
      yAxisG
        .call(yAxis)
        .attr("transform", "translate(" + dimensions.margins + ",0)");
      update();
    });
    function update() {
      circles
        .transition()
        .delay(function (d, i) {
          return i * 10;
        })
        .attr("r", function (d) {
          return rScale(d.value);
        }).delay(function (d, i) {
            return i * 100;
          }).attr("cx", function (d) {
            return xScale(d.poor);
          });

    //   circles
    //     .transition()
    //     .delay(function (d, i) {
    //       return i * 10;
    //     })
    //     .attr("cx", function (d) {
    //         return xScale(d.poor);
    //       });
    }
  }, [props.Data, svgRef.current]);
  return <div ref={svgRef}></div>; //<svg ref={svgRef} />;
};

export default ScatterPlot;
