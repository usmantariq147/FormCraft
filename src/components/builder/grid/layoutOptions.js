import { Square, Columns, LayoutGrid } from "lucide-react";

export const LAYOUT_OPTIONS = [
  {
    id: "1-col",
    label: "1 Column (100%)",
    icon: Square,
    cols: [12],
  },
  {
    id: "2-col",
    label: "2 Columns (50% / 50%)",
    icon: Columns,
    cols: [6, 6],
  },
  {
    id: "3-col",
    label: "3 Columns (33% each)",
    icon: LayoutGrid,
    cols: [4, 4, 4],
  },
];