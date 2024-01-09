import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

/**
 * @description 에디터의 업데이트를 감지하고 텍스트를 html 포맷으로 변경하는 함수입니다.
 */
export function SericalizePlugin({
  onUpdateMessage,
}: {
  onUpdateMessage: (parsedHtml: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.update(() => {
        const html = $generateHtmlFromNodes(editor, null);
        onUpdateMessage(html);
      });
    });
  }, [editor]);

  return null;
}
