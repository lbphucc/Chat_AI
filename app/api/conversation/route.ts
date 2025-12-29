import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    // 👇 Lấy Key từ biến môi trường (Bảo mật)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!apiKey) {
      return new NextResponse("Gemini API Key not configured", { status: 500 });
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];

    // 👇 Dùng model đã test thành công: gemini-flash-latest
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
            parts: [{ text: lastMessage.content || "" }] 
        }]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.log("Google lỗi:", data);
        return new NextResponse("Google API Error: " + (data.error?.message || response.statusText), { status: response.status });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return NextResponse.json({
        role: "assistant", 
        content: text
    });

  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}