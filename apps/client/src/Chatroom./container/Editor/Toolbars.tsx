import React, { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import BoldIcon from "../../../assets/icons/editor-bold.svg?react";
import UnderlineIcon from "../../../assets/icons/editor-underline.svg?react";
import ItalicIcon from "../../../assets/icons/editor-italic.svg?react";
import ListIcon from "../../../assets/icons/editor-list_bullet.svg?react";

import {
  $isListNode,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { ListNodeTagType } from "@lexical/list/LexicalListNode";

interface Props {
  isFocused: boolean;
}

export function Toolbars({ isFocused }: Props) {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState<"paragraph" | ListNodeTagType>(
    "paragraph"
  );

  /**
   * @description 드래그로 선택된 범위의 노드의 타입을 식별하여 blockType을 업데이트하는 함수입니다.
   */
  const updateToolbar = () => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          setBlockType("paragraph");
        }
      }
    }
  };

  const handleDispatchTextFormat = (type: "bold" | "italic" | "underline") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);
  };

  const handleDispatchListFormat = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
      setBlockType("paragraph");
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      })
    );
  }, []);

  const fillColor = isFocused ? "#A1A1AA" : "#52525B";

  return (
    <div className="flex gap-2">
      <BoldIcon
        onClick={() => handleDispatchTextFormat("bold")}
        fill={fillColor}
      />
      <ItalicIcon
        onClick={() => handleDispatchTextFormat("italic")}
        fill={fillColor}
      />
      <UnderlineIcon
        onClick={() => handleDispatchTextFormat("underline")}
        fill={fillColor}
      />
      <ListIcon onClick={handleDispatchListFormat} fill={fillColor} />
      <ListPlugin />
    </div>
  );
}
