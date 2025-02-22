import type React from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  BookOpen,
  Edit,
  Github,
  Globe,
  LinkedinIcon,
  Mail,
  MapPin,
  MessageSquare,
  Twitter,
  User,
} from "lucide-react"
import { signOutAction } from "@/app/actions"

export default async function ProfilePage() {
  const supabase =  await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error("Error getting user:", userError);
    return <div>Error loading user data</div>;
  }
  const { data: profileData, error: profileError } = await supabase.from("profiles").select("*").eq("id", userData.user.id);
  if (profileError) {
    console.error("Error getting profile:", profileError);
    return <div>Error loading profile data</div>;
  }
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-8">
      {/* Profile Header */}
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <Card className="relative h-full flex flex-col">
          <CardContent className="pt-6 flex-grow">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback>{profileData[0].full_name?.slice(0,2) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">{profileData[0].full_name || 'Anonymous User'}</h1>
                <p className="text-muted-foreground">{profileData[0].experience_level || 'Experience level not set'}</p>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Location not set</span>
                </div>
              </div>
              <Button className="absolute top-4 right-4" variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6">
              <div className="flex justify-center gap-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <LinkedinIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className=" mt-auto">
            <form action={signOutAction} className="w-full" >
            <Button variant="destructive"  size="sm" className="w-full">Logout</Button>
            </form>
          </CardFooter>
        </Card>

        <div className="space-y-8">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              {/* Skills Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {profileData[0].key_skills?.map((skill: string) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  icon={<BookOpen className="h-4 w-4" />}
                  title="Education"
                  value={profileData[0].education_level || 'Not set'}
                  description="Current level"
                />
                <StatsCard
                  icon={<MessageSquare className="h-4 w-4" />}
                  title="Career Goals"
                  value={profileData[0].career_goals ? 'Set' : 'Not set'}
                  description="Future aspirations"
                />
                <StatsCard
                  icon={<BarChart3 className="h-4 w-4" />}
                  title="Interests"
                  value={profileData[0].professional_interests ? 'Set' : 'Not set'}
                  description="Professional focus"
                />
                <StatsCard 
                  icon={<User className="h-4 w-4" />} 
                  title="About" 
                  value={profileData[0].about_you ? 'Set' : 'Not set'}
                  description="Personal bio" 
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Contact Section */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Your personal and work contact details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="text-sm font-medium">Email</div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              john.doe@example.com
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Location</div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              San Francisco, California
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatsCard({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode
  title: string
  value: string
  description: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

