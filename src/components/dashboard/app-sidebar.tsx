import { Bell, Calendar, CircleUserRoundIcon, Globe, Home, Inbox, Search, Settings, Settings2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
  },
  {
    title: "Profile",
    url: "/dashboard/settings/myaccount",
    icon: CircleUserRoundIcon,
  },
  {
    title: "Notification",
    url: "/dashboard/settings/notifications",
    icon: Bell,
  },
  {
    title: "Region",
    url: "/dashboard/settings/region",
    icon: Globe,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="mt-32 text-[#158f20]">
      <SidebarContent className="bg-card">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#158f20]">Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}