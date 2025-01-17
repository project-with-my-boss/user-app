import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./assets/logo.png";
import { createUser, deleteUser, getUsers, updateUser } from "./service/useServie.js";


const App = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });


  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    fetchUsers();
  }, []);
  
  
  
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const  { data }  = await getUsers();
      setUsers(data);
      setIsLoading(false)
        } catch (error) {
          toast.error("Error fetching users");
          setIsLoading(false)
        }
      };
      
      
      
      const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      toast.success("User created successfully!");
      fetchUsers();
      setFormData({ name: "", email: "" });
    } catch (error) {
      toast.error("Error creating user");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser._id, formData);
        toast.success("User updated successfully!");
        fetchUsers();
        setEditingUser(null);
        setFormData({ name: "", email: "" });
      }
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  const { name, email } = formData
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>


        <div className="mb-6">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Name"
            className="border border-gray-300 rounded px-4 py-2 mr-2 w-1/3"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 mr-2 w-1/3"
          />
          {editingUser ? (
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              >
              Update
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="bg-green-500 text-white px-4 py-2 rounded"
              >
              Create
            </button>
          )}
        </div>


          {isLoading && (
            <div className="relative flex justify-center items-center my-6 mr-4">
               <img src={logo} alt="loading..." className="w-12 h-12 animate-spin" />
            </div>
          ) }


        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>


          <tbody>
            
          {users.length > 0 ? (
          users.map((user, index) => (
    <tr key={user._id} className="hover:bg-gray-100">
      <td className="border border-gray-300 px-4 py-2 text-center">
        {index + 1}
      </td>
      <td className="border border-gray-300 px-4 py-2">{user.name}</td>
      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
      <td className="border border-gray-300 px-4 py-2 text-center">
        <button
          onClick={() => handleEdit(user)}
          className="w-fit bg-yellow-600 my-4 mx-auto md:bg-yellow-500 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(user._id)}
          className="w-fit bg-red-600 mx-auto my-4 md:bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="4" className="text-center py-4">No users found</td>
  </tr>
)}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
