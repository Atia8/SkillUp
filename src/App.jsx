// function App() {
//   return (
//     <div className="bg-blue-200 min-h-screen flex items-center justify-center">
//       <h1 className="text-4xl font-bold text-blue-700">SkillUp is ready!</h1>
//     </div>
//   );
// }

// export default App;

// import Welcome from "./components/Welcome";
// import SignInForm from "./components/SignInForm";

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4">
//       <Welcome />
//       <SignInForm />
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/signin';
import SignUpPage from './pages/SignUp';
import TermsPage from './pages/TermsPage';        
import PrivacyPage from './pages/PrivacyPage';   
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import AllReview from './pages/AllReview';
import ChatPage from './pages/ChatPage';
import ChatListPage from './pages/ChatListPage';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
     <QueryClientProvider client={queryClient}>
      {/* Your existing app code */}
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/terms" element={<TermsPage />} /> 
         <Route path="/privacy" element={<PrivacyPage />} /> 
        <Route path="/" element={<SignInPage />} /> {/* Default route */}
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/users/:userId" element={<UserProfile />} /> 
           <Route path="/review/:userId" element={<AllReview />} />
            <Route path="/chat/:receiverId" element={<ChatPage />} />
            <Route path="/messages" element={<ChatListPage />} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
      </QueryClientProvider>
  );
}

export default App; 