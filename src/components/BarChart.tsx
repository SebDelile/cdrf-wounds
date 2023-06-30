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

export default function BarChart({ data, containerRef }: propTypes) {
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
      }));
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

      // draw a rect with both top corners being rounded
      const drawBar = (label: string, value: number): string => {
        const chartHeight = containerHeight - CHART_MARGIN;
        const barHeight = chartHeight - y(value);
        const barWidth = x.bandwidth();
        const barRadius = barWidth / 8;
        const v = barHeight <= barRadius ? 0 : barHeight - barRadius;
        const q = barHeight <= barRadius ? barHeight : barRadius;
        const h = barWidth - 2 * q;
        //prettier-ignore
        return `M${x(label)},${chartHeight}v${-v}q${0},${-q} ${q},${-q}h${h}q${q},${0} ${q},${q}v${v}z`;
      };

      // pop the rect in the charts
      svg
        .selectAll('.bars')
        .data(chartData)
        .enter()
        .append('path')
        .attr('class', 'bars')
        .attr('stroke', 'black')
        .attr('fill', (d) => `url(#gradient-${d.color.join('-')})`)
        .attr('d', (d) => drawBar(d.label, d.prevValue))
        .transition(chartTransition)
        .attr('d', (d) => drawBar(d.label, d.value));

      // add labels to the rect
      svg
        .selectAll('.label')
        .data(chartData)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('text-anchor', 'middle')
        .attr('font-family', 'sans-serif')
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
  }, [data, previousData, containerWidth, containerHeight]);

  return <svg ref={svgNode} width={containerWidth} height={containerHeight} />;
}
