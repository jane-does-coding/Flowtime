"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Sidebar from "../Sidebar/Sidebar";
import useRoutineModal from "@/app/hooks/useRoutineModal";
import { IoIosArrowBack } from "react-icons/io";
import useHabitModal from "@/app/hooks/useHabitModal";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RiDraggable } from "react-icons/ri";

const Routine = ({ routine = { habits: [], title: "", id: "" } }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [habits, setHabits] = useState(routine.habits);
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

	// Function to handle drag-and-drop
	const handleDragEnd = async (result: any) => {
		const { source, destination } = result;
		if (!destination) return;

		const reorderedHabits = Array.from(habits);
		const [movedHabit] = reorderedHabits.splice(source.index, 1);
		reorderedHabits.splice(destination.index, 0, movedHabit);

		setHabits(reorderedHabits);

		// Update order in the backend
		try {
			const res = await fetch(`/api/routines/${routine.id}/reorder-habits`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ reorderedHabits }),
			});

			if (res.ok) {
				toast.success("Habits reordered successfully!");
			} else {
				toast.error("Error saving habit order");
			}
		} catch (error) {
			toast.error("Failed to save new order");
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
				{habits.length === 0 && (
					<div className="nunito text-[2rem] mt-4 mb-8 text-center">
						No Habits in this Routine
					</div>
				)}
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="habits">
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className=" flex flex-col transition-all"
							>
								{habits.map((habit: any, index) => (
									<Draggable
										key={habit.id}
										draggableId={habit.id}
										index={index}
									>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className="w-full bg-neutral-300/30 border-neutral-300/75 backdrop-blur-sm border-2 px-6 py-2 rounded-[2rem] flex items-center justify-between mb-3"
											>
												<div className="flex items-center justify-between w-full gap-2">
													<h2 className="nunito text-[1.35rem] text-neutral-900 flex items-center justify-center gap-3">
														<span className="text-[2.25rem]">
															<RiDraggable
																className="text-neutral-500"
																size={30}
															/>
														</span>
														<span className="text-[2.25rem]">{habit.icon}</span>
														{habit.title}
													</h2>
													<p className="text-neutral-600 font-extralight text-[1rem]">
														{habit.time}
													</p>
												</div>
												<button
													onClick={() => deleteHabit(habit.id)}
													className="text-red-500 hover:text-red-700 ml-2"
													title="Delete Habit"
												>
													<FaTrash />
												</button>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				<div
					onClick={() => HabitModal.onOpen()}
					className="w-full bg-neutral-300/50 border-neutral-300/95 border-2 px-8 py-2 rounded-[2rem] flex items-center justify-center cursor-pointer mt-4"
				>
					<h2 className="nunito text-[2rem] text-neutral-600">+</h2>
				</div>
			</div>
		</div>
	);
};

export default Routine;
