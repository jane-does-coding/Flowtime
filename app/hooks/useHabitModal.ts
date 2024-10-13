import { create } from "zustand";

interface HabitModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useHabitModal = create<HabitModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useHabitModal;
