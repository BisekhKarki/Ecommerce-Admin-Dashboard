import React from "react";
import ProductClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const product = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      categroy: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedProducts: ProductColumn[] = product.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: formatter.format(item.price.toNumber()),
    category: item.categroy.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
