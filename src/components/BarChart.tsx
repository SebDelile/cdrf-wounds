import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { outputsType, initialOutputs } from '@/constants/outputs';
import { woundResultsLabels } from '@/constants/woundResults';
import { usePrevious } from '@/utils/usePrevious';
import { Box } from '@mui/material';
import useResize from '@/utils/useResize';

type propTypes = {
  data: outputsType;
  containerRef: React.RefObject<Element>;
  hideFirstValue?: boolean;
};

const CHART_MARGIN = 25;

const BAR_COLORS = [
  [244, 197, 197],
  [255, 168, 91],
  [242, 117, 15],
  [205, 5, 5],
  [121, 5, 5],
  [50, 5, 5],
];

const GRADIENT_INFO: [string, number][] = [
  ['0%', -0.3],
  ['10%', 0.1],
  ['90%', -0.05],
  ['100%', 0.35],
];

export default function BarChart({
  data,
  containerRef,
  hideFirstValue = false,
}: propTypes) {
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
        .range([CHART_MARGIN, containerWidth - CHART_MARGIN])
        .domain(chartData.map(({ label }) => label))
        .padding(0.2);
      svg
        .append('g')
        .attr('transform', `translate(0,${containerHeight - CHART_MARGIN})`)
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
        .range([containerHeight - CHART_MARGIN, CHART_MARGIN]);
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
        .range([containerHeight - CHART_MARGIN, CHART_MARGIN]);
      svg
        .append('g')
        .attr('id', 'yaxis')
        .attr('transform', `translate(${CHART_MARGIN},0)`)
        .call(
          d3
            .axisLeft(prevY)
            .tickFormat(() => '')
            .tickSize(-(containerWidth - 2 * CHART_MARGIN))
        )
        .transition(chartTransition)
        .call(
          d3
            .axisLeft(y)
            .tickFormat(() => '')
            .tickSize(-(containerWidth - 2 * CHART_MARGIN))
        )
        .selectAll('.tick line')
        .attr('stroke', '#CCC')
        .attr('stroke-width', 1)
        .filter((line) => line === 0 || line === yAxisUpperLimit)
        .attr('stroke', 'none');

      //add a right line to the chart
      svg
        .append('g')
        .call(d3.axisRight(y).tickValues([]).tickSize(0))
        .attr('transform', `translate(${containerWidth - CHART_MARGIN},0)`);

      //add gradient elements
      svg
        .selectAll('.gradients')
        .data(chartData)
        .join((enter) => {
          const gradient = enter
            .append('linearGradient')
            .attr('class', 'gradients')
            .attr('id', (d) => `gradient-${d.color.join('-')}`)
            .attr('x1', '0%')
            .attr('x2', '100%')
            .attr('y1', '0%')
            .attr('y2', '0%');

          GRADIENT_INFO.forEach(([offset, colorModif]) =>
            gradient
              .append('stop')
              .attr('offset', offset)
              .attr(
                'stop-color',
                (d) =>
                  `rgb(${d.color
                    .map((color) =>
                      Math.floor(
                        Math.min(Math.max(color / 255 + colorModif, 0), 1) * 255
                      )
                    )
                    .join(',')})`
              )
          );
          return gradient;
        });

      // pop the rect in the charts
      svg
        .selectAll('.bars')
        .data(chartData)
        .enter()
        .append('rect')
        .attr('class', 'bars')
        .attr('stroke', 'black')
        .attr('fill', (d) => `url(#gradient-${d.color.join('-')})`)
        .attr('style', 'border-radius: 16')
        // the exclamation mark fix a typescript issue to remove undefined from union
        .attr('x', (d) => x(d.label)!)
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.prevValue))
        .attr('height', (d) => containerHeight - CHART_MARGIN - y(d.prevValue))
        .transition(chartTransition)
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => containerHeight - CHART_MARGIN - y(d.value));

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
  }, [data, previousData, hideFirstValue, containerWidth, containerHeight]);

  return <svg ref={svgNode} width={containerWidth} height={containerHeight} />;
}
