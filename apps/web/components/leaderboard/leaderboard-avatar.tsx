import { cn } from "@/lib/utils";

type LeaderboardAvatarProps = Readonly<{
  initials: string;
  avatarColor?: string;
  size?: "sm" | "md" | "lg";
}>;

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

export function LeaderboardAvatar({
  initials,
  avatarColor = "#7C3AED",
  size = "md",
}: LeaderboardAvatarProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-none font-semibold text-white",
        sizeClasses[size]
      )}
      style={{ backgroundColor: avatarColor }}
      aria-hidden
    >
      {initials}
    </span>
  );
}
