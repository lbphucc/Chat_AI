"use client";

import axios from "axios"
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils"; // Import hàm nối class của Shadcn để style tin nhắn

// Schema validate form
const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

const ConversationPage = () => {
  const router = useRouter();
  
  // State lưu trữ lịch sử chat.
  // Cấu trúc mỗi tin nhắn: { role: "user" | "assistant", content: "Nội dung" }
  const [messages, setMessages] = useState<any[]>([]); 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  // --- HÀM GỌI API ---
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // 1. Tạo tin nhắn của người dùng
      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      // Gom tin nhắn cũ + tin nhắn mới để gửi đi (để AI nhớ ngữ cảnh)
      const newMessages = [...messages, userMessage];

      // 2. GỌI API (Chính là file app/api/conversation/route.ts)
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      // 3. Cập nhật lại giao diện: Thêm tin nhắn User + Tin nhắn AI trả về
      setMessages((current) => [...current, userMessage, response.data]);

      // 4. Xóa ô nhập liệu
      form.reset(); 

    } catch (error: any) {
      // Nếu lỗi thì in ra console để debug
      console.log("Lỗi gọi API:", error);
      
      if (error?.response?.status === 403) {
        alert("Bạn đã hết lượt dùng thử! (Cần nạp tiền hoặc dùng Gemini Free)");
      }
    } finally {
      // Refresh lại router (thường dùng để update server component nếu có)
      router.refresh();
    }
  }

  return ( 
    <div>
      {/* Header */}
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 mt-4">
        <div className="p-2 w-fit rounded-md bg-violet-500/10">
          <MessageSquare className="w-10 h-10 text-violet-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Conversation</h2>
          <p className="text-sm text-muted-foreground">
            Most advanced conversation model.
          </p>
        </div>
      </div>

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Ví dụ: Bán kính hình tròn tính thế nào?" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                {isLoading ? "Đang nghĩ..." : "Gửi"}
              </Button>
            </form>
          </Form>
        </div>

        {/* --- KHU VỰC HIỂN THỊ TIN NHẮN --- */}
        <div className="space-y-4 mt-4">
           {/* Nếu đang load mà chưa có tin nhắn nào thì hiện skeleton hoặc text */}
           {isLoading && messages.length === 0 && (
             <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <p className="text-sm text-muted-foreground">Đang kết nối với AI...</p>
             </div>
           )}

           {messages.length === 0 && !isLoading && (
             <div className="text-center text-muted-foreground text-sm">
                Chưa có tin nhắn nào. Hãy hỏi gì đó đi!
             </div>
           )}

           <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                    // Nếu là User -> Nền trắng, viền nhẹ
                    // Nếu là AI -> Nền xám (muted)
                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                  )}
                >
                  {/* Avatar tạm thời (Chữ U hoặc A) */}
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-white",
                    message.role === "user" ? "bg-violet-500" : "bg-black"
                  )}>
                    {message.role === "user" ? "U" : "AI"}
                  </div>
                  
                  {/* Nội dung tin nhắn */}
                  <p className="text-sm">
                    {message.content}
                  </p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
   );
}
 
export default ConversationPage;