type Props = {
  children: React.ReactNode;
  variant?: "success" | "danger" | "neutral";
}

export default function Badge({
  children,
  variant = "neutral"
}: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium
        ${variant === "success" ? "border border-green-400 text-success-600 bg-green-50"
          : variant === "danger" ? "border-red-200 border text-danger-600 bg-red-50"
            : " border-border border bg-gray-50 text-text"}
        `}
    >
      {children}
    </span >)
}