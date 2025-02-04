import prismadb from "@/lib/prismadb";
import React from "react";
import SizeForm from "./components/SizeForm";

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  const sizes = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={sizes} />
      </div>
    </div>
  );
}
