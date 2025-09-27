import "./App.css";
import Navbar from "./components/NavBar/index.jsx";
import ResultCard from "./components/ResultCard/index-people.jsx";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Modal,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  CharactersProvider,
  useCharacters,
} from "./contexts/CharactersContext";

function CharactersPage() {
  const {
    characters,
    selectedCharacter,
    setSelectedCharacter,
    page,
    search,
    setSearch,
    totalPages,
    loading,
    handlePageChange,
  } = useCharacters();

  return (
    // multiplos characters
    <div>
      <Navbar setSearch={setSearch} search={search} />
      <Container
        maxWidth="false"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "between",
        }}
      >
        <Typography
          variant="title-lg"
          style={{ marginBottom: "1rem", fontSize: "2rem" }}
        >
          Characters
        </Typography>
        {loading && (
          <Grid container spacing={2}>
            {Array.from({ length: 10 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <Skeleton variant="rectangular" width={300} height={150} />
              </Grid>
            ))}
          </Grid>
        )}
        {!loading && characters.length > 0 && (
          <Grid container spacing={2}>
            {characters.map((character, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                <ResultCard
                  name={character.name}
                  gender={character.gender}
                  height={character.height}
                  onClick={() => setSelectedCharacter(character)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      {/* modal character selecionado */}
      {selectedCharacter && (
        <Modal
          open={!!selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        >
          <Card
            sx={{
              maxWidth: "70vw",
              margin: "auto",
              marginTop: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px #000000",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography gutterBottom variant="h2" component="div">
                  {selectedCharacter.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Birth Year: {selectedCharacter.birth_year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created: {selectedCharacter.created}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Edited {selectedCharacter.edited}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Eye Color: {selectedCharacter.eye_color}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Height: {selectedCharacter.height}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gender: {selectedCharacter.gender}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hair Collor: {selectedCharacter.hair_color}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mass: {selectedCharacter.mass}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Skin Color: {selectedCharacter.skin_color}
              </Typography>
              {selectedCharacter.starships.length > 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Total of starships: {selectedCharacter.starships.length}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No starships available...
                </Typography>
              )}
            </CardContent>
          </Card>
        </Modal>
      )}
      <Box
        style={{
          width: "100%",
          height: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          sx={{ width: "FitScreen" }}
          count={totalPages}
          page={page}
          onChange={(event, page) => handlePageChange(page)}
        />
      </Box>
    </div>
  );
}

export default function App() {
  return (
    <CharactersProvider>
      <CharactersPage />
    </CharactersProvider>
  );
}
