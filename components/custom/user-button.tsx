import { signOutAction } from "@/app/(api)/auth/(actions)/auth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export function UserButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="relative cursor-pointer roundend-md h-10 w-10 hover:opacity-80 transition flex items-center justify-center">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                            <User className="h-5 w-5" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
                <form action={signOutAction}>
                    <DropdownMenuItem>
                        <button type="submit" className="w-full cursor-pointer flex items-center justify-between text-destructive focus:text-destructive">
                            Sair
                            <LogOut className="h-4 w-4 ml-2" />
                        </button>
                    </DropdownMenuItem>
                </form>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}