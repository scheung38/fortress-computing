import React from "react";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-fortress-blue text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
      <p className="text-lg max-w-xl text-center mb-8">
        Discover the full suite of financial and technology services Fortress Computing offers to empower your business. From secure banking integrations to advanced analytics and automation, we provide solutions tailored to your needs.
      </p>
      <div className="flex flex-col items-center mt-10">
        <span className="text-3xl mb-2">🚧</span>
        <span className="text-xl font-semibold text-yellow-400">Currently under construction</span>
      </div>
      {/* Add more detailed service cards or sections here as needed */}
    </div>
  );
};

export default Services;
