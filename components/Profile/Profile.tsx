"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

const Profile = ({ currentUser, routines, tasks }: any) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div>
			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			<div
				className={`${
					isOpen ? "ml-[17.5rem] xl:ml-[20rem]" : "ml-[5rem] "
				} transition-all px-8 2xl:px-12`}
			>
				<h2 className="nunito text-[2.8rem] text-neutral-800 mb-4 pt-12">
					Profile
				</h2>
				<p className="gap-6 flex items-center justify-start ml-4 text-[1.25rem] mb-2">
					Name: <span>{currentUser.name}</span>
				</p>
				<p className="gap-6 flex items-center justify-start ml-4 text-[1.25rem] mb-2">
					Username:<span>{currentUser.username}</span>
				</p>
				<p className="gap-6 flex items-center justify-start ml-4 text-[1.25rem] mb-2">
					Email: <span>{currentUser.email}</span>
				</p>
				<h2 className="nunito text-[2.8rem] text-neutral-800 mb-2 pt-8">
					Routines
				</h2>
				<a
					href="/routines"
					className="px-12 py-1 rounded-xl text-[1rem] bg-red-300 "
				>
					View
				</a>
				<div className="grid grid-cols-3 w-[85%] gap-4 mt-6">
					{routines.map((routine: any) => (
						<a
							href={`/routines/${routine.id}`}
							key={routine.id}
							className="w-full bg-neutral-300/50 border-neutral-300/95 border-2 px-6 py-4 pt-3 rounded-[2rem] flex items-center justify-start gap-4"
						>
							<div className="">
								<h2 className="nunito text-[1.25rem] text-neutral-900 flex items-center justify-center gap-3">
									<span className="text-[2rem]">{routine.icon}</span>
									{routine.title}{" "}
								</h2>
								<p className="text-neutral-600 font-extralight text-[1rem]">
									{routine.habits.length} habits
								</p>
							</div>
						</a>
					))}
				</div>
				<h2 className="nunito text-[2.8rem] text-neutral-800 mb-2 pt-8">
					Tasks
				</h2>
				<a
					href="/tasks"
					className="px-12 py-1 rounded-xl text-[1rem] bg-red-300 "
				>
					View
				</a>
				<p className="gap-6 flex items-center justify-start ml-4 text-[1.25rem] mb-2 mt-6">
					Current Tasks: <span>{tasks.length}</span>
				</p>
				<br />
				<br />
				<br />
				<br />
				<br />
			</div>
		</div>
	);
};

export default Profile;
