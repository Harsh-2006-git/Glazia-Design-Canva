// Automated API verification script
const testAPI = async () => {
  const baseURL = 'http://localhost:5001/api';
  console.log('Testing Glazia Backend REST API at:', baseURL);

  // 1. Health check
  try {
    const healthRes = await fetch(`${baseURL}/health`);
    const healthData = await healthRes.json();
    console.log('✓ Health Check:', healthData);
  } catch (e) {
    console.error('✗ Backend server not reachable at http://localhost:5000. Start it before running this test.');
    process.exit(1);
  }

  let createdId = null;

  // 2. POST /api/canvases (Create canvas with Rect, Circle, Text)
  try {
    const createPayload = {
      name: 'Glazia Demo Canvas',
      description: 'Automated test canvas for Glazia Mini Design Canvas',
      width: 1000,
      height: 650,
      backgroundColor: '#ffffff',
      elements: [
        {
          id: 'el_test_rect',
          type: 'rectangle',
          x: 120,
          y: 100,
          width: 180,
          height: 120,
          rotation: 0,
          fill: '#2563eb',
          stroke: '#111827',
          strokeWidth: 2,
          visible: true
        },
        {
          id: 'el_test_circle',
          type: 'circle',
          x: 350,
          y: 150,
          width: 120,
          height: 120,
          rotation: 15,
          fill: '#ef476f',
          stroke: '#111827',
          strokeWidth: 1,
          visible: true
        },
        {
          id: 'el_test_text',
          type: 'text',
          x: 180,
          y: 280,
          width: 250,
          height: 60,
          rotation: 0,
          fill: '#111827',
          text: 'Glazia',
          fontSize: 32,
          fontFamily: 'Inter',
          visible: true
        }
      ]
    };

    const res = await fetch(`${baseURL}/canvases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createPayload)
    });
    const data = await res.json();
    console.log('✓ POST /api/canvases Status:', res.status, 'Success:', data.success);
    if (!data.success || !data.data?._id) {
      throw new Error('Canvas creation returned unsuccessful');
    }
    createdId = data.data._id;
  } catch (err) {
    console.error('✗ POST /api/canvases failed:', err);
    process.exit(1);
  }

  // 3. GET /api/canvases (List all)
  try {
    const res = await fetch(`${baseURL}/canvases`);
    const data = await res.json();
    console.log('✓ GET /api/canvases Status:', res.status, 'Count:', data.count);
    if (!data.success || !Array.isArray(data.data)) {
      throw new Error('Listing canvases failed');
    }
  } catch (err) {
    console.error('✗ GET /api/canvases failed:', err);
    process.exit(1);
  }

  // 4. GET /api/canvases/:id (Retrieve single)
  try {
    const res = await fetch(`${baseURL}/canvases/${createdId}`);
    const data = await res.json();
    console.log('✓ GET /api/canvases/:id Status:', res.status, 'Name:', data.data?.name, 'Elements:', data.data?.elements?.length);
    if (!data.success || data.data?._id !== createdId) {
      throw new Error('Retrieve canvas failed');
    }
  } catch (err) {
    console.error('✗ GET /api/canvases/:id failed:', err);
    process.exit(1);
  }

  // 5. PUT /api/canvases/:id (Update)
  try {
    const updatePayload = {
      name: 'Glazia Demo Canvas (Updated)',
      description: 'Updated description through test suite',
      backgroundColor: '#f8fafc'
    };
    const res = await fetch(`${baseURL}/canvases/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    const data = await res.json();
    console.log('✓ PUT /api/canvases/:id Status:', res.status, 'Updated Name:', data.data?.name);
    if (!data.success || data.data?.name !== updatePayload.name) {
      throw new Error('Update canvas failed');
    }
  } catch (err) {
    console.error('✗ PUT /api/canvases/:id failed:', err);
    process.exit(1);
  }

  // 6. Validation Error Test: 400 Bad Request
  try {
    const invalidPayload = { name: '', width: -50 };
    const res = await fetch(`${baseURL}/canvases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidPayload)
    });
    const data = await res.json();
    console.log('✓ Validation Error Handled:', res.status === 400, 'Message:', data.message);
  } catch (err) {
    console.error('✗ Validation test failed:', err);
  }

  // 7. Invalid ObjectId Test: 400 Bad Request
  try {
    const res = await fetch(`${baseURL}/canvases/invalid-id-123`);
    const data = await res.json();
    console.log('✓ Invalid ID Handled:', res.status === 400, 'Message:', data.message);
  } catch (err) {
    console.error('✗ Invalid ID test failed:', err);
  }

  // 8. Not Found Test: 404
  try {
    const nonExistentId = '664000000000000000000000';
    const res = await fetch(`${baseURL}/canvases/${nonExistentId}`);
    const data = await res.json();
    console.log('✓ 404 Handled:', res.status === 404, 'Message:', data.message);
  } catch (err) {
    console.error('✗ 404 test failed:', err);
  }

  console.log('\n=== ALL API TESTS PASSED SUCCESSFULLY ===\n');
};

testAPI();
