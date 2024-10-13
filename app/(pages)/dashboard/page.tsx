import getRoutines from "@/app/actions/getRoutines";
import getTasks from "@/app/actions/getTasks";
import Main from "@/components/Main";
import React from "react";

const page = async () => {
	const routines = await getRoutines();
	const tasks = await getTasks();
	return (
		<div>
			<Main routines={routines} tasks={tasks} />
		</div>
	);
};

export default page;
