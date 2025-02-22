import pic from "./pic.png"

export default async function Home() {
  return (
    <>
      <div>
        <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-[#FFB38E] to-[#FFB38E]">
          <div className="absolute inset-0">
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-orange-300/40"></div>
              <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-orange-200/30"></div>
              <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-orange-100/20"></div>
            </div>
          </div>
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Career Exploration<br/>
                & Talent<br/>
                Recruitment
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Connecting students and job seekers with career and education opportunities while helping businesses and colleges access a pool of skilled and motivated professionals
              </p>
              <div className="flex gap-4">
                <button className="bg-red-500 text-white px-8 py-3 rounded-full font-medium hover:bg-red-600 transition-colors">
                  Log In
                </button>
                <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
                  Demo
                </button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="w-full aspect-square rounded-full overflow-hidden">
                <img 
                  src={pic.src}
                  alt="Smiling professional"
                />
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </>
  );
}
