import type React from "react"
// Move the previous career path page content here
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, BriefcaseIcon, Code, LineChart, Rocket, Search } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Your Perfect Career Path</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find personalized career suggestions based on your skills, interests, and goals
          </p>
          <div className="relative max-w-md mx-auto">
            <Input type="text" placeholder="Enter your skills or interests..." className="pl-12 h-12 text-lg" />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Popular Career Paths</h2>
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
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </section>
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Path Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          <Button className="w-full">Explore Path</Button>
        </div>
      </CardContent>
    </Card>
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
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle className="mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

