"use client";
import { create } from "zustand";

export const useProfile = create((state) => ({
  isOpen: false,
  setOpen: () => state((prev) => ({ isOpen: true })),
  setClose: () => state((prev) => ({ isOpen: false })),
}));
