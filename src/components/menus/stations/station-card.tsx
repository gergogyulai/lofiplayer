import { StationType } from "@/lib/stations";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const StationCard = ({ station }: { station: StationType }) => {
  return (
    <Link to="/stations/$stationId" params={{ stationId: station.id }}>
      <div className="w-full rounded-3xl p-2 shadow-inner shadow-white/10 backdrop-blur-2xl">
        <div className="flex flex-row gap-1">
          <img
            src={station.cover}
            alt={station.name}
            className="rounded-2xl"
            width={100}
            height={100}
          />
          <div className="flex w-full flex-col justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-white">
                {station.name}
              </h2>
              <p className="text-sm text-white/75">{station.description}</p>
            </div>
            <div className="flex items-center gap-1 pr-0.5">
              {!station.custom && (
                <div className="flex size-fit flex-row items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5">
                  {station.status === "online" ? (
                    <div className="size-0.5 rounded-full bg-green-500/70 p-1.5" />
                  ) : (
                    <div className="size-0.5 rounded-full bg-red-500/70 p-1.5" />
                  )}
                  <span>{station.status === "online" ? "Alive" : "Dead"}</span>
                </div>
              )}
              {station.custom && (
                <Button size={"icon-sm"}>
                  <Pencil />
                </Button>
              )}
              {station.builtIn && <OfficialBadge />}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const OfficialBadge = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <BadgeCheck className="text-white/50 size-5 " />
        </TooltipTrigger>
        <TooltipContent>Official Station</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StationCard;
