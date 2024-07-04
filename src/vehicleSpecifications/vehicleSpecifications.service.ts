import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIvehicleSpecifications, TSvehicleSpecifications, VehicleSpecifications , vehicleSpecificationsRelations } from "../drizzle/schema";

export const vehicleSpecificationsService = async (limit?: number): Promise<TSvehicleSpecifications[] | null> => {
    if (limit) {
        return await db.query.VehicleSpecifications.findMany({
            limit: limit
        });
    }
    return await db.query.VehicleSpecifications.findMany();
}

export const getvehicleSpecificationservice = async (id: number): Promise<TIvehicleSpecifications | undefined> => {
    return await db.query.VehicleSpecifications.findFirst({
        where: eq(VehicleSpecifications.id, id)
    })
}

export const createVehicleSpecificationService = async (vehicleSpecification: TIvehicleSpecifications) => {
    await db.insert(VehicleSpecifications).values([vehicleSpecification]);
    return "Vehicle specification created successfully";
}


export const updateVehicleSpecificationService = async (vehicleId: number, vehicleSpecification: Partial<TIvehicleSpecifications>) => {
    // Ensure vehicleId is not being updated
    const { id, ...updates } = vehicleSpecification;
    
    if (vehicleId !== undefined) {
        await db.update(VehicleSpecifications).set(updates).where(eq(VehicleSpecifications.id, vehicleId));
        return "Vehicle specification updated successfully";
    } else {
        throw new Error("vehicleId is required for updating vehicle specifications");
    }
};
export const deletevehicleSpecificationservice = async (id: number) => {
    await db.delete(VehicleSpecifications).where(eq(VehicleSpecifications.id, id))
    return "vehicleSpecifications deleted successfully";
}

