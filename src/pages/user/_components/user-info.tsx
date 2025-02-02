import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { serverUrl } from "@/helpers/shared";
import { IPayment } from "@/interfaces/payment-interface";
import { ISubscription } from "@/interfaces/subscription-interface";
import { IUser } from "@/interfaces/user-interface";
import { userService } from "@/services/user.service";
import { CreditCard, Loader, MapPin, Star, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserInfo() {
  const [userData, setUserData] = useState<{
    user: IUser | null;
    payments: IPayment[] | null;
    subscription: ISubscription | null;
  }>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const data = await userService.getUser(id);
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center">
        <div className="inline-block animate-spin">
          <Loader />
        </div>
      </div>
    );
  }

  const { user, payments, subscription } = userData;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage
              src={`${serverUrl}/uploads/${user?.photo}`}
              alt={user?.name}
            />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription>{user?.bio}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 opacity-70" />
            <span className="text-sm">
              {user?.age} years old, {user?.gender}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 opacity-70" />
            <span className="text-sm">{user?.location}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{user?.goal}</Badge>
            <Badge variant="secondary">{user?.language_code}</Badge>
          </div>
        </CardContent>
      </Card>

      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Expires on: {new Date(subscription?.endDate).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      )}

      {payments && (
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[150px]">
              {payments?.map((payment) => {
                return (
                  <div key={payment?._id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 opacity-70" />
                      <span className="text-sm">Payment</span>
                    </div>
                    <span className="text-sm font-medium flex items-center gap-1">
                      {payment?.amount?.toFixed(1)}
                      <Star size={14} />
                    </span>
                  </div>
                );
              })}
            </ScrollArea>
            <div className="mt-4 pt-4 border-t flex justify-between items-center">
              <span className="font-semibold">Total Spent:</span>
              <span className="font-semibold flex items-center gap-1">
                {payments
                  .reduce((sum, payment) => sum + payment.amount, 0)
                  .toFixed(1)}
                <Star size={16} />
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
