import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  TextField,
  Paper,
  Collapse,
  IconButton,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';

const BarraBusca: React.FC = () => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const toggleFilters = () => setIsFiltersExpanded((prev) => !prev);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
      }}
    >
      {/* Barra de busca e botão de filtro */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Digite o que procura..."
        />

        {/* Botão de filtro com ícone */}
        <IconButton
          onClick={toggleFilters}
          color="primary"
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            padding: 1,
          }}
        >
          <FilterAltIcon />
        </IconButton>
      </Box>

      {/* Filtros expansíveis */}
      <Collapse in={isFiltersExpanded}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 2,
          }}
        >
          {/* Filtro de Status */}
          <Select
            defaultValue="Ativas e Pendentes"
            size="small"
            fullWidth
          >
            <MenuItem value="Ativas e Pendentes">Ativas e Pendentes</MenuItem>
            <MenuItem value="Ativas">Ativas</MenuItem>
            <MenuItem value="Pendentes">Pendentes</MenuItem>
          </Select>

          {/* Filtros de Valores */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="Valor Mínimo"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
            />
            <TextField
              label="Valor Máximo"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
            />
          </Box>

          {/* Filtros de Tamanho */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="Tamanho Mínimo"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
            />
            <TextField
              label="Tamanho Máximo"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Botões de ação */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              fullWidth
            >
              Limpar
            </Button>
            <Button
              variant="contained"
              startIcon={<FilterAltIcon />}
              fullWidth
            >
              Aplicar
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};



export default BarraBusca;
