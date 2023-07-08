const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;

const activeCodes = new Object();

app.post("/newcode", (req, res) => {
  if (req.headers["token"] == TOKEN) {
    activeCodes[`${req.headers["code"]}`] = req.headers["uuid"];
    console.log(
      `Added ${req.headers["code"]} with uuid: ${req.headers["uuid"]}`
    );
    setTimeout(() => {
      delete activeCodes[req.headers["code"]];
      console.log(
        `Code ${req.headers["code"]} timed out with uuid: ${req.headers["uuid"]}`
      );
    }, 300000);
    res.status(201).send();
  } else {
    res.status(403).send();
  }
});

app.get("/auth", (req, res) => {
  const { code } = req.body;

  if (activeCodes[code]) {
    res.status(200).send({
      code: `${code}`,
      uuid: `${activeCodes[code]}`,
    });
  } else {
    res.status(400).send({
      error: "invalid code",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
