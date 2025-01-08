import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  ListItemText,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface BoatResponse {
  id: string;
  idBarco: number;
  photos: string[];
  manufacturer: string;
  model: string;
  size: number;
  year: number;
  nameVessel: string;
  marina?: string;
  value: number;
  mark?: string;
  amount: number;
  modelPower: string;
  yearEngine: number;
  hours: number;
  fuel: number;
  ips: boolean;
  surface?: boolean;
  bridle: boolean;
  stern: boolean;
  outdrive?: string;
  pickups?: string[] | undefined;
  sailor?: Sailor;
  owner?: Owner;
  announcement?: Announcement;
  keywords: string[];
  equipment: string[];
  status: string;
  observationsAdm?: string;
  observationsPublish?: string;
}

interface Sailor {
  name: string;
  number: string;
  email: string;
}

interface Owner {
  name: string;
  number: string;
  email: string;
}

interface Announcement {
  announceSite: boolean;
  announceMercadoLivre: boolean;
  announceBombarco: boolean;
  announceInstagram: boolean;
}

interface BoatFormErrors {
  manufacturer?: string;
  model?: string;
  size?: string;
  year?: string;
  nameVessel?: string;
  value?: string;
  hours?: string;
  yearEngine?: string;
  amount?: string;
}

interface IBoatFormProps {
  idBarco: string | undefined;
}

const STATUS_OPTIONS = ["Ativas e Pendentes", "Ativas", "Pendentes"];
const EQUIPMENT_OPTIONS = [
  "Antena TV", 
  "Ar Condicionado",
  "Boiler", 
  "Browthruster",
  "Bússola",
  "Capa", "Capota", "Carregador de Baterias", "Carreta", "Churrasqueira", "Chuveiro de Popa", "Chistaleira", "Comando  Eletrônico", "Dessalinizador", "Direção Hidráulica", "DVD", "Estabilizador", "Faróis", "Farol Robotizado", "Fechamento Completo", "Flaps Hidráulicos", "Fogão Elétrico",
  "Freezer", "Geladeira", "Geleira", "Gerador",
  "GPS",
  "GPS Fly",
  "Guicho Elétrico",
  "Home Theater",
  "Icemaker",
  "Iluminação Subaquática", "Inversor",
  "Joystick", "Plataforma Submergível", "Microondas", "Passarela Hidráulica", "Piloto Automático", "Plotter", "Projetor / Telão", "Radar", "Rádio VHF", "Rádio VHF Fly", "Sky", "Solário de Popa", "Sólario de Proa", "Som", "Sonda", "Strobolight", "Tapete Emborachado", "Targa", "Teka Patamar de Popa", "Teka Praça de Popa", "Teka Cockpit", "Teka Passadiço", "Teka Proa", "Televisão", "Toldo", "Tomada de Cais", "Turco de Popa", "Ventilador", "WC Elétrico", "WC Manual", "Defensa", "Extintor"
];

