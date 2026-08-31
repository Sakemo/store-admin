"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "./data-table-features"

export type BannerColumn = {
  id: string
  label: string
  createdAt: string
}

const columnHelper = createColumnHelper<DataTableFeatures, BannerColumn>()

export const columns = columnHelper.columns([
  columnHelper.accessor("label", {
    header: "Label",
  }),
  columnHelper.accessor("createdAt", {
    header: "Date",
  }),
])