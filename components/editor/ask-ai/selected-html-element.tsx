import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { htmlTagToText } from "@/lib/html-tag-to-text";
import { Code, XCircle } from "lucide-react";

export const SelectedHtmlElement = ({
  element,
  onDelete,
}: {
  element: HTMLElement | null;
  onDelete?: () => void;
}) => {
  if (!element) return null;

  const tagName = element.tagName.toLowerCase();
  return (
    <Collapsible
      className="border border-neutral-700 rounded-xl p-1.5 pr-3 max-w-max hover:brightness-110 transition-all duration-200 ease-in-out !cursor-pointer"
      onClick={onDelete}
    >
      <CollapsibleTrigger className="flex items-center justify-start gap-2 cursor-pointer">
        <div className="rounded-lg bg-neutral-700 size-6 flex items-center justify-center">
          <Code className="text-neutral-300 size-3.5" />
        </div>
        <p className="text-sm font-semibold text-neutral-300">
          {htmlTagToText(tagName)}
        </p>
        <XCircle className="text-neutral-300 size-4" />
      </CollapsibleTrigger>
      {/* <CollapsibleContent className="border-t border-neutral-700 pt-2 mt-2">
        <div className="text-xs text-neutral-400">
          <p>
            <span className="font-semibold">ID:</span> {element.id || "No ID"}
          </p>
          <p>
            <span className="font-semibold">Classes:</span>{" "}
            {element.className || "No classes"}
          </p>
        </div>
      </CollapsibleContent> */}
    </Collapsible>
  );
};
