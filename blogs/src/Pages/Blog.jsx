import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, setSavedBlogs, updateLocalStorage } from '../reducers/slice';

const ShowBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const savedBlogs = useSelector(state => state.blog.savedBlogs || []);
    const blogIndex = savedBlogs.findIndex(blog => blog.id === parseInt(id));
    const blog = savedBlogs[blogIndex];
    const [isEdit, setIsEdit] = useState(false); //editing the title
    const [content, setContent] = useState(blog?.content || ''); // editing the contetn


    const handleSave = () => {
        const updatedBlogs = [...savedBlogs];
        updatedBlogs[blogIndex] = { ...blog, content }; // Update the content of the specific blog
        dispatch(setSavedBlogs(updatedBlogs)); // Update saved blogs in Redux store
        dispatch(updateLocalStorage()); // Update local storage
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
                                onChange={(newTitle) => {
                                    const updatedBlogs = savedBlogs.map(blog => {
                                        if (blog.id === parseInt(id)) {
                                            return { ...blog, title: newTitle };
                                        }
                                        return blog;
                                    });
                                    dispatch(setSavedBlogs(updatedBlogs)); // Update saved blogs in Redux store
                                }}

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
