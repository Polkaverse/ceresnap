"use client";
import { useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

function Gallery() {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [model, setModel] = useState(null);
    const [categories, setCategories] = useState({});
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        async function fetchUrls() {
            try {
                const response = await fetch('/api/get-urls');
                const data = await response.json();
                console.log('Fetched URLs:', data); // Debug log
                setFiles(data);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            } finally {
                setIsLoading(false);
            }
        }

        async function loadModel() {
            // Suppress TensorFlow.js warnings
            const originalWarn = console.warn;
            console.warn = function (message) {
                if (message.startsWith('The kernel')) {
                    return;
                }
                originalWarn.apply(console, arguments);
            };

            try {
                const loadedModel = await mobilenet.load();
                console.log('Model loaded'); // Debug log
                setModel(loadedModel);
            } catch (error) {
                console.error('Error loading model:', error);
            } finally {
                // Restore original console.warn
                console.warn = originalWarn;
            }
        }

        fetchUrls();
        loadModel();
    }, []);

    useEffect(() => {
        if (files.length > 0 && model) {
            classifyImages();
        }
    }, [files, model]);

    const classifyImages = async () => {
        const newCategories = {
            nature: [],
            portrait: [],
            party: [],
            others: [],
        };

        for (const file of files) {
            const img = new Image();
            img.crossOrigin = "anonymous"; // Ensure the image is fetched with CORS
            img.src = `/api/proxy?url=${encodeURIComponent(file.url)}`;
            await new Promise((resolve) => {
                img.onload = async () => {
                    try {
                        const predictions = await model.classify(img);
                        console.log('Predictions for', file.url, ':', predictions); // Debug log
                        const category = getCategory(predictions);
                        newCategories[category].push(file);
                        resolve();
                    } catch (error) {
                        console.error('Error classifying image:', error);
                        resolve(); // Continue even if classification fails
                    }
                };
                img.onerror = (error) => {
                    console.error('Error loading image:', error);
                    resolve(); // Continue even if image fails to load
                };
            });
        }

        console.log('Classified categories:', newCategories); // Debug log
        setCategories(newCategories);
    };

    const getCategory = (predictions) => {
        const labels = predictions.map((pred) => pred.className.toLowerCase());

        if (labels.some((label) => label.includes('nature') || label.includes('valley') || label.includes('mountain') || label.includes('alp') || label.includes('lakeside'))) {
            return 'nature';
        }
        if (labels.some((label) => label.includes('portrait') || label.includes('person') || label.includes('face') || label.includes('cap'))) {
            return 'portrait';
        }
        if (labels.some((label) => label.includes('party') || label.includes('celebration') || label.includes('event') || label.includes('concert') || label.includes('stage'))) {
            return 'party';
        }
        return 'others';
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(activeCategory === category ? null : category);
    };

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
                <div className="pb-8">
                    <h2 className="font-manrope w-full pb-2.5 text-center text-4xl font-bold leading-loose text-gray-900">Collections</h2>
                    <p className="w-full text-center text-lg font-normal leading-8 text-gray-600">Click on the particular section to show related Images</p>
                </div>

                <div className="p-8 flex flex-col items-center overflow-y-auto">
                    {/* Category Row */}
                    <div className="flex justify-center space-x-6 mb-6 mt-4">
                        {Object.keys(categories).map((category) => (
                            <div
                                key={category}
                                className="relative w-32 h-32 border rounded-lg overflow-hidden shadow-md cursor-pointer flex items-center justify-center"
                                onClick={() => handleCategoryClick(category)}
                            >
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <span className="text-white font-bold capitalize">{category}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Selected Category Images */}
                    {activeCategory && (
                        <div className="w-full max-w-4xl grid grid-cols-3 gap-4 mt-1">
                            {categories[activeCategory].length > 0 ? (
                                categories[activeCategory].map((file) => (
                                    <div key={file._id} className="border rounded-lg overflow-hidden shadow-sm">
                                        <img src={file.url} alt={`CID: ${file._id}`} className="object-cover w-full h-full" />
                                        <p className="p-2 text-center text-gray-500 text-xs">CID: {file._id}</p>
                                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="block text-center text-blue-500 underline">View Image</a>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No images available in this category.</p>
                            )}
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

export default Gallery;