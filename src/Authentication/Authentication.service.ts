
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIAuthentication, TSAuthentication, Authentication, } from "../drizzle/schema";

export const AuthenticationService = async (limit?: number): Promise<TSAuthentication[] | null> => {
    if (limit) {
        return await db.query.Authentication.findMany({
            limit: limit
        });
    }
    return await db.query.Authentication.findMany();
}

export const getAuthenticationervice = async (id: number): Promise<TIAuthentication | undefined> => {
    return await db.query.Authentication.findFirst({
        where: eq(Authentication.auth_id, id)
    })
}

export const createAuthenticationService = async (data: TIAuthentication) => {
    await db.insert(Authentication).values(data);
    return "Authentication created successfully";
  };

  export const updateAuthenticationService = async (id: number, data: TIAuthentication) => {
    await db.update(Authentication)
            .set(data)
            .where(eq(Authentication.auth_id, id));
    return "Authentication updated successfully";
  };

export const deleteAuthenticationervice = async (id: number) => {
    await db.delete(Authentication).where(eq(Authentication.auth_id, id))
    return "Authentication deleted successfully";
}

// GET Authentication BY AUTHOR
//  export const getAuthenticationByAuthor = async (author: string): Promise<TIAuthentication[] | null> => {
//     return await db.query.Authentication.findMany({
//         where: eq(Authentication.author, author)
//     })
// }