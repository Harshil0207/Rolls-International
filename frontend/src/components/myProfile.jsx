import React, { useState, useEffect } from 'react';

const MyProfile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const response = await fetch('/api/user/details');
            const data = await response.json();
            setUserDetails(data);
        };
        fetchUserDetails();
    }, []);

    const handleProfileClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div>
            <button onClick={handleProfileClick}>My Profile</button>
            { userDetails && (
                <div>
                    <h2>User Details</h2>
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Phone:</strong> {userDetails.phone}</p>
                    <p><strong>Address:</strong> {userDetails.address}</p>
                    {/* Add more fields as needed */}
                </div>
            )}
        </div>
    );
};

export default MyProfile;
