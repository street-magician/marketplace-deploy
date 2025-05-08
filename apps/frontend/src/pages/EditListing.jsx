import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/listings/${id}`)
      .then(res => res.json())
      .then(data => setListing(data))
      .catch(err => console.error('Failed to fetch listing', err));
  }, [id]);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('image', image);
    const res = await fetch('${API_URL}/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    let imageUrl = listing.imageUrl;
    if (image) {
      imageUrl = await uploadImage();
    }

    const res = await fetch(`${API_URL}/api/listings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        imageUrl,
      }),
    });

    if (res.ok) {
      alert('Listing updated!');
      navigate('/');
    } else {
      const data = await res.json();
      alert(data.error || 'Update failed');
    }
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Listing</h2>
      <input
        type="text"
        placeholder="Title"
        value={listing.title}
        onChange={(e) => setListing({ ...listing, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        value={listing.description}
        onChange={(e) => setListing({ ...listing, description: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price (€)"
        value={listing.price}
        onChange={(e) => setListing({ ...listing, price: e.target.value })}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}
