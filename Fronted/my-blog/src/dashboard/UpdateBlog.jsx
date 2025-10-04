import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

function UpdateBlog() {

  const navigate = useNavigate();
  const { id } = useParams();
  const { URL } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogImagePreview, setBlogImagePreview] = useState('');
  const aboutRef = useRef(null);  // To reference the textarea

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result); // Set the preview when an image is uploaded
      setBlogImage(file); // Store the image file to send to the server
    };
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/blogs/single-blog/${id}`, {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(data);
        setTitle(data?.title);
        setCategory(data?.category || '');
        setAbout(data?.about);
        setBlogImagePreview(data?.blogImage?.url); // Show the existing image as the preview
        // setBlogImage(data?.blogImage?.url); // Store the existing image URL
      } catch (error) {
        console.log(error.response.message);
        toast.error('Failed to fetch the blog data');
      }
    };
    fetchBlog();
  }, [id,URL]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !category || !about || !blogImage) {
      alert('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('about', about);
    formData.append('blogImage', blogImage);

    try {
      const { data } = await axios.put(
        `${URL}/update/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success(data.message || 'Update successful');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md shadow-md rounded-lg p-8">
        <form onSubmit={handleUpdate}>
          <div className="font-semibold text-xl text-center mb-4">Update Blog</div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Controlled value
            className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
          >
            <option value="">Select Category</option>
            <option value="Tranding">Treanding</option>
            <option value="Devotional Pic">Devotion</option>
            <option value="Sports">Sports</option>
            <option value="Coding">Coding</option>
            <option value="Entertainment">Entertainment</option>
            <option value="food">Food</option>
            <option value="Technology">Technology</option>

          </select>


          <div className="mb-4">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <textarea
              type="text"
              ref={aboutRef}
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-2 border rounded-md resize-none"
              rows={4}
            />
          </div>

          <div className="flex items-center mb-4">
            <div className="w-20 h-20 mr-4">
              <img
                src={blogImagePreview || '/default-avatar.png'}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}
export default UpdateBlog;
