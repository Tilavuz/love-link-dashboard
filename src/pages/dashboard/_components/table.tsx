import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changePage, searchUsersThunk } from "@/features/user-slice";
import Pagination from "./pagination";
import { userSearchQueryStorage } from "@/utils/user-search-query-storage";
import { serverUrl } from "@/helpers/shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserTable() {
  const [ageMin, setAgeMin] = useState<number>(1);
  const [ageMax, setAgeMax] = useState<number>(100);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [goal, setGoal] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<0 | 1 | 2 | undefined>(undefined);
  const [query, setQuery] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const { users, paginations, loading } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    const query: {
      ages?: string;
      page?: number;
      location?: string;
      goal?: string;
      gender?: 0 | 1 | 2;
    } = userSearchQueryStorage.getQuery();

    setAgeMin(() => {
      if (query?.ages?.split(",")[0]) {
        return Number(query?.ages?.split(",")[0]);
      } else {
        return 1;
      }
    });
    setAgeMax(() => {
      if (query?.ages?.split(",")[1]) {
        return Number(query?.ages?.split(",")[1]);
      } else {
        return 100;
      }
    });

    setLocation(query?.location);
    setGoal(query?.goal);
    setGender(query?.gender);

    const stringQuery = userSearchQueryStorage.stringQuery({
      ...query,
      page: query?.page ?? 1,
    });
    if (!users[stringQuery]) {
      dispatch(
        searchUsersThunk({
          ...query,
          page: query?.page ?? 1,
        })
      );
    }
    setQuery(stringQuery);
  }, [dispatch]);

  const handlePageChange = async (page: number) => {
    try {
      const query = {
        page,
        ages: `${ageMin},${ageMax}`,
        goal: goal === "all" ? undefined : goal,
        gender,
        location,
      };
      const stringQuery = userSearchQueryStorage.stringQuery(query);
      setQuery(stringQuery);
      if (!users[stringQuery]) {
        dispatch(searchUsersThunk(query));
      } else {
        dispatch(changePage({ page, query: stringQuery }));
        userSearchQueryStorage.setQuery({ query });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const query = {
        page: 1,
        ages: `${ageMin},${ageMax}`,
        goal: goal === "all" ? undefined : goal,
        gender,
        location,
      };
      const stringQuery = userSearchQueryStorage.stringQuery(query);
      setQuery(stringQuery);
      if (!users[stringQuery]) {
        dispatch(searchUsersThunk(query));
      } else {
        userSearchQueryStorage.setQuery({ query });
        dispatch(changePage({ page: 1, query: stringQuery }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4 border p-2 rounded mb-4"
      >
        <div className="flex-1 space-y-2 h-full flex flex-col justify-center">
          <Label
            htmlFor="age-range"
            className="block text-sm font-medium text-gray-700"
          >
            Age Range
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              id="age-min"
              value={ageMin}
              onChange={(e) => setAgeMin(Number(e.target.value))}
              min={1}
              max={100}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span>to</span>
            <Input
              type="number"
              id="age-max"
              value={ageMax}
              onChange={(e) => setAgeMax(Number(e.target.value))}
              min={1}
              max={100}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className="flex-1 space-y-2 h-full flex flex-col justify-center">
          <Label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </Label>
          <Input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div className="flex-1 space-y-2 h-full flex flex-col justify-center">
          <Label
            htmlFor="goal"
            className="block text-sm font-medium text-gray-700"
          >
            Goal
          </Label>
          <Select value={goal} onValueChange={(value) => setGoal(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="love">Love</SelectItem>
              <SelectItem value="friendship">Friendship</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
              <SelectItem value="dating">Dating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-2 h-full flex flex-col justify-center">
          <Label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </Label>
          <Select
            value={gender === 0 ? "male" : gender === 1 ? "female" : "all"}
            onValueChange={(value) => {
              if (value && value === "male") {
                setGender(0);
              }
              if (value && value === "female") {
                setGender(1);
              }
              if (value && value === "all") {
                setGender(2);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Goal</TableHead>
            <TableHead>ChatId</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <Skeleton className="h-4 w-[120px]" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-[30px] ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <>
              {users &&
                users[query]?.map((user, i) => {
                  return (
                    <TableRow
                      key={`${user?._id}${i}`}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border">
                            <img
                              className="h-full w-full object-cover"
                              src={`${serverUrl}/uploads/${user?.photo}`}
                              alt="user's profile image"
                            />
                          </div>
                          <p>{user?.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>{user?.goal}</TableCell>
                      <TableCell>{user?.chatId}</TableCell>
                      <TableCell>{user?.gender}</TableCell>
                      <TableCell>{user?.age}</TableCell>
                    </TableRow>
                  );
                })}
            </>
          )}
        </TableBody>
      </Table>
      <Pagination
        totalPages={paginations[query]?.totalPages ?? 1}
        currentPage={paginations[query]?.page ?? 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
