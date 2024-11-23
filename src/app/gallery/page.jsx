"use client";
import { useState, useEffect } from 'react';

export default function ListFiles() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const response = await fetch('/api/get-urls');
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUrls();
  }, []);

  return (
      <div className="min-h-screen overflow-hidden bg-white flex items-center justify-center">
        <div className="relative isolate px-6 py-14 lg:px-8 w-full h-full flex items-center justify-center flex-col">
          <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
                style={{
                  clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="pb-16">
            <h2 className="font-manrope w-full pb-2.5 text-center text-4xl font-bold leading-loose text-gray-900">Our Gallery</h2>
            <p className="w-full text-center text-lg font-normal leading-8 text-gray-600">Explore our gallery's intimate space.</p>
          </div>

          {/* Main Gallery Container */}
          <div className="mx-auto max-w-full rounded-lg p-5 shadow-md">
            {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-300 h-32 w-32"></div>
                </div>
            ) : (
                <div className="grid grid-cols-6 gap-4">
                  {files.map((file) => (
                      <div key={file.cid} className="border rounded-lg overflow-hidden shadow-sm">
                        <img
                            src={file.url}
                            alt={`CID: ${file.cid}`}
                            className="object-cover w-full aspect-square"
                        />
                        <p className="p-2 text-center text-gray-500 text-xs">CID: {file.cid}</p>
                      </div>
                  ))}
                </div>
            )}
          </div>

          <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
                style={{
                  clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>
  );
}