import { Mail, Lock, Github,Globe,User} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomCheckbox from "./SimpleCheckbox"; // or SimpleCheckbox
import { useState } from "react";
import { apiService } from "../services/api"

export default function SignInForm() {
   const navigate = useNavigate(); 
   const [agreeToTerms, setAgreeToTerms] = useState(false);


 // ADD THIS STATE for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    skills: "", // You can add these fields later
    bio: ""     // You can add these fields later
  });

  // ADD THIS SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    try {
      console.log("Sending signup data:", formData);
      
      const result = await apiService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        skills: formData.skills || "Beginner", // Default value
        bio: formData.bio || "New user"        // Default value
      });
      
      if (result.success) {
        alert("Account created successfully!");
        console.log("User:", result.user);
        // Redirect to login or dashboard
        navigate('/signin');
      } else {
        alert("Signup failed: " + result.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error("Signup error:", error);
    }
  };

  // ADD ONCHANGE HANDLERS to your inputs
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };




  return (
    <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md " onSubmit={handleSubmit}>
     
     {/* <div className="mb-4">
          <label className="block text-black font-medium text-center">SU</label>

     </div> */}
      <div className="mb-4">
          <label className="block text-black font-medium ">Create your account</label>
          <label className="block text-gray-400 font-normal ">Get started with SkillUp for free</label>
          
      </div>
     <div className="mb-4 ">
       <label className="block text-black font-medium mb-2">Full Name</label>
       <div className="relative"> 
         < User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"  />
        <input
          type="text"
          placeholder="Atia Zaman"
          className="w-full  pl-10 p-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-3 focus:ring-gray-300 focus:shadow-lg transition"
        
          value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)} // ADD THIS

        />
      </div>
     </div>


      <div className="mb-4 ">
        <label className="block text-black font-medium mb-2">Email</label>
         <div className="relative"> 
         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"  />
        <input
          type="email"
          placeholder="atia@gmail.com"
          className="w-full  pl-10 p-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-3 focus:ring-gray-300 focus:shadow-lg transition"
        
         value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)} // ADD THIS
        
        
        />
      </div>
      </div>
       <div className="mb-6">
        <label className="block text-black font-medium mb-2">Password</label>
         <div className="relative"> 
           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"  />
        <input
          type="password"
          placeholder="Create a strong password"
          className="w-full  pl-10 p-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-3  focus:ring-gray-300 focus:shadow-lg transition"
        
        value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)} // ADD THIS
        
        
        />
      </div>
        </div>
        <div className="mb-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <CustomCheckbox
            checked={agreeToTerms}
            onChange={setAgreeToTerms}
            size="medium"
            color="black"
          />
          <span className="text-sm text-black font-bold ">
            I agree to the{" "}
            <a href="/terms" className="text-black hover:underline">
              Terms of Service
            </a>
            <span className="text-sm text-black font-bold ">
            {" "}and{" "}
          </span>
           <a href="/privacy" className="text-black hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>



      <button
        type="submit"
        className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-900 transition  text-sm"
      >
        Create Account
      </button> 
  
<div className="flex items-center my-5">
     <div className="flex-grow border-t border-gray-300"></div>
  {/* <span className="mx-2 text-gray-500 text-sm">OR CONTINUE WITH</span> */}
  <div className="flex-grow border-t border-gray-300"></div>
  </div>

  {/* <div className="flex items-center my-5 gap-2">
    <button type="button" className="flex-1 bg-white text-black border border-gray-200 font-semibold py-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center gap-2">
  <Globe className="h-5 w-5" />
    Google
    </button>
      <button type="button" className="flex-1 bg-white text-black border border-gray-200 font-semibold py-2 rounded-md hover:bg-gray-200 transition flex items-center justify-center gap-2">
    <Github className="h-5 w-5" />
    GitHub
  </button>
  </div> */}
  <div className="mb-4 flex items-center justify-center gap-1">
        <label className="block text-gray-500 font-normal  text-sm">Don't have an account?</label>
          <button 
          type="button"
          //onClick={() => router.push('/SignUp')}
          onClick={() => navigate('/signin')}
          className="text-black font-normal hover:underline"
        >
        Sign in
        </button>
    </div>
    </form>
  );
}
