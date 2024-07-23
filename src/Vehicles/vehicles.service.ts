
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIVehicles, TSVehicles, Vehicles, } from "../drizzle/schema";

export const VehiclesService = async (limit?: number): Promise<TSVehicles[] | null> => {
    if (limit) {
        return await db.query.Vehicles.findMany({
            limit: limit
        });
    }
    return await db.query.Vehicles.findMany();
}

export const getVehicleservice = async (id: number): Promise<TIVehicles | undefined> => {
    try {
        const vehicle = await db.query.Vehicles.findFirst({
            where: eq(Vehicles.id, id)
        });
        console.log('Fetched Vehicle:', vehicle); // Log the fetched vehicle for debugging
        return vehicle;
    } catch (error) {
        console.error('Error fetching vehicle from service:', error);
        throw error;
    }
};

export const createVehicleservice = async (Vehicle: TIVehicles) => {
    await db.insert(Vehicles).values(Vehicle)
    return "Vehicle created successfully";
}

export const updateVehicleservice = async (id: number, Vehicle: TIVehicles) => {
    await db.update(Vehicles).set(Vehicle).where(eq(Vehicles.id, id))
    return "Vehicle updated successfully";
}

export const deleteVehicleservice = async (id: number) => {
    await db.delete(Vehicles).where(eq(Vehicles.id, id))
    return "Vehicle deleted successfully";
}

// GET Vehicles BY AUTHOR
//  export const getVehiclesByAuthor = async (author: string): Promise<TIVehicles[] | null> => {
//     return await db.query.Vehicles.findMany({
//         where: eq(Vehicles.author, author)
//     })
// }