import getCurrentUser from "@/app/actions/getCurrentUser";
import getRoutines from "@/app/actions/getRoutines";
import getTasks from "@/app/actions/getTasks";
import Profile from "@/components/Profile/Profile";
import React from "react";

const page = async () => {
	const routines = await getRoutines();
	const tasks = await getTasks();
	const currentUser = await getCurrentUser();

	if (!currentUser) return;

	return (
		<div>
			{routines && tasks && currentUser && <div></div>}
			<Profile currentUser={currentUser} routines={routines} tasks={tasks} />
		</div>
	);
};

export default page;
