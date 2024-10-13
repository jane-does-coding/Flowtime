import Title from "@/components/LandingPage/Title";
import getHabits from "./actions/getHabits";
import getRoutines from "./actions/getRoutines";
import { LandingScroll } from "@/components/LandingPage/LandingScroll";
import { BentoGridDemo } from "@/components/LandingPage/BentoGrid";
import { EndText } from "@/components/LandingPage/EndText";
import { MovingBorderDemo } from "@/components/LandingPage/GetStrartedButton";
/* import { BentoGridDemo } from "./components/LandingPage/BentoGrid";
import { EndText } from "./components/LandingPage/EndText";
import { LandingScroll } from "./components/LandingPage/LandingScroll";
import Title from "./components/LandingPage/Title";
import { MovingBorderDemo } from "./components/LandingPage/GetStrartedButton"; */

export default async function Home() {
	const routines = await getRoutines();
	const habits = await getHabits();

	console.log(routines, habits);

	return (
		<div className="">
			<div className="">
				<br />
				<Title />
				<LandingScroll />
				<BentoGridDemo />
			</div>
		</div>
	);
}
