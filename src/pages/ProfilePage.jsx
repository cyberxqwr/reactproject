import '../index.css';
import { GET_BLOGS_BY_USER_QUERY } from '../graphql/queries'
import { useQuery } from '@apollo/client';
import UserBlogCard from '../components/UserBlogCard';
import Aside from '../components/Aside';

function ProfilePage() {

    const { loading, error, data } = useQuery(GET_BLOGS_BY_USER_QUERY, {
        fetchPolicy: 'network-only'
    });

    if (loading) return (<p>Kraunami blogai.</p>)

    const blogs = data?.blogsUser || [];

    return (

        <>
            <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 gap-8 p-4 md:p-8">

                <div className="xl:col-span-9 lg:col-span-8 md:col-span-12">
                    <h2 className="text-2xl font-bold mb-4">Mano Blog'ai</h2>


                    <div className="hidden md:grid grid-cols-12 gap-x-4 px-4 py-2 border-b border-gray-300 font-semibold mb-2">
                        <div className="col-span-2">Nuotrauka</div>
                        <div className="col-span-3">Pavadinimas</div>
                        <div className="col-span-4">Aprašymas</div>
                        <div className="col-span-1 text-center">Redaguoti</div>
                        <div className="col-span-1 text-center">Trinti</div>
                        <div className="col-span-1"></div>
                    </div>

                    <div>
                        {blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <UserBlogCard key={blog.id} blog={blog} />
                            ))
                        ) : (
                            <p className="p-4 text-gray-500">Blogų įrašų nerasta.</p>
                        )}
                    </div>
                </div>

                <div className="xl:col-span-3 lg:col-span-4 md:col-span-12">
                    <Aside />
                </div>
            </div>

        </>

    );


}

export default ProfilePage