import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import photo from "@/assets/profile.jpg";

export default function UserTable() {
  return (
    <div>
      <Table>
        <TableCaption>Users table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>ChatId</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="cursor-pointer">
            <TableCell className="font-medium">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border">
                  <img
                    className="h-full w-full object-cover"
                    src={photo}
                    alt="user's profile image"
                  />
                </div>
                <p>Tilav</p>
              </div>
            </TableCell>
            <TableCell>1234567890</TableCell>
            <TableCell>Male</TableCell>
            <TableCell>21</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
