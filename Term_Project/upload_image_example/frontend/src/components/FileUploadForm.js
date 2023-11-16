import React, { useState } from 'react';

function FileUploadForm() {
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await fetch('http://localhost:3001/uploads', {
            method: 'POST',
            body: formData,
        });

        // Handle the response from the server
        if (response.ok) {
            console.log('File uploaded successfully');
            const data = await response.json();
            console.log(data.fileUrl);
            setUploadedImageUrl(data.fileUrl);
            alert('File uploaded successfully');
        } else {
            console.log('Error uploading file');
            // Inform the user in case of an error
            alert('Error uploading file');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="file" name="myfile" />
                <button type="submit">Upload</button>
            </form>
            {uploadedImageUrl}{<img src={uploadedImageUrl} alt="Uploaded" />}

        </>
    );
}

export default FileUploadForm;
