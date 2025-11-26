import React from 'react';

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <p>This is the Home page of our application.</p>
            <button onClick={() => console.log('clicked')}>Check Hydration</button>
        </div>
    );
};

export default Home;