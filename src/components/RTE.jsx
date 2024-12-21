import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

function Protecto({name,control,label,defaultValue=""})
{
    return(
        <div>
            {label && <label className="text-black ml-2">{label}</label>}
            <Controller name={name} control={control} render={({field:{onChange}})=>
            (
                <div className="w-[50vw] ml-1">
                    <Editor
                initialValue={defaultValue}
                apiKey="uwo8ieamsqtmudi59abfnb0bvzvla5zxtmmjjp0821mvogfx"
              
                init={{
                    initialValue:defaultValue,
                    branding:false,
                    height:500,
                    menubar:true,
                    plugins:[
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
                    content_style:"body {font-family:Helvetica,Arial,sans-serif;font-size:14px}"
                    
                }}
                onEditorChange={onChange}>

                </Editor>
                </div>
    )}>
                
            </Controller>
        </div>
    );
}

export default Protecto