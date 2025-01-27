import { Box } from "@mui/material";
import { MenuLateral } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import BarraBusca from "../../shared/components/busca/busca";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabela } from "../../shared/components/tabela/tabela";

interface RowType {
  status: string;
  value: number;
  size: number;
}

export const Catalogo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("token: " + token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [rows, setRows] = useState<RowType[]>([]);
  const [filteredRows, setFilteredRows] = useState<RowType[]>([]); 
  const [searchQuery, setSearchQuery] = useState<string>(""); 
  const [filters, setFilters] = useState({
    status: "Ativas e Pendentes",
    valorMin: 0,
    valorMax: Infinity,
    tamanhoMin: 0,
    tamanhoMax: Infinity,
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const rowsFind = async () => {
      const token = localStorage.getItem("token");
      const timestamp = new Date().getTime();
      try {
        const response = await fetch(
          `https://ms-internautica-crm.onrender.com/boat/find-all?timestamp=${timestamp}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token || "",
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRows(data);
          setFilteredRows(data); 
          console.log("data:", data);
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    rowsFind();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filteredData = rows.filter(row => {
      const matchesSearch = Object.values(row).some(value =>
        value?.toString().toLowerCase().includes(query)
      );

      const matchesFilters =
        (filters.status === "Ativas e Pendentes" || row.status === filters.status) &&
        (filters.valorMin === undefined || row.value >= filters.valorMin) &&
        (filters.valorMax === undefined || row.value <= filters.valorMax) &&
        (filters.tamanhoMin === undefined || row.size >= filters.tamanhoMin) &&
        (filters.tamanhoMax === undefined || row.size <= filters.tamanhoMax);

      return matchesSearch && matchesFilters;
    });

    setFilteredRows(filteredData);
  }, [searchQuery, rows, filters]);

  const clearFilters = () => {
    setFilters({
      status: "Ativas e Pendentes",
      valorMin: 0,
      valorMax: Infinity,
      tamanhoMin: 0,
      tamanhoMax: Infinity,
    });
    setFilteredRows(rows); 
  };

  return (
    <MenuLateral>
      <Box>
        <LayoutBase
          titulo="Catálogo dos Barcos"
          barraDeFerramentas={
            <BarraBusca
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              setFilters={setFilters}
              applyFilters={() => setFilteredRows(rows)} // Se desejar implementar manualmente filtros
              clearFilters={clearFilters}
            />
          }
          children={null}
        />
        <Tabela rows={filteredRows} loading={loading} />
      </Box>
    </MenuLateral>
  );
};
