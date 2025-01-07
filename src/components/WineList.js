import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

function WineList({ wines, page, setPage, rowsPerPage, setRowsPerPage }) {
 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };

 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };

 return (
   <Paper sx={{ mt: 2 }}>
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Nome</TableCell>
             <TableCell>Produttore</TableCell>
             <TableCell>Origine</TableCell>
             <TableCell>Etichetta</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {wines
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((wine, index) => (
               <TableRow key={index} hover>
                 <TableCell>{wine.name}</TableCell>
                 <TableCell>{wine.producer}</TableCell>
                 <TableCell>{wine.origin}</TableCell>
                 <TableCell>{wine.label}</TableCell>
               </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     <TablePagination
       rowsPerPageOptions={[10, 25, 50]}
       component="div"
       count={wines.length}
       rowsPerPage={rowsPerPage}
       page={page}
       onPageChange={handleChangePage}
       onRowsPerPageChange={handleChangeRowsPerPage}
     />
   </Paper>
 );
}

export default WineList;
