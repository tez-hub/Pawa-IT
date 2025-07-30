import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, TrendingUp, FileText, Brain, ArrowRight, Upload, BarChart3, Users } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Easy File Upload",
      description: "Upload CSV, Excel, or PDF files with a simple drag-and-drop interface"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Analysis",
      description: "Ask questions in natural language and get intelligent insights from your data"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Beautiful Visualizations",
      description: "Automatically generated charts and graphs to visualize your data trends"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Real-time Insights",
      description: "Get instant analysis and actionable insights from your business data"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="/robot.gif" className="h-12 w-12 text-white" />
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                DataSage
              </h1>
            </motion.div>
            
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold text-white/90 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              AI-Powered Business Analytics Assistant
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Transform your business data into actionable insights with the power of AI. 
              Upload your files, ask questions in natural language, and get instant visualizations and analysis.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold group"
              >
                <Link to="/dashboard">
                  Start Analyzing
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-primary hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 text-white/20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <BarChart className="h-16 w-16" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-10 text-white/20"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <TrendingUp className="h-20 w-20" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Data Analysis
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to turn your raw data into meaningful business insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to unlock your data's potential?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are making data-driven decisions with DataSage
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
              >
                <Link to="/register">
                  Get Started Free
                </Link>
              </Button>
              
              <div className="flex items-center gap-2 text-white/80">
                <Users className="h-5 w-5" />
                <span>Join 50,000+ users</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
