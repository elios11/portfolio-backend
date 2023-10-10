import express from "express";
import { connectToDb, getDb } from "./db.js";

/* Initialize express app */
const app = express();
const PORT = process.env.PORT || 3000;
const SERVER_URI = import.meta.env.SERVER_URI;

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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", SERVER_URI);
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
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
        .forEach((project) => projects.push(project))
        .then(() => res.status(200).json(projects))
        .catch(() =>
            res.status(500).json({ error: "Could not fetch the documents" })
        );
});
