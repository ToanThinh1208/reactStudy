import React, { useEffect, useState } from "react";
import { ErrorState, StatusState } from "../UI/StatusState";

function EffectDemoPage() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `EffectDemoPage - ${count}`;
  }, [count]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timer = setTimeout(() => {
      fetch(`https://jsonplaceholder.typicode.com/users/${count}`)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) {
            setUser(data);
            setLoading(false);
          }
        });
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="mb-4">Số lần bấm: {count}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCount(count + 1)}
      >
        Bấm vào đây
      </button>

      {loading ? (
        <StatusState />
      ) : user ? (
        <div>
          <p>User Info</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <ErrorState />
      )}
    </div>
  );
}

export default EffectDemoPage;
