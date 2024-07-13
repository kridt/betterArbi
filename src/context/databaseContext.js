import { createContext } from "react";
import Localbase from "localbase";

// Create a new instance of Localbase
const db = new Localbase("arbitrage-db");

// Create the database context
const DatabaseContext = createContext(db);

export default DatabaseContext;
