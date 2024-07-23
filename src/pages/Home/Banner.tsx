
import bannerVideo from '../../assets/banner/banner_video.mp4'


const Banner = () => {

   
  

  return (
    <div className="max-h-screen relative">
      <video
        autoPlay
        src={bannerVideo}
        className="h-screen w-screen object-fill"
      />
      <div className="absolute duration-300 inset-0 h-full w-full bg-white/20 dark:bg-black/50"></div>
      <div
        className={`absolute inset-0 h-full w-full flex justify-start items-center container mx-auto`}
      >
        <div className=" text-8xl font-semibold text-white uppercase leading-[5vw] tracking-tight">
          {["Journey", "Beyond", "Limits"].map((item, i) => (
            <div key={i} className='flex'>
            {i===1 && <div className='relative top-2 w-20 bg-red-500'></div>}
            <h1>{item}</h1>
            </div>
          ))}
      
        </div>
      </div>
    </div>
  );
};

export default Banner;