import Header from "@editorjs/header";
// import LinkTool from "@editorjs/link";
// import RawTool from "@editorjs/raw";
import ImageTool from "@editorjs/image";
// import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// import CodeTool from "@editorjs/code";
import { StyleInlineTool } from "editorjs-style";
// import Tooltip from "editorjs-tooltip";
import { uploadImage } from "@/src/utils/uploadImage";

const onFileChange = async (file) => {
  const form_data = new FormData();
  let preset = process.env.NEXT_PUBLIC_PRESET;
  if (preset) {
    form_data.append("upload_preset", preset);
  }
  if (file) {
    form_data.append("file", file);
    const imageUrl = await uploadImage(form_data);

    if (imageUrl) {
      console.log(imageUrl);

      return imageUrl;
    } else {
      return "Cannot upload the image";
    }
  }

  return "Cannot upload the image";
};

export default {
  style: StyleInlineTool,
  // tooltip: {
  //   class: Tooltip,
  //   config: {
  //     location: "left",
  //     highlightColor: "#FFEFD5",
  //     underline: true,
  //     backgroundColor: "#154360",
  //     textColor: "#FDFEFE",
  //     holder: EDITTOR_HOLDER_ID,
  //   },
  // },

  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },

  // raw: RawTool,
  // linkTool: {
  //   class: LinkTool,
  //   config: {
  //     endpoint: "http://localhost:3000/api/fetchUrl",
  //   },
  // },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file) {
          return onFileChange(file).then((imageUrl) => {
            return {
              success: 1,
              file: {
                url: imageUrl,
              },
            };
          });
        },
      },
    },
  },

  // checklist: {
  //   class: Checklist,
  //   inlineToolbar: true,
  // },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  // quote: {
  //   class: Quote,
  //   inlineToolbar: true,
  //   shortcut: "CMD+SHIFT+O",
  //   config: {
  //     quotePlaceholder: "Enter a quote",
  //     captionPlaceholder: "Quote's author",
  //   },
  // },
  // code: {
  //   class: CodeTool,
  //   inlineToolbar: true,
  // },
};
