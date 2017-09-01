import React from "react";
import Dropzone from "react-dropzone";

const DropZoneInput = (field) => {
    const files = field.input.value;

    return (
        <div>
            <Dropzone
                name={field.name}
                onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
                multiple={false}
                className="button"
            >
                <div>UPLOAD FILE</div>
            </Dropzone>
            {field.meta.touched &&
                field.meta.error &&
                <span className="error">{field.meta.error}</span>}
            {files &&
                Array.isArray(files) &&
                <ul>
                    {files.map((file, i) => <li key={i}>{file.name}</li>)}
                </ul>}
        </div>
    );
};

export default DropZoneInput;
