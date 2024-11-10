import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import RegisterModal from "@/components/Modals/RegisterModal";
import LoginModal from "@/components/Modals/LoginModal";
import RoutineModal from "@/components/Modals/RoutineModal";
import HabitModal from "@/components/Modals/HabitModal";
import getRoutines from "./actions/getRoutines";
import TaskModal from "@/components/Modals/TaskModal";
import Menu from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Flowtime",
	description: "Flowtime - Make your day flow",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	const routines = await getRoutines();

	return (
		<html lang="en" className="dark">
			<head>
				<head>
					<link rel="icon" href="/logo.png" type="image/png" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
						rel="stylesheet"
					/>
				</head>
			</head>
			<body className={`${inter.className} light bg-neutral-200`}>
				<ToasterProvider />
				<RegisterModal />
				<LoginModal />
				<RoutineModal />
				<TaskModal />
				<HabitModal routines={routines} />
				{/* 				<Navbar currentUser={currentUser} />
				 */}{" "}
				<Menu currentUser={currentUser} />
				{children}
			</body>
		</html>
	);
}
