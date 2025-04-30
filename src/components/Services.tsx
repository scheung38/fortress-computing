
import { Server, Code, Brain, CircuitBoard, Database, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

const Services = () => {
  const services = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "Fullstack Development",
      description: "End-to-end web and mobile solutions built with modern frameworks and best practices.",
      tags: ["React", "Node.js", "TypeScript", "PostgreSQL"]
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI/ML Solutions",
      description: "Custom machine learning models and AI integrations to unlock insights from your data.",
      tags: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"]
    },
    {
      icon: <CircuitBoard className="h-10 w-10 text-primary" />,
      title: "Silicon Engineering",
      description: "Hardware design and optimization for specialized computing needs and IoT solutions.",
      tags: ["FPGA", "ASIC", "Verilog", "Embedded Systems"]
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Financial Technology",
      description: "Secure, compliant, and efficient solutions for the modern financial industry.",
      tags: ["Blockchain", "Payment Processing", "Risk Analysis", "Compliance"]
    },
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: "Cloud Architecture",
      description: "Scalable, resilient cloud infrastructure designed for performance and cost efficiency.",
      tags: ["AWS", "Azure", "GCP", "Kubernetes"]
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Security Consulting",
      description: "Comprehensive security audits and implementation of robust protection measures.",
      tags: ["Penetration Testing", "Code Audits", "Security Protocols", "Compliance"]
    }
  ];

  return (
    <section id="services" className="section-padding bg-fortress-navy relative">
      <div className="absolute inset-0 opacity-5">
        <div className="code-grid"></div>
      </div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Expert Services</span> for Complex Challenges
          </h2>
          <p className="text-fortress-light/70">
            We deliver specialized technology solutions that power innovation and drive business growth across multiple domains.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className={cn(
              "fortress-card group hover:translate-y-[-5px] transition-all duration-300",
              "bg-card/50 backdrop-blur-sm border-fortress-light/5"
            )}>
              <CardHeader className="pb-4">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-fortress-light/70 mb-6 text-base">
                  {service.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
