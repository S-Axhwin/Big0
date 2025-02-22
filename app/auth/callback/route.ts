import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    
    const {data: userData, error} = await supabase.auth.getUser();
    if (error) {
      console.error(error);
      return NextResponse.redirect(`${origin}/login`);
    }
    
    const { id } = userData.user;
    const {data, error: userError} = await supabase.from("profiles").select("*").eq("id", id);
    if (userError) {
      console.error(userError);
      return NextResponse.redirect(`${origin}/login`);
    }
    
    if (data.length === 0) {
      return NextResponse.redirect(`${origin}/protected/welcome`);
    }
  }
  
  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/protected`);
}
