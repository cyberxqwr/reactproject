import '../index.css';

function IndexBlogCard({ blog }) {

    const maxLength = 300;
    
    const truncatedDesc = blog.desc && blog.desc.length > maxLength
        ? blog.desc.slice(0, maxLength) + "..."
        : blog.desc;

    return (

        <>
    <div className="ml-8 mr-8 bg-bermuda/[.75] rounded-md drop-shadow-md mb-4">
        <h2 className="text-3xl page-heading pl-4 pt-4 xl:text-left text-center">
            {blog.name}
        </h2>
        <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 m-4">
            <img
                src={blog.imageUrl}
                alt="Blogo nuotrauka"
                className="border border-black/40 rounded-md block mx-auto"
            />
            <div className="grid grid-rows-[auto_50px]">
                <p className="text-l xl:text-xl">
                    {truncatedDesc}
                </p>
                <a href="/" className="text-l text-right mt-4">
                    <span className="hover:bg-bermuda-600 hover:text-white bg-white/[.45] border border-black/30 rounded-md transition duration-150 ease-in-out p-2">
                    Skaityti daugiau</span>
                </a>
            </div>
        </div>
        <p className="pl-4 pb-4">Blogo autorius Emilis Borusas</p>
    </div>

    </>
    )
}

export default IndexBlogCard;