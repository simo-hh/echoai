import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";


interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            {/* <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
                <DashboardNavbar />
                {children}
            </main> */}
            <div className="flex w-full min-h-screen bg-muted">
                <DashboardSidebar />
                <main className="flex flex-col flex-1 bg-muted">
                <DashboardNavbar />
                {children}
                </main>
            </div>
        </SidebarProvider>
    );
}

export default Layout;