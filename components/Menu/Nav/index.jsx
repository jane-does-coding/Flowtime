import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { perspective, slideIn } from "./anim";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import useRoutineModal from "@/app/hooks/useRoutineModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

export default function Index({ currentUser }) {
	const router = useRouter();
	const routineModal = useRoutineModal();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	return (
		<div className={styles.nav}>
			<div className={styles.body}>
				{currentUser ? (
					/* Logged in links */
					<div className="styles.linkContainer">
						<div className={`my-2`}>
							<motion.button
								href={"/"}
								custom={0}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
							>
								<a href={"/"}>Home</a>
							</motion.button>
						</div>
						<div className={`my-2`}>
							<motion.button
								href={"/"}
								custom={1}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
							>
								<a href="/routines">Routines</a>
							</motion.button>
						</div>
						<div className={`my-2`}>
							<motion.button
								href={"/"}
								custom={2}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
								onClick={() => routineModal.onOpen()}
							>
								<a>Create a routine</a>
							</motion.button>
						</div>
						<div className={`my-2`}>
							<motion.button
								href={"/"}
								custom={3}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
							>
								<a href={"/tasks"}>Tasks</a>
							</motion.button>
						</div>
						<div className={`my-2`}>
							<motion.button
								href={"/"}
								custom={3}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
							>
								<a href={"/pomodoro"}>Pomodoro</a>
							</motion.button>
						</div>
						<div className={`my-2`}>
							<motion.button
								href={"/"}
								custom={4}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
								onClick={() => signOut()}
							>
								<a>Logout</a>
							</motion.button>
						</div>
					</div>
				) : (
					/* Not logged in links */
					<div className="">
						<div className={`my-2`}>
							<motion.button
								href={"/"}
								custom={0}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
							>
								<a href="/">Home</a>
							</motion.button>
						</div>
						<div className={`my-2`}>
							<motion.button
								href={"/"}
								custom={1}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
								onClick={() => registerModal.onOpen()}
							>
								<a>Register</a>
							</motion.button>
						</div>
						<div className={`my-2`}>
							<motion.button
								href={"/"}
								custom={2}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
								onClick={() => loginModal.onOpen}
							>
								<a>Login</a>
							</motion.button>
						</div>
						<div className={`my-2`}>
							{/* 	<motion.button
								href={"/"}
								custom={3}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
								onClick={() => router.push("/about")}
							>
								<a>About</a>
							</motion.button> */}
						</div>
						<div className={`my-2`}>
							{/* <motion.button
								href={"/"}
								custom={4}
								variants={perspective}
								initial="initial"
								animate="enter"
								exit="exit"
								onClick={() => router.push("/")}
							>
								<a>Contact</a>
							</motion.button> */}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
