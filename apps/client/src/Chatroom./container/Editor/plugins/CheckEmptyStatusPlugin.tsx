import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useEffect } from "react";

/**
 * @description 에디터의 값이 비었는지를 체크하는 함수입니다.
 */
export function CheckEmptyStatusPlugin({
  onUpdateEmptyStatus,
}: {
  onUpdateEmptyStatus: (isEmpty: boolean) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();

        const isEmpty = () => {
          const content = root.getTextContent().trim();

          if (
            content.length === 0 ||
            (content.startsWith("\b") && content.substring(1).length === 0)
          ) {
            return true;
          }

          return false;
        };

        onUpdateEmptyStatus(isEmpty());
      });
    });
  }, [editor]);

  return null;
}
