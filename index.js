const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  }
);

const Jeux = sequelize.define("Jeux", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  nom: DataTypes.STRING,
});

(async () => {
  try {
    let maxAttempts = 10; // Vous pouvez ajuster ce nombre en fonction de vos besoins.
    let delay = 5000; // 5 secondes (en millisecondes) entre chaque tentative.
    let connected = false;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        connected = true;
        break;
      } catch (error) {
        console.error("Unable to connect to the database:", error);
        if (attempt < maxAttempts) {
          console.log(`Retrying in ${delay / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.error("Max connection attempts reached. Exiting...");
          process.exit(1);
        }
      }
    }

    if (connected) {
      await sequelize.sync();
      await Jeux.findOrCreate({
        where: { id: 1 },
        defaults: {
          nom: "Elden Ring",
        },
      });
      await Jeux.findOrCreate({
        where: { id: 2 },
        defaults: {
          nom: "Stellaris",
        },
      });
      await Jeux.findOrCreate({
        where: { id: 3 },
        defaults: {
          nom: "Superman 64",
        },
      });
      console.log("Database initialized successfully.");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    Jeux.findAll().then((r) => res.send(r));
  });

  app.listen(port, () => {
    return console.log(`Server is listening at http://localhost:${port}`);
  });
})();
