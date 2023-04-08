import React from "react";
const editorJsHtml = require("editorjs-html");
const EditorJsToHtml = editorJsHtml();

const EditorJsRenderer = ({ content }) => {
  console.log("content", content);
  const html = EditorJsToHtml.parse(content);
  return (
    <div className="prose max-w-full" key={content.time}>
      {html.map((item, index) => {
        if (typeof item === "string") {
          return (
            <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
          );
        }
        return item;
      })}
    </div>
  );
};

export default EditorJsRenderer;
