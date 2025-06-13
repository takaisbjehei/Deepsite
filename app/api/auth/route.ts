import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import MY_TOKEN_KEY from "@/lib/get-cookie-name";

export async function GET() {
  const redirect_uri = process.env.REDIRECT_URI;
  const loginRedirectUrl = `https://huggingface.co/oauth/authorize?client_id=${process.env.HUGGINGFACE_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=openid%20profile%20write-repos%20manage-repos%20inference-api&prompt=consent&state=1234567890`;

  return NextResponse.json(
    {
      redirect: loginRedirectUrl,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { code } = body;

  if (!code) {
    return NextResponse.json(
      { error: "Code is required" },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const Authorization = `Basic ${Buffer.from(
    `${process.env.HUGGINGFACE_CLIENT_ID}:${process.env.HUGGINGFACE_CLIENT_SECRET}`
  ).toString("base64")}`;

  const redirect_uri = process.env.REDIRECT_URI as string;
  const request_auth = await fetch("https://huggingface.co/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
  });

  const response = await request_auth.json();
  if (!response.access_token) {
    return NextResponse.json(
      { error: "Failed to retrieve access token" },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const userResponse = await fetch("https://huggingface.co/api/whoami-v2", {
    headers: {
      Authorization: `Bearer ${response.access_token}`,
    },
  });

  if (!userResponse.ok) {
    return NextResponse.json(
      { user: null, errCode: userResponse.status },
      { status: userResponse.status }
    );
  }
  const user = await userResponse.json();
  const cookieStore = await cookies();
  cookieStore.set(MY_TOKEN_KEY(), response.access_token, {
    maxAge: response.expires_in,
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  return NextResponse.json(
    {
      access_token: response.access_token,
      expires_in: response.expires_in,
      user,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
