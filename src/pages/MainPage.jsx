import { GET_BLOGS_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import IndexBlogCard from "../components/IndexBlogCard";
import Aside from '../components/Aside';
import '../index.css';

function MainPage() {

    const { loading, error, data } = useQuery(GET_BLOGS_QUERY, {
        fetchPolicy: 'network-only'
    });

    if (loading) return ( <p>Kraunami blogai.</p>)

    const blogs = data?.blogs  || [];

    console.log(blogs);
    
    return (

        <>
        <h1 className="my-4 text-3xl text-center font-semibold py-4">25MIN BLOGAI</h1>

        <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-12 md:items-start"> { /* <!-- article nest'as --> */}
            <article className="xl:col-span-9 lg:col-span-8 md:col-span-8">

            {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <IndexBlogCard key={blog.id} blog={blog} />
                    ))
                ) : (
                    <p>Blogų įrašų nerasta.</p>
                )}

            </article>
        <Aside/>

        </div>
        </>

    );
}

export default MainPage;