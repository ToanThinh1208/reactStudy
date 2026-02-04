import { useAuthStore } from "@/stores/Auth.store";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../UI/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../UI/navigation-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken, clearTokens } = useAuthStore();
  const isLoggedIn = !!accessToken;

  const handleLogout = () => {
    clearTokens();
    navigate("/", { replace: true });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          ShopApp
        </button>

        <NavigationMenu viewport={false}>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => navigate("/")}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md cursor-pointer",
                  isActive("/")
                    ? "text-primary font-semibold bg-accent"
                    : "text-muted-foreground",
                )}
              >
                Trang chủ
              </NavigationMenuLink>
            </NavigationMenuItem>

            {isLoggedIn ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => navigate("/profile")}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md cursor-pointer",
                      isActive("/profile")
                        ? "text-primary font-semibold bg-accent"
                        : "text-muted-foreground",
                    )}
                  >
                    Hồ sơ
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => navigate("/rituals")}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md cursor-pointer",
                      isActive("/rituals")
                        ? "text-primary font-semibold bg-accent"
                        : "text-muted-foreground",
                    )}
                  >
                    Nghi thức
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Đăng xuất
                  </Button>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    onClick={() => navigate("/login")}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md cursor-pointer",
                      isActive("/login")
                        ? "text-primary font-semibold bg-accent"
                        : "text-muted-foreground",
                    )}
                  >
                    Đăng nhập
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate("/register")}
                  >
                    Đăng ký
                  </Button>
                </NavigationMenuItem>
              </>
            )}
            <ModeToggle />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;
