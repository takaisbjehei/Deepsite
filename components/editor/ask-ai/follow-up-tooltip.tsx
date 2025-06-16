import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";

export const FollowUpTooltip = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info className="size-3 text-neutral-300 cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="!rounded-2xl !p-0 min-w-xs text-center overflow-hidden"
      >
        <header className="bg-neutral-950 px-4 py-3 border-b border-neutral-700/70">
          <p className="text-base text-neutral-200 font-semibold">
            What is a Follow-Up?
          </p>
        </header>
        <main className="p-4">
          <p className="text-sm text-neutral-400">
            A Follow-Up is a request to DeepSite to edit the current HTML
            instead of starting from scratch. This is useful when you want to
            make small changes or improvements to the existing design.
          </p>
        </main>
      </PopoverContent>
    </Popover>
  );
};
