import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  SiReact, SiNextdotjs, SiVite, SiTailwindcss, SiMongodb, 
  SiTypescript, SiFramer, SiNodedotjs, SiExpress, SiPostgresql,
  SiFirebase, SiGit, SiFigma, SiJavascript, SiHtml5,
  SiVercel, SiSupabase, SiPrisma, SiFlutter, SiDart, SiAstro,
  SiPython, SiMysql, SiRedis, SiDocker
} from 'react-icons/si';
import { TbBrandGolang } from 'react-icons/tb';
import { IoLogoCss3 } from "react-icons/io";

const TechMarquee = () => {
  const marqueeRef = useRef(null);

  const technologies = [
    { icon: SiReact, name: 'React' },
    { icon: SiNextdotjs, name: 'Next.js' },
    { icon: SiVite, name: 'Vite' },
    { icon: SiAstro, name: 'Astro' },
    { icon: SiTailwindcss, name: 'Tailwind CSS' },
    { icon: SiMongodb, name: 'MongoDB' },
    { icon: SiMysql, name: 'MySQL' },
    { icon: SiPostgresql, name: 'PostgreSQL' },
    { icon: SiSupabase, name: 'Supabase' },
    { icon: SiFirebase, name: 'Firebase' },
    { icon: SiPrisma, name: 'Prisma' },
    { icon: SiTypescript, name: 'TypeScript' },
    { icon: SiJavascript, name: 'JavaScript' },
    { icon: SiHtml5, name: 'HTML5' },
    { icon: IoLogoCss3, name: 'CSS3' },
    { icon: SiNodedotjs, name: 'Node.js' },
    { icon: SiExpress, name: 'Express' },
    { icon: SiFlutter, name: 'Flutter' },
    { icon: SiDart, name: 'Dart' },
    { icon: SiPython, name: 'Python' },
    { icon: SiFramer, name: 'Framer Motion' },
    { icon: SiGit, name: 'Git' },
    { icon: SiFigma, name: 'Figma' },
    { icon: SiVercel, name: 'Vercel' },
    { icon: SiDocker, name: 'Docker' },
    { icon: SiRedis, name: 'Redis' },
    { icon: TbBrandGolang, name: 'Go' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = marqueeRef.current.querySelector('.marquee-track');
      const firstContent = marqueeRef.current.querySelector('.marquee-content');
      
      // Tunggu render selesai
      const contentWidth = firstContent.scrollWidth;
      
      // Animasi seamless
      gsap.fromTo(track,
        { x: 0 },
        {
          x: -contentWidth,
          duration: 40,
          ease: 'none',
          repeat: -1,
        }
      );
    }, marqueeRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={marqueeRef} className="py-5 bg-black overflow-hidden border-y border-white/10">
      <div className="marquee-track flex">
        {/* Konten asli */}
        <div className="marquee-content flex shrink-0">
          {technologies.map((tech, index) => (
            <span key={index} className="mx-6 flex items-center gap-2.5 text-white/50 hover:text-white transition-colors whitespace-nowrap">
              <tech.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tech.name}</span>
              <span className="ml-6 w-1 h-1 bg-white/20 rounded-full"></span>
            </span>
          ))}
        </div>
        
        {/* Duplikat */}
        <div className="marquee-content flex shrink-0" aria-hidden="true">
          {technologies.map((tech, index) => (
            <span key={`dup-${index}`} className="mx-6 flex items-center gap-2.5 text-white/50 hover:text-white transition-colors whitespace-nowrap">
              <tech.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tech.name}</span>
              <span className="ml-6 w-1 h-1 bg-white/20 rounded-full"></span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
