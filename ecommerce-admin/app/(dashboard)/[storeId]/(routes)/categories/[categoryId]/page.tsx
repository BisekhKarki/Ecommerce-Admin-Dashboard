import prismadb from "@/lib/prismadb";
import React from "react";
import CategoryForm from "./components/CategoryForm";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const categories = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storedId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={categories} />
      </div>
    </div>
  );
}
