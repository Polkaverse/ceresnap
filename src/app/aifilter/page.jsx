"use client"
import { useState } from 'react';

const images = {
    portrait: [
        { cid: 'baebb4icnjdjtieqywsxjgx6clu4jh7xwdyhroxybuhrsfea54fmf4o54za', url: 'https://storage.dragon.cere.network/1095/baebb4icnjdjtieqywsxjgx6clu4jh7xwdyhroxybuhrsfea54fmf4o54za' },
        { cid: 'baebb4iefljk6hmv34sv772cppztiewwdulpufmjrjcx2ec5jtkphe6nu4a', url: 'https://storage.dragon.cere.network/1095/baebb4iefljk6hmv34sv772cppztiewwdulpufmjrjcx2ec5jtkphe6nu4a' },
        { cid: 'baebb4if563jxj4rhuxw6zp76owmqhhkkgy5gyf2um4l3lidgrdh3qyp5fm', url: 'https://storage.dragon.cere.network/1095/baebb4if563jxj4rhuxw6zp76owmqhhkkgy5gyf2um4l3lidgrdh3qyp5fm' },
        { cid: 'baebb4ifveymnitglssdrsve53ci4d6xkg4uwzhf7xldvlknvbrpoo6fwgm', url: 'https://storage.dragon.cere.network/1095/baebb4ifveymnitglssdrsve53ci4d6xkg4uwzhf7xldvlknvbrpoo6fwgm' },
        { cid: 'baebb4igwx5mz3hdtbbl2lekbq2hq3luwsnir3u2ehlgkjldqt4fpzvr2ky', url: 'https://storage.dragon.cere.network/1095/baebb4igwx5mz3hdtbbl2lekbq2hq3luwsnir3u2ehlgkjldqt4fpzvr2ky' },
        { cid: 'baebb4if4rm52u4qnrpeaovtnvbjuehorx55zbi4khyl6hwikzfeb4m3nx4', url: 'https://storage.dragon.cere.network/1095/baebb4if4rm52u4qnrpeaovtnvbjuehorx55zbi4khyl6hwikzfeb4m3nx4' },
        { cid: 'baebb4igrx35ooybn4sstu6l3dwwjyhzt74sdk7o4kfu6gn2wu4ajrujvra', url: 'https://storage.dragon.cere.network/1095/baebb4igrx35ooybn4sstu6l3dwwjyhzt74sdk7o4kfu6gn2wu4ajrujvra' },
        { cid: 'baebb4ib4rc4trof5mllg5yda4nkj4y5kmglelg35javhibwdh6eatcg4zu', url: 'https://storage.dragon.cere.network/1095/baebb4ib4rc4trof5mllg5yda4nkj4y5kmglelg35javhibwdh6eatcg4zu' },
    ],
    nature: [
        { cid: 'baebb4icqjkxtvgb3oc6c3urlvjkdyrbdrbuodhqcutfn7hm3t3ixznx74q', url: 'https://storage.dragon.cere.network/1095/baebb4icqjkxtvgb3oc6c3urlvjkdyrbdrbuodhqcutfn7hm3t3ixznx74q' },
        { cid: 'baebb4ifsywdnbplandapvhinxzycsc524xk2czcbfzeazkwvzrm36akk6u', url: 'https://storage.dragon.cere.network/1095/baebb4ifsywdnbplandapvhinxzycsc524xk2czcbfzeazkwvzrm36akk6u' },
        { cid: 'baebb4iasav2ebadvlxe3iwxcw3gziuvggtgxujgsrfpwbt43nqt3nbwps4', url: 'https://storage.dragon.cere.network/1095/baebb4iasav2ebadvlxe3iwxcw3gziuvggtgxujgsrfpwbt43nqt3nbwps4' },
        { cid: 'baebb4idnld3hxo77rn3zh7lqafppqgbumllaginotmssizn7dsdd624u2i', url: 'https://storage.dragon.cere.network/1095/baebb4idnld3hxo77rn3zh7lqafppqgbumllaginotmssizn7dsdd624u2i' },
        { cid: 'baebb4ied5v46uekrcznf3rcgvwqtjls3otmo4iaemkpwhvf4kduntxheuq', url: 'https://storage.dragon.cere.network/1095/baebb4ied5v46uekrcznf3rcgvwqtjls3otmo4iaemkpwhvf4kduntxheuq' },
        { cid: 'baebb4ifhm63xuerpkb5fjmwtytaf4sfd3jplqdpwljyrt4rtdzkectn36y', url: 'https://storage.dragon.cere.network/1095/baebb4ifhm63xuerpkb5fjmwtytaf4sfd3jplqdpwljyrt4rtdzkectn36y' },
    ],
    party: [
        { cid: 'baebb4ihnkcalnlpjjlevjrlanm562lvyo3et5ny53mnvgilndio2u572ga', url: 'https://storage.dragon.cere.network/1095/baebb4ihnkcalnlpjjlevjrlanm562lvyo3et5ny53mnvgilndio2u572ga' },
        { cid: 'baebb4iezst3t6pvzfsimpxbmdibafxw22x25i22jjlovhslwx5evojqhh4', url: 'https://storage.dragon.cere.network/1095/baebb4iezst3t6pvzfsimpxbmdibafxw22x25i22jjlovhslwx5evojqhh4' },
        { cid: 'baebb4ihqzxhy35saxisgc7fhjoubzldvsbttmkroqewxfmwahwd7aqkw4y', url: 'https://storage.dragon.cere.network/1095/baebb4ihqzxhy35saxisgc7fhjoubzldvsbttmkroqewxfmwahwd7aqkw4y' },
        // Add other party images here

    ],
};

function Gallery() {
    const [activeCategory, setActiveCategory] = useState(null);

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
                        {Object.keys(images).map((category) => (
                            <div
                                key={category}
                                className="relative w-32 h-32 border rounded-lg overflow-hidden shadow-md cursor-pointer flex items-center justify-center"
                                onClick={() => handleCategoryClick(category)}
                            >
                                <img
                                    src={images[category][0].url}
                                    alt={`${category} thumbnail`}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <span className="text-white font-bold capitalize">{category}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Selected Category Images */}
                    {activeCategory && (
                        <div className="w-full max-w-4xl grid grid-cols-3 gap-4 mt-1">
                            {images[activeCategory].map((file) => (
                                <div key={file.cid} className="border rounded-lg overflow-hidden shadow-sm">
                                    <img src={file.url} alt={`CID: ${file.cid}`} className="object-cover w-full h-full" />
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

export default Gallery;