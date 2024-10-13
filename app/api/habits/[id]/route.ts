import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

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
