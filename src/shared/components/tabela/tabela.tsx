import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface ITabela {
  rows?: any[];
  loading?: boolean;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, type: "string"},
  { field: 'photo', headerName: 'Foto', width: 70 },
  { field: 'name', headerName: 'Nome', width: 130 },
  { field: 'manufacturer', headerName: 'Fabricante', width: 160 },
  { field: 'model', headerName: 'Modelo', width: 160 },
  { field: 'size', headerName: 'Tamanho', width: 100 },
  { field: 'year', headerName: 'Ano', width: 100 },
  { field: 'engines', headerName: 'Motores', width: 70 },
  { field: 'engine', headerName: 'Motor', width: 160 },
  { field: 'hours', headerName: 'Horas', width: 70 },
  { field: 'marina', headerName: 'Marinha', width: 160 },
  { field: 'value', headerName: 'Valor', width: 160 },
  { field: 'collector', headerName: 'Captador', width: 160 },
  { field: 'status', headerName: 'Status', width: 160 },
];

export const Tabela: React.FC<ITabela> = ({ rows = [], loading = false }) => {
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reseta o estado após 2 segundos
    } catch (error) {
      console.error("Falha ao copiar a URL:", error);
    }
  };

  const handleRowSelectionChange = (selection: GridRowSelectionModel) => {
    setSelectedRows(selection);
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      navigate(`/edit/${selectedRows[0]}`);
    } else {
      alert('Selecione apenas uma linha para editar.');
    }
  };

  const handleVisualizar = () => {
    if (selectedRows.length === 1) {
      setUrl(`http://localhost:5173/catalogo/barco/${selectedRows[0]}`)
      handleCopy()
      if(copied){
        alert('Link da página foi copiado!')
      }
      navigate(`/catalogo/barco/${selectedRows[0]}`);
    } else {
      alert('Selecione apenas uma linha para editar.');
    }
  };

  const handleDelete = async () => {
    if (selectedRows.length === 1) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://ms-internautica-crm.onrender.com/boat/delete/${selectedRows[0]}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token || "",
            },
          }
        );
  
        if (response.ok) {
          alert("Excluído com sucesso!");
          location.reload();

        } else {
          alert("Não foi possível excluir!");
        }
      } catch (error) {
        console.error("Erro ao tentar excluir:", error);
      }
    } else {
      alert("Selecione apenas uma linha para excluir.");
    }
  };
  
  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      {selectedRows.length > 0 && (
          // <BarraCrud ></BarraCrud>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: 2,
              padding: 2,
            }}
          >
            <Button variant="contained" color="primary" onClick={handleVisualizar}>
              visualizar
            </Button>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Editar
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Excluir
            </Button>
            
          </Box>
        )}
      <Paper sx={{ height: '100%', width: '100%', position: 'relative' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 15, 20]}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelectionChange}
          sx={{ border: 0 }}
        />
      
      </Paper>
    </>
  );
};
