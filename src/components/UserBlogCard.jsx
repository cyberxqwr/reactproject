import { Link, useNavigate } from 'react-router-dom';
import { GET_BLOG_BY_ID } from '../graphql/queries'
import { useQuery } from '@apollo/client';
import '../index.css';

function UserBlogCard({ blog }) {

    const navigate = useNavigate();

    function truncateString(str, num) {
        if (!str) return '';
        if (str.length <= num) {
          return str;
        }
        return str.slice(0, num) + '...';
      }

      const handleDelete = () => {
        navigate(`/deleteblog/${blog.id}`, {state: {blogDataFromList: blog} });
      };

      const handleEdit = () => {
        navigate(`/editblog/${blog.id}`, { state: { blogDataFromList: blog } });
      }

        return (
            
            <div className="grid grid-cols-12 gap-x-4 items-center border-b border-gray-200 px-4 py-3 hover:bg-gray-50">
    
                <div className="col-span-2">
                    {blog.imageUrl ? (
                        <img src={blog.imageUrl} alt={blog.name} className="h-12 w-16 object-cover rounded" />
                    ) : (
                        <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                </div>
    
                <div className="col-span-3 font-medium truncate">
                    {blog.name}
                </div>
    
                <div className="col-span-4 text-sm text-gray-600">
                    {truncateString(blog.desc, 70)} 
                </div>
    
                <div className="col-span-1 text-center">
                    <button onClick={handleEdit} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        Redaguoti
                    </button>
                </div>
    
                <div className="col-span-1 text-center">
                    <button onClick={handleDelete} className="text-red-600 hover:text-red-900 text-sm font-medium">
                        Trinti
                    </button>
                </div>
                 <div className="col-span-1"></div>
            </div>
        );
}

export default UserBlogCard;