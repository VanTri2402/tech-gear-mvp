// src/components/UserProfile.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

// Kiểu dữ liệu cho props user
interface UserProfileProps {
  user: {
    id: string;
    email?: string | null;
    given_name?: string | null;
    family_name?: string | null;
    picture?: string | null;
    role?: string | null;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  const userInitial = user.given_name?.[0]?.toUpperCase() || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-15 w-50 cursor-pointer rounded-md flex items-center justify-center overflow-hidden">
         
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.picture ?? ""} alt={user.given_name ?? ""} />
            <AvatarFallback>{userInitial}</AvatarFallback>
          </Avatar>
             <div className="text-md text-gray-500">{user.given_name} {user.family_name}</div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 p-0" align="end" forceMount>
        <Card className="border-none shadow-none">
          <CardHeader className="flex flex-col items-center text-center p-4">
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage src={user.picture ?? ""} alt={user.given_name ?? ""} />
              <AvatarFallback className="text-xl">{userInitial}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-base font-semibold">
              {user.given_name} {user.family_name}
            </CardTitle>
            <CardDescription className="text-xs">{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="px-4 py-2">
            <div className="flex justify-center items-center space-x-2">
              <span className="text-xs font-medium text-muted-foreground">Role:</span>
              <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                {user.role || 'USER'}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="p-2 mt-2 border-t">
            <DropdownMenuItem asChild className="w-full cursor-pointer p-0">
              <LogoutLink className="w-full text-center p-2 text-sm text-red-500 hover:text-red-600">
                Log out
              </LogoutLink>
            </DropdownMenuItem>
          </CardFooter>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}