import React, { useState } from 'react';
import {sleep} from 'sleep-ts'
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Alert, Snackbar } from '@mui/material';

interface ITabela {
  rows?: any[];
  loading?: boolean;
}



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, type: "string"},
  {
    field: 'photo', headerName: 'Foto', width: 70, renderCell: (params) => {
      return (
        <img
          src={params.value} // Assume que params.value contém o URL da imagem
          alt="Boat Photo"
          style={{ width: 50, height: 50, objectFit: 'cover' }} // Ajuste o estilo conforme necessário
        />
      );
    }
  },
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
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");



  const handleRowSelectionChange = (selection: GridRowSelectionModel) => {
    setSelectedRows(selection);
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      navigate(`/barco/cadastro/${selectedRows[0]}`);
    } else {
      showAlert('Selecione apenas uma linha para editar.', 'error');
    }
  };

  const handleVisualizar = async () => {
    if (selectedRows.length === 1) {
      navigator.clipboard.writeText(`http://localhost:5173/catalogo/barco/${selectedRows[0]}`);
      
      showAlert('Link da página foi copiado!', 'success')
      await delay(2000)
      
      navigate(`/catalogo/barco/${selectedRows[0]}`);
    } else {
      showAlert('Selecione apenas uma linha para editar.', 'error');
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
          showAlert("Excluído com sucesso!", "success");
          await delay(2000)
          location.reload();

        } else {
          showAlert("Não foi possível excluir!", "error");
          
        }
      } catch (error) {
        showAlert("Erro ao tentar excluir. Tente novamente mais tarde.", "error");
      }
    } else {
      showAlert("Selecione apenas uma linha para excluir.", "error");
    }
  };
  
  const showAlert = (message: string, severity: "success" | "error") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  
  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
      {selectedRows.length > 0 && (
          
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
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
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
