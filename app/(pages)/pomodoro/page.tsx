"use client";
import AnimatedBackground from "@/components/AnimatedBackground";
import Timer from "@/components/Pomodoro/Timer";
import Sidebar from "@/components/Sidebar/Sidebar";
import React, { useContext, useEffect, useRef, useState } from "react";

const Page = () => {
	const [workMinutes, setWorkMinutes] = useState(20);
	const [breakMinutes, setBreakMinutes] = useState(10);
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
			{/* 			<AnimatedBackground value={250} /> */}
			<Timer
				breakMinutes={breakMinutes}
				setBreakMinutes={setBreakMinutes}
				workMinutes={workMinutes}
				setWorkMinutes={setWorkMinutes}
			/>
		</>
	);
};

export default Page;
