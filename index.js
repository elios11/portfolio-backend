import express from "express";
import { connectToDb, getDb } from "./db.js";

/* Initialize express app */
const app = express();

/* Database connection */
let db;
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log("Listening on http://localhost:3000/");
        });
        db = getDb();
    }
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
