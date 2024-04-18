import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { LogOutIcon, RocketIcon, Settings2 } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type UserDropdownProps = {
    user: Session["user"];
};

export function UserDropdown({ user }: UserDropdownProps) {
    if (!user) {
        return;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="link"
                    className="relative h-8 flex items-center justify-between w-full !px-0 space-x-2 hover:no-underline"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={user.image as string}
                            alt={user.name as string}
                        />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col flex-1 space-y-1 text-left">
                        {user.name && (
                            <p className="text-sm font-medium leading-none">
                                {user.name}
                            </p>
                        )}
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        {user.name && (
                            <p className="text-sm font-medium leading-none">
                                {user.name}
                            </p>
                        )}
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex items-center">
                        <Settings2 size={18} className="mr-3" />
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <RocketIcon size={18} className="mr-3" />
                        Upgrade
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="flex items-center"
                    onClick={() => signOut()}
                >
                    <LogOutIcon size={18} className="mr-3" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
