"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Item = ({ task, isLast, closeDeadline }: any) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className="opacity-0"
		>
			<Link
				href={`/tasks/${task.id}`}
				className={`border-b-[1px]  px-2 md:px-2 xl:px-2 py-2 md:py-4 flex gap-4 items-center justify-between ${
					task.status.toLowerCase() == "done"
						? "opacity-[0.25] bg-neutral-500/[40%]"
						: "opacity-1"
				} ${isLast ? "border-transparent" : "border-neutral-400"} ${
					closeDeadline && task.status.toLowerCase() !== "done"
						? "border-red-400/50 bg-red-300/[10%]"
						: ""
				} `}
			>
				<h2 className="text-[1rem] xl:text-[1.25rem] font-bold text-black ">
					{task.title}
				</h2>
				<p className="text-neutral-600 text-[0.6rem] xl:text-[1rem]">
					{task.description.length > 20
						? task.description.slice(0, 40) + "..."
						: task.description}
				</p>
				<div className="flex items-center justify-center gap-2 mt-2">
					<span
						className={`text-sm  px-2 xl:px-4 py-1 xl:py-2 rounded-full 
						${
							closeDeadline && task.status.toLowerCase() !== "done"
								? "bg-neutral-700 text-neutral-200"
								: "bg-neutral-800 text-neutral-200"
						}`}
					>
						{task.tag}
					</span>
					<span
						className={`text-sm   px-2 xl:px-4 py-1 xl:py-2 rounded-full hidden md:flex
							${
								closeDeadline && task.status.toLowerCase() !== "done"
									? "bg-neutral-700 text-neutral-800"
									: "bg-red-300 text-neutral-900"
							}

					`}
					>
						{task.priority}
					</span>
					<span className="text-sm bg-red-300 text-neutral-900 px-2 xl:px-4 py-1 xl:py-2 rounded-full hidden md:flex">
						{task.deadline}
					</span>
					<span
						className={`text-sm  px-2 xl:px-4 py-1 xl:py-2 rounded-full hidden md:flex
						${
							closeDeadline && task.status.toLowerCase() !== "done"
								? "bg-neutral-700 text-neutral-800"
								: "bg-red-300 text-neutral-900"
						}
						`}
					>
						{task.status}
					</span>
				</div>
			</Link>
		</motion.div>
	);
};

export default Item;
