"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import toast from "react-hot-toast";
import useHabitModal from "@/app/hooks/useHabitModal";
import { useRouter } from "next/navigation";

const HabitModal = ({ routines }: any) => {
	const registerModal = useRegisterModal();
	const HabitModal = useHabitModal();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const [routineId, setRoutineId] = useState<string>("");
	const [habits, setHabits] = useState<
		{ title: string; time: string; icon: string }[]
	>([{ title: "", time: "", icon: "" }]);

	const addHabit = () => {
		setHabits([...habits, { title: "", time: "", icon: "" }]);
	};

	const updateHabit = (index: number, field: string, value: string) => {
		const updatedHabits = habits.map((habit, i) =>
			i === index ? { ...habit, [field]: value } : habit
		);
		setHabits(updatedHabits);
	};

	const deleteHabit = (index: number) => {
		const updatedHabits = habits.filter((_, i) => i !== index);
		setHabits(updatedHabits);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);

		if (!routineId) {
			toast.error("Please select a routine for the habits");
			setIsLoading(false);
			return;
		}

		try {
			const res = await fetch("/api/habits", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ routineId, habits }),
			});

			if (res.ok) {
				const data = await res.json();
				toast.success("Habits created successfully");
				HabitModal.onClose();
				router.push(`/routines`);
			} else {
				const errorData = await res.json();
				toast.error(errorData.message || "Error creating routine");
			}
		} catch (error) {
			toast.error("Failed to create routine");
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const bodyContent = (
		<div className="flex flex-col gap-3">
			<Heading title="Add Habits" subtitle="Add habits to a routine" center />

			<div className="w-full relative">
				<select
					value={routineId}
					onChange={(e) => setRoutineId(e.target.value)}
					className="w-full p-3 bg-neutral-400/20 border-2 border-neutral-400/75 rounded-md text-neutral-800"
				>
					<option value="" disabled>
						Select a Routine
					</option>
					{routines.map((routine: any) => (
						<option key={routine.id} value={routine.id}>
							{routine.title}
						</option>
					))}
				</select>
			</div>

			{habits.map((habit, index) => (
				<div
					key={index}
					className="flex flex-col gap-2 relative p-4 border rounded-md mb-2 bg-neutral-200"
				>
					<div className="flex justify-between items-center">
						<h3 className="text-lg font-semibold text-neutral-800">
							Habit {index + 1}
						</h3>
						<button
							type="button"
							onClick={() => deleteHabit(index)}
							className="text-red-500 px-4 py-1 bg-neutral-300/60 rounded-md"
						>
							Delete
						</button>
					</div>

					<input
						type="text"
						value={habit.title}
						onChange={(e) => updateHabit(index, "title", e.target.value)}
						placeholder="Habit Title"
						className="text-neutral-800 w-full p-3 pl-4 bg-neutral-400/20 border-2 border-neutral-400/75 rounded-md"
						required
					/>

					<input
						type="text"
						value={habit.time}
						onChange={(e) => updateHabit(index, "time", e.target.value)}
						placeholder="Time"
						className="text-neutral-800 w-full p-3 pl-4 bg-neutral-400/20 border-2 border-neutral-400/75 rounded-md"
						required
					/>

					<input
						type="text"
						value={habit.icon}
						onChange={(e) => updateHabit(index, "icon", e.target.value)}
						placeholder="Icon"
						className="text-neutral-800 w-full p-3 pl-4 bg-neutral-400/20 border-2 border-neutral-400/75 rounded-md"
						required
					/>
				</div>
			))}

			<button
				type="button"
				onClick={addHabit}
				className="bg-red-500 text-white py-2 px-4 rounded-md"
			>
				Add Another Habit +
			</button>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={HabitModal.isOpen}
			title="Add Habits"
			actionLabel="Save Habits"
			onClose={HabitModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
		/>
	);
};

export default HabitModal;
