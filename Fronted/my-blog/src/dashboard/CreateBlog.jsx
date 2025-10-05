
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function CreateBlog() {
  const { URL } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const aboutRef = useRef(null);
  const changePhotoHandler = (e) => {

    // console.log(e);
    // const file = e.target.files[0];
    // const reader = new FileReader();


    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result)
      setBlogImage(file)
    }
  };

  // const handleCreateBlog = async (e) => {

  //   e.preventDefault();
  //   setError(null)
  //   setLoading(true)

  //   if (!title || !category || !about || !blogImage) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("category", category);
  //   formData.append("about", about);
  //   formData.append("blogImage", blogImage);

  //   try {
  //     const { data } = await axios.post(
  //       `${URL}/api/blogs/create`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     // const { data } = await axios.post(
  //     //   "http://localhost:4000/api/blogs/create",
  //     //   formData,
  //     //   {
  //     //     withCredentials: true,
  //     //     headers: {
  //     //       "Content-Type": "multipart/form-data",
  //     //     },
  //     //   }
  //     // );
  //     console.log(data);
  //     toast.success(data.message || "User registered successfully");
  //     setTitle("");
  //     setCategory("");
  //     setAbout("");
  //     setBlogImage("");
  //     setBlogImagePreview("");
  //   } catch (error) {
  //     console.log(error);
  //     setError('Blog creation failed')
  //     toast.error(error.message || "Please fill the required fields");
  //   }
  // };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!title || !category || !about || !blogImage) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);
    // console.log(formData);

    try {
      const { data } = await axios.post(
        `${URL}/api/blogs/create`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message || "Blog created successfully");
      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage("");
      setBlogImagePreview("");
    } catch (error) {
      console.error("Blog creation failed:", error.response?.data || error.message);
      setError("Blog creation failed");
      toast.error(error.message || "Blog creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleCreateBlog}>
          <div className="font-semibold text-xl text-center mb-4">Create Blog</div>

          {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}
          {Error && <div className="text-red-500 text-center mb-4">{Error}</div>}


          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
          >
            <option value="">Select Category</option>
            <option value="Devotion">Devotion</option>
            <option value="Sports">Sports</option>
            <option value="Coding">Coding</option>
            <option value="Technology">Technology</option>
            <option value="Entertainment">Entertainment</option>
            <option value="food">food</option>
          </select>

          <div className="mb-4 mt-4">
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
              className="w-full p-2 border rounded-md"
              rows={4}
            />
          </div>

          <div className="flex items-center mb-4">
            <div className="w-20 h-20 mr-4">
              {/* <img
                src={blogImagePreview || "/default-avatar.png"}
                alt="photo preview"
                className="w-full h-full object-cover rounded-full"
              /> */}
              <img
                src={blogImagePreview || "https://via.placeholder.com/150"}
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
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateBlog;