import {
  CheckCircle,
  CheckCircle2,
  Circle,
  Clock,
  XCircle,
} from "lucide-react";

export const statuses = [
  {
    value: "open",
    label: "Open",
    icon: Circle,
  },
  {
    value: "progress",
    label: "In Progress",
    icon: Clock,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle,
  },
  {
    value: "checked",
    label: "Double Checked",
    icon: CheckCircle2,
  },
  {
    value: "failed",
    label: "Failed",
    icon: XCircle,
  },
];
