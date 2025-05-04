// screens/api.js

const ENV = 'dev';

const API_URLS = {
  dev: 'http://192.168.0.181:8000/predict/',
  prod: 'https://your-production-domain.com/predict/',
};

const API_URL = API_URLS[ENV];

export async function classifyImage(imageUri) {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[API] classifyImage error:', error);
    throw error;
  }
}
