import React from "react";

export const StatusState = () => {
  return <div>Please wait a moment...</div>;
};

export const ErrorState = ({
  message = "Đã có lỗi xảy ra",
}: {
  message?: string;
}) => {
  return (
    <div>
      <p>System Error</p>
      <p>{message}</p>

      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  );
};
