// import { prisma } from "../../lib/prisma";
// import type { services } from "./services.interface";

// const createServices = async (payload: services, userId: string) => {
//   const { name, description, price } = payload;

//     const technician = await prisma.technicianProfile.findUniqueOrThrow({
//         where: {userId}
//     })

    

//   const service = await prisma.service.create({
//     data: {
//       ...payload,
//         technicianId: technician.id,
//         categoryId

//     },
//   });
// };

// export const servicesService = {
//   createServices,
// };
