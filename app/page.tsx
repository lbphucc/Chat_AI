import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    // BỘ KHUNG CĂN GIỮA:
    // 1. h-screen:       Chiều cao bằng đúng màn hình (100vh)
    // 2. flex:           Sử dụng Flexbox
    // 3. items-center:   Căn giữa theo chiều ngang (trục phụ của flex-col)
    // 4. justify-center: Căn giữa theo chiều dọc (trục chính của flex-col)
    // 5. flex-col:       Xếp các phần tử dọc (chữ ở trên, nút ở dưới)
    
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      
      {/* Dòng chữ cần căn giữa */}
      <h1 className="text-4xl font-bold text-blue-600 text-center">
        Hello Chat AI
      </h1>

      {/* Các nút bấm (nếu có) */}
      <div className="flex gap-2">
        <Button>Click Me</Button>
        <Button variant="outline">Settings</Button>
      </div>

    </div>
  )
}