import { Box, Grid, CardContent, Typography, Divider } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Wrapper, DivForms, ListItem, Title, Description, Div, Img, TitleLogo, SubTitle } from './VisualizacaoBarco.styled.ts';
import Logo from '../../assets/logo.jpg';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BoatDetails() {
  const { idBarco } = useParams<{ idBarco: string }>();

  const [data, setData] = useState<BoatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


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
    pickups?: string[];
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

  useEffect(() => {
    if (!idBarco) {
      setError("ID do barco não fornecido.");
      setLoading(false);
      return;
    }
    const getById = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await fetch(
          `${API_URL}/boat/get-by-id/${idBarco}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setError("Erro ao obter dados.");
        }
      } catch (error) {
        setError("Erro ao realizar a requisição.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getById();
  }, [idBarco]);

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (error) {
    return <Typography>Erro: {error}</Typography>;
  }

  return (
    <>
      <Div>
        <Img src={Logo}></Img>
        <TitleLogo>Bergamin Boat</TitleLogo>
      </Div>
      <Wrapper>
        <Box
          sx={{
            marginTop: { xs: '20px', md: '60px' },
            overflow: 'hidden',
            width: '100%',
          }}
        >
          <Carousel indicators={true} navButtonsAlwaysVisible>
          {data?.photos.map((image, index) => {
            const imageUrl = image.startsWith("data:image/")
              ? image
              : `data:image/jpeg;base64,${image}`;

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={imageUrl}
                  alt={`Imagem ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "500px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            );
          })}
        </Carousel>

        </Box>

        <DivForms>
          <Grid
            container
            spacing={2}
            sx={{
              padding: { xs: 2, md: 4 },
              backgroundColor: '#ffffff',
            }}
          >
            <Grid item xs={12}>
              <CardContent>
                <SubTitle>{data?.size} pés</SubTitle>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {data?.nameVessel}
                </Typography>
                <Typography
                  variant="h5"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  R$ {data?.value}
                </Typography>
                <Divider sx={{ marginY: 2 }} />

                {/* Motor */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Motorização
                </Typography>
                <Box
                  component="ul"
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: '0',
                    justifyContent: 'space-between',
                  }}
                >
                  <ListItem>
                    <Title>Marca:</Title>
                    <Description>{data?.mark}</Description>
                  </ListItem>
                  <ListItem>
                    <Title>Modelo/Potência:</Title>
                    <Description>{data?.modelPower}HP</Description>
                  </ListItem>
                  <ListItem>
                    <Title>Quantidade:</Title>
                    <Description>{data?.amount}</Description>
                  </ListItem>
                  <ListItem>
                    <Title>Horas:</Title>
                    <Description>{data?.hours}</Description>
                  </ListItem>
                  <ListItem>
                    <Title>Combustível:</Title>
                    <Description>{data?.fuel}</Description>
                  </ListItem>
                  <ListItem>
                    <Title>Rabeta:</Title>
                    <Description>{data?.outdrive}</Description>
                  </ListItem>
                </Box>
                <Divider sx={{ marginY: 2 }} />

                {/* Características */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Características e Equipamentos
                </Typography>
                <Typography sx={{ lineHeight: 1.8 }}>
                  {data?.equipment.map((item, i) => (
                    <span key={i}>
                      {item}{i < data.equipment.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </DivForms>
      </Wrapper>
    </>
  );
}
