"use client";
import { useState } from "react";
import imageCompression from "browser-image-compression";

export default function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // To track the message type (success or error)
    const [isCompressed, setIsCompressed] = useState(false); // Toggle state for compression
    const [compressionInfo, setCompressionInfo] = useState(null); // To show compression info
    const [isUploading, setIsUploading] = useState(false); // To track the uploading state

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        // If compression is enabled, compress the image as soon as the file is selected
        if (isCompressed) {
            try {
                const options = {
                    maxSizeMB: 1, // Max size of the file after compression (in MB)
                    maxWidthOrHeight: 800, // Max width or height of the compressed image
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(file, options);
                const compressedFileSize = compressedFile.size / 1024 / 1024; // in MB
                const originalFileSize = file.size / 1024 / 1024; // in MB
                setCompressionInfo({
                    originalSize: originalFileSize.toFixed(2),
                    compressedSize: compressedFileSize.toFixed(2),
                    compressionRatio: ((1 - compressedFileSize / originalFileSize) * 100).toFixed(2),
                });
            } catch (error) {
                console.error("Error during compression", error);
                setMessage("Failed to compress the file");
                setMessageType('error');
            }
        }
    };

    const handleToggleChange = async () => {
        setIsCompressed(!isCompressed);

        // Compress the image when the toggle is turned on
        if (!isCompressed && selectedFile) {
            try {
                const options = {
                    maxSizeMB: 1, // Max size of the file after compression (in MB)
                    maxWidthOrHeight: 800, // Max width or height of the compressed image
                    useWebWorker: true,
                };

                const compressedFile = await imageCompression(selectedFile, options);
                const compressedFileSize = compressedFile.size / 1024 / 1024; // in MB
                const originalFileSize = selectedFile.size / 1024 / 1024; // in MB
                setCompressionInfo({
                    originalSize: originalFileSize.toFixed(2),
                    compressedSize: compressedFileSize.toFixed(2),
                    compressionRatio: ((1 - compressedFileSize / originalFileSize) * 100).toFixed(2),
                });
            } catch (error) {
                console.error("Error during compression", error);
                setMessage("Failed to compress the file");
                setMessageType('error');
            }
        } else {
            // Reset compression info when toggle is turned off
            setCompressionInfo(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setMessage("No file selected.");
            setMessageType('error');
            return;
        }

        let fileToUpload = selectedFile;

        // If compression is enabled, upload the compressed file
        if (isCompressed && compressionInfo) {
            fileToUpload = selectedFile; // Ensure that the file is compressed
        }

        const formData = new FormData();
        formData.append("file", fileToUpload);

        setIsUploading(true); // Start uploading

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok && data.url) {
                setMessage(`File uploaded successfully: ${data.url}`);
                setMessageType('success'); // Success message
            } else {
                setMessage(data.error || 'Failed to upload file');
                setMessageType('error'); // Error message
            }
        } catch (error) {
            setMessage('An error occurred during upload');
            setMessageType('error'); // Error message
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false); // End uploading
        }
    };

    return (
        <div className="bg-gradient-to-tr from-[#ffffff] to-[#9089fc] min-h-screen flex items-center justify-center py-12">
            <div className="relative bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
                <h2 className="mt-3 text-start text-lg text-black font-medium">Upload Images</h2>
                <div className="mt-5">
                    <div className="max-w-xl">
                        <label className="flex h-32 w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 transition hover:border-gray-400 focus:outline-none">
                            <div className="flex flex-col items-center space-y-2">
                                <span className="flex items-center space-x-2">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="font-medium text-gray-600">
                                        <span className="mx-1 text-blue-600">Click to Upload</span> or drag and drop
                                    </span>
                                </span>
                                <span className="text-gray-600 text-xs">We support png, jpg, svg under 10Mb</span>
                            </div>
                            <input
                                type="file"
                                name="file_upload"
                                className="hidden"
                                accept=".png,.jpg,.svg"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Toggle Button */}
                <div className="mt-4 flex items-center">
                    <input
                        type="checkbox"
                        checked={isCompressed}
                        onChange={handleToggleChange}
                        id="compress-toggle"
                        className="mr-2"
                    />
                    <label htmlFor="compress-toggle" className="text-sm text-gray-700">
                        Enable Image Compression
                    </label>
                </div>

                <div className="flex items-end mt-3">
                    {selectedFile && (
                        <div className="text-center text-gray-700">
                            Selected file: {selectedFile.name}
                        </div>
                    )}
                </div>

                {/* Compression info */}
                {compressionInfo && (
                    <div className="mt-3 text-sm text-gray-700">
                        <p>Original Size: {compressionInfo.originalSize} MB</p>
                        <p>Compressed Size: {compressionInfo.compressedSize} MB</p>
                        <p>Compression Ratio: {compressionInfo.compressionRatio}%</p>
                    </div>
                )}

                {/* Loader when uploading */}
                {isUploading && (
                    <div className="mt-4 flex justify-center items-center">
                        <div className="h-8 w-8 border-4 rounded-full border-t-4 border-blue-500 animate-spin"
                            style={{
                                background: 'conic-gradient(blue 50%, white 50%)',
                                borderColor: 'transparent', // Remove the border color to avoid conflict
                            }}></div>
                    </div>
                )}

                <div className="flex items-end mt-5">
                    <button className="m-2 w-full rounded-md border-gray-300 p-2 text-black" onClick={() => setSelectedFile(null)}>Cancel</button>
                    <button className="m-2 w-full rounded-md bg-blue-800 p-2 text-white" onClick={handleUpload} disabled={isUploading}>Upload</button>
                </div>

                {/* Message Display */}
                <div className="items-center">
                    {message && (
                        <p className={`mt-3 text-sm ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
