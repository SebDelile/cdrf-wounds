import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { outputsType } from '@/types/outputsType';
import { woundResultsLabels, woundResultsType } from '@/constants/woundResults';

type propTypes = {
  data: outputsType;
};

const GRAPH_HEIGHT = 250;
const GRAPH_WIDTH = 350;

const BAR_COLORS = [
  '#F5C5C5',
  '#FFA85B',
  '#F3750F',
  '#EF0506',
  '#AE0405',
  '#2AA0606',
];

export default function BarGraph({ data }: propTypes) {
  const svgNode = useRef(null);

  // initialize graph
  useEffect(() => {
    const hasResults = data.some((d) => !!d);
    if (svgNode.current && hasResults) {
      const svg = d3.select(svgNode.current);

      // make the X axis
      const x = d3
        .scaleBand()
        .range([0, GRAPH_WIDTH])
        .domain(woundResultsLabels)
        .padding(0.2);
      svg
        .append('g')
        .attr('transform', `translate(0,${GRAPH_HEIGHT})`)
        .call(d3.axisBottom(x));

      // make the Y axis
      // *1.08 is to be sure the label fit inside the graph
      const yAxisUpperLimit = Math.ceil(((d3.max(data) ?? 0) * 1.08) / 10) * 10;
      const y = d3
        .scaleLinear()
        .domain([0, yAxisUpperLimit])
        .range([GRAPH_HEIGHT, 0]);
      svg
        .append('g')
        .call(d3.axisLeft(y).tickSize(-GRAPH_WIDTH))
        .selectAll('.tick line')
        .attr('stroke', '#BBB')
        .attr('stroke-dasharray', 4)
        .attr('stroke-width', 1)
        .filter((line) => line === 0 || line === yAxisUpperLimit)
        .attr('stroke', 'none');

      //add a right line to the graph
      svg
        .append('g')
        .call(d3.axisRight(y).tickValues([]).tickSize(0))
        .attr('transform', `translate(${GRAPH_WIDTH},0)`);

      // pop the rect in the graphs
      svg
        .selectAll('.bars')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bars')
        // the exclamation mark fix a typescript issue to remove undefined from union
        .attr('x', (_, i) => x(woundResultsLabels[i as woundResultsType])!)
        .attr('y', (d) => y(d))
        .attr('width', x.bandwidth())
        .attr('height', (d) => GRAPH_HEIGHT - y(d))
        .attr('stroke', 'black')
        .attr('fill', (_, i) => BAR_COLORS[i as woundResultsType]);

      // add labels to the rect
      svg
        .selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .attr('x', (_, i) => x(woundResultsLabels[i as woundResultsType])!)
        .attr('dx', x.bandwidth() / 2)
        .attr('y', (d) => y(d))
        .attr('dy', '-0.25em')
        .text((d) => `${d} %`);

      return () => {
        // clean everything between renders
        svg.selectAll('*').remove();
      };
    }
  }, [data]);

  return <svg ref={svgNode} width="400px" height="300px" />;
}
