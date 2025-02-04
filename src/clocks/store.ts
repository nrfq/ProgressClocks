import create from "zustand";
import { persist } from 'zustand/middleware'
import { immer } from "zustand/middleware/immer";

export type Clock = {
  segments: number;
  color: string;
  name: string;
  visible: boolean;
  progress: number;
  id: string;
}

export type ClockState = {
  allVisible: boolean,
  setAllVisible: (visible: boolean) => void
  clocks: Clock[];
  addClock: () => void;
  removeClock: (id: string) => void;
  updateClock: (id: string, clock: Partial<Clock>) => void;
}

const clamp = (value: number, min: number, max: number) => (
  Math.min(Math.max(min, value), max)
)

export const useClocksStore = create<ClockState>()(
  persist(
    immer((set) => ({
      allVisible: true,
      setAllVisible(visible) {
        set((state) => {
          state.allVisible = visible;
        })
      },
      clocks: [],
      addClock() {
        set((state) => {
          const id = new Date().getTime().toString();
          const clock: Clock = {
            id,
            segments: 4,
            color: "#f47373",
            name: "New Clock",
            visible: false,
            progress: 0,
          }
          state.clocks.unshift(clock);
        });
      },
      updateClock(id, clock) {
        set((state) => {
          const index = state.clocks.findIndex((clock) => clock.id === id);
          if (index === -1) {
            return;
          }
          const newClock  = { ...state.clocks[index], ...clock };
          newClock.segments = clamp(newClock.segments, 2, 12);
          newClock.progress = Math.min(newClock.progress, newClock.segments);
          state.clocks[index] = newClock;
        })
      },
      removeClock(id) {
        set((state) => {
          const index = state.clocks.findIndex((clock) => clock.id === id);
          if (index !== -1) {
            state.clocks.splice(index, 1);
          }
        });
      },
    })),
    { name: "nrfq-progressclocks-clocks" }
  )
);
