import React from "react";

export const LoadingState = () => {
  return <div>Loading...</div>;
};

export const ErrorState = ({
  message = "Đã có lỗi xảy ra",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) => {
  return (
    <div>
      <p>System Error</p>
      <p>{message}</p>

      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={onRetry}
      >
        Retry Connection
      </button>
    </div>
  );
};

export const EmptyState = ({
  message = "No data available",
}: {
  message?: string;
}) => {
  return (
    <div>
      <p>Empty Data</p>
      <p>{message}</p>
    </div>
  );
};
