import React, { useEffect, useRef, useState } from "react";
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoSettingsOutline } from "react-icons/io5";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import Modal from "../Modals/Modal";
import MinutsInput from "../Inputs/MinutsInput";

const Timer = ({
	workMinutes,
	breakMinutes,
	setWorkMinutes,
	setBreakMinutes,
	isOpen,
}: any) => {
	const [isPaused, setIsPaused] = useState(true);
	const [mode, setMode] = useState("work");
	const [secondsLeft, setSecondsLeft] = useState(0);
	const [showSettingsPopup, setShowSettingsPopup] = useState(false);
	const [newWorkMinutes, setNewWorkMinutes] = useState(workMinutes);
	const [newBreakMinutes, setNewBreakMinutes] = useState(breakMinutes);

	const secondsLeftRef = useRef(secondsLeft);
	const isPausedRef = useRef(isPaused);
	const modeRef = useRef(mode);

	function tick() {
		secondsLeftRef.current--;
		setSecondsLeft(secondsLeftRef.current);
	}

	useEffect(() => {
		function switchMode() {
			const nextMode = modeRef.current === "work" ? "break" : "work";
			const nextSeconds =
				(nextMode === "work" ? workMinutes : breakMinutes) * 60;

			setMode(nextMode);
			modeRef.current = nextMode;

			setSecondsLeft(nextSeconds);
			secondsLeftRef.current = nextSeconds;
		}

		secondsLeftRef.current = workMinutes * 60;
		setSecondsLeft(secondsLeftRef.current);

		const interval = setInterval(() => {
			if (isPausedRef.current) {
				return;
			}
			if (secondsLeftRef.current === 0) {
				return switchMode();
			}

			tick();
		}, 1000);

		return () => clearInterval(interval);
	}, [workMinutes, breakMinutes]);

	const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
	const percentage = Math.round((secondsLeft / totalSeconds) * 100);

	const minutes = Math.floor(secondsLeft / 60);
	let seconds = secondsLeft % 60;

	const handleSettingsSave = () => {
		setWorkMinutes(newWorkMinutes);
		setBreakMinutes(newBreakMinutes);
		setShowSettingsPopup(false);
	};

	const handleClosePopup = () => {
		setShowSettingsPopup(false);
	};

	return (
		<>
			<div
				className={`${
					isOpen ? "pl-[20rem]" : "pl-[5rem]"
				} min-h-screen transition-all flex items-center justify-center relative`}
			>
				<div className="w-[90vw] sm:w-[60vw] md:w-[50vw] lg:w-[30vw] xl:w-[35vw]">
					<CircularProgressbarWithChildren
						className="bg-neutral-700/[15%] backdrop-blur-[10px] p-4 xl:p-6 rounded-full relative"
						value={percentage}
						strokeWidth={5}
						styles={buildStyles({
							textColor: "#fff",
							pathColor: "rgb(225, 225, 225)",
							trailColor: "rgb(50, 50, 50, 0.6)",
						})}
					>
						<span className="absolute top-[20%] w-full text-center text-[1.35rem] xl:text-[1.75rem] jura select-none text-neutral-700 font-light">
							{mode === "work" ? "Work" : "Break"}
						</span>
						<h1 className="text-[4rem] md:text-[4rem] lg:text-[3.5rem] xl:text-[5.5rem] font-semibold text-black select-none jura">
							{minutes}:{seconds < 10 ? "0" : null}
							{seconds}
						</h1>
						<div className="flex gap-2">
							{isPaused ? (
								<PlayButton
									onClick={() => {
										setIsPaused(false);
										isPausedRef.current = false;
									}}
									className="select-none text-black text-md xl:text-xl transition-[1s] bg-neutral-200 hover:bg-neutral-300/[80%] backdrop-blur-md py-1 lg:py-2 xl:py-3 px-4 lg:px-6 xl:px-10 rounded-full overflow-hidden cursor-pointer flex items-center justify-center gap-3"
								/>
							) : (
								<PauseButton
									onClick={() => {
										setIsPaused(true);
										isPausedRef.current = true;
									}}
									className="select-none text-black text-md xl:text-xl transition-[1s] bg-neutral-200 hover:bg-neutral-300/[80%] backdrop-blur-md py-1 lg:py-2 xl:py-3 px-4 lg:px-6 xl:px-10 rounded-full overflow-hidden cursor-pointer flex items-center justify-center gap-3"
								/>
							)}
							<button
								onClick={() => setShowSettingsPopup(true)}
								className="select-none text-black text-xl transition-[1s] bg-neutral-200 hover:bg-neutral-300/[80%] backdrop-blur-md p-3 xl:p-3 rounded-full overflow-hidden cursor-pointer flex items-center justify-center gap-3"
							>
								<IoSettingsOutline className="text-[1.75rem] xl:text-[2.5rem]" />
							</button>
						</div>
					</CircularProgressbarWithChildren>

					{/* Pop up */}

					{showSettingsPopup && (
						<Modal
							onClose={handleClosePopup}
							onSubmit={handleSettingsSave}
							actionLabel="Save"
							isOpen={showSettingsPopup}
							disabled={false}
							title="Time Update"
							body={
								<>
									<h2 className="font-semibold mb-4 text-neutral-800 text-[1.75rem]">
										Settings
									</h2>
									<div className="mb-4">
										<MinutsInput
											value={newWorkMinutes}
											onChange={(e: any) =>
												setNewWorkMinutes(parseInt(e.target.value))
											}
											label={"Work Minutes"}
										/>
									</div>
									<div className="mb-4">
										<MinutsInput
											value={newBreakMinutes}
											onChange={(e: any) =>
												setNewBreakMinutes(parseInt(e.target.value))
											}
											label={"Break Minutes"}
										/>
									</div>
								</>
							}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Timer;