const BoatForm: React.FC<IBoatFormProps> = ({ idBarco }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [formData, setFormData] = useState<BoatResponse>({
    id: "",
    idBarco: 0,
    photos: [],
    manufacturer: "",
    model: "",
    size: 0,
    year: new Date().getFullYear(),
    nameVessel: "",
    marina: "",
    value: 0,
    mark: "",
    amount: 0,
    modelPower: "",
    yearEngine: new Date().getFullYear(),
    hours: 0,
    fuel: 0,
    ips: false,
    surface: false,
    bridle: false,
    stern: false,
    outdrive: "",
    pickups: [],
    sailor: { name: "", number: "", email: "" },
    owner: { name: "", number: "", email: "" },
    announcement: {
      announceSite: false,
      announceMercadoLivre: false,
      announceBombarco: false,
      announceInstagram: false,
    },
    keywords: [],
    equipment: [],
    status: "",
    observationsAdm: "",
    observationsPublish: "",
  });

  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );

  const [fieldErrors, setFieldErrors] = useState<BoatFormErrors>({});

  useEffect(() => {
    const errors: BoatFormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      switch (key) {
        case "manufacturer":
          if (!value.trim()) {
            errors.manufacturer = "O fabricante é obrigatório.";
          }
          break;
        case "model":
          if (!value.trim()) {
            errors.model = "O modelo é obrigatório.";
          }
          break;
        case "size":
          if (value <= 0) {
            errors.size = "O tamanho deve ser maior que zero.";
          }
          break;
        case "year":
          if (value < 1900 || value > 2100 ){
            errors.year = `O ano deve estar entre 1900 e 2100.`;
          }
          break;
        case "nameVessel":
          if (!value.trim()) {
            errors.nameVessel = "O nome da embarcação é obrigatório.";
          }
          break;
        case "value":
          if (value <= 0) {
            errors.value = "O valor deve ser maior que zero.";
          }
          break;
        case "hours":
          if (value < 0) {
            errors.hours = "A hora deve ser maior que zero.";
          }
          break;
        case "yearEngine":
          if (value < 1900 || value > 2100) {
            errors.yearEngine = "O ano deve estar entre 1900 e 2100.";
          }
          break;
        case "amount":
          if (value < 0) {
            errors.amount = "A quantidade deve ser maior que zero.";
          }
          break;
        default:
          break;
      }
    });

    setFieldErrors(errors);
  }, [formData]);

  const showAlert = (message: string, severity: "success" | "error") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (Object.keys(fieldErrors).length > 0) {
      showAlert("Existem erros no formulário", "error");
      return;
    }

    const url = idBarco
      ? `https://ms-internautica-crm.onrender.com/boat/update/${idBarco}`
      : "https://ms-internautica-crm.onrender.com/boat/create";

    const method = idBarco ? "PUT" : "POST";

    try {
      setLoading(true);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status == 400) {
        const result = await response.json();
        console.log(result);

        if (result && Object.keys(result).length > 0) {
        } else {
          showAlert(
            idBarco
              ? "Erro ao atualizar o barco. Verifique os dados e tente novamente."
              : "Erro ao criar o barco. Verifique os dados e tente novamente.",
            "error"
          );
        }
      }

      if (response.status == 201 || response.status == 200) {
        showAlert(
          idBarco
            ? "Barco atualizado com sucesso!"
            : "Barco criado com sucesso!",
          "success"
        );
      }
      console.log(response.status);
    } catch (err: any) {
      showAlert(idBarco ? "Erro ao atualizar!" : "Erro ao criar!", "success");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!idBarco) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://ms-internautica-crm.onrender.com/boat/get-by-id/${idBarco}`
        );

        if (!response.ok) {
          showAlert("Erro ao buscar dados no banco!", "error");
        }

        const result: BoatResponse = await response.json();
        setFormData(result);
        console.log(result);
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idBarco]);

    
  const selectAllEquipment = () => {
    setFormData({
      ...formData,
      equipment: EQUIPMENT_OPTIONS,
    });
  };


  const deselectAllEquipment = () => {
    setFormData({
      ...formData,
      equipment: [],
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      let updatedEquipment = [...prev.equipment];    
      if (value) {
        const equipmentWithQuantity = `${name} - Quantidade: ${value}`;
        updatedEquipment = updatedEquipment.filter((item) => !item.startsWith(name));
        updatedEquipment.push(equipmentWithQuantity);
      } else {
        updatedEquipment = updatedEquipment.filter((item) => !item.startsWith(name));
      }
  
      return {
        ...prev,
        equipment: updatedEquipment,
      };
    });
  };
  

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleWordInputBlur = () => {
    const words = (formData.keywords as unknown as string)
      .split(";")
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    setFormData((prev) => ({
      ...prev,
      keywords: words,
    }));
  };

  const handleAnnouncementChange = (
    name: keyof Announcement,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      announcement: {
        ...prev.announcement,
        [name]: checked,
      },
    }));
  };

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      const equipment = checked
        ? [...prev.equipment, name]
        : prev.equipment.filter((item) => item !== name);
      return { ...prev, equipment };
    });
  };

  return (
    <>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Fotos</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Upload de Fotos
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const newPhotos = Array.from(files).map((file) =>
                        URL.createObjectURL(file)
                      );
                      setFormData((prev) => ({
                        ...prev,
                        photos: [...prev.photos, ...newPhotos],
                      }));
                    }
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Pré-visualização:</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                  marginTop: 2,
                }}
              >
                {formData.photos.map((photo, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: 100,
                      height: 100,
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                    <Button
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          photos: prev.photos.filter((_, i) => i !== index),
                        }));
                      }}
                      size="small"
                      color="secondary"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "#fff",
                      }}
                    >
                      Remover
                    </Button>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Identificação</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Fabricante"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleInputChange}
                error={!!fieldErrors.manufacturer}
                helperText={fieldErrors.manufacturer || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modelo"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                error={!!fieldErrors.model}
                helperText={fieldErrors.model || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tamanho"
                type="number"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                error={!!fieldErrors.size}
                helperText={fieldErrors.size || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ano"
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                error={!!fieldErrors.year}
                helperText={fieldErrors.year || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Nome da embarcação"
                name="nameVessel"
                value={formData.nameVessel}
                onChange={handleInputChange}
                error={!!fieldErrors.nameVessel}
                helperText={fieldErrors.nameVessel || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marina"
                name="marina"
                value={formData.marina}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Preço"
                type="number"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                error={!!fieldErrors.value}
                helperText={fieldErrors.value || ""}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Motorização</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Modelo/Potência"
                name="modelPower"
                value={formData.modelPower}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantidade"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                error={!!fieldErrors.amount}
                helperText={fieldErrors.amount || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marca"
                name="mark"
                value={formData.mark}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ano"
                type="number"
                name="yearEngine"
                value={formData.yearEngine}
                onChange={handleInputChange}
                error={!!fieldErrors.yearEngine}
                helperText={fieldErrors.yearEngine || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Horas"
                type="number"
                name="hours"
                value={formData.hours}
                onChange={handleInputChange}
                error={!!fieldErrors.hours}
                helperText={fieldErrors.hours || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Combustível"
                type="text"
                name="fuel"
                value={formData.fuel}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.ips}
                    onChange={handleCheckboxChange}
                    name="ips"
                  />
                }
                label="IPS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.bridle}
                    onChange={handleCheckboxChange}
                    name="bridle"
                  />
                }
                label="Pé de Galinha"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.stern}
                    onChange={handleCheckboxChange}
                    name="stern"
                  />
                }
                label="Popa"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.surface}
                    onChange={handleCheckboxChange}
                    name="surface"
                  />
                }
                label="Superfície"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Rabeta"
                name="outdrive"
                value={formData.outdrive || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  value={formData.status}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData((prev) => ({ ...prev, status: value }));
                  }}
                  input={<OutlinedInput label="Status" />}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Captação</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="captador-label">Captador</InputLabel>
                <Select
                  labelId="captador-label"
                  id="captador-select"
                  multiple
                  value={formData.pickups || []}
                  onChange={(e) => {
                    const value = e.target.value as string[];
                    setFormData((prev) => ({ ...prev, pickups: value }));
                  }}
                  input={<OutlinedInput label="Captador" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {["João", "Maria", "Pedro", "Ana"].map((person) => (
                    <MenuItem key={person} value={person}>
                      <Checkbox checked={formData.pickups?.includes(person)} />
                      <ListItemText primary={person} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Proprietário</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Nome"
                name="owner.name"
                value={formData.owner?.name || ""}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    owner: { ...prev.owner, name: value },
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Número de Contato"
                name="owner.number"
                value={formData.owner?.number || ""}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    owner: { ...prev.owner, number: value },
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="owner.email"
                value={formData.owner?.email || ""}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData((prev) => ({
                    ...prev,
                    owner: { ...prev.owner, email: value },
                  }));
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Palavras-Chave</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Palavras-chave (separadas por ponto e vírgula)"
                name="keywords"
                value={(formData.keywords as unknown as string) || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    keywords: e.target.value,
                  }))
                }
                onBlur={handleWordInputBlur}
              />
            </Grid>
                  
            
            <Grid item xs={12}>
  <Typography variant="h6">Equipamentos</Typography>
  <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', gap: '10px', flexDirection: smDown ? 'column' : 'row', paddingTop: '10px' }}>
  <Button variant="contained" onClick={selectAllEquipment}>
    Selecionar Todos
  </Button>

  <Button variant="outlined" onClick={deselectAllEquipment}>
    Desmarcar Todos
  </Button>
</Grid>
</Grid>





       
      {EQUIPMENT_OPTIONS.map((equipment) => (
        <Grid item xs={6} sm={4} key={equipment}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.equipment.includes(equipment)}
                onChange={handleEquipmentChange}
                name={equipment}
              />
            }
            label={equipment}
          />
        </Grid>
      ))}

