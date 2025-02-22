"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signInAction } from "@/app/actions"


const page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={signInAction}>Login with Google</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default page
