import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { outputsType } from '@/types/outputsType';
import { woundResultsLabels } from '@/constants/woundResults';

type propTypes = {
  outputs: outputsType;
};

export default function OutputsTable({ outputs }: propTypes) {
  const totalOutputs = outputs.reduce((a, b) => a + b, 0);
  // for each : [count, percentage, percentage min]
  const displayedOutputs = outputs.map((output, index) => [
    parseFloat(output.toFixed(2)),
    `${parseFloat(((output / totalOutputs) * 100).toFixed(1))} %`,
    index
      ? `${parseFloat(
          (
            (outputs.reduce((a, b, j) => a + (index <= j ? b : 0), 0) /
              totalOutputs) *
            100
          ).toFixed(1)
        )} %`
      : '-',
  ]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{`(${totalOutputs})`}</TableCell>
            <TableCell>Somme</TableCell>
            <TableCell>Proportion</TableCell>
            <TableCell>Proportion résultat minimal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {totalOutputs
            ? displayedOutputs.map((displayedOutput, i) => (
                <TableRow key={i}>
                  <TableCell>{woundResultsLabels[i]}</TableCell>
                  <TableCell>{displayedOutput[0]}</TableCell>
                  <TableCell>{displayedOutput[1]}</TableCell>
                  <TableCell>{displayedOutput[2]}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
