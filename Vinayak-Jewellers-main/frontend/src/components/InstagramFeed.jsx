import { useEffect, useState } from "react";

export default function InstagramFeed() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚠️ Replace this with your own Instagram Graph API Access Token
  const ACCESS_TOKEN = "YOUR_INSTAGRAM_ACCESS_TOKEN";

  useEffect(() => {
    const fetchInstagramReels = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${ACCESS_TOKEN}`
        );
        const data = await response.json();

        const filtered = (data.data || []).filter(
          (item) => item.media_type === "VIDEO" || item.media_type === "REEL"
        );

        setReels(filtered.slice(0, 4)); // Show only 4 latest reels
        setLoading(false);
      } catch (error) {
        console.error("Instagram API Error:", error);
        setLoading(false);
      }
    };

    fetchInstagramReels();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-[#140100] font-medium">
        Loading Instagram Reels...
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#FFF9E6] text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#140100] tracking-[2px] cinzelfont">
          FOLLOW US ON INSTAGRAM
        </h2>
        <p className="text-[#140100]/80 mt-2 mainfont tracking-wide text-[15px]">
          Discover Timeless Jewellery, Styling Inspiration, And Our Latest Collections.
        </p>

        {/* Reels Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {reels.map((reel, index) => (
            <a
              key={index}
              href={reel.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-2xl overflow-hidden group"
            >
              <img
                src={reel.thumbnail_url || reel.media_url}
                alt={`Instagram Reel ${index + 1}`}
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3">
                <button className="flex items-center gap-2 bg-[#140100]/90 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M14.752 11.168l-6.518-3.759A.75.75 0 007.5 8.07v7.86a.75.75 0 001.134.661l6.518-3.759a.75.75 0 000-1.304z"
                    />
                  </svg>
                  SEE REEL
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
