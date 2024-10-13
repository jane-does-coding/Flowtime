"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Routines from "./Pages/Routines";

const Main = ({ routines, tasks }: any) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div>
			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			<div
				className={`${
					isOpen ? "ml-[17.5rem] xl:ml-[20rem]" : "ml-[5rem] "
				} transition-all px-12`}
			>
				<h2 className="nunito text-[2.8rem] text-neutral-800 mb-4 pt-12">
					Your Routines
				</h2>
			</div>
		</div>
	);
};

export default Main;
