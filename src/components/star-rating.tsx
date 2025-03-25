import { Star as StarFull } from "lucide-react";

// Helper function to display star ratings from 1 to 5
export default function StarRating({
  rating,
  iconSize = "h-5 w-5",
}: {
  rating: number;
  iconSize?: string;
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);
  return (
    <div className="flex items-center gap-0.5">
      {stars.map((isFilled, idx) => (
        <StarFull
          key={idx}
          className={
            isFilled
              ? `fill-primary text-primary ${iconSize}`
              : `fill-muted stroke-muted-foreground text-muted-foreground ${iconSize}`
          }
        />
      ))}
    </div>
  );
}
