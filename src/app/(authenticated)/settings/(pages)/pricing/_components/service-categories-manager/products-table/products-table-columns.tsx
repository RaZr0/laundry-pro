"use client"

import { ProductImagePlaceholder } from "@/components/product-image-placeholder";
import { Button } from "@/components/ui/button";
import { ProductDto } from "@/dtos/product.dto";
import { formatPrice } from "@/utils/price";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

const PRODUCT_IMAGE_SIZE = 46;

export const PRODUCT_COLUMNS: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "image",
    header: () => {
      return (
        <span>תמונה</span>
      )
    },
    cell: ({ row }) => {
      return (
        <div style={{
          width: PRODUCT_IMAGE_SIZE,
          height: PRODUCT_IMAGE_SIZE,
        }}>
          {row.original.imageUrl ? <Image src={row.original.imageUrl} alt="product-image" width={PRODUCT_IMAGE_SIZE} height={PRODUCT_IMAGE_SIZE} /> : <ProductImagePlaceholder /> } 
        </div>
      )
    },
  },
  {
    accessorKey: "serviceCategory",
    header: () => {
      return (
        <span>שירות</span>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{row.original.serviceCategory.name}</span>
      )
    },
  },
  {
    accessorKey: "price",
    header: () => {
      return (
        <span>מחיר בסיס</span>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{formatPrice(row.original.price)}</span>
      )
    },
  },
  {
    accessorKey: "priceUnit",
    header: () => {
      return (
        <span>יחידה</span>
      )
    },
    cell: ({ row }) => {
      return (
        <span>{row.original.priceUnit?.description || '-'}</span>
      )
    },
  },
  {
    accessorKey: "actions",
    header: () => {
      return (
        <span>פעולות</span>
      )
    },
    cell: () => {
      return (
        <ul>
          <li>
            <Button variant="ghost">
              עריכה
            </Button>
          </li>
        </ul>
      )
    },
  },
]