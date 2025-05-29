import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { outputsType, initialOutputs } from '@/constants/outputs';
import { woundResultsLabels } from '@/constants/woundResults';
import { BAR_COLORS } from '@/constants/chartColorSet';
import { usePrevious } from '@/utils/usePrevious';
import useResize from '@/utils/useResize';

type propTypes = {
  data: outputsType;
  containerRef: React.RefObject<Element>;
  hideFirstValue?: boolean;
};

const CHART_MARGIN = 25;

export default function TotemChart({ data, containerRef }: propTypes) {
  const svgNode = useRef(null);
  const previousData = usePrevious(data, initialOutputs);
  const [containerWidth, containerHeight] = useResize(containerRef);

  // build the chart
  useEffect(() => {
    if (
      svgNode.current &&
      containerWidth > 2 * CHART_MARGIN &&
      containerHeight > 2 * CHART_MARGIN
    ) {
      // format the data
      const chartData = data.map((value, i) => ({
        label: woundResultsLabels[i],
        value,
        prevValue: previousData[i],
        color: BAR_COLORS[i],
        index: i,
      }));
      //remove "rien" and empty results
      const chartDataFiltered = chartData.filter(
        (d, i, array) =>
          i !== 0 &&
          d.value !== (i === array.length - 1 ? 0 : array[i + 1].value)
      );

      const svg = d3.select(svgNode.current);
      const chartWidth = containerWidth - 2 * CHART_MARGIN;
      const chartTransition = d3
        .transition()
        .duration(500)
        .ease(d3.easeCubicOut);

      // make the y axis for the labels
      const yLabels = d3
        .scaleBand()
        .range([CHART_MARGIN, containerHeight - CHART_MARGIN])
        // adding a data to the set allow a good vertical centering
        .domain(['', ...chartDataFiltered.map(({ label }) => label)]);

      // make the Y axis
      const y = d3
        .scaleLinear()
        .domain([-5, 105])
        .range([containerHeight - CHART_MARGIN, CHART_MARGIN]);
      const yAxis = svg
        .append('g')
        .attr('id', 'yaxis')
        .attr('transform', `translate(${CHART_MARGIN},0)`)
        .call(
          d3
            .axisLeft(y)
            .tickFormat((n) => `${n}%`)
            .tickSize(-chartWidth)
        );
      yAxis
        .selectAll('.tick line')
        .attr('stroke', '#CCC')
        .attr('stroke-width', 1)
        .filter((line) => line === -5 || line === 105)
        .attr('stroke', 'none');
      yAxis
        .selectAll('.tick text')
        .attr('dx', 10)
        .attr('dy', -2)
        .attr('text-anchor', 'start');

      //add a right line to the chart
      svg
        .append('g')
        .call(d3.axisRight(y).tickValues([]).tickSize(0))
        .attr('transform', `translate(${containerWidth - CHART_MARGIN},0)`);

      // pop the rect in the chart
      svg
        .selectAll('.bars')
        .data(chartDataFiltered)
        .enter()
        .append('rect')
        .attr('class', 'bars')
        .attr('stroke', 'black')
        .attr('fill', (d) => `url(#gradient-${d.color.join('-')})`)
        .attr('x', (d) => (chartWidth * 3) / 15 + d.index * 10)
        .attr('width', (d) => (chartWidth * 3) / 10 - d.index * 10)
        .attr('y', (d) => y(d.prevValue))
        .attr(
          'height',
          (d) => containerHeight - CHART_MARGIN - y(d.prevValue - 5)
        )
        .transition(chartTransition)
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => containerHeight - CHART_MARGIN - y(d.value - 5));

      const drawConnector = (label: string, value: number): string =>
        //prettier-ignore
        `M${chartWidth*6/12},${y(value)}h${10}L${(chartWidth*8)/12-20},${yLabels(label)}h${10}`;

      //add the connectors
      svg
        .selectAll('.connector')
        .data(chartDataFiltered)
        .enter()
        .append('path')
        .attr('class', 'connector')
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr('d', (d) => drawConnector(d.label, d.prevValue))
        .transition(chartTransition)
        .attr('d', (d) => drawConnector(d.label, d.value));

      // add the labels
      svg
        .selectAll('.label')
        .data(chartDataFiltered)
        .enter()
        .append('text')
        .attr('class', 'label')
        .text((d) => `${d.label} : ${d.value} %`)
        .attr('dominant-baseline', 'central')
        .attr('x', (chartWidth * 8) / 12)
        .attr('y', (d) => yLabels(d.label)!)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '20px');

      return () => {
        // clean everything between renders
        svg.selectAll('*').remove();
      };
    }
  }, [data, previousData, containerWidth, containerHeight]);

  return <svg ref={svgNode} width={containerWidth} height={containerHeight} />;
}
