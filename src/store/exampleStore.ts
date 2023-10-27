import { create } from "zustand";

interface ExampleState {
  example: number;
  increase: (by: number) => void;
}

const useExampleStore = create<ExampleState>()((set) => ({
  example: 0,
  increase: (by) => set((state) => ({ example: state.example + by })),
}));
