"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, BriefcaseIcon, Code, LineChart, Rocket, Search } from "lucide-react"
import { motion } from "motion/react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section 
        className="relative py-12 px-4 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover Your Perfect Career Path
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Find personalized career suggestions based on your skills, interests, and goals
          </motion.p>
          <motion.div 
            className="relative max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Input 
              type="text" 
              placeholder="Enter your skills or interests..." 
              className="pl-12 h-12 text-base md:text-lg rounded-full shadow-sm" 
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground/70" />
          </motion.div>
        </div>
      </motion.section>

      {/* Career Paths Section */}
      <motion.section 
        className="py-12 px-4 md:py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Recommended Career Paths
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CareerCard
              title="Software Development"
              description="Build the future through code. Learn programming, system design, and software architecture."
              progress={85}
              icon={<Code className="h-5 w-5" />}
              skills={["JavaScript", "Python", "System Design"]}
            />
            <CareerCard
              title="Data Analytics"
              description="Transform data into insights. Master data visualization, statistics, and business intelligence."
              progress={70}
              icon={<LineChart className="h-5 w-5" />}
              skills={["SQL", "Statistics", "Visualization"]}
            />
            <CareerCard
              title="Product Management"
              description="Lead product strategy and development. Combine business, tech, and user experience."
              progress={60}
              icon={<BriefcaseIcon className="h-5 w-5" />}
              skills={["Strategy", "Agile", "UX Design"]}
            />
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-12 px-4 md:py-16 bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={<Rocket className="h-6 w-6" />}
              title="Personalized Path"
              description="Get customized career suggestions based on your unique profile"
            />
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Learning Resources"
              description="Access curated learning materials and courses for your journey"
            />
            <FeatureCard
              icon={<LineChart className="h-6 w-6" />}
              title="Progress Tracking"
              description="Monitor your skill development and career growth"
            />
          </div>
        </div>
      </motion.section>
    </div>
  )
}

function CareerCard({
  title,
  description,
  progress,
  icon,
  skills,
}: {
  title: string
  description: string
  progress: number
  icon: React.ReactNode
  skills: string[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {icon}
            </div>
            <CardTitle className="tracking-tight">{title}</CardTitle>
          </div>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Path Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="rounded-full">
                  {skill}
                </Badge>
              ))}
            </div>
            <Button className="w-full rounded-full" size="lg">
              Explore Path
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="text-center border-none shadow-sm bg-background">
        <CardHeader>
          <div className="mx-auto bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center text-primary mb-4">
            {icon}
          </div>
          <CardTitle className="mb-2 tracking-tight">{title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  )
}
