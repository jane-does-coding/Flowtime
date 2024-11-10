import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{ params }: { params: { routineId: string } }
) {
	const { reorderedHabits } = await req.json();

	try {
		// Update the order of habits in the database
		await Promise.all(
			reorderedHabits.map((habit: any, index: number) =>
				prisma.habit.update({
					where: { id: habit.id },
					data: { order: index },
				})
			)
		);

		return new NextResponse("Habits reordered successfully", { status: 200 });
	} catch (error) {
		return new NextResponse("Error reordering habits", { status: 500 });
	}
}
