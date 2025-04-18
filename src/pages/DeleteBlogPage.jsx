import { useMutation } from "@apollo/client";
import { DELETE_BLOG_MUTATION } from "../graphql/mutations";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function DeleteBlogPage() {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const [deleteBlogMutation, { loading: mutationLoading, error: mutationError }] = useMutation(DELETE_BLOG_MUTATION, {
        onCompleted: (data) => {
            
            alert("Blogas sėkmingai istrintas!");
            navigate('/profile');
        },
        onError: (error) => {
            alert(`Klaida trinant blogą: ${error.message}`);

        }
    });

    const handleDeleteConfirm = () => {
        if (!blogId) {
            setErrorMessage("Neperduotas blogo ID.");
            return;
        }
        setErrorMessage('');
        deleteBlogMutation({
            variables: {
                id: blogId,
            }
        });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Blogo panaikinimo tvirtinimas</h2>
            <p className="mb-6 text-center">
                Ar tikrai norite negrįžtamai ištrinti blogo įrašą su ID: {blogId}?
            </p>
 
            {(mutationError || errorMessage) && (
                <p className="text-red-600 mb-4">
                    {errorMessage || mutationError?.message}
                </p>
            )}

            <div className="flex gap-4">
                <button
                    onClick={handleDeleteConfirm}
                    disabled={mutationLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                    {mutationLoading ? 'Trinama...' : 'Taip, trinti'}
                </button>
                <button
                    onClick={handleCancel}
                    disabled={mutationLoading}
                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                    Atšaukti
                </button>
            </div>
        </div>
    );

}

export default DeleteBlogPage;