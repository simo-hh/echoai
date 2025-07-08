import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";


interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <html className="h-full">
            <body className="h-full bg-muted">
                <main className="flex flex-col min-h-screen w-full bg-muted">
                <DashboardNavbar />
                {children}
                </main>
            </body>
            </html>
        </SidebarProvider>
    );
}

export default Layout;