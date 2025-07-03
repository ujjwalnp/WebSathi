'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash } from "lucide-react";

import { getSubAccountDetails } from "@/queries/subaccount";
import { getFunnel } from "@/queries/funnels";

import { useEditor } from "@/hooks/use-editor";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/ui/loading";

import { cn } from "@/lib/utils";
import type { EditorElement } from "@/lib/types/editor";

interface EditorPaymentProps {
  element: EditorElement;
}

const EditorPayment: React.FC<EditorPaymentProps> = ({ element }) => {
  const router = useRouter();
  const {
    editor: editorState,
    dispatch,
    funnelId,
    subAccountId,
  } = useEditor();
  const { editor } = editorState;

  const [livePrices, setLivePrices] = React.useState([]);

  React.useEffect(() => {
    if (!funnelId) return;

    const fetchFunnel = async () => {
      const funnelData = await getFunnel(funnelId);
      if (funnelData) {
        setLivePrices(JSON.parse(funnelData.liveProducts || "[]"));
      }
    };

    fetchFunnel();
  }, [funnelId]);

  const handleOnClickBody = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: element },
    });
  };

  return (
    <div
      style={element.styles}
      draggable
      onClick={handleOnClickBody}
      className={cn(
        "p-0.5 w-full m-1 relative text-base min-h-7 transition-all underline-offset-4 flex items-center justify-center",
        {
          "border-blue-500 border-solid":
            editor.selectedElement.id === element.id,
          "border-dashed border": !editor.liveMode,
        }
      )}
    >
      {editor.selectedElement.id === element.id && !editor.liveMode && (
        <Badge className="absolute -top-6 -left-0.5 rounded-none rounded-t-md">
          {editor.selectedElement.name}
        </Badge>
      )}

      <div className="border-none transition-all w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-center w-full h-28">
            <div className="text-center p-4">
              <h3 className="text-lg font-medium">Payment Integration</h3>
              <p className="text-sm text-muted-foreground">
                Payment system would be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>

      {editor.selectedElement.id === element.id && !editor.liveMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  );
};

export default EditorPayment;