import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import ImageCrop from './crop'

import "./styles.css";

const Avatar: React.FC = () => {
    const [image, setImage] = useState({})
    const [scale, setScale] = useState(1)
    const [editor, setEditor] = useState(null)

    const setEditorRef = (editor: any) => setEditor(editor);

   

    const onScaleChange = (scaleChangeEvent: any) => {
        const scaleValue = parseFloat(scaleChangeEvent.target.value);
        setScale(scaleValue);
    };

    const DataURLtoFile = (dataurl: any, filename: any) => {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const profilePicChange = (fileChangeEvent:any) => {
        const file = fileChangeEvent.target.files[0];
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
        } else {
            console.log('erro')
        }
    };


    return (
        <div>
            <AvatarEditor
                ref={setEditorRef}
                image="https://www.bootdey.com/files/ReactNative/151018439841866126_5a0395ce861a1.png"
                width={250}
                height={250}
                border={50}
                scale={1.2}
            />
        </div>
    );
}

export default Avatar
