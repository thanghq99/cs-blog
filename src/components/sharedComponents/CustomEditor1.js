import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import debounce from "lodash/debounce";
import customEditorTools from "./CustomEditorTools";

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "New update title",
          level: 2,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "Insert content here",
        },
      },
    ],
  };
};
const EDITTOR_HOLDER_ID = "editorjs";

const CustomEditor = (props) => {
  //   const { content, setContent } = props;
  //   const ref = useRef();
  //   useEffect(() => {
  //     if (!ref.current) {
  //       const editor = new EditorJS({
  //         holder: EDITTOR_HOLDER_ID,
  //         tools: EDITOR_TOOLS,
  //         async onChange(api, event) {
  //           const data = await api.saver.save();
  //           onChange(data);
  //         },
  //         hideToolbar: false,
  //         data: content === "" ? DEFAULT_INITIAL_DATA() : JSON.parse(content),
  //         onChange: debounce(async function () {
  //           try {
  //             console.log("content updated");
  //             const output = await editor.save();
  //             const content = JSON.stringify(output);
  //             setContent(content);
  //           } catch (err) {}
  //         }, 2000),
  //         autofocus: true,
  //         tools: customEditorTools,
  //       });
  //       ref.current = editor;
  //     }
  //     return (
  //       () => {
  //         if (ref.current && ref.current.destroy) {
  //           ref.current.destroy();
  //         }
  //       },
  //       []
  //     );
  //   });

  //   const initEditor = () => {
  //     const editor = new EditorJS({
  //       holder: EDITTOR_HOLDER_ID,
  //       data: content === "" ? DEFAULT_INITIAL_DATA() : JSON.parse(content),
  //       onReady: () => {
  //         isInstance.current = editor;
  //       },
  //       onChange: debounce(function () {
  //         try {
  //           console.log("content updated");
  //           contents();
  //         } catch (err) {}
  //       }, 2000),
  //       autofocus: true,
  //       tools: customEditorTools,
  //     });
  //     async function contents() {
  //       const output = await editor.save();
  //       const content = JSON.stringify(output);
  //       setContent(content);
  //     }
  //   };

  const { setContent, content } = props;
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
        // async onChange(api, event) {
        //   const data = await api.saver.save();
        //   onChange(data);
        // },
        onChange: debounce(async function () {
          try {
            const output = await editor.save();
            const content = JSON.stringify(output);
            setContent(content);
          } catch (err) {}
        }, 3000),
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

  return <div id={holder} className="prose max-w-full" />;

  return (
    <>
      <div className="">
        <div id={EDITTOR_HOLDER_ID}></div>
      </div>
    </>
  );
};

export default CustomEditor;
