export default function Hero() {
  return (
    <section
      id="home"
      className="hero min-h-screen flex items-center justify-center text-center px-5 antialiased"
    >
      <div className="hero-content max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-righteous text-white mb-6 drop-shadow-xl">
          HAPPY 19{" "}
          <i className="fas fa-heart text-[#ff65ad] mx-3 animate-heartbeat"></i>
          <br className="md:hidden" />
          <div className="inline-grid">
      <span className="relative font-lobster text-[#34f076] overflow-hidden whitespace-nowrap border-r-4 border-[#1DB954] animate-typing pr-2">
            Lyluy
          </span>
          </div>
        </h1>
        <p className="text-lg md:text-2xl font-righteous text-[#b3b3b3] mb-10 opacity-70">
          27.1.2024. What a beautiful date, isn`t it? Just like you.
        </p>
        <p className="text-md md:text-xl font-righteous text-[#b3b3b3] mb-10 opacity-70">
          Hope your day is filled with love, joy, and all the things that make
          you smile.
        </p>
      </div>
    </section>
  );
}
