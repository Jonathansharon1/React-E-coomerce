import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// headRow - an array that represents the titles of the table
// rows - an array of objects that contains the body of the table

const TableComp = ({headRow,rows}) => {

  return (
    <div style={{margin: '20px'}}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{backgroundColor: '#ADD8E6'}}>
            {
                headRow.map((th, index) => (
                     <TableCell style={{ borderRight: '1px solid #ccc' }} align='center' key={index}><strong>{th}</strong></TableCell>
                ))
            }
            

          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                
            {
                Object.keys(row).map((key) => (
                    <TableCell  style={{ borderRight: '1px solid #ccc' }} align='center' key={key}>
                        {row[key]}
                    </TableCell>
                ))
            }
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
    </div>
  )
};

export default TableComp;
