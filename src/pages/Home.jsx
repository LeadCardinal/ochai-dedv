import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Jeremy Och - Top 0.05% AI Implementation Specialist</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Top 0.05% <br/>
            <span className="text-cyan-400">AI Implementation Specialist</span>
          </h1>
          <p className="text-xl text-slate-400">
            Site is being updated. Check back in a few minutes.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
