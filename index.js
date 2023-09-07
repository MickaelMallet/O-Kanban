// Charger les variables d'environnements
require("dotenv/config");

// Import des dépendances
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const router = require("./app/routers");

// Créer l'app
const app = express();


app.use(cors({
  origin: "*", 
}));

// On limite le nombre de requête des clients
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100000, // Limit each IP to 100 requests per `window` (here, per 15 minutes) // On met 100K ici pour pas être embêté en S07
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);


const bodyParser = multer();
// Body parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.none());


app.use(express.static("dist"));

// Router
app.use(router);

// Lancer l'app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
