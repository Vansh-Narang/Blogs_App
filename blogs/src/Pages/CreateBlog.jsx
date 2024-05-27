import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, setSavedBlogs, setError, updateLocalStorage } from '../reducers/slice'; // Import Redux actions

const BlogEditor = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blog.savedBlogs || []);
    const error = useSelector(state => state.blog.error);

    const [tag, setTag] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [authorName, setAuthorName] = useState('');

    // Load blogs from local storage when the component mounts
    useEffect(() => {
        //one time mount now no need to parse again
        dispatch(setSavedBlogs(blogs)); // Dispatch action to load blogs from local storage
    }, [dispatch, blogs]);

    const saveBlog = () => {
        if (!title || !content || !image) {
            dispatch(setError('Please fill in all fields: title, content, and image.')); // Dispatch action to set error
            return;
        }

        const newBlog = {
            id: Date.now(),
            title: title,
            content: content,
            image: image,
            author: authorName,
            published: Date.now(),
            tag: tag,
        };
        console.log(newBlog)
        dispatch(addBlog(newBlog)); // Dispatch action to add blog
        dispatch(updateLocalStorage());
        // Clear form fields
        setTitle('');
        setContent('');
        setImage('');
        setAuthorName('');
        setTag('');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className='w-9/12 mx-auto flex flex-col'>
            <h1 className='text-center font-medium m-2'>Welcome to Blog Editor</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <label className='font-medium'>Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className='border-2 p-1 mb-3' placeholder='Enter your blog title' />
            <label className='font-medium'>Your Name</label>
            <input type="text" value={authorName} onChange={e => setAuthorName(e.target.value)} className='border-2 p-1 mb-3' placeholder='Enter your author name' />
            <label className='font-medium'>Tag</label>
            <input type="text" value={tag} onChange={e => setTag(e.target.value)} className='border-2 p-1 mb-3' placeholder='Enter the tag' />
            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                placeholder='Enter your blog content'
            />

            <label className='font-medium'>Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className='my-3' />
            {image && <img src={image} alt="Preview" style={{ maxWidth: '20%', marginTop: '10px' }} />}


            <button onClick={saveBlog} className='bg-blue-300 rounded-md p-3 w-28 mx-auto items-center mb-2 '>Publish Blog</button>
            <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto mt-20">  {/* Grid layout */}
                {blogs && blogs.length > 0 ? (
                    blogs.map((item, index) => (
                        <div key={index} className="p-4 shadow rounded-lg">
                            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
                            <div className="p-4 w-full">
                                <button className='px-2 text-blue-600 bg-gray-100 font-medium rounded-lg mt-2 mb-2'>{item.tag}</button>
                                {/* <h2 className="text-lg mb-2 font-bold tracking-normal">{item.title}</h2> */}
                                <div dangerouslySetInnerHTML={{ __html: item.title }} className="text-xl font-bold my-2 h-full w-full" />
                                <div className='flex w-full text-gray-500 items-center justify-between mb-2'>
                                    <div className='flex items-center gap-x-2'>
                                        <Avatar alt="Remy Sharp" src={"https://source.unsplash.com/random"} />
                                        <p>{item.author}</p>
                                    </div>
                                    <p>{new Date(item.published).toLocaleDateString()}</p>
                                </div>
                                <Link to={`/showblog/${item.id}`} state={blogs} className='text-xs text-blue-500'>Read More ...</Link>
                                {/* <button onClick={() => deleteBlog(item.id)} className='text-xs text-red-500 mt-2 ml-10'>Delete</button> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-2xl font-medium items-center'>No blogs publish one to see</div>
                )}
            </div >
        </div>
    );
};

export default BlogEditor;
