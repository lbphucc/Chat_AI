import Navbar from "@/components/navbar"; 
import Sidebar from "@/components/Sidebar"; 

const DashboardLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full relative">
      
    <main className="h-full lg:pl-72">
        <Navbar /> 
        {children}
      </main>
    </div>
   );
}
 
export default DashboardLayout;