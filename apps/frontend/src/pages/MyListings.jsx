import { useEffect, useState } from 'react';

export default function MyListings() {
    const [myListings, setMyListings] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/listings`)
            .then(res => res.json())
            .then(data => {
                const owned = data.filter(listing => String(listing.ownerId) === userId);
                setMyListings(owned);
            })
            .catch(err => console.error('Failed to fetch listings', err));
    }, [userId]);

    return (
        <div>
            <h1>My Listings</h1>
            {myListings.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p>Go ahead and make your first listing!</p>
                </div>
            ) : (
                myListings.map(listing => (
                    <div key={listing.id} className="listing">
                        <h3>{listing.title}</h3>
                        <p>{listing.description}</p>
                        <p><strong>Price:</strong> €{listing.price}</p>
                        {listing.imageUrl && <img src={listing.imageUrl} alt="listing" />}
                    </div>
                ))
            )}
        </div>
    );
}
