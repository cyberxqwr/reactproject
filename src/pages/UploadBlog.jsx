import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { CREATE_BLOG_MUTATION } from '../graphql/mutations';
import IndexBlogCard from '../components/IndexBlogCard';
import '../index.css';

function UploadBlog() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('Nėra pasirinkto failo');
    const [imagePath, setImagePath] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const handleFileChange = (event) => {
        const file = (event.target.files[0]);

        if (file) {
            setSelectedFile(file);
            setSelectedFileName(file.name);
        } else {
            setSelectedFile(null);
            setSelectedFileName('Nėra pasirinkto failo');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return null;

        setIsUploading(true);
        const formData = new FormData();

        formData.append('blogImage', selectedFile);

        try {
            const response = await fetch('http://localhost:3001/api/upload/blog-image', { // Įsitikinkite, kad URL teisingas
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Nepavyko ikelimas');
            }

            const result = await response.json();

            setIsUploading(false);
            return result.filePath;
        } catch (error) {
            setIsUploading(false);
            return null;
        }
    }

    const [createBlogMutation, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_BLOG_MUTATION);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let finalImagePath = null;
        if (selectedFile) {
            finalImagePath = await handleUpload();

            if (finalImagePath === null) {

                alert("Nepavyko ikelimas");
                return;
            }
        }

        console.log('finalImagePath: ', finalImagePath);
        console.log('name: ', name);
        console.log('desc: ', desc);

        try {
            await createBlogMutation({
                variables: {
                    name: name,
                    desc: desc,
                    imagepath: finalImagePath
                }

            });
        } catch (err) {
            console.error("Mutation CREATE_BLOG_MUTATION");
        }
    };

    return (
        <div className="grid justify-items-center">
            <h2 className="text-3xl text-center my-12">Naujo blogo įkėlimas</h2>
            <form onSubmit={handleSubmit}
                className="mt-12 flex flex-col items-center w-full max-w-2xl">
                <div>
                    <label htmlFor="name"
                        className="block text-center text-xl">Pavadinimas</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-black/[.30] rounded-md"
                    />
                </div>
                <div className='mt-5 w-full'>
                    <label htmlFor="desc"
                        className="block text-center text-xl">Aprašymas</label>
                    <textarea
                        type="text"
                        id="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                        className="block w-full border border-black/[.30] rounded-md"
                        rows={15}
                        placeholder="Blogo aprašymas rašomas čia"
                    />
                </div>
                <div>
                    <div className="flex items-center justify-center mt-4">

                        <label
                            htmlFor="blogImage"
                            className="cursor-pointer inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Pasirinkti failą...
                        </label>

                        <input
                            type="file"
                            id="blogImage"
                            onChange={handleFileChange}
                            className="sr-only"
                            accept="image/*"
                        />

                        <span className="ml-3 text-sm text-gray-600 truncate" style={{ maxWidth: '200px' }}>
                            {selectedFileName}
                        </span>
                    </div>

                    {isUploading && <p>Įkeliamas paveikslėlis...</p>}
                </div>
                <button type="submit" disabled={isUploading || mutationLoading}
                    className="my-4 text-l border border-black/[.10] drop-shadow rounded-md p-2
            bg-slate-200 hover:bg-bermuda/[.50] transition ease-in-out">
                    {mutationLoading ? 'Saugoma...' : 'Saugoti blogą'}
                </button>
            </form>
        </div>
    );
}

export default UploadBlog;