
import { Github, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const Team = () => {
  const team = [
    {
      name: "Sebastian Cheung",
      role: "Director & Lead Architect",
      // image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='288' viewBox='0 0 288 288'%3E%3Crect width='288' height='288' fill='%230F172A'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='128px' fill='%2306B6D4'%3EAC%3C/text%3E%3C/svg%3E",
      image: "public/IMG_2019.JPG",
      bio: "Former Silicon Valley tech lead with 25+ years experience in systems architecture and AI integration.",
      links: [
        { icon: <Linkedin size={16} />, url: "#" },
        { icon: <Twitter size={16} />, url: "#" },
        { icon: <Github size={16} />, url: "#" }
      ]
    },
    {
      name: "Zahara Miriam",
      role: "Director & AI Specialist",
      // image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='288' viewBox='0 0 288 288'%3E%3Crect width='288' height='288' fill='%230F172A'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='128px' fill='%2306B6D4'%3EMT%3C/text%3E%3C/svg%3E",
      image: "public/IMG_3877.JPG",
      bio: "10+ years experience across finance, healthcare, and AI with expertise in machine learning, distributed systems, and computational finance.",
      links: [
        { icon: <Linkedin size={16} />, url: "#" },
        { icon: <Github size={16} />, url: "#" }
      ]
    },
    // {
    //   name: "Samira Patel",
    //   role: "Lead Silicon Engineer",
    //   image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='288' viewBox='0 0 288 288'%3E%3Crect width='288' height='288' fill='%230F172A'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='128px' fill='%2306B6D4'%3ESP%3C/text%3E%3C/svg%3E",
    //   bio: "Hardware specialist with background in FPGA design, embedded systems, and IoT solutions architecture.",
    //   links: [
    //     { icon: <Linkedin size={16} />, url: "#" },
    //     { icon: <Twitter size={16} />, url: "#" }
    //   ]
    // },
    // {
    //   name: "David Rodriguez",
    //   role: "FinTech Solutions Director",
    //   image: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='288' height='288' viewBox='0 0 288 288'%3E%3Crect width='288' height='288' fill='%230F172A'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='128px' fill='%2306B6D4'%3EDR%3C/text%3E%3C/svg%3E",
    //   bio: "Former banking technology executive with deep expertise in financial systems, blockchain, and regulatory compliance.",
    //   links: [
    //     { icon: <Linkedin size={16} />, url: "#" },
    //     { icon: <Github size={16} />, url: "#" }
    //   ]
    // }
  ];

  return (
    <section id="team" className="section-padding bg-fortress-navy relative">
      <div className="absolute inset-0 opacity-5">
        <div className="code-grid"></div>
      </div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="gradient-text">Expert Team</span>
          </h2>
          <p className="text-fortress-light/70">
            A collective of industry veterans, innovative thinkers, and technology pioneers dedicated to solving your most complex challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {team.map((member, index) => (
            <div 
              key={index} 
              className={cn(
                "fortress-card group bg-card/50 backdrop-blur-sm",
                "hover:translate-y-[-5px] transition-all duration-300"
              )}
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-1 text-center">{member.name}</h3>
              <p className="text-primary text-sm mb-4 text-center">{member.role}</p>
              
              <p className="text-sm text-fortress-light/70 mb-4 text-center">
                {member.bio}
              </p>
              
              <div className="flex justify-center space-x-3">
                {member.links.map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    className="p-2 rounded-full bg-secondary text-fortress-light hover:bg-primary hover:text-fortress-light transition-colors"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
