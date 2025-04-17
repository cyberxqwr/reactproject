import '../index.css';

function UserBlogCard({ blog }) {

    function truncateString(str, num) {
        if (!str) return '';
        if (str.length <= num) {
          return str;
        }
        return str.slice(0, num) + '...';
      }

        return (
            // Šis div turi tapti tinkleliu su tiek pat stulpelių kaip antraštė
            <div className="grid grid-cols-12 gap-x-4 items-center border-b border-gray-200 px-4 py-3 hover:bg-gray-50">
    
                <div className="col-span-2">
                    {imageUrl ? (
                        <img src={imageUrl} alt={blog.name} className="h-12 w-16 object-cover rounded" />
                    ) : (
                        <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                </div>
    
                <div className="col-span-3 font-medium truncate"> {/* truncate, jei per ilgas */}
                    {blog.name}
                </div>
    
                <div className="col-span-4 text-sm text-gray-600">
                    {truncateString(blog.desc, 70)} {/* Trumpinam aprašymą */}
                </div>
    
                <div className="col-span-1 text-center">
                    <button onClick={handleEdit} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        Redaguoti
                    </button>
                </div>
    
                {/* 5. Delete Mygtukas (atitinka antraštės col-span-1) */}
                <div className="col-span-1 text-center">
                    <button onClick={handleDelete} className="text-red-600 hover:text-red-900 text-sm font-medium">
                        Trinti
                    </button>
                </div>
                 <div className="col-span-1"></div> {/* Paskutinis stulpelis galbūt nereikalingas */}
            </div>
        );
}

export default UserBlogCard;