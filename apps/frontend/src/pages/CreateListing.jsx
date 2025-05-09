import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', image);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (image) {
      imageUrl = await uploadImage();
    }

    const token = localStorage.getItem('token');

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, price, imageUrl }),
    });

    if (res.ok) {
      alert('Listing created!');
      navigate('/');
    } else {
      const data = await res.json();
      alert(data.error || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Listing</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price (€)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="file"
        placeholder=".jpg files only!"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Create Listing</button>
    </form>
  );
}
