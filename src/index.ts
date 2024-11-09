import express from "express";
import { routeUsers } from "./endpoints/routeUsers";
import morgan from "morgan";
import { withErrorHandling } from "./withErrorHandling";
import { routeCreateRunningSession } from "./endpoints/routeCreateRunningSession";
import { routeCreateMatch } from "./endpoints/routeCreateMatch";

const app = express();

app.use(express.json());

app.use(morgan("tiny"));

app.get(`/health`, (_, res) => res.send("Well-Being Match Maker Is Live"));

app.get("/users", withErrorHandling(routeUsers));
app.get("/match/create", withErrorHandling(routeCreateMatch));
app.get("/runningsession/create", withErrorHandling(routeCreateRunningSession));

app.listen(8080, () => console.log(`Ready http://localhost:8080`));
