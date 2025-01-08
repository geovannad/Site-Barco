import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Select,
  TextField,
  
  Collapse,
  IconButton,
  useTheme,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";



interface BarraBuscaProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  filters: {
    status: string;
    valorMin: number;
    valorMax: number;
    tamanhoMin: number;
    tamanhoMax: number;
  };
  setFilters: Dispatch<
    SetStateAction<{
      status: string;
      valorMin: number;
      valorMax: number;
      tamanhoMin: number;
      tamanhoMax: number;
    }>
  >;
  applyFilters: () => void;
  clearFilters: () => void;
}

const BarraBusca: React.FC<BarraBuscaProps> = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  applyFilters,
  clearFilters,
}) => {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const theme = useTheme();
  const toggleFilters = () => setIsFiltersExpanded((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Digite o que procura..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />

        
        <IconButton
          onClick={toggleFilters}
          color="primary"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            padding: 1,
          }}
        >
          <FilterAltIcon />
        </IconButton>
      </Box>
      <Collapse in={isFiltersExpanded}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
          }}
        >
          <Select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            size="small"
            fullWidth
          >
            <MenuItem value="Ativas e Pendentes">Ativas e Pendentes</MenuItem>
            <MenuItem defaultChecked value="Ativas">Ativas</MenuItem>
            <MenuItem value="Pendentes">Pendentes</MenuItem>
          </Select>

          
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Valor Mínimo"
              variant="outlined"
              size="small"
              type="number"
              value={filters.valorMin}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  valorMin: Number(e.target.value),
                }))
              }
              fullWidth
            />
            <TextField
              label="Valor Máximo"
              variant="outlined"
              size="small"
              type="number"
              value={filters.valorMax}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  valorMax: Number(e.target.value),
                }))
              }
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Tamanho Mínimo"
              variant="outlined"
              size="small"
              type="number"
              value={filters.tamanhoMin}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  tamanhoMin: Number(e.target.value),
                }))
              }
              fullWidth
            />
            <TextField
              label="Tamanho Máximo"
              variant="outlined"
              size="small"
              type="number"
              value={filters.tamanhoMax}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  tamanhoMax: Number(e.target.value),
                }))
              }
              fullWidth
            />
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <Button
              variant="contained"       
              sx={{ backgroundColor: theme.palette.primary.light, color:'#2D3E40' }}
              size="small"
              fullWidth
              onClick={clearFilters}
              startIcon={<ClearIcon />}
            >
              Limpar
            </Button>
            <Button
              variant="contained"
              size="small"
              fullWidth
              onClick={applyFilters}
            >
              Aplicar
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default BarraBusca;
