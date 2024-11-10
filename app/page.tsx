import Title from "@/components/LandingPage/Title";
import getHabits from "./actions/getHabits";
import getRoutines from "./actions/getRoutines";
import { LandingScroll } from "@/components/LandingPage/LandingScroll";
import { BentoGridDemo } from "@/components/LandingPage/BentoGrid";
import { CarouselComponent } from "@/components/LandingPage/Carousel";

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
				<h1 className="text-black text-[5rem]  jura mx-auto text-center mt-[1rem] xl:mt-[1rem] translate-y-20">
					How can it help
				</h1>
				<CarouselComponent />
			</div>
		</div>
	);
}
