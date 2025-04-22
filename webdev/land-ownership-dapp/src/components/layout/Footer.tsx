import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6 border-t-4 border-white">
      <div className="container mx-auto px-4 font-mono">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold">LTS</p>
            <p className="text-sm">Decentralized Land Ownership Management</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">
              Docs
            </a>
            <a href="#" className="hover:text-blue-400">
              Github
            </a>
            <a href="#" className="hover:text-blue-400">
              Community
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm">
          <p>© {new Date().getFullYear()} LTS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;