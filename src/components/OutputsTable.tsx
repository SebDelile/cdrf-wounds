import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { outputsType } from '@/constants/outputs';
import { woundResultsLabels } from '@/constants/woundResults';
import {
  getFormattedOutputs,
  getFormattedOutputsAsCumulativePercentage,
  getFormattedOutputsAsPercentage,
} from '@/utils/getFormattedOutputs';

type propTypes = {
  outputs: outputsType;
};

export default function OutputsTable({ outputs }: propTypes) {
  const totalOutputs = outputs.reduce((a, b) => a + b, 0);
  const formattedOutputs = getFormattedOutputs(outputs);
  const formattedOutputsAsPercentage = getFormattedOutputsAsPercentage(outputs);
  const formattedOutputsAsCumulativePercentage =
    getFormattedOutputsAsCumulativePercentage(outputs);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontSize: '0.75rem', fontStyle: 'italic' }}
            >{`(total : ${totalOutputs})`}</TableCell>
            <TableCell>Somme</TableCell>
            <TableCell>Probabilité</TableCell>
            <TableCell>Probabilité cumulée</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {totalOutputs
            ? woundResultsLabels.map((label, i) => (
                <TableRow key={i}>
                  <TableCell>{label}</TableCell>
                  <TableCell>{formattedOutputs[i]}</TableCell>
                  <TableCell>{`${formattedOutputsAsPercentage[i]} %`}</TableCell>
                  <TableCell>
                    {i ? `${formattedOutputsAsCumulativePercentage[i]} %` : '-'}
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
