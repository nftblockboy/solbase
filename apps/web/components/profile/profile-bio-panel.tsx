import { Surface } from "@/components/ui/surface";
import { ProfileSectionHeading } from "./profile-section-heading";

type ProfileBioPanelProps = Readonly<{
  bio: string;
  tradingStyle: string;
}>;

export function ProfileBioPanel({ bio, tradingStyle }: ProfileBioPanelProps) {
  return (
    <Surface variant="panel" className="flex h-full flex-col p-4">
      <ProfileSectionHeading title="Bio & trading style" />
      <p className="text-sm text-foreground">{bio}</p>
      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted">
        Trading style
      </p>
      <p className="mt-1 text-sm text-muted">{tradingStyle}</p>
    </Surface>
  );
}
