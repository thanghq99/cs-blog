import React from "react";
const edjsHTML = require("editorjs-html");
const edjsParser = edjsHTML();

const EditorJsRenderer = ({ content }) => {
  const html = edjsParser.parse(JSON.parse(content));
  console.log("updated");
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
