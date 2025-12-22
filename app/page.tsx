import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold text-blue-600">Chat AI Portfolio</h1>
      
      {/* 1. Khu vực hiển thị khi CHƯA đăng nhập */}
      <SignedOut>
        <p className="text-gray-500">Bạn chưa đăng nhập. Hãy bấm nút dưới đây:</p>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Đăng nhập ngay
          </button>
        </SignInButton>
      </SignedOut>

      {/* 2. Khu vực hiển thị khi ĐÃ đăng nhập */}
      <SignedIn>
        <p className="text-green-600 font-semibold">Xin chào! Bạn đã đăng nhập thành công.</p>
        
        {/* Nút tròn tròn chứa Avatar user, bấm vào là hiện menu logout */}
        <UserButton />

        <Link href="/dashboard" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Đi tới Dashboard
        </Link>
      </SignedIn>
    </div>
  );
}