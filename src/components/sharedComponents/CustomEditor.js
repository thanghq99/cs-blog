import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import customEditorTools from "./CustomEditorTools";
import debounce from "lodash/debounce";

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = ({ content, setContent, isReadOnly }) => {
  //add a reference to editor
  const ref = useRef();

  //initialize editorjs
  useEffect(() => {
    const initDefaultData = () => {
      const initData = {
        time: new Date().getTime(),
        blocks: [],
      };
      setContent(JSON.stringify(initData));
      return initData;
    };
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: EDITTOR_HOLDER_ID,
        tools: customEditorTools,
        data: content === "" ? initDefaultData() : JSON.parse(content),
        onChange: debounce(async function () {
          try {
            const output = await editor.save();
            const newContent = JSON.stringify(output);
            console.log(newContent);
            setContent(newContent);
          } catch (err) {}
        }, 0), //need a new approach for this later
        hideToolbar: false,
        readOnly: isReadOnly,
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
