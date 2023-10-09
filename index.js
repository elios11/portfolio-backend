import express from "express";
import { connectToDb, getDb } from "./db.js";

/* Initialize express app */
const app = express();
const PORT = process.env.PORT || 3000;

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
    res.header(
        "Access-Control-Allow-Origin",
        "http://localhost:5173, https://eliasferreira.netlify.app/"
    );
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

/* Routes */
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

app.get("/info", (req, res) => {
    const info = [];
    db.collection("info")
        .find()
        .forEach((project) => info.push(project))
        .then(() => res.status(200).json(info))
        .catch(() =>
            res.status(500).json({ error: "Could not fetch the documents" })
        );
});
