import { UserButton } from "@clerk/nextjs";
import { MobileSidebar } from "@/components/mobile-sidebar"; 

const Navbar = () => {
  return ( 
    <div className="flex items-center p-4">
      {/* Chỉ hiển thị nút 3 gạch trên mobile */}
      <MobileSidebar />

      <div className="flex w-full justify-end">
        <UserButton />
      </div>
    </div>
   );
}
 
export default Navbar;