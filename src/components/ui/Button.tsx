type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "success";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}
export default function Button({
  children,
  onClick,
  fullWidth = false,
  disabled = false,
  variant = "primary",
  type = "button"
}: Props) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center cursor-pointer justify-center gap-2 ${fullWidth ? "w-full" : ""} px-3 py-2 text-sm font-medium rounded-btn transition focus:ring-brand-300 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed
      ${variant === "primary" ? "bg-brand-600 text-white border border-brand-700 hover:bg-brand-700"
          : variant === "secondary" ? "bg-surface text-text border border-border hover:bg-gray-50"
            : variant === "success"
              ? "bg-success-600 text-white border border-green-700 hover:brightness-110"
              : "bg-surface text-danger-600 border border-red-400 hover:bg-red-200"}
        `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}