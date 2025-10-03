import { Suspense } from 'react';
import { getStationById } from "@/lib/stations";
import Player from '@/components/player';
import Background from '@/components/background';
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/stations/$stationId')({
  component: RouteComponent,
  beforeLoad: ({ params }) => {
    const station = getStationById(params.stationId);
    if (!station) {
      throw redirect({
        to: '/stations/$stationId',
        params: { stationId: 'default' },
      });
    }
  },
})

function RouteComponent() {
  const { stationId } = Route.useParams()
  const station = getStationById(stationId)

  if (!station) {
    return null
  }

  if (station.animated && station.animatedBg) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Background animatedBgPath={station.animatedBg} bgPath={station.bg}>
          <Player station={station} />
        </Background>
      </Suspense>
    );
  } else {
    return (
      <Background bgPath={station.bg}>
        <Player station={station} />
      </Background>
    );
  }
}
