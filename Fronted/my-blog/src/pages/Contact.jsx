import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

 function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit =  async (data) =>{
    const formData = {

      access_key:import.meta.env.access_key,
      name:data.username,
      email:data.email,
      message:data.message,
    };

    try {
      await axios.post('https://api.web3forms.com/submit',formData);
      toast.success('sent successfully')
      
    } catch (error) {
      toast.error('something went to wrong')
      console.log(error);
    
    }
  };
   
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div className="relative py-3 sm:max-w-md sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
        <h1 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          Send feedback below
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="message">Message</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
              placeholder="Write your feedback here..."
              {...register("message", { required: true })}
            />
            {errors.message && <p className="text-red-500 text-sm">Message is required</p>}
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}
export default Contact;

