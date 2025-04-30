
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = {
    company: [
      { name: "About", href: "#about" },
      { name: "Team", href: "#team" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" }
    ],
    services: [
      { name: "Full Stack Development", href: "#services" },
      { name: "AI/ML Solutions", href: "#services" },
      { name: "Silicon Engineering", href: "#services" },
      { name: "Financial Technology", href: "#services" }
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Case Studies", href: "#" },
      { name: "Whitepapers", href: "#" },
      { name: "Documentation", href: "#" }
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Security", href: "#" }
    ]
  };
  
  const socialLinks = [
    { icon: <Twitter size={18} />, href: "#" },
    { icon: <Linkedin size={18} />, href: "#" },
    { icon: <Github size={18} />, href: "#" },
    { icon: <Facebook size={18} />, href: "#" }
  ];

  return (
    <footer className="bg-fortress-navy border-t border-fortress-light/10">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="text-2xl font-bold text-fortress-light mb-3">
              <span className="text-primary">Fortress</span> Computing
            </div>
            <p className="text-fortress-light/70 mb-6 text-sm max-w-xs">
              Building secure, reliable, and innovative technology solutions for businesses with complex challenges.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className={cn(
                    "p-2 rounded-full text-fortress-light/70 hover:text-primary",
                    "bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  )}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-primary">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-fortress-light/70 hover:text-primary text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-primary">Services</h4>
            <ul className="space-y-2">
              {links.services.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-fortress-light/70 hover:text-primary text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4 text-primary">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-fortress-light/70 hover:text-primary text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="font-medium mb-2 mt-6 text-primary">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-fortress-light/70 hover:text-primary text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-fortress-light/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-fortress-light/50 text-sm">
            © {currentYear} Fortress Computing, Inc. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a 
              href="#"
              className="text-sm text-primary hover:text-primary/80"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
