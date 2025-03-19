import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

/*
* Controller helps integrate third-party UI components like TinyMCE into React Hook Form.
? Why? TinyMCE doesn't work like a regular <input>, so React Hook Form needs help to control it.
? When? When we use complex inputs with react-hook-form.
*/

export default function RTE({ name, control, label, defaultValue = "" }) {
  const tinyMCEApiKey = import.meta.env.VITE_TINY_MCE_API;

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        // how to render the editor and connect it to the form. It gives you onChange, value, etc., from RHF.
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={tinyMCEApiKey}
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,

              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
            // onEditorChange: whenever user types/edits, this updates the value in React Hook Form using onChange.
          />
        )}
      />
    </div>
  );
}
