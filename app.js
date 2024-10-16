const express = require("express");
const crypto = require("node:crypto");
const movies = require("./movies.json");
const { validateMovie } = require("./schemas/movies");
const { validatePartialMovie } = require("./schemas/movies");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGIN = [
        "http://localhost:8000",
        "http://localhost:5500",
        "http://localhost:8080",
        "http://10.0.0.22:8080",
        "http://10.0.0.22:5500",
      ];

      if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

// const ACCEPTED_ORIGIN = [
//   "http://localhost:8000",
//   "http://localhost:5500",
//   "http://localhost:8080",
//   "http://10.0.0.22:8080",
//   "http://10.0.0.22:5500",
// ];

// Todos los recursos que sean Movies se identifican con /movies
app.get("/movies", (req, res) => {
  //   res.header("Access-Control-Allow-Origin", "*");

  // Para aceptar solo los origenes que queramos
  // const origin = req.header("origin");
  // if (ACCEPTED_ORIGIN.includes(origin) || !origin) {
  //   res.header("Access-Control-Allow-Origin", origin);
  // }

  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
  res.json(movies);
});

app.post("/movies", (req, res) => {
  console.log("Request body:", req.body); // Ver el cuerpo de la solicitud
  const result = validateMovie(req.body);
  console.log("Validation result:", result); // Ver el resultado de la validación
  //   const { title, year, director, duracion, poster, genrer, rate } = req.body;

  if (result.error) {
    return res.status(400).json({ errors: JSON.parse(result.error.message) });
  }
  //   if (!result.success) {
  //     return res.status(400).json({ errors: result.error.errors }); // Ajustar esto para acceder a los errores
  //   }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);
  res.status(201).json(newMovie); // actualizar la cache del cliente
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ message: "Movie not found" });
});

app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors }); // Ajustar esto para acceder a los errores
  }

  const { id } = req.params;

  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

// app.delete
app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }
  movies.splice(movieIndex, 1);
  res.status(204).send();
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
