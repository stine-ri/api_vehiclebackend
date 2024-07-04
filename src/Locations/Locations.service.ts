
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TILocations, TSLocations, Locations, } from "../drizzle/schema";

export const LocationsService = async (limit?: number): Promise<TSLocations[] | null> => {
    if (limit) {
        return await db.query.Locations.findMany({
            limit: limit
        });
    }
    return await db.query.Locations.findMany();
}

export const getLocationservice = async (id: number): Promise<TILocations | undefined> => {
    return await db.query.Locations.findFirst({
        where: eq(Locations.location_id, id)
    })
}

export const createLocationservice = async (Location: TILocations) => {
    await db.insert(Locations).values(Location)
    return "Location created successfully";
}

export const updateLocationservice = async (id: number, Location: TILocations) => {
    await db.update(Locations).set(Location).where(eq(Locations.location_id, id))
    return "Location updated successfully";
}

export const deleteLocationservice = async (id: number) => {
    await db.delete(Locations).where(eq(Locations.location_id, id))
    return "Location deleted successfully";
}

// GET Locations BY AUTHOR
//  export const getLocationsByAuthor = async (author: string): Promise<TILocations[] | null> => {
//     return await db.query.Locations.findMany({
//         where: eq(Locations.author, author)
//     })
// }