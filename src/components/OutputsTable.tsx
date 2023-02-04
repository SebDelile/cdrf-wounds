import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { outputsType } from '@/types/outputsType';
import { woundResultsLabels } from '@/constants/woundResults';

type propTypes = {
  outputs: outputsType;
};

export default function OutputsTable({ outputs }: propTypes) {
  const totalOutputs = outputs.reduce((a, b) => a + b, 0);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{`(${totalOutputs})`}</TableCell>
            <TableCell>Somme</TableCell>
            <TableCell>Proportion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outputs.map((count, i) => (
            <TableRow key={i}>
              <TableCell>{woundResultsLabels[i]}</TableCell>
              <TableCell>{count}</TableCell>
              <TableCell>
                {totalOutputs
                  ? `${parseFloat(((count / totalOutputs) * 100).toFixed(1))} %`
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
