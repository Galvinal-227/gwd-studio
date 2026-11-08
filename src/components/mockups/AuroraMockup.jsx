
import {
  FiArrowRight,
  FiArrowUpRight,
  FiPlay,
  FiTrendingUp,
  FiTarget,
  FiLayers,
  FiCheck,
  FiMenu,
  FiPlus,
} from 'react-icons/fi';

const AuroraMockup = () => {
  const services = [
    { number: '01', name: 'Brand Strategy', desc: 'Build a brand people remember.' },
    { number: '02', name: 'Digital Experience', desc: 'Create meaningful interactions.' },
    { number: '03', name: 'Growth Marketing', desc: 'Turn attention into results.' },
  ];

  return (
    <div className="w-full min-h-full bg-[#f8f8f5] text-[#171717] font-sans overflow-hidden">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-5 md:px-10 py-5 border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#5945d5] flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-bold text-lg tracking-tight">aurora<span className="text-[#5945d5]">.</span></span>
        </div>

        <div className="hidden md:flex items-center gap-7 text-xs font-medium text-gray-500">
          <span className="text-black">Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Our Work</span>
        </div>

        <button className="bg-[#5945d5] text-white px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2">
          Let's Talk <FiArrowUpRight />
        </button>
      </nav>

      {/* HERO */}
      <section className="px-5 md:px-10 pt-12 md:pt-16 pb-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-[#eeeaff] text-[#5945d5] px-3 py-1.5 rounded-full text-[10px] font-semibold mb-6">
              <span className="w-1.5 h-1.5 bg-[#5945d5] rounded-full" />
              CREATIVE DIGITAL AGENCY
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.055em]">
              Make your
              <br />
              brand impossible
              <br />
              <span className="text-[#5945d5]">to ignore.</span>
            </h1>

            <p className="mt-5 text-sm md:text-base leading-relaxed text-gray-500 max-w-md">
              We combine strategy, creative design and technology
              to help ambitious brands stand out in a digital world.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button className="bg-[#5945d5] text-white px-6 py-3.5 rounded-full text-xs font-semibold flex items-center gap-3 shadow-lg shadow-purple-200">
                Start a project <FiArrowRight />
              </button>

              <button className="flex items-center gap-2 text-xs font-semibold px-4 py-3">
                <span className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                  <FiPlay className="w-3 h-3" />
                </span>
                Explore our work
              </button>
            </div>

            <div className="flex items-center gap-3 mt-10">
              <div className="flex -space-x-2">
                {['A', 'M', 'J'].map((letter, i) => (
                  <div
                    key={letter}
                    className={`w-8 h-8 rounded-full border-2 border-[#f8f8f5] flex items-center justify-center text-[10px] font-bold text-white ${
                      ['bg-[#d58d72]', 'bg-[#697b9e]', 'bg-[#9b7ac3]'][i]
                    }`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] font-bold">Creative minds, one vision.</p>
                <p className="text-[9px] text-gray-400">Strategy meets creativity.</p>
              </div>
            </div>
          </div>

          {/* VISUAL COMPOSITION */}
          <div className="relative min-h-[340px] md:min-h-[400px] flex items-center justify-center">

            <div className="absolute w-[85%] aspect-square max-h-[350px] rounded-full bg-[#e9e3ff]" />

            <div className="relative z-10 w-[78%] max-w-[330px] aspect-[4/5] bg-[#5945d5] rounded-[24px] overflow-hidden shadow-2xl shadow-purple-200 rotate-[-4deg]">

              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                  backgroundSize: '18px 18px'
                }}
              />

              <div className="relative h-full p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center text-white">
                  <span className="text-xs font-bold tracking-widest">AURORA®</span>
                  <FiArrowUpRight />
                </div>

                <div>
                  <p className="text-white/60 text-[9px] tracking-[0.25em] mb-3">
                    CREATIVE DIRECTION / 2026
                  </p>
                  <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight leading-[0.95]">
                    Think
                    <br />
                    Beyond
                    <br />
                    Ordinary.
                  </h2>
                  <div className="mt-6 w-12 h-1 bg-[#d9ff8f] rounded-full" />
                </div>

                <div className="flex justify-between items-end text-white">
                  <span className="text-[9px] tracking-widest">DESIGN WITH PURPOSE</span>
                  <span className="text-3xl font-light">01</span>
                </div>
              </div>
            </div>

            {/* FLOATING CARD */}
            <div className="absolute z-20 right-0 top-[12%] bg-white p-4 rounded-xl shadow-xl w-[135px] md:w-[165px]">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-gray-400 font-semibold">CAMPAIGN REACH</span>
                <FiTrendingUp className="text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">+28.4%</p>
              <div className="flex items-end gap-1 h-10 mt-2">
                {[25, 40, 32, 55, 43, 70, 60, 90].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#a99cf4] rounded-t-sm"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <p className="text-[8px] text-gray-400 mt-2">Illustrative campaign data</p>
            </div>

            {/* FLOATING BADGE */}
            <div className="absolute z-20 left-0 bottom-[12%] bg-white rounded-xl shadow-xl p-3 flex items-center gap-2">
              <div className="w-9 h-9 bg-[#edebff] text-[#5945d5] rounded-lg flex items-center justify-center">
                <FiTarget />
              </div>
              <div>
                <p className="text-[10px] font-bold">Built with purpose</p>
                <p className="text-[9px] text-gray-400">Strategy first.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-black/5 px-5 md:px-10 py-6">
        <div className="flex flex-wrap justify-between items-center gap-5">
          <p className="text-[9px] text-gray-400 tracking-widest font-semibold">
            WHAT WE BRING TO THE TABLE
          </p>
          {['STRATEGY', 'CREATIVITY', 'TECHNOLOGY', 'GROWTH'].map((item) => (
            <span key={item} className="text-[10px] md:text-xs font-bold tracking-widest text-gray-400">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-5 md:px-10 py-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-[9px] text-[#5945d5] font-bold tracking-widest mb-2">
              WHAT WE DO
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Ideas into impact.
            </h2>
          </div>
          <span className="text-[9px] text-gray-400 hidden sm:block">
            OUR EXPERTISE — 01/03
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          {services.map((service, index) => (
            <div
              key={service.number}
              className="group bg-white border border-black/5 rounded-xl p-5 hover:border-[#5945d5]/40 transition-colors"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs text-gray-400">{service.number}</span>
                <FiArrowUpRight className="text-gray-400 group-hover:text-[#5945d5]" />
              </div>
              <h3 className="font-bold text-sm mb-2">{service.name}</h3>
              <p className="text-[10px] text-gray-400 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 md:px-10 py-5 bg-[#171522] text-white flex justify-between items-center">
        <span className="text-xs font-bold tracking-widest">AURORA®</span>
        <span className="text-[9px] text-white/40">CREATIVE DIGITAL STUDIO — 2026</span>
        <FiArrowUpRight className="text-white/60" />
      </footer>

    </div>
  );
};

export default AuroraMockup;
