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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details and password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="johndoe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="destructive">Delete Account</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="messages" className="text-base">
                      Messages
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when you get new messages.
                    </p>
                  </div>
                  <Switch id="messages" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="teammate-requests" className="text-base">
                      Teammate Requests
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when someone wants to team up with
                      you.
                    </p>
                  </div>
                  <Switch id="teammate-requests" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="hackathon-reminders" className="text-base">
                      Hackathon Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming hackathons you're
                      interested in.
                    </p>
                  </div>
                  <Switch id="hackathon-reminders" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-hackathons" className="text-base">
                      New Hackathons
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about new hackathons that match your
                      interests.
                    </p>
                  </div>
                  <Switch id="new-hackathons" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing" className="text-base">
                      Marketing Emails
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new features, tips, and platform
                      updates.
                    </p>
                  </div>
                  <Switch id="marketing" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your profile visibility and data sharing preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="profile-visibility" className="text-base">
                      Public Profile
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Make your profile visible to other users on the platform.
                    </p>
                  </div>
                  <Switch id="profile-visibility" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-email" className="text-base">
                      Show Email
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow other users to see your email address on your
                      profile.
                    </p>
                  </div>
                  <Switch id="show-email" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-location" className="text-base">
                      Show Location
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Display your location information on your public profile.
                    </p>
                  </div>
                  <Switch id="show-location" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-analytics" className="text-base">
                      Data Analytics
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to collect anonymous usage data to improve the
                      platform.
                    </p>
                  </div>
                  <Switch id="data-analytics" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
