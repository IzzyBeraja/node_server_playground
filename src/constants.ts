require("dotenv").config();

export const __prod__ = process.env.NODE_ENV === "production";
export const __dbNAME__ = process.env.DB_NAME;
export const __dbURL__ = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cpets.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
