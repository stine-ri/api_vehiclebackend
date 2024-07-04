
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIFleetManagement, TSFleetManagement, FleetManagement, } from "../drizzle/schema";

export const FleetManagementService = async (limit?: number): Promise<TSFleetManagement[] | null> => {
    if (limit) {
        return await db.query.FleetManagement.findMany({
            limit: limit
        });
    }
    return await db.query.FleetManagement.findMany();
}

export const getFleetManagementervice = async (id: number): Promise<TIFleetManagement | undefined> => {
    return await db.query.FleetManagement.findFirst({
        where: eq(FleetManagement.fleet_id, id)
    })
}

export const createFleetManagementService = async (data: TIFleetManagement) => {
    await db.insert(FleetManagement).values(data);
    return "FleetManagement created successfully";
  };

  export const updateFleetManagementService = async (id: number, data: TIFleetManagement) => {
    await db.update(FleetManagement)
            .set(data)
            .where(eq(FleetManagement.fleet_id, id));
    return "FleetManagement updated successfully";
  };
export const deleteFleetManagementervice = async (id: number) => {
    await db.delete(FleetManagement).where(eq(FleetManagement.fleet_id, id))
    return "FleetManagement deleted successfully";
}

// GET FleetManagement BY AUTHOR
//  export const getFleetManagementByAuthor = async (author: string): Promise<TIFleetManagement[] | null> => {
//     return await db.query.FleetManagement.findMany({
//         where: eq(FleetManagement.author, author)
//     })
// }