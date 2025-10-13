import MentorCard from './MentorCard';

const MentorsSection = () => {
  const mockMentors = [
    {
      id: 1,
      name: "John Doe",
      skills: ["JavaScript", "React", "Node.js"],
      rating: 4.8,
      students: 124,
      avatar: "👨‍💼"
    },
    {
      id: 2,
      name: "Jane Smith", 
      skills: ["UI/UX Design", "Figma", "Adobe XD"],
      rating: 4.9,
      students: 89,
      avatar: "👩‍🎨"
    },
    {
      id: 3,
      name: "Mike Johnson",
      skills: ["Python", "Machine Learning", "Data Science"],
      rating: 4.7,
      students: 156,
      avatar: "👨‍🔬"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      skills: ["Graphic Design", "Illustration", "Branding"],
      rating: 4.9,
      students: 67,
      avatar: "👩‍🎨"
    },
    {
      id: 5,
      name: "Alex Chen",
      skills: ["AWS", "DevOps", "Docker"],
      rating: 4.6,
      students: 98,
      avatar: "👨‍💻"
    },
    {
      id: 6,
      name: "Emily Davis",
      skills: ["Digital Marketing", "SEO", "Content Strategy"],
      rating: 3,
      students: 112,
      avatar: "👩‍💼"
    }
  ];

  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Mentors</h2>
        <p className="text-gray-600">Connect with experienced mentors in your chosen skills</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default MentorsSection;