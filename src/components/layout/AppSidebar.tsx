import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  ClipboardList,
  BarChart3,
  Users,
  MapPin,
  FileText,
  Settings,
  Building2,
  Calendar,
  DollarSign,
  PlayCircle,
  Activity
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  {
    icon: Home,
    label: "الرئيسية",
    href: "/dashboard"
  },
  {
    icon: ClipboardList,
    label: "طلبات الصيانة",
    href: "/requests",
    badge: "2"
  },
  {
    icon: Users,
    label: "الموردين والفنيين",
    href: "/vendors"
  },
  {
    icon: BarChart3,
    label: "التقارير والإحصائيات",
    href: "/reports"
  },
  {
    icon: Building2,
    label: "العقارات",
    href: "/properties"
  },
  {
    icon: Calendar,
    label: "المواعيد",
    href: "/appointments"
  },
  {
    icon: DollarSign,
    label: "الفواتير",
    href: "/invoices"
  },
  {
    icon: MapPin,
    label: "الخريطة",
    href: "/map"
  },
  {
    icon: FileText,
    label: "التوثيق",
    href: "/documentation"
  },
  {
    icon: Settings,
    label: "الإعدادات",
    href: "/settings"
  },
  {
    icon: PlayCircle,
    label: "اختبار النظام",
    href: "/testing"
  },
  {
    icon: BarChart3,
    label: "تقرير الإنتاج",
    href: "/production-report"
  },
  {
    icon: Activity,
    label: "مراقب الإنتاج",
    href: "/production-monitor"
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.href));

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>القائمة الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)}>
                    <NavLink to={item.href} end>
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && (
                        <>
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-semibold mr-auto">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2 border-t border-border">
          {state !== "collapsed" && (
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p className="font-medium">نسخة 1.0.0</p>
              <p>© 2024 azab.services</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}