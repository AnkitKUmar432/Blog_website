import React from 'react';

function Explore() {
    return (
        <div
            className="bg-cover bg-center bg-no-repeat bg-opacity-10 h-screen w-full relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
            }}
        >
            <div className='max-w-screen-xl mx-auto h-full  overflow-x-hidden relative'>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10  z-0"></div>

            {/* Content */}
            <div className="relative z-10 container mx-auto h-full flex items-center px-8 sm:px-16">
                <div className="w-full lg:w-2/3 text-white">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                        <span className="text-yellow-400">Explore Campus Life</span> Through Our Blog
                    </h1>
                    <p className="text-lg lg:text-xl mb-6">
                        Read about the latest events, student experiences, and expert advice from our faculty.
                        Stay informed and connected with your college journey.
                    </p>
                    <div className="flex items-center flex-wrap gap-4">
                        <button className="rounded px-6 py-3 text-white bg-yellow-500 hover:bg-yellow-600 transition">
                            Read Blog Articles
                        </button>
                        <div className="flex items-center gap-2 text-white">
                            <img
                                className="w-10 h-10"
                                src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
                                alt="Play Icon"
                            />
                            <p>Watch Campus Highlights</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </div>
    );
}

export default Explore;
