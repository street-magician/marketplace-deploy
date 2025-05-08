import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/listings/${id}`)
      .then(res => res.json())
      .then(data => setListing(data))
      .catch(err => console.error('Failed to fetch listing', err));
  }, [id]);

  if (!listing) return <p>Loading...</p>;

  return (
    <div className="listing">
      <h2>{listing.title}</h2>
      <p>{listing.description}</p>
      <p><strong>Price:</strong> € {listing.price} </p>
      {listing.imageUrl && <img src={listing.imageUrl} alt="listing" />}
      <p><i>Owner:</i> {listing.ownerId}</p>
    </div>
  );
}
