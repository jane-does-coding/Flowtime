import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const user = await getCurrentUser();
	const userId = user?.id;

	if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	await prisma.habit.deleteMany({
		where: {
			routineId: params.id,
		},
	});

	const routine = await prisma.routine.deleteMany({
		where: {
			id: params.id,
			userId: userId,
		},
	});

	if (!routine.count) {
		return new NextResponse("Routine not found", { status: 404 });
	}

	return NextResponse.json({
		message: "Routine and its habits deleted successfully",
	});
}
