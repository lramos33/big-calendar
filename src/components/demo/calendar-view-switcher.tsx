
import { CalendarRange, Columns, Grid2x2, Grid3x3, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

import { useSearchParamsSetter } from "@/hooks/use-search-params-setter";

export function CalendarViewSwitcher({
  view
}: {
  view: "day" | "week" | "month" | "year" | "agenda";
}) {
  const setSearchParams = useSearchParamsSetter();
  return (
    <ButtonGroup>
      <Button
        aria-label="View by day"
        size="icon"
        variant={view === "day" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "day" });
        }}
      >
        <List className="size-4" />
      </Button>

      <Button
        aria-label="View by week"
        size="icon"
        variant={view === "week" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "week" });
        }}
      >
        <Columns className="size-4" />
      </Button>

      <Button
        aria-label="View by month"
        size="icon"
        variant={view === "month" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "month" });
        }}
      >
        <Grid2x2 className="size-4" />
      </Button>

      <Button
        aria-label="View by year"
        size="icon"
        variant={view === "year" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "year" });
        }}
      >
        <Grid3x3 className="size-4" />
      </Button>

      <Button
        aria-label="View by agenda"
        size="icon"
        variant={view === "agenda" ? "default" : "outline"}
        onClick={() => {
          setSearchParams({ view: "agenda" });
        }}
      >
        <CalendarRange className="size-4" />
      </Button>
    </ButtonGroup>
  )
}

