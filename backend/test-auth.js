const { signup, login } = require('./controllers/authController');

// Mock request and response objects
const mockRequest = (body) => ({
  body
});

const mockResponse = () => {
  const res = {};
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.data = data;
    console.log('📨 Response:', data);
    return res;
  };
  return res;
};

const testAuth = async () => {
  try {
    console.log('🧪 Testing Authentication...\n');

    // Test 1: Signup new user
    console.log('1. Testing SIGNUP...');
    const req1 = mockRequest({
      name: 'Test User',
      email: 'test2@example.com',
      password: 'testpassword123',
      skills: 'JavaScript, Cooking',
      bio: 'I love testing!'
    });
    const res1 = mockResponse();
    
    await signup(req1, res1);
    console.log('✅ Signup test completed\n');

    // Test 2: Login with same user
    console.log('2. Testing LOGIN...');
    const req2 = mockRequest({
      email: 'test2@example.com',
      password: 'testpassword123'
    });
    const res2 = mockResponse();
    
    await login(req2, res2);
    console.log('✅ Login test completed\n');

    // Test 3: Login with wrong password
    console.log('3. Testing WRONG PASSWORD...');
    const req3 = mockRequest({
      email: 'test2@example.com',
      password: 'wrongpassword'
    });
    const res3 = mockResponse();
    
    await login(req3, res3);
    console.log('✅ Wrong password test completed\n');

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
};

// Run the test
testAuth();