import { Mail, Lock, Github,Globe} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
   const navigate = useNavigate(); 
  return (
    <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md ">
     
     {/* <div className="mb-4">
          <label className="block text-black font-medium text-center">SU</label>

     </div> */}
      <div className="mb-4">
          <label className="block text-black font-medium ">Sign in to your account</label>
          <label className="block text-gray-400 font-normal ">Enter your credentials to access SkillUp</label>
          
      </div>
     
      <div className="mb-4 ">
        <label className="block text-black font-medium mb-2">Email</label>
         <div className="relative"> 
         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"  />
        <input
          type="email"
          placeholder="atia@gmail.com"
          className="w-full  pl-10 p-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-3 focus:ring-gray-300 focus:shadow-lg transition"
        />
      </div>
      </div>
       <div className="mb-6">
        <label className="block text-black font-medium mb-2">Password</label>
         <div className="relative"> 
           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"  />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full  pl-10 p-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-3  focus:ring-gray-300 focus:shadow-lg transition"
        />
      </div>
        </div>
      <button
        type="submit"
        className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition  text-sm"
      >
        Sign In
      </button> 
  
<div className="flex items-center my-5">
     <div className="flex-grow border-t border-gray-300"></div>
  <span className="mx-2 text-gray-500 text-sm">OR CONTINUE WITH</span>
  <div className="flex-grow border-t border-gray-300"></div>
  </div>

  <div className="flex items-center my-5 gap-2">
    <button type="button" className="flex-1 bg-white text-black border border-gray-200 font-semibold py-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center gap-2">
  <Globe className="h-5 w-5" />
    Google
    </button>
      <button type="button" className="flex-1 bg-white text-black border border-gray-200 font-semibold py-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center gap-2">
    <Github className="h-5 w-5" />
    GitHub
  </button>
  </div>
  <div className="mb-4 flex items-center justify-center gap-1">
        <label className="block text-gray-500 font-normal  text-sm">Don't have an account?</label>
          <button 
          type="button"
          //onClick={() => router.push('/SignUp')}
          onClick={() => navigate('/signup')}
          className="text-black font-normal hover:underline"
        >
        Sign up for free
        </button>
    </div>
    </form>
  );
}
