
import { Hono } from "hono";
import { listAuthentication, getAuthentication, createAuthentication, updateAuthentication, deleteAuthentication, } from "./Authentication.controller"
import { zValidator } from "@hono/zod-validator";
import { AuthenticationSchema } from "./validator"; 

export const AuthenticationRouter = new Hono();
//get all Authentication

AuthenticationRouter.get("/Authentication", listAuthentication)
//get a single Authentication   api/Authentication/1
AuthenticationRouter.get("/Authentication/:id", getAuthentication)
// create a Authentication 
AuthenticationRouter.post("/Authentication", zValidator('json', AuthenticationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createAuthentication)
//update a Authentication
AuthenticationRouter.put("/Authentication/:id", updateAuthentication) 

AuthenticationRouter.delete("/Authentication/:id", deleteAuthentication)

//get Authentication by author

// AuthenticationRouter.get("/Authentication/author/:author", getAllAuthenticationByAuthor)
