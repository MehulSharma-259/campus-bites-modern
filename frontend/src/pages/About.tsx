/** @format */

export default function About() {
  const team = [
      {
        name: "Mehul Sharma",
        role: "Lead Full-Stack Developer",
        desc: "Specialized in Backend Security, JWT authentication, and System Architecture.",
        color: "from-[#FF4461] to-[#ff6b81]",
      },
      {
        name: "Anubhav Sharma",
        role: "Frontend Engineer",
        desc: "Expert in React.js, Tailwind CSS, and creating seamless User Interfaces.",
        color: "from-blue-500 to-cyan-400",
      },
      {
        name: "Ashwani Pal",
        role: "Database Specialist",
        desc: "Focused on Prisma ORM, Database schema design, and API optimization.",
        color: "from-purple-500 to-indigo-400",
      },
      {
        name: "Harsh Yadav",
        role: "UI/UX & Quality Analyst",
        desc: "Dedicated to user experience testing, interface polishing, and documentation.",
        color: "from-emerald-500 to-teal-400",
      },
    ];

  return (
    <div className="min-h-screen p-4 md:p-8 pt-10">
      <div className="max-w-6xl mx-auto mt-10">
        
        {/* 1. Hero Section */}
        <header className="text-center mb-20 bg-white/10 backdrop-blur-md p-12 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FF4461]/10 rounded-full blur-3xl"></div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6">
            Built for Students, <br />
            <span className="text-[#FF4461]">By Students.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Campus Bites was born out of a simple observation: student breaks are too short for long lines. 
            We created a digital bridge between the canteen and the classroom to make campus life a bit more delicious.
          </p>
        </header>

        {/* 2. How It Works Section */}
        <section className="mb-32">
          <h2 className="text-center text-3xl font-black text-gray-800 uppercase tracking-widest mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🍔", title: "Browse Menu", text: "Explore a variety of cuisines from the Allenhouse Canteen right on your device." },
              { icon: "📱", title: "Instant Pay", text: "Secure UPI checkout with automated order generation for a contactless experience." },
              { icon: "🎓", title: "Fast Pickup", text: "Show your unique University Order ID at the counter and grab your meal. No queue." },
            ].map((step, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-xl text-center group hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-6 group-hover:animate-bounce">{step.icon}</div>
                <h3 className="text-xl font-black text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </section>


  {/* 3. Team Section - Updated for 4 Members */}
  <section className="pb-20">
    <div className="flex items-center gap-4 mb-12">
      <div className="h-px grow bg-gray-300"></div>
      <h2 className="text-2xl font-black text-gray-800 uppercase tracking-[0.3em]">The Developers</h2>
      <div className="h-px grow bg-gray-300"></div>
    </div>
    
    {/* Grid adjusted: 1 col on mobile, 2 cols on tablet (md), 4 cols on desktop (lg) */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {team.map((member, i) => (
        <div key={i} className="relative group">
          <div className={`absolute inset-0 bg-linear-to-br ${member.color} rounded-3xl blur-lg opacity-10 group-hover:opacity-30 transition-opacity`}></div>
          <div className="relative bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-xl h-full flex flex-col items-center text-center transition-transform group-hover:-translate-y-2">
            <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${member.color} mb-5 flex items-center justify-center text-white text-2xl font-black shadow-lg`}>
              {member.name.charAt(0)}
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-1">{member.name}</h3>
            <p className="text-[#FF4461] font-black text-[10px] uppercase tracking-widest mb-4">{member.role}</p>
            <p className="text-gray-600 font-medium text-xs leading-relaxed px-2">
              {member.desc}
            </p>
            <div className="mt-auto pt-6 flex gap-4">
              <span className="text-[10px] font-bold text-gray-400 hover:text-gray-900 cursor-pointer transition-colors uppercase tracking-tighter">GitHub</span>
              <span className="text-[10px] font-bold text-gray-400 hover:text-gray-900 cursor-pointer transition-colors uppercase tracking-tighter">LinkedIn</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>

        {/* 4. Footer/Motto */}
        <footer className="text-center py-10 opacity-50">
          <p className="font-black tracking-[0.5em] text-gray-400 uppercase text-xs">
            Allenhouse Institute of Technology • Batch 2026
          </p>
        </footer>
      </div>
    </div>
  );
}