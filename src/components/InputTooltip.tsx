import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { ReactElement } from 'react';

const DELAY = 500;

type propTypes = {
  title: string;
  children: ReactElement;
};
export default function InputTooltip({ title, children }: propTypes) {
  return (
    <Tooltip
      title={title}
      arrow
      enterDelay={DELAY}
      enterNextDelay={DELAY}
      componentsProps={{
        tooltip: {
          sx: {
            marginTop: '0px !important',
            fontSize: '1rem',
            fontWeight: 'normal',
            lineHeight: '1.5em',
            p: 2,
            backgroundColor: '#616161',
          },
        },
        arrow: {
          sx: {
            color: '#616161',
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
}
