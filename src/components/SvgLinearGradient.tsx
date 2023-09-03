import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BAR_COLORS, GRADIENT_INFO } from '@/constants/chartColorSet';

export function SvgLinearGradient() {
  const svgNode = useRef(null);

  useEffect(() => {
    if (svgNode.current) {
      d3.select(svgNode.current)
        .append('defs')
        .selectAll('.gradients')
        .data(BAR_COLORS)
        .join((enter) => {
          const gradient = enter
            .append('linearGradient')
            .attr('class', 'gradients')
            .attr('id', (color) => `gradient-${color.join('-')}`)
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
                (color) =>
                  `rgb(${color
                    .map((channel) =>
                      Math.floor(
                        Math.min(Math.max(channel / 255 + colorModif, 0), 1) *
                          255
                      )
                    )
                    .join(',')})`
              )
          );
          return gradient;
        });
    }
  }, []);
  return <svg ref={svgNode} width={0} height={0} />;
}
