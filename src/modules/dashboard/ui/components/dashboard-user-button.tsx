import { GenerateAvatar } from "@/components/generate-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronDownIcon, CreditCard, CreditCardIcon, LogOut, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
    const router = useRouter();
    const {data, isPending} = authClient.useSession();
    const isMobile = useIsMobile();

    const onLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    if (isPending || !data?.user) {
        return null;
    }

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger className="rounded-lg border border-border/10 p-3 w-full flex
            items-center justify-between bg-white/5 hover:bg-white/80 overflow-hidden">
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image}/>
                    </Avatar>) : (
                        <GenerateAvatar
                            seed={data.user.name}
                            variant="initials"
                            className="size-9 mr-3"
                        />
                    )}
                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full text-black">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full text-black">
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink=0 text-black" />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                            variant="outline"
                            onClick={() => {}}
                        >
                            <CreditCardIcon className="size-4 text-black" />
                            Billing
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onLogout}
                        >
                            <LogOutIcon className="size-4 text-black" />
                            Logout
                        </Button>
                    </DrawerFooter>             
                </DrawerContent>
            </Drawer>
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex
            items-center justify-between bg-white/5 hover:bg-white/80 overflow-hidden">
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image}/>
                    </Avatar>) : (
                        <GenerateAvatar
                            seed={data.user.name}
                            variant="initials"
                            className="size-9 mr-3"
                        />
                    )}
                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="text-sm truncate w-full text-black">
                        {data.user.name}
                    </p>
                    <p className="text-xs truncate w-full text-black">
                        {data.user.email}
                    </p>
                </div>
                <ChevronDownIcon className="size-4 shrink=0 text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="ml-3 w-72 bg-gray-50 border border-gray-300 rounded-lg">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="mt-1 ml-2 font-medium truncate text-black">{data.user.name}</span>
                        <span className="ml-2 text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-black"/>
                    <DropdownMenuItem className="cursor-pointer flex items-center justify-between text-gray-800">
                        Billing
                        <CreditCardIcon className="size-5 text-black" />
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={onLogout}
                        className="cursor-pointer flex items-center justify-between text-gray-800">
                        Logout
                        <LogOutIcon className="size-5 text-black"/>
                    </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>       
    );
};