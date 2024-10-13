import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayImage = ({ imageId }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/image/${imageId}`, {
                    responseType: 'blob', // important to receive binary data
                });

                const imageBlob = URL.createObjectURL(response.data);
                setImageUrl(imageBlob);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [imageId]);

    return (
        <div>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
        </div>
    );
};

export default DisplayImage;
