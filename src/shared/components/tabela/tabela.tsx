import { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'foto', headerName: 'Foto', width: 70 },
  { field: 'nome', headerName: 'Nome', width: 130 },
  { field: 'fabricante', headerName: 'Fabricante', width: 160 },
  { field: 'modelo', headerName: 'Modelo', width: 160 },
  { field: 'tamanho', headerName: 'Tamanho', width: 100 },
  { field: 'ano', headerName: 'Ano', width: 100 },
  { field: 'motores', headerName: 'Motores', width: 70 },
  { field: 'motor', headerName: 'Motor', width: 160 },
  { field: 'horas', headerName: 'Horas', width: 70 },
  { field: 'marinha', headerName: 'Marinha', width: 160 },
  { field: 'valor', headerName: 'Valor', width: 160 },
  { field: 'captador', headerName: 'Captador', width: 160 },
  { field: 'status', headerName: 'Status', width: 160 },
];

export default function Tabela() {
  const [rows, setRows] = useState([]); // State to manage rows
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchRows = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://ms-internautica-crm.onrender.com/boat/find-all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token || '',
          },
        });

        if (response.ok) {
          const data = await response.json(); // Parse JSON response
          setRows(data); // Set the rows state with fetched data
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchRows();
  }, []);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading} // Display loading spinner while fetching
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
