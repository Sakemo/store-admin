import { AuthHeader } from "@/app/(root)/(utils)/auth-header";
import { MainNav } from "./main-nav";
import { StoreSwitcher } from "./store-switcher";

export const Navbar = () => {
    return (
        <header className="flex items-center justify-between p-4 border-b">

            <div className="flex items-center space-x-4">
                <StoreSwitcher />
                <MainNav className="mx-6" />
            </div>

            <div className="ml-auto flex items-center space-x-4">
                <AuthHeader />
            </div>
        </header>
    );
};