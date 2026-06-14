"use client";

export function DeleteButton({
  action,
  confirmMessage,
  variant = "text",
}: {
  action: () => Promise<void>;
  confirmMessage: string;
  variant?: "text" | "outline";
}) {
  const className =
    variant === "outline"
      ? "px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg transition-colors"
      : "text-red-500 hover:text-red-700 font-medium text-sm";

  return (
    <form
      action={action}
      className="inline"
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button type="submit" className={className}>
        削除する
      </button>
    </form>
  );
}
