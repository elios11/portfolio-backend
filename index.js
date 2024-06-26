import express from "express";
import cors from "cors";
import { connectToDb, getDb } from "./db.js";

/* Initialize express app */
const app = express();
const PORT = process.env.PORT || 3000;
const APP_PATH = process.env.APP_PATH || "*";

/* Database connection */
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
        db = getDb();
    }
});

/* Enable CORS */
app.use(cors({ origin: APP_PATH }));

/* Home route */
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
});

/* Routes */
app.get("/info", (req, res) => {
    const homeInfo = [];

    db.collection("info")
        .find()
        .forEach((document) => homeInfo.push(document))
        .then(() => res.status(200).json(homeInfo))
        .catch(() =>
            res.status(500).json({ error: "Could not fetch the documents" })
        );
});

app.get("/about", (req, res) => {
    const aboutInfo = [];

    db.collection("about")
        .find()
        .forEach((document) => aboutInfo.push(document))
        .then(() => res.status(200).json(aboutInfo))
        .catch(() =>
            res.status(500).json({ error: "Could not fetch the documents" })
        );
});

app.get("/projects", (req, res) => {
    const projects = [];

    db.collection("projects")
        .find()
        .sort({ id: 1 })
        .forEach((project) => projects.push(project))
        .then(() => res.status(200).json(projects))
        .catch(() =>
            res.status(500).json({ error: "Could not fetch the documents" })
        );
});
