import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/authStore";
import {
  BadgeCheck,
  ChevronsUpDown,
  List,
  LogOut,
  PenLine,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const customersItems = [
  {
    title: "Customer Lists",
    url: "/dashboard/customer-lists",
    icon: Users,
  },
];

const servicesItems = [
  {
    title: "Form Lists",
    url: "/dashboard/generated-form-lists",
    icon: List,
  },
  {
    title: "Generate Form",
    url: "/dashboard/generate-form",
    icon: PenLine,
  },
];

const DashboardSidebar = () => {
  const pathname = useLocation().pathname.split("/")[2];
  const { open: sidebarOpen } = useSidebar();
  console.log(pathname);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Customers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {customersItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={{
                      children: item.title,
                      hidden: sidebarOpen ? true : false,
                    }}
                    isActive={item.url.includes(pathname)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Service Form</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {servicesItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={{
                      children: item.title,
                      hidden: sidebarOpen ? true : false,
                    }}
                    isActive={item.url.includes(pathname)}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default DashboardSidebar;

function NavUser() {
  const { isMobile } = useSidebar();
  const auth = useAuthStore((state) => state.auth);
  const formattedUserName =
    (auth?.user_name?.split(" ").length as number) > 2
      ? auth?.user_name?.split(" ").slice(0, 2).join("")?.toUpperCase()
      : auth?.user_name?.split("")[0].toUpperCase();

      console.log(auth?.user_name?.split(" ").length);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={"/avatars/shadcn.jpg"}
                  alt={auth?.user_name}
                />
                <AvatarFallback className="rounded-lg">
                  {formattedUserName}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {auth?.user_name}
                </span>
                <span className="truncate text-xs">{auth?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={"/avatars/shadcn.jpg"}
                    alt={auth?.user_name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {formattedUserName}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {auth?.user_name}
                  </span>
                  <span className="truncate text-xs">{auth?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="size-4 mr-3" />
                <p className="text-[13.5px]">Change Password</p>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="size-4 mr-3" />
                <p className="text-[13.5px]">Log out</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
