/* eslint-disable jsx-a11y/img-redundant-alt */
import './imagePicker.css';

import axios from 'axios';
import addIcon from '../../assets/icons/plus-solid.png';
import { Fragment } from 'react';
import { useState } from 'react';

export default function ImagePicker({
    className,
    images,
    idUser,
    baseImageURL,
    actionsRoute,
    setMessage,
    setError,
    setImages,
}) {

    const [input, setInput] = useState('')

    async function deleteImage(imageId) {
        try {
            setMessage('Eliminando imagen');
            const index = images.findIndex((image) => image.id === imageId);

            const route = `${actionsRoute}?id=${imageId}`;
            const response = await axios.delete(route);

            if (response.status === 200) {
                images.splice(index, 1);
                setImages(images);
                setMessage('Imagen eliminada.');
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        } catch (error) {
            setMessage('');
            const {
                data: { message },
            } = error.response;

            message ? setError(message) : setError(error.message);
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    }

    function submitImage(event) {
        const file = event.target.files[0];

        async function perfomSubmit(photo) {
            try {
                setMessage('enviando imagen...');
                setInput('')

                let data = new FormData();
                data.append('photo', photo);
                data.append('description', input);

                const route = `${actionsRoute}?id=${idUser}`;
                const response = await axios.post(route, data);

                if (response.status === 200) {
                    setMessage('Imagen cargada.');
                    const newImages = [...images, response.data];
                    setImages(newImages);
                    
                    setTimeout(() => {
                        setMessage('');
                    }, 3000);
                }
            } catch (error) {
                setMessage('');
                const {
                    data: { message },
                } = error.response;

                message ? setError(message) : setError(error.message);
                setTimeout(() => {
                    setError('');
                }, 3000);
            }
        }

        perfomSubmit(file);
    }

    return (
        <Fragment className={className}>
            <ul className="imagePresentation">
                {images.map((image) => (
                    <li key={image.URL}>
                        <figure>
                            <button onClick={() => deleteImage(image.id)}>
                                X
                            </button>
                            <img
                                src={`${baseImageURL}${image.URL}`}
                                alt="space center image"
                                id="imagePresentation-mainImage"
                            />

                            <figcaption className="imagePresentation-text">
                                {image.descripcion === 'undefined'
                                    ? null
                                    : image.descripcion}
                            </figcaption>
                        </figure>
                    </li>
                ))}

                <li>
                    <label htmlFor="fileUpload" className="fileUpload">
                        <input
                            type="file"
                            id="fileUpload"
                            name="fileUpload"
                            accept="image/*"
                            onChange={submitImage}
                        />
                        <img src={addIcon} alt="addIcon" />
                    </label>
                </li>
            </ul>
            <form  className="description" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="text">Descripción para la imagen a subir: </label>
                <input 
                    type="text" 
                    id="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}    
                />
            </form>
        </Fragment>
    );
}
