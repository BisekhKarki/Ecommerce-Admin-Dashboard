import { Category } from "@/types";

const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(
        `Failed to fetch categories: ${res.status} ${res.statusText}`
      );
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default getCategories;
