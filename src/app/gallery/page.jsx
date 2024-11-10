"use client";
import { useEffect, useState } from 'react';

export default function ListFiles() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/listFiles');
        const data = await response.json();
        if (data.files) {
          setFiles(data.files);
        } else {
          setError('Failed to retrieve files');
        }
      } catch (err) {
        setError('Error fetching files: ' + err.message);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="flex min-h-screen bg-white relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto mt-10 mb-auto max-w-lg rounded-lg bg-white p-5 shadow-md">
        <h2 className="text-lg text-black font-medium mb-5">Gallery Photos</h2>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="space-y-3">
          {files.map((file) => (
            <li key={file.cid}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View File (CID: {file.cid})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
