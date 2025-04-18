import { GET_BLOG_BY_ID } from "../graphql/queries";
import { EDIT_BLOG_MUTATION } from "../graphql/mutations";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

function EditBlogPage() {
    const { blogId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [id, setID] = useState(null);
    const [originalImagePath, setOriginalImagePath] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('Nėra pasirinkto failo');
    const [isUploading, setIsUploading] = useState(false);


    console.log(blogId);
    const { data: queryData, loading: queryLoading, error: queryError } = useQuery(GET_BLOG_BY_ID, {
        variables: { id: blogId },
        fetchPolicy: 'cache-and-network',
        skip: !blogId,
    });

    const [updateBlogMutation, { loading: mutationLoading, error: mutationError }] = useMutation(EDIT_BLOG_MUTATION, {
        onCompleted: (data) => {
             console.log("Atnaujintas sekmingai", data);
             alert("Blogas sėkmingai atnaujintas!");
             navigate('/profile');
        },
        onError: (error) => {
            console.error("Error updating blog:", error);
            alert(`Klaida atnaujinant blogą: ${error.message}`);
            
        }
    });

    useEffect(() => {
        const initialData = location.state?.blogDataFromList;
        const fetchedData = queryData?.blogId;

        console.log("Initial data from state:", initialData);
        console.log("Fetched data from query:", fetchedData);


        const dataToUse = fetchedData || initialData;

        if (dataToUse) {
            setName(dataToUse.name || '');
            setDesc(dataToUse.desc || '');
            setID(dataToUse.id);

            setOriginalImagePath(dataToUse.imagepath || null);
            if (dataToUse.imagepath) {
                 setSelectedFileName(dataToUse.imagepath.split('/').pop());
            } else {
                 setSelectedFileName('Nėra paveikslėlio');
            }
        }

    }, [queryData, location.state]);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setSelectedFileName(file.name);
        } else {

             setSelectedFile(null);
             setSelectedFileName(originalImagePath ? originalImagePath.split('/').pop() : 'Nėra pasirinkto failo');
        }
    };

    const handleUpload = async () => {

        if (!selectedFile) return null;
        setIsUploading(true);
        const formData = new FormData();
        formData.append('blogImage', selectedFile);
        try {
            const response = await fetch('http://localhost:3001/api/upload/blog-image', { method: 'POST', body: formData });
            if (!response.ok) throw new Error('Nepavyko ikelimas');
            const result = await response.json();
            setIsUploading(false);
            return result.filePath;
        } catch (error) {
            console.error("File upload error:", error);
            setIsUploading(false);
            alert("Klaida įkeliant failą.");
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let imagePathForMutation = originalImagePath;

        console.log('finalImagePath: ', imagePathForMutation);
        console.log('name: ', name);
        console.log('desc: ', desc);
        console.log('id: ', id);

        if (selectedFile) {
            const uploadedPath = await handleUpload();
            if (uploadedPath) {
                imagePathForMutation = uploadedPath;
            } else {
                return;
            }
        }

        updateBlogMutation({
            variables: {
                id: id,
                name: name,
                desc: desc,
                imagepath: imagePathForMutation
            }
        });
    };


    if (queryLoading && !location.state?.blogDataFromList) return <p>Kraunami blogo duomenys...</p>;
    if (queryError) return <p>Klaida kraunant duomenis: {queryError.message}</p>;


    return (
        <div className="grid justify-items-center">
            <h2 className="text-3xl text-center my-12">Redaguoti blogą (ID: {blogId})</h2>

            <form onSubmit={handleSubmit} className="mt-12 flex flex-col items-center w-full max-w-2xl">

                 <div className="w-full">
                    <label htmlFor="name" className="block text-center text-xl">Pavadinimas</label>
                    <input
                        type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
                        className="text-center block mx-auto w-4/5 border border-black/[.30] rounded-md p-1 w-2xl"
                    />
                </div>

                <div className='mt-5 w-full'>
                    <label htmlFor="desc" className="block text-center text-xl mb-1">Aprašymas:</label>
                    <textarea
                        id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} required
                        className="block w-full border border-black/[.30] rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows="10" placeholder="Rašykite savo blogo įrašą čia..."
                    />
                </div>

                <div className="w-full mt-5">
                     <label className="block text-center text-xl mb-2"> Paveikslėlis </label>

                     {originalImagePath && !selectedFile && (
                        <div className='text-center mb-2'>
                            <p className='text-sm text-gray-600'>Esamas paveikslėlis</p>
                            <img src={`http://localhost:3001${originalImagePath}`} alt="Esamas" className="h-20 mx-auto my-1 border"/>
                        </div>
                     )}
                    <div className="flex items-center justify-center">
                        <label htmlFor="blogImage" className="cursor-pointer inline-block px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {selectedFile ? "Keisti failą..." : "Pasirinkti failą..."}
                        </label>
                        <input type="file" id="blogImage" onChange={handleFileChange} className="sr-only" accept="image/*" />
                        <span className="ml-3 text-sm text-gray-600 truncate" style={{ maxWidth: '200px' }}>
                            {selectedFileName}
                        </span>
                    </div>
                    {isUploading && <p className="text-center mt-2">Įkeliamas paveikslėlis...</p>}
                </div>

                 <button type="submit" disabled={isUploading || mutationLoading} className="my-4 text-l border border-black/[.10] drop-shadow rounded-md p-2
            bg-slate-200 hover:bg-bermuda/[.50] transition ease-in-out">
                    {mutationLoading ? 'Atnaujinama...' : 'Atnaujinti Blogą'}
                 </button>
                 {mutationError && <p className="mt-2 text-red-600 text-sm">Klaida atnaujinant: {mutationError.message}</p>}

            </form>
        </div>
    );
}

export default EditBlogPage;