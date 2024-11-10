import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getRoutineById(routineId: any) {
	try {
		console.log("routineid: " + routineId);
		const currentUser = await getCurrentUser();

		if (!currentUser) return [];

		const routine = await prisma.routine.findUnique({
			where: {
				id: routineId,
			},
			include: {
				user: true,
				habits: {
					orderBy: { order: "asc" }, // This ensures habits are ordered by the 'order' field
				},
			},
		});

		return routine;
	} catch (error) {
		console.error("Error fetching routine:", error);
		return { message: "Internal Server Error" };
	}
}
