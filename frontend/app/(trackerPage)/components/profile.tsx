import { LogOut, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../_components/ui/dropdown-menu";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
    DrawerTrigger,
  } from "../../_components/ui/drawer"
import UserProfile from "./userProfile";


const Profile = () => {
    return (
        <Drawer>
            <DropdownMenu >
                <DropdownMenuTrigger asChild className="justify-self-end cursor-pointer">
                    <div className="flex flex-row gap-2 items-center select-none">
                        <div className="flex flex-col">
                            <p className="text-p font-medium text-light text-right">
                                Username
                            </p>
                            <p className="text-label font-semibold text-lightgray text-right">
                                #2024
                            </p>
                        </div>

                        <div className="avatar size-12 rounded-full bg-darkgray flex justify-center items-center">
                            <User className=" stroke-light size-6"></User>
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="outline-none bg-darkgray text-light text-label w-44 mr-10 p-0 ">
                    <DropdownMenuGroup>
                        <DrawerTrigger asChild>
                            <DropdownMenuItem className="group">
                                <User className="size-4 stroke-light group-focus:ml-2 group-focus:size-[17px] transition-all ease-smooth duration-300"/>
                                Profile
                            </DropdownMenuItem>
                        </DrawerTrigger>
                        <DropdownMenuItem className="group">
                                <LogOut className="size-4 stroke-light group-focus:ml-2 group-focus:size-[17px] transition-all ease-smooth duration-300"/>
                                Logout
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DrawerContent className="outline-none w-[70%] bg-[#0F0F0F]/70 backdrop-blur-sm border-none place-self-center h-[90%]">
                <UserProfile />
            </DrawerContent>
            <DrawerOverlay className="bg-black/50" />
        </Drawer>
    );
}

export default Profile;
