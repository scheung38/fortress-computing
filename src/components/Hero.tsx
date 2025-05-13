import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { getYearsInBusiness } from "../common_functions";
import ChipVisualization from "./ChipVisualization";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-fortress-blue pt-16">
      <div className="code-grid"></div>
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-primary opacity-10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[10%] w-72 h-72 rounded-full bg-accent opacity-10 blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Building <span className="gradient-text">Digital Fortresses</span>{" "}
              for Modern Businesses
            </h1>
            <p className="text-lg md:text-xl text-fortress-light/80 mb-8 max-w-2xl">
              Specialized consulting in fullstack development, AI/ML solutions,
              silicon engineering, and financial technology for businesses that
              demand excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="fortress-button text-base px-8 py-6">
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="fortress-outline-button text-base px-8 py-6"
              >
                Schedule Consultation
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-sm text-fortress-light/70">
                  Projects Delivered
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">92%</p>
                <p className="text-sm text-fortress-light/70">
                  Client Satisfaction
                </p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary">
                  {getYearsInBusiness()}+
                </p>
                <p className="text-sm text-fortress-light/70">
                  Years Experience
                </p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div
              className={cn(
                "w-full aspect-square rounded-2xl overflow-hidden",
                "border border-fortress-light/10 shadow-xl shadow-primary/10",
                "flex items-center justify-center"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-fortress-navy via-fortress-blue to-fortress-teal opacity-80"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgxMiwgNzQsIDExMCwgMC4yKSIvPjwvc3ZnPg==')] opacity-10"></div>
              <div className="relative z-10 p-8 text-center">
                <div className="flex justify-center mb-1">
                  {/* ChipVisualization replaces the SVG image */}
                  <ChipVisualization style={{ width: "600px", height: "600px", marginBottom: "-68px" }} />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Accelerate Your Digital Transformation
                </h3>
                <p className="text-fortress-light/70">
                  Leverage our expertise to navigate complex technological
                  challenges
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/20 blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-accent/20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
