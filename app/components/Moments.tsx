import SafeImage from "./SafeImage";

const carouselItems = [
  {
    id: 1,
    image: "/images/covergiz.jpeg",
    title: "giskuy"
  },
  {
    id: 2,
    image: "/images/covergis.jpeg",
    title: "giskuy"
  },
];

export default function Moments() {
  return (
    <section id="moments" className="w-full py-32 px-4 bg-[#121212]">
      <div className="text-center mb-20 md:mb-28">
        <h2 className="section-title">My Mine Cuties</h2>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-16 max-w-7xl mx-auto">
        {carouselItems.map((item) => (
          <div 
            key={item.id} 
            className="group relative w-64 h-64 md:w-80 md:h-85 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex items-center justify-center transition-all duration-700 hover:-translate-y-6 hover:border-[#1DB954]/40 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute inset-0 bg-[#1DB954] opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity duration-700 rounded-full"></div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <SafeImage
                src={item.image} 
                alt={item.title}
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}