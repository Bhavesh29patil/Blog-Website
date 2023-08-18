import React, { useState } from 'react';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null);

    const infoHandler = async () => {
        try {
            const response = await fetch("http://localhost:8000/profile", {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const userInfoData = await response.json();
                setUserInfo(userInfoData);
            } else {
                console.log('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    return (
        <div>
            <h1>Profile Page</h1>
            <button onClick={infoHandler}>Fetch User Info</button>
            {userInfo && (
                <div>
                    <h2>User Info</h2>
                    <h3>{userInfo.username}</h3>
                    {console.log(userInfo)}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
