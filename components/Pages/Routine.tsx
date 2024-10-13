"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import useRoutineModal from "@/app/hooks/useRoutineModal";
import { IoIosArrowBack } from "react-icons/io";
import useHabitModal from "@/app/hooks/useHabitModal";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Routine = ({ routine }: any) => {
	const [isOpen, setIsOpen] = useState(true);
	const HabitModal = useHabitModal();
	const router = useRouter();

	const deleteHabit = async (habitId: string) => {
		const confirmed = confirm("Are you sure you want to delete this habit?");
		if (!confirmed) return;

		try {
			const res = await fetch(`/api/habits/${habitId}`, {
				method: "DELETE",
			});

			if (res.ok) {
				toast.success("Habit deleted successfully!");
				router.refresh();
			} else {
				const errorData = await res.json();
				toast.error(errorData.message || "Error deleting habit");
			}
		} catch (error) {
			toast.error("Failed to delete habit");
			console.error(error);
		}
	};

	const deleteRoutine = async () => {
		const confirmed = confirm("Are you sure you want to delete this routine?");
		if (!confirmed) return;

		try {
			const res = await fetch(`/api/routines/${routine.id}`, {
				method: "DELETE",
			});

			if (res.ok) {
				toast.success("Routine deleted successfully!");
				router.push("/routines");
			} else {
				const errorData = await res.json();
				toast.error(errorData.message || "Error deleting routine");
			}
		} catch (error) {
			toast.error("Failed to delete routine");
			console.error(error);
		}
	};

	return (
		<div>
			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			<div
				className={`${
					isOpen ? "ml-[17.5rem] xl:ml-[20rem]" : "ml-[5rem] "
				} transition-all px-20`}
			>
				<h2 className="nunito text-[2.8rem] text-neutral-800 mb-4 pt-12 flex items-center justify-start gap-4 ">
					<a href="/routines">
						<IoIosArrowBack className="text-neutral-700" />
					</a>
					{routine.title}
					<button
						onClick={deleteRoutine}
						className="text-neutral-600 hover:text-neutral-700 mr-4 ml-auto text-[2rem]"
						title="Delete Routine"
					>
						<FaTrash />
					</button>
				</h2>
				{routine.habits.length === 0 && (
					<div className="nunito text-[2rem] mt-4 mb-8 text-center">
						No Habits in this Routine
					</div>
				)}
				<div className={`gap-y-3 flex flex-col`}>
					{routine.habits.map((habit: any) => (
						<div
							key={habit.id}
							className="w-full bg-neutral-300/30 border-neutral-300/75 border-2 px-6 py-2 rounded-[2rem] flex items-center justify-between gap-4"
						>
							<div className="flex items-center justify-between w-full gap-2">
								<h2 className="nunito text-[1.35rem] text-neutral-900 flex items-center justify-center gap-3">
									<span className="text-[2.25rem]">{habit.icon}</span>
									{habit.title}
								</h2>
								<p className="text-neutral-600 font-extralight text-[1rem]">
									{habit.time} time
								</p>
							</div>
							{/* Delete Icon */}
							<button
								onClick={() => deleteHabit(habit.id)}
								className="text-red-500 hover:text-red-700"
								title="Delete Habit"
							>
								<FaTrash />
							</button>
						</div>
					))}
					<div
						onClick={() => HabitModal.onOpen()}
						className="w-full bg-neutral-300/50 border-neutral-300/95 border-2 px-8 py-2 rounded-[2rem] flex items-center justify-center cursor-pointer"
					>
						<h2 className="nunito text-[2rem] text-neutral-600">+</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Routine;
