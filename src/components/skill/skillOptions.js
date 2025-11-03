// src/components/skills/skillOptions.js
export const popularSkills = [
  'JavaScript', 'React', 'Python Programming', 'Node.js', 'HTML/CSS',
  'TypeScript', 'SQL', 'MongoDB', 'AWS', 'Docker', 
  'UI/UX Design', 'Figma', 'Project Management', 'Git', 
  'React Native', 'Vue.js', 'Angular', 'Express.js',
  'PostgreSQL', 'Firebase', 'Redis', 'Kubernetes'
].map(skill => ({ value: skill, label: skill }));

export const customStyles = {
  control: (base) => ({
    ...base,
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #9ca3af'
    }
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? 'black' : 'white',
    color: state.isFocused ? 'white' : 'black',
    padding: '12px 13px',
    '&:active': {
      backgroundColor: 'black'
    }
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: 20
  })
};