import getRoutineById from "@/app/actions/getRoutineById";
import Routine from "@/components/Pages/Routine";
import React from "react";

const page = async (params: any) => {
	const routine: any = await getRoutineById(params.params.routineId);

	return (
		<div>
			<Routine routine={routine} />
		</div>
	);
};

export default page;
