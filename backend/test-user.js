const User = require('./models/User');

const testUserModel = async () => {
  try {
    console.log('🧪 Testing User model...');
    
    // Test creating a user
    const newUser = await User.create({
      name: 'Test1 User',
      email: 'test1@example.com',
      password: 'testpassword123',
      skills: 'JavaScript, React',
      bio: 'I love coding!'
    });
    
    console.log('✅ User created:', newUser.insertId);
    
    // Test finding by email
    const foundUser = await User.findByEmail('test@example.com');
    console.log('✅ User found by email:', foundUser.email);
    
    // Test finding by ID
    const userById = await User.findById(newUser.insertId);
    console.log('✅ User found by ID:', userById.name);
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
};

testUserModel();