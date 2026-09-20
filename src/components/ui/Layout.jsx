import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    return (
        <>
            <main className='h-full'>
                <Navbar />
                <div className='flex'>
                    <Sidebar />
                    <Outlet />
                </div>
            </main>
        </>
    );
};
export default DashboardLayout