import MentorCard from './MentorCard';
import { useState, useEffect } from 'react';

const API_BASE= import.meta.env.VITE_API_URL; // ← USE THIS


const MentorsSection = ({ selectedSkills, popularSkills , searchQuery}) => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch(`${API_BASE}/mentors`,{
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

   const filteredMentors = mentors.filter(mentor => {

       if (searchQuery) {
    const query = searchQuery.toLowerCase();
    
    // Check mentor name
    const nameMatch = mentor.name?.toLowerCase().includes(query);
    
    // Check mentor skills
    const skillMatch = mentor.skills?.some(skill => 
      skill.skill_name.toLowerCase().includes(query)
    );
    
    // If no match from search, exclude this mentor
    if (!nameMatch && !skillMatch) {
      return false;
    }
  }
  
    // 2. Then, handle skill filter (AND logic)
  if (selectedSkills.length > 0) {

        // Get mentor's skill names
        const mentorSkillNames = mentor.skills?.map(skill => skill.skill_name) || [];
        
        // Convert selected skill IDs to skill names
        const selectedSkillNames = selectedSkills.map(skillId => {
          const skill = popularSkills.find(s => s.id === skillId);
          return skill?.name;
        }).filter(Boolean); // Remove undefined values
        
        // Check if mentor has ALL selected skills (AND logic)
          const hasAllSkills=selectedSkillNames.every(skillName => 
          mentorSkillNames.includes(skillName)
        );
      
        if (!hasAllSkills) {
      return false;
     }
    }
     return true;
});
    
  
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
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0 mt-2">
        {mentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div> */}

      {/* {mentors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No mentors found. Be the first to join!
        </div>
      )} */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0 mt-2">
        {filteredMentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {selectedSkills.length > 0 
            ? "No mentors found matching your selected skills. Try different skills!"
            : "No mentors found. Be the first to join!"
          }
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