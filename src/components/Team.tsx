
import { Github, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const Team = () => {
  const team = [
    {
      name: "Sebastian Cheung, MSc, CQF",
      role: "Founder & Lead Architect",
      image: "/Sebastian.png",
      bio: "Former Silicon Valley tech with 20+ years experience in software architecture and deeptech silicon engineering.",
      links: [
        { icon: <Linkedin size={16} />, url: "#" },
        { icon: <Twitter size={16} />, url: "#" },
        { icon: <Github size={16} />, url: "#" }
      ]
    },
    {
      name: "Zahara Miriam",
      role: "Founder & AI Specialist",
      image: "/Zahara.png",
      bio: "Experienced entrepreneur with over 10+ years of Fullstack Engineering.",
      links: [
        { icon: <Linkedin size={16} />, url: "#" },
        { icon: <Github size={16} />, url: "#" }
      ]
    }
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
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
