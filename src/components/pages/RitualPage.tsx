import React, { useEffect } from "react";
import { authApi, type User } from "../../lib/api/auth.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/UI/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { Badge } from "@/components/UI/badge";
import { Separator } from "@/components/UI/separator";
import { Mail, ShieldCheck, Fingerprint, Loader2 } from "lucide-react";
import { Button } from "@/components/UI/button";
import { useUser } from "@/hooks/useUser";
import { EmptyState, ErrorState, LoadingState } from "../UI/StatusState";
import { useRituals } from "@/hooks/rituals";

const RitualPage = () => {
  const {
    data: rituals,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useRituals();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <ErrorState
          message={error?.message || "Failed to load rituals"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!rituals || rituals.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <EmptyState message="No rituals data available" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Rituals Data</CardTitle>
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              variant="outline"
              className="relative"
            >
              {isFetching && (
                <Loader2 className="animate-spin absolute left-2 top-1/2 -translate-y-1/2" />
              )}
              Refetch
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Debug: Log the raw data */}
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Raw API Response:</h3>
              <pre className="text-xs overflow-auto bg-white p-2 rounded border">
                {JSON.stringify(rituals, null, 2)}
              </pre>
            </div>

            <Separator />

            {/* Display formatted data if it's an array */}
            {Array.isArray(rituals) && (
              <div>
                <h3 className="font-semibold mb-2">
                  Formatted Data ({rituals.length} items):
                </h3>
                <div className="grid gap-4">
                  {rituals.map((ritual, index) => (
                    <Card key={index} className="p-4">
                      <h4 className="font-medium mb-2">Ritual #{index + 1}</h4>
                      <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto">
                        {JSON.stringify(ritual, null, 2)}
                      </pre>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Display single object if not array */}
            {!Array.isArray(rituals) && (
              <div>
                <h3 className="font-semibold mb-2">Ritual Object:</h3>
                <Card className="p-4">
                  <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto">
                    {JSON.stringify(rituals, null, 2)}
                  </pre>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RitualPage;
