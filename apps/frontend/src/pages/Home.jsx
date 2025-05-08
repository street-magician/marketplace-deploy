import { useEffect, useState } from 'react';

export default function Home() {
  const [listings, setListings] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/listings`)
      .then(res => res.json())
      .then(data => setListings(data))
      .catch(err => console.error('Failed to fetch listings', err));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?');
    if (!confirm) return;

    const token = localStorage.getItem('token');

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setListings(listings.filter(listing => listing.id !== id));
    } else {
      alert(data.error || 'Delete failed');
    }
  };

  return (
    <div>
      <h1>Marketplace 2.0</h1>
      {listings.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>No listings yet.</p>
        </div>
      ) : (
        listings.map(listing => (
          <div key={listing.id} className="listing">
            <h3>
              <a href={`/listing/${listing.id}`} style={{ color: '#61dafb', textDecoration: 'underline' }}>
                {listing.title}
              </a>
            </h3>

            <p>{listing.description}</p>
            <p><strong>Price:</strong> €{listing.price}</p>
            {listing.imageUrl && <img src={listing.imageUrl} alt="listing" width="200" />}
            <p><i>Owner: </i> {listing.ownerId}</p>

            {String(listing.ownerId) === userId && (
              <div style={{ marginTop: 8 }}>
                <button onClick={() => handleDelete(listing.id)} style={{ marginRight: 8 }}>
                  Delete</button>
                <a href={`/edit/${listing.id}`} className="edit-button">Edit</a>
              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
}
