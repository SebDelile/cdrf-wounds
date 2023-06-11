import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { outputsType, initialOutputs } from '@/constants/outputs';
import { woundResultsLabels } from '@/constants/woundResults';
import { usePrevious } from '@/utils/usePrevious';

type propTypes = {
  data: outputsType;
  hideFirstValue?: boolean;
};

const CHART_HEIGHT = 300;
const CHART_WIDTH = 450;

const BAR_COLORS = [
  '#F5C5C5',
  '#FFA85B',
  '#F3750F',
  '#EF0506',
  '#AE0405',
  '#2AA0606',
];

export default function BarChart({ data, hideFirstValue = false }: propTypes) {
  const svgNode = useRef(null);
  const previousData = usePrevious(data, initialOutputs);

  // build the chart
  useEffect(() => {
    if (svgNode.current) {
      // format the data
      const chartData = data.map((value, i) => ({
        label: `${woundResultsLabels[i]}${
          hideFirstValue && i !== 5 ? ' ou +' : ''
        }`,
        value,
        prevValue: previousData[i],
        color: BAR_COLORS[i],
      }));
      if (hideFirstValue) chartData.shift();
      const chartTransition = d3
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut);

      const svg = d3.select(svgNode.current);

      // make the X axis
      const x = d3
        .scaleBand()
        .range([0, CHART_WIDTH])
        .domain(chartData.map(({ label }) => label))
        .padding(0.2);
      svg
        .append('g')
        .attr('transform', `translate(0,${CHART_HEIGHT})`)
        .call(d3.axisBottom(x));

      // make the Y axis
      // *1.08 is to be sure the label fit inside the chart
      const yAxisUpperLimit =
        Math.ceil(
          ((d3.max(chartData.map(({ value }) => value)) ?? 100) * 1.08) / 10
        ) * 10;
      const y = d3
        .scaleLinear()
        .domain([0, yAxisUpperLimit])
        .range([CHART_HEIGHT, 0]);
      // prevYAxis is used for the animation
      const previousYAxisUpperLimit =
        Math.ceil(
          ((d3.max(chartData.map(({ prevValue }) => prevValue)) ?? 100) *
            1.08) /
            10
        ) * 10;
      const prevY = d3
        .scaleLinear()
        .domain([0, previousYAxisUpperLimit])
        .range([CHART_HEIGHT, 0]);
      svg
        .append('g')
        .attr('id', 'yaxis')
        .call(d3.axisLeft(prevY).tickSize(-CHART_WIDTH))
        .transition(chartTransition)
        .call(d3.axisLeft(y).tickSize(-CHART_WIDTH))
        .selectAll('.tick line')
        .attr('stroke', '#CCC')
        .attr('stroke-width', 1)
        .filter((line) => line === 0 || line === yAxisUpperLimit)
        .attr('stroke', 'none');

      //add a right line to the chart
      svg
        .append('g')
        .call(d3.axisRight(y).tickValues([]).tickSize(0))
        .attr('transform', `translate(${CHART_WIDTH},0)`);

      // pop the rect in the charts
      svg
        .selectAll('.bars')
        .data(chartData)
        .enter()
        .append('rect')
        .attr('class', 'bars')
        .attr('stroke', 'black')
        .attr('fill', (d) => d.color)
        // the exclamation mark fix a typescript issue to remove undefined from union
        .attr('x', (d) => x(d.label)!)
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.prevValue))
        .attr('height', (d) => CHART_HEIGHT - y(d.prevValue))
        .transition(chartTransition)
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => CHART_HEIGHT - y(d.value));

      // add labels to the rect
      svg
        .selectAll('.label')
        .data(chartData)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .attr('x', (d) => x(d.label)!)
        .attr('dx', x.bandwidth() / 2)
        .attr('dy', '-0.25em')
        .text((d) => `${d.value} %`)
        .attr('y', (d) => y(d.prevValue))
        .transition(chartTransition)
        .attr('y', (d) => y(d.value));

      return () => {
        // clean everything between renders
        svg.selectAll('*').remove();
      };
    }
  }, [data, previousData, hideFirstValue]);

  return (
    <svg ref={svgNode} width={CHART_WIDTH + 20} height={CHART_HEIGHT + 20} />
  );
}
