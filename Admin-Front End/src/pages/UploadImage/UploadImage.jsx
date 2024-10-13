import React, { useState } from 'react';

const UploadForm = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file); // 'image' should match with Multer field name

        // Backend code removed
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload Image</button>
        </form>
    );
};

export default UploadForm;