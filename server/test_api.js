const axios = require('axios');

// Test the API endpoints
async function testAPI() {
    try {
        console.log('Testing API endpoints...\n');
        
        // Test professors endpoint
        console.log('Testing /api/professors...');
        const professorsResponse = await axios.get('http://localhost:5000/api/professors');
        console.log('Professors response:', professorsResponse.data);
        console.log('Number of professors:', professorsResponse.data.length);
        
        // Test courses endpoint
        console.log('\nTesting /api/courses...');
        const coursesResponse = await axios.get('http://localhost:5000/api/courses');
        console.log('Courses response:', coursesResponse.data);
        console.log('Number of courses:', coursesResponse.data.length);
        
    } catch (error) {
        console.error('Error testing API:', error.response?.data || error.message);
    }
}

testAPI(); 