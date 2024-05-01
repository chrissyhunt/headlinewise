import { login, signup } from "@/app/(auth)/login/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <form>
        <Card className="w-[400px] shadow-none bg-transparent border-none">
          <CardHeader>
            <CardTitle className="font-semibold text-center">Log in</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="bg-fuchsia-50 border-fuchsia-50 focus-visible:ring-violet-700"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="bg-fuchsia-50 border-fuchsia-50 focus-visible:ring-violet-700"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-center">
              <Button variant="default" size="lg" formAction={login}>
                Log in
              </Button>
              {/* <Button variant="ghost" formAction={signup}>
                Sign up
              </Button> */}
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
