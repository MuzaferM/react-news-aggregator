import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Source } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatSourceEnumLabel = (value: string): string => {
  switch (value) {
    case Source.NYT:
      return "New York Times";
    case Source.NewsOrg:
      return "News Org";
    case Source.Guardian:
      return "The Guardian";
    default:
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
};
