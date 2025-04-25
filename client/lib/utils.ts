import { clsx, type ClassValue } from "clsx";
import { FormEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleInput<T>(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setState: React.Dispatch<React.SetStateAction<T>>
) {
  const { name, value } = e.target;

  setState((prevState) => {
    if (typeof prevState === "string") {
      return value as T;
    }
    return {
      ...prevState,
      [name]: value,
    } as T;
  });
}

export function handleInputCheckBox<T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<T>>
) {
  const { name, checked } = e.target; // Get the name and checked properties
  setState((prevState) => ({
    ...prevState,
    [name]: checked, // Update the state with the 'checked' value of the checkbox
  }));
}
