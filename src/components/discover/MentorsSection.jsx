import MentorCard from './MentorCard';
import { useState, useEffect } from 'react';

const MentorsSection = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:5000/api/mentors',{
         headers: {
            'Authorization': `Bearer ${token}` // 👈 Add token to headers
          }
        });
        
        if (response.ok) {
          const mentorsData = await response.json();
          setMentors(mentorsData);
        } else {
          console.error('Failed to fetch mentors');
        }
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  
if (loading) {
  return (
    <div className="py-8 px-2 sm:px-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Mentors</h2>
        <p className="text-gray-600">Connect with experienced mentors in your chosen skills</p>
      </div>
 
        <div className="text-center py-8">Loading mentors...</div>
      </div>
    );
  }


return (
  <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0 mt-2">
        {mentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>

      {mentors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No mentors found. Be the first to join!
        </div>
      )}
      </div>
  );
}



// return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
//         {mockMentors.map(mentor => (
//           <MentorCard key={mentor.id} mentor={mentor} />
//         ))}
//       </div>
//     </div>
//   );
// };
// };
export default MentorsSection;