import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Avatar from '@mui/material/Avatar';

const ShowBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null); // blog data
    const [isEdit, setIsEdit] = useState(false); // title editing
    const [content, setContent] = useState(''); // editable content

    useEffect(() => {
        const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const foundBlog = savedBlogs.find(blog => blog.id === parseInt(id));

        // Set the found blog and editable content to state
        setBlog(foundBlog);
        setContent(foundBlog?.content || ''); //intial content if found or empty 
    }, [id]); // [id] bcz if url changes then update the blog

    const handleSave = () => {
        // Update blog data in local storage with edited content *and* title
        const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const blogIndex = savedBlogs.findIndex(b => b.id === blog.id);
        savedBlogs[blogIndex] = { ...savedBlogs[blogIndex], content, title: blog.title };
        localStorage.setItem('blogs', JSON.stringify(savedBlogs));

        // Set blog state with updated content and close editor
        setBlog({ ...blog, content }); // Update blog state with the new content
        setIsEdit(false);
    };

    const handleEdit = () => {
        setIsEdit(true);
    };

    return (
        <div className="w-9/12 mx-auto">
            {blog ? (
                <div className="flex flex-col items-center justify-center w-9/12 mx-auto">
                    {isEdit ? (
                        <div>
                            <ReactQuill
                                theme="snow"
                                value={blog.title}
                                onChange={(newTitle) => setBlog({ ...blog, title: newTitle })} // Update blog state with new title on change
                                modules={{ toolbar: true }}
                            />
                        </div>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: blog.title }} className="text-2xl font-bold my-4 cursor-pointer" onClick={handleEdit} />
                    )}
                    <div className='flex w-full text-gray-500 items-center gap-x-10 mb-2'>
                        <div className='flex items-center gap-x-2'>
                            <Avatar alt="Remy Sharp" src={"https://source.unsplash.com/random"} />
                            <p>{blog.author}</p>
                        </div>
                        <p>{new Date(blog.published).toLocaleDateString()}</p>
                    </div>
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover rounded-xl mb-4"
                    />
                    {isEdit ? (
                        <div>
                            <ReactQuill theme="snow" value={content} onChange={setContent} modules={{ toolbar: true }} />
                            <button className="py-2 px-4 bg-blue-500 text-white rounded-md mt-4" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: content }} className="w-full" onClick={handleEdit} />
                    )}
                </div>
            ) : (
                <p>Blog not found</p>
            )}
        </div>
    );
};

export default ShowBlog;
