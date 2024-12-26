import { Box } from "@mui/material";
import { MenuLateral } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import BarraBusca from "../../shared/components/busca/busca";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tabela } from "../../shared/components/tabela/tabela";



export const Catalogo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("token: " + token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); 
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
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRows(data);
          setFilteredRows(data); 
          console.log("data:", data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    rowsFind();
  }, []);

  const applyFilters = () => {
    setFilteredRows(
      rows.filter((row) => {
        const matchesStatus =
          filters.status === "Ativas e Pendentes" ||
          row.status === filters.status;

        const matchesValor =
          (filters.valorMin === undefined || row.value >= filters.valorMin) &&
          (filters.valorMax === undefined || row.value <= filters.valorMax);
 
        const matchesTamanho =
          (filters.tamanhoMin === undefined || row.size >= filters.tamanhoMin) &&
          (filters.tamanhoMax === undefined || row.size <= filters.tamanhoMax);

        return matchesStatus && matchesValor && matchesTamanho;
      })
    );
  };

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

  useEffect(() => {
    const query = searchQuery.toLowerCase();
  
    setFilteredRows(
      rows.filter(row =>
        Object.values(row).some(value =>
          value?.toString().toLowerCase().includes(query)
        )
      )
    );
  }, [searchQuery, rows]);
  

  return (
    <MenuLateral>
      <Box>
        <LayoutBase
          titulo="Catálogo de barcos"
          barraDeFerramentas={
            <BarraBusca
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              setFilters={setFilters}
              applyFilters={applyFilters}
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
