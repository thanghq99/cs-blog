import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import customEditorTools from "./CustomEditorTools";
import debounce from "lodash/debounce";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Start writing here !!!",
          level: 1,
        },
      },
    ],
  };
};

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = ({ content, setContent }) => {
  //add a reference to editor
  const ref = useRef();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: EDITTOR_HOLDER_ID,
        tools: customEditorTools,
        data: content === "" ? DEFAULT_INITIAL_DATA() : JSON.parse(content),
        onChange: debounce(async function () {
          try {
            const output = await editor.save();
            const newContent = JSON.stringify(output);
            console.log(newContent);
            setContent(newContent);
          } catch (err) {}
        }, 2000),
        hideToolbar: false,
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return <div id={EDITTOR_HOLDER_ID} className="prose max-w-full" />;
};

export default memo(Editor);