<Grid item xs={6} sm={4}>
  <TextField
    label="Gerador KVA"
    type="number"
    name="Gerador KVA" 
    value={formData.equipment.find((item) => item.startsWith("Gerador KVA"))?.split(" - Quantidade: ")[1] || ""}
    onChange={handleQuantityChange} 
    fullWidth
  />
</Grid>
<Grid item xs={6} sm={4}>
  <TextField
    label="Gerador Horas"
    type="number"
    name="Gerador Horas" 
    value={formData.equipment.find((item) => item.startsWith("Gerador Horas"))?.split(" - Quantidade: ")[1] || ""}
    onChange={handleQuantityChange} 
    fullWidth
  />
</Grid>
<Grid item xs={6} sm={4}>
  <TextField
    label="Quartos"
    type="number"
    name="Quartos" 
    value={formData.equipment.find((item) => item.startsWith("Quartos"))?.split(" - Quantidade: ")[1] || ""}
    onChange={handleQuantityChange} 
    fullWidth
  />
</Grid>
<Grid item xs={6} sm={4}>
  <TextField
    label="Banheiros"
    type="number"
    name="Banheiros " 
    value={formData.equipment.find((item) => item.startsWith("Banheiros "))?.split(" - Quantidade: ")[1] || ""}
    onChange={handleQuantityChange} 
    fullWidth
  />
</Grid>



      
      
     
                <Grid item xs={12}>
              <Typography variant="h6">Observações</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Administração"
                name="observationsAdm"
                value={formData.observationsAdm || ""}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Publicação"
                name="observationsPublish"
                value={formData.observationsPublish || ""}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : idBarco ? (
                  "Atualizar Barco"
                ) : (
                  "Criar Barco"
                )}
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default BoatForm;
