import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import { Loader2, Calendar, Clock, BookOpen, Flame } from "lucide-react";
import { EmptyState, ErrorState, LoadingState } from "../UI/StatusState";
import { useRituals } from "@/hooks/rituals";
import type { Ritual } from "@/lib/api/rituals.api";

const RitualPage = () => {
  const {
    data: rituals,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useRituals();

  // Extract rituals list from the response structure
  // console.log("RitualPage response:", response);

  // Robustly find the array
  // let ritualsData: Ritual[] = [];
  // if (response) {
  //   if (Array.isArray(response)) {
  //     ritualsData = response;
  //   } else if (Array.isArray(response.data)) {
  //     // If response.data is the array directly
  //     ritualsData = response.data;
  //   } else if (response.data && Array.isArray(response.data.data)) {
  //     // If response.data is an object containing the array (common in key-value responses)
  //     ritualsData = response.data.data;
  //   }
  // }
  // const rituals = response?.data;
  // const rituals = ritualsData;

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <ErrorState
          message={error?.message || "Failed to load rituals"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!rituals) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <EmptyState message="No rituals found" />
        <Button onClick={() => refetch()} variant="outline">
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rituals</h1>
          <p className="text-muted-foreground mt-1">
            Explore traditional rituals and ceremonies
          </p>
        </div>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          variant="outline"
          size="sm"
          className="w-fit"
        >
          {isFetching ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {isFetching ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rituals.map((ritual: Ritual, index: number) => (
          // do đây là lỗi ts do ts ko chắc chắn có ritual có là mảng hay không -> conflic
          <Card
            key={ritual.id}
            className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200"
          >
            {ritual.ritualMedias && ritual.ritualMedias.length > 0 && (
              <div className="relative w-full pt-[56.25%] overflow-hidden rounded-t-lg bg-gray-100">
                <img
                  src={ritual.ritualMedias[0].url}
                  alt={ritual.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 w-full">
                  <div className="flex justify-between items-center w-full">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <div className="flex gap-2">
                      {ritual.isHot && (
                        <Badge
                          variant="destructive"
                          className="flex items-center gap-1"
                        >
                          <Flame className="w-3 h-3" /> Hot
                        </Badge>
                      )}
                      <Badge variant="secondary" className="capitalize">
                        {ritual.difficultyLevel}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 text-xl mt-2">
                    {ritual.name}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 pb-3 space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-1">Description</h4>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {ritual.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-1">Content</h4>
                <p className="text-muted-foreground text-sm line-clamp-4 text-justify">
                  {ritual.content}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                <div>
                  <span className="font-semibold">Category ID:</span>{" "}
                  <span className="font-mono">{ritual.ritualCategoryId}</span>
                </div>
                <div>
                  <span className="font-semibold">Reference:</span>{" "}
                  {ritual.reference || "N/A"}
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button className="w-full mt-2" variant="default">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RitualPage;
