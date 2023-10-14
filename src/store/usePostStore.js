import { create } from "zustand";

export const usePostStore = create((state) => ({
  isOpen: false,
  data: null,
  setOpen: (data) => state((prev) => ({ isOpen: true, data })),
  setClose: () => state((prev) => ({ isOpen: false, data: null })),
}));
