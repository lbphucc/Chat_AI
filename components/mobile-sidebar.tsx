"use client"; 

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/Sidebar"; 
import { useEffect, useState } from "react";

export const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  // -----------------------------------------------------------

  return (
    <Sheet>
      {/* Nút 3 gạch (Trigger) */}
      <SheetTrigger asChild> 
        <Button variant="ghost" size="icon" className="">
          <Menu />
        </Button>
      </SheetTrigger>
      
      {/* Nội dung trượt ra (Sidebar) */}
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};