import { useState } from "react";

const AboutLayout = () => {
  const [showOwner, setShowOwner] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--sage)] flex flex-col items-center justify-center p-4 pt-30 transition-all duration-500">
      {!showOwner ? (
        // Main About Section
        <div className="flex flex-col items-center w-full">
          {/* Centered About Us and Owner Button */}
          <div className="flex items-center justify-center gap-x-4 mb-10">
            <h1 className="text-4xl text-[var(--forestgreen)] font-bold">
              About Us
            </h1>
            <button
              onClick={() => setShowOwner(true)}
              className="px-6 py-3 bg-[var(--forestgreen)] text-white rounded-lg hover:bg-green-800 transition duration-300"
            >
              About the Owner
            </button>
          </div>

          <div className="flex flex-col gap-8 mt-10 max-w-5xl w-full">
            {/* Box 1 */}
            <div className="bg-[var(--cream)] p-6 rounded-lg shadow-md w-[28rem] h-[28rem] self-start">
              <div className="flex flex-col gap-4 h-full">
                <h2 className="text-2xl text-[var(--forestgreen)] font-bold mb-2">
                  Who Are We?
                </h2>
                <p className="text-[var(--darkbrown)] flex-1">
                  We are a passionate team dedicated to promoting sustainable
                  fashion by making second-hand clothing accessible and
                  affordable for everyone.
                </p>
                <div className="w-full h-60 rounded-lg flex items-center justify-center">
                  <img
                    src="/other-images/kti.png"
                    alt="Who Are We"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[var(--cream)] p-6 rounded-lg shadow-md w-[28rem] h-[28rem] self-end mt-[-5rem]">
              <div className="flex flex-col gap-4 h-full">
                <h2 className="text-2xl text-[var(--forestgreen)] font-bold mb-2">
                  What Do We Do?
                </h2>
                <p className="text-[var(--darkbrown)] flex-1">
                  We provide a platform for buying and selling pre-loved clothes
                  and accessories, helping you declutter your closet while
                  earning money in convenient way.
                </p>
                <div className="w-full h-60 rounded-lg flex items-center justify-center">
                  <img
                    src="/other-images/ktakti.png"
                    alt="What Do We Do"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-[var(--cream)] p-6 rounded-lg shadow-md w-[28rem] h-[28rem] self-start mt-[-5rem]">
              <div className="flex flex-col gap-4 h-full">
                <h2 className="text-2xl text-[var(--forestgreen)] font-bold mb-2">
                  Goals and Missions
                </h2>
                <p className="text-[var(--darkbrown)] flex-1">
                  Our mission is to reduce textile waste and promote a circular
                  economy by encouraging the reuse of clothing and accessories.
                </p>
                <div className="w-full h-60 rounded-lg flex items-center justify-center">
                  <img
                    src="/other-images/sweats.png"
                    alt="Goals and Missions"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Owner Info Slide
        <div className="flex flex-col items-center gap-6 text-center max-w-xl">
          <h2 className="text-4xl font-bold text-[var(--forestgreen)]">
            Meet the Owner
          </h2>
          <img
            src="/public/sne.jpg" // Add your actual image path here
            alt="Owner"
            className="w-60 h-60 rounded-full object-cover shadow-lg"
          />
          <p className="text-lg text-[var(--darkbrown)] px-4">
            Hi! I'm Sneha Acharya, the founder of Thrift&Thrive. I started this
            platform with a passion for sustainability and fashion. My goal is
            to help people express their style while making eco-friendly choices
            by helping them sell their products remotely and conveniently. Every
            item you buy helps build a better future for our planet.
          </p>
          <button
            onClick={() => setShowOwner(false)}
            className="mt-4 px-6 py-3 bg-[var(--forestgreen)] text-white rounded-lg hover:bg-green-800 transition duration-300"
          >
            Back to About Us
          </button>
        </div>
      )}
    </div>
  );
};

export default AboutLayout;
