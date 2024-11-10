import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	const { routineId, habits } = body;

	if (!routineId || !habits || !Array.isArray(habits)) {
		return new NextResponse("Missing required fields", { status: 400 });
	}

	try {
		const updatedRoutine = await prisma.routine.update({
			where: { id: routineId },
			data: {
				habits: {
					create: habits.map(
						(habit: { title: string; time: string; icon: string }) => ({
							title: habit.title,
							time: habit.time,
							icon: habit.icon,
						})
					),
				},
			},
		});

		return NextResponse.json(updatedRoutine);
	} catch (error) {
		return new NextResponse("Error creating routine", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	if (!id) {
		return new NextResponse("Missing habit ID", { status: 400 });
	}

	try {
		// Delete the habit from the database
		await prisma.habit.delete({
			where: { id: id },
		});

		return new NextResponse("Habit deleted successfully", { status: 200 });
	} catch (error) {
		return new NextResponse("Error deleting habit", { status: 500 });
	}
}
