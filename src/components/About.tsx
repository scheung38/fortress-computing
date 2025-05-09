
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { getYearsInBusiness } from "../common_functions";

const About = () => {
  const strengths = [
    "Specialized expertise across multiple domains",
    "Rigorous engineering and development practices",
    "Focus on security and performance optimization",
    "Long-term strategic technology partnerships",
    "Continuous learning and innovation culture",
    "Ethical AI and responsible technology deployment"
  ];

  return (
    <section id="about" className="section-padding bg-fortress-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary opacity-5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why <span className="gradient-text">Fortress Computing</span> is Different
            </h2>
            
            <p className="text-fortress-light/80 mb-8">
              Founded in 2019, Fortress Computing brings together elite engineers, data scientists, and technologists with deep experience across industries. We specialize in solving complex technical challenges that others consider impossible.
            </p>
            
            <p className="text-fortress-light/80 mb-8">
              Our approach combines rigorous engineering discipline with innovative thinking, allowing us to deliver secure, scalable, and reliable technology solutions that drive real business outcomes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span className="text-sm text-fortress-light/70">{strength}</span>
                </div>
              ))}
            </div>
            
            <Button className="fortress-button">Learn About Our Process</Button>
          </div>
          
          <div className="relative">
            <div className={cn(
              "relative z-10 rounded-lg overflow-hidden",
              "bg-gradient-to-br from-secondary/50 to-card/50",
              "shadow-xl shadow-primary/10 border border-primary/20 p-1"
            )}>
              <div className="bg-card rounded-lg p-6 md:p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="fortress-card backdrop-blur-sm bg-secondary/50">
                    <h4 className="text-xl font-bold mb-1">{getYearsInBusiness()}+</h4>
                    <p className="text-sm text-fortress-light/70">Years in Business</p>
                  </div>
                  <div className="fortress-card backdrop-blur-sm bg-secondary/50">
                    <h4 className="text-xl font-bold mb-1">10+</h4>
                    <p className="text-sm text-fortress-light/70">Team Members</p>
                  </div>
                  <div className="fortress-card backdrop-blur-sm bg-secondary/50">
                    <h4 className="text-xl font-bold mb-1">1</h4>
                    <p className="text-sm text-fortress-light/70">Global Offices</p>
                  </div>
                  <div className="fortress-card backdrop-blur-sm bg-secondary/50">
                    <h4 className="text-xl font-bold mb-1">92%</h4>
                    <p className="text-sm text-fortress-light/70">Client Retention</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                  <blockquote className="mb-2 text-fortress-light/90 italic">
                    "Fortress Computing transformed how we approach technology. Their expertise in both software and hardware engineering made them the ideal partner for our ambitious digital transformation initiative."
                  </blockquote>
                  <div className="text-sm text-primary font-medium">CTO, Fortune 500 Financial Institution</div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-4 left-4 w-full h-full bg-primary/10 rounded-lg blur-sm"></div>
            <div className="absolute -z-10 -bottom-2 -right-2 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
