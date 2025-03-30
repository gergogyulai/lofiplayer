import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/stations/")({
  loader: () => {
    throw redirect({
      to: "/stations/$stationId",
      params: {
        stationId: "default",
      },
    });
  },
});
