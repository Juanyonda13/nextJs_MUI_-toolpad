'use client'
import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import jsPDF from 'jspdf'
import { Button } from '@mui/material'


interface Column {
  id: 'ID' | 'name' | 'direccion' | 'size' | 'medidor'| 'lAnterior' | 'lActual' | 'action'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'ID', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Suscriptor', minWidth: 100 },
  {
    id: 'direccion',
    label: 'Direccion',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'medidor',
    label: 'Medidor',
    minWidth: 70,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'lAnterior',
    label: 'L. Anterior',
    minWidth: 70,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'lActual',
    label: 'L. Actual',
    minWidth: 70,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: 'action', label: 'Acciones', minWidth: 100 },
]

interface Data {
  ID: string
  name: string
  direccion: string
  medidor: number
  lAnterior:number
  lActual:number
  action?:any
}




export default function Report() {

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const downloadPdf = async (params: {
    ID: string,
    name: string,
    direccion: string,
    medidor: number,
    lAnterior: number,
    lActual: number
  }) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedPages: true
    });
  
    // Encabezado
    doc.setFontSize(18);
    doc.text(`Reporte de Consumo de Energía`, 105, 20);
  
    // Información del suscriptor
    doc.setLineWidth(1);
    doc.line(50, 30, 190, 30); // Línea horizontal
    doc.setFontSize(14);
    doc.text(params.name, 55, 35);
    doc.text(params.direccion, 55, 45);
  
    // Medidor y lecturas
    doc.text('N° Medidor:', 50, 60);
    doc.text(`${params.medidor}`, 120, 60);
    doc.text('Lectura Anterior:', 50, 75);
    doc.text(`${params.lAnterior}`, 120, 75);
    doc.text('Lectura Actual:', 50, 90);
    doc.text(`${params.lActual}`, 120, 90);
  
    // Pie de página
    doc.setLineWidth(0.5);
    doc.line(40, 280, 200, 280); // Línea horizontal en el pie de página
    doc.text('Generado automáticamente', 50, 290);
  
    const blob = doc.output('blob');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reporte.pdf';
    link.click();
  
    URL.revokeObjectURL(link.href);
  };
  function createData(
    ID: string,
    name: string,
    direccion: string,
    medidor: number,
    lAnterior:number,
    lActual:number,
    action?:any
  ): any {
    const button2 =<Button variant="contained"  onClick={() => downloadPdf({ID,name,direccion,medidor,lAnterior,lActual,action})}>Gescargar Reportes</Button>
    return { ID, name, direccion, medidor,lAnterior, lActual,action:button2 }
  }
  const generateCombinedPdf = async (data: Array<{
    ID: string,
    name: string,
    direccion: string,
    medidor: number,
    lAnterior: number,
    lActual: number
  }>) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedPages: true
    });
  
    // Encabezado
    doc.setFontSize(24);
    doc.text('Reporte de Consumos de Energía', 105, 20);
  
    // Título del reporte
    doc.setLineWidth(1);
    doc.line(50, 30, 190, 30); // Línea horizontal
    doc.setFontSize(16);
    doc.text('Información de los suscriptores seleccionados:', 55, 35);
  
    // Tabla de información
    doc.setFontSize(14);
    doc.text('N° Medidor', 50, 60);
    doc.text('Nombre y Dirección', 120, 60);
    doc.text('Lectura Anterior', 180, 60);
    doc.text('Lectura Actual', 230, 60);
  
    // Agregar datos de cada suscriptor
    const startY = 70;
    doc.setLineWidth(0.5);
    data.forEach((item, index) => {
      doc.line(50, startY + index * 10, 190, startY + index * 10); // Línea horizontal para cada fila
      doc.text(item.medidor.toString(), 55, startY + index * 10 + 5);
      doc.text(`${item.name} - ${item.direccion}`, 120, startY + index * 10 + 5);
      doc.text(item.lAnterior.toString(), 180, startY + index * 10 + 5);
      doc.text(item.lActual.toString(), 230, startY + index * 10 + 5);
    });
  
    // Pie de página
    doc.setLineWidth(0.5);
    doc.line(40, 280, 200, 280); // Línea horizontal en el pie de página
    doc.text('Generado automáticamente', 50, 290);
  
    const blob = doc.output('blob');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reporte-combinado.pdf';
    link.click();
  
    URL.revokeObjectURL(link.href);
  };
  const rows = [
    createData('45678', 'Pedro García', 'TROPICAL', 1002101,1002101,246813579),
    createData('56789', 'Ana López', 'TROPICAL', 246813579,1002101,246813579),
    createData('89012', 'Carlos Martín', 'TROPICAL', 345678901,1002101,246813579),
    createData('13579', 'Sofía Hernández', 'TROPICAL', 456789012,1002101,246813579),
    createData('24680', 'Tomás Santos', 'TROPICAL', 987654321,1002101,246813579),
    createData('36987', 'Lucía Díaz', 'TROPICAL', 135792468,1002101,246813579,),
    createData('47890', 'Mateo Fernández', 'TROPICAL', 246813579,1002101,246813579,),
    createData('15987', 'Isabel Gómez', 'TROPICAL', 345678901,1002101,246813579,),
    createData('27098', 'Eva Moreno', 'TROPICAL', 987654321,1002101,246813579,),
    createData('38765', 'Óscar Sánchez', 'TROPICAL', 135792468,1002101,246813579,),
    createData('49876', 'Valeria Pérez', 'TROPICAL', 246813579,1002101,246813579,),
    createData('59785', 'Julian Torres', 'TROPICAL', 345678901,1002101,246813579,),
    createData('69874', 'Laura Jiménez', 'TROPICAL', 987654321,1002101,246813579,),
    createData('79863', 'Antonio Hernández', 'TROPICAL', 135792468,1002101,246813579,),
  ]
  return (
    <>
    <Button variant="contained"  onClick={() => generateCombinedPdf(rows)}>Descargar Reporte del mes de Agosto</Button>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer id="table-container" sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  )
}