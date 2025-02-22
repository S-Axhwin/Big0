"use client"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { Code, Pencil, Building2, FlaskRoundIcon as Flask, Stethoscope, Scale } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { encodedRedirect } from "@/utils/utils"
import { redirect } from "next/navigation"
import { useEffect } from "react"

const careerCategories = [
  {
    id: "technology",
    title: "Technology",
    icon: Code,
    description: "Software development, IT, cybersecurity, and digital innovation",
  },
  {
    id: "business",
    title: "Business",
    icon: Building2,
    description: "Management, finance, marketing, and entrepreneurship",
  },
  {
    id: "science",
    title: "Science & Research",
    icon: Flask,
    description: "Research, laboratory work, and scientific innovation",
  },
  {
    id: "healthcare",
    title: "Healthcare",
    icon: Stethoscope,
    description: "Medical practice, patient care, and health services",
  },
  {
    id: "legal",
    title: "Legal",
    icon: Scale,
    description: "Law practice, legal services, and justice system",
  },
  {
    id: "creative",
    title: "Creative Arts",
    icon: Pencil,
    description: "Design, writing, multimedia, and artistic expression",
  },
]



export default function CareerPathForm() {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      education: "",
      careerCategory: "",
      experience: "",
      skills: "",
      interests: "", 
      goals: "",
      about: ""
    }
  })

  async function onSubmit(values: any) {
    console.log("Form values:", values);
    // Validate required fields
    if (!values.fullName || !values.email || !values.education || !values.careerCategory || !values.experience) {
      console.error("Missing required fields");
      return;
    }

    const skillsArray = values.skills.split(',').map((skill: string) => skill.trim());

    const profileData = {
      full_name: values.fullName,
      email: values.email,
      education_level: values.education, 
      experience_level: values.experience,
      key_skills: skillsArray,
      professional_interests: values.interests,
      career_goals: values.goals,
      about_you: values.about
    };

    try {
      const supabase = await createClient();
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error("Error getting user:", userError);
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: userData.user.id,
          ...profileData
        });

      if (error) {
        console.error("Error updating profile:", error);
        return;
      }

      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error:", error);
      return encodedRedirect("error", "/protected/welcome", "Error updating profile");
    }
    
    return redirect("/protected");
  }

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      supabase.from('profiles').select('*').eq('id', data?.user?.id).then(({ data }) => {
        console.log(data);
        if(data?.length !== 0) {
          redirect("/protected");
        }
      });
    });
  }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Choose Your Career Path</h1>
          <p className="mt-2 text-muted-foreground">
            Let us help you find the perfect career path based on your interests and goals
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="education"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Education Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your education level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">Ph.D.</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="careerCategory"
                render={({ field }: { field: any }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>Career Category</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                      >
                        {careerCategories.map((category) => {
                          const Icon = category.icon
                          return (
                            <Label
                              key={category.id}
                              className="cursor-pointer [&:has([data-state=checked])]:border-primary"
                            >
                              <RadioGroupItem value={category.id} className="sr-only" />
                              <Card className="h-full">
                                <CardContent className="flex flex-col items-center justify-between space-y-2 p-6 h-[180px]">
                                  <Icon className="h-8 w-8" />
                                  <h3 className="font-medium text-lg">{category.title}</h3>
                                  <p className="text-center text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                                </CardContent>
                              </Card>
                            </Label>
                          )
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior (6-10 years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Key Skills</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List your key skills (e.g., programming languages, soft skills, certifications)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interests"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Professional Interests</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What areas of work interest you the most?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goals"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Career Goals</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What are your short-term and long-term career goals?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="about"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>About You</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about yourself about the tech you know in detail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Submit Career Information
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  )
}

