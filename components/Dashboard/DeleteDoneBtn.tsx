"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import prisma from "@/app/libs/prismadb";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteDoneBtn = ({ tasks }: any) => {
	const buttonRef = useRef(null);
	const router = useRouter();

	const handleDeleteDone = async () => {
		try {
			const doneTasks = tasks.filter((task: any) => task.status === "Done");

			for (const task of doneTasks) {
				const response = await fetch(`/api/tasks/${task.id}`, {
					method: "DELETE",
				});
				if (!response.ok) {
					throw new Error(`Failed to delete task with ID ${task.id}`);
				}
			}

			console.log("All done tasks deleted successfully!");
		} catch (error) {
			console.error("Error deleting done tasks:", error);
		} finally {
			router.refresh();
			toast.success("Tasks deleted successfully");
		}
	};

	const shineAnimation = () => {
		gsap.fromTo(
			buttonRef.current,
			{
				backgroundPosition: "0% 0%",
			},
			{
				backgroundPosition: "200% 100%",
				duration: 1.5,
				ease: "none",
				repeat: -1,
			}
		);
	};

	useEffect(() => {
		shineAnimation();
	}, []);

	return (
		<button
			ref={buttonRef}
			onClick={handleDeleteDone}
			className="min-w-fit inline-flex h-10 animate-shimmer items-center justify-center rounded-full border border-neutral-800 bg-[linear-gradient(110deg,#404040,45%,#737373,55%,#404040)] bg-[length:200%_100%] hover:bg-neutral-700 px-6 font-medium text-neutral-200 transition-colors"
		>
			Delete Finished Tasks
		</button>
	);
};

export default DeleteDoneBtn;
