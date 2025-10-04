import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import Sidebar from '../dashboard/Sidebar';
import CreateBlog from '../dashboard/CreateBlog';
import UpdateBlog from '../dashboard/UpdateBlog';
import MyBlogs from '../dashboard/MyBlogs';
import MyProfile from '../dashboard/MyProfile';

function Dashboard() {
  const { profileData, isAuthenticated } = useAuth();
  const [component, setComponent] = useState('My Blogs');

  if (!isAuthenticated) {
    return <div>Please log in to access the dashboard</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex">
      <Sidebar component={component} setComponent={setComponent} />
      <div className="flex-1 p-4">
        {component === 'My Profile' ? (
          <MyProfile />
        ) : component === 'Create Blog' ? (
          <CreateBlog />
        ) : component === 'Update Blog' ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
