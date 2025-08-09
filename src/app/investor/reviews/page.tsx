"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, LayoutGrid, List, Star } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ReviewDialogContent } from "@/components/investor/ReviewDialog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useInvestorReview } from "@/hooks/useInvestorData";
import { InvestorReview } from "@/lib/types/investortypes";

export default function ReviewFarmersPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const REVIEWS_PER_PAGE = 9;
  const mockReviewData = {
    rating: 4, // Default to a positive rating
    tags: ["Timely Updates", "Good Communication"],
    comment: "This review is a placeholder as no comments are available from the API.",
};

  const [open, setOpen] = useState(false);
  const { data: review, loading, error } = useInvestorReview();
  if (loading) {
    return <p className="text-center p-8 text-gray-500">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center p-8 text-red-600">Error: {error}</p>;
  }

  const reviews = review ? [{ ...review, ...mockReviewData }] : [];
  const filteredReviews = reviews.filter((review) =>
    review.farmer_full_name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  return (
    <div className="px-6 lg:px-24 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-[#158f20]">
          Your Farmer Reviews
        </h1>

        {/* Search & View Toggle */}
        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search by farmer name..."
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset page when searching
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
          <Button
            variant={view === "grid" ? "default" : "outline"}
            onClick={() => setView("grid")}
            size="icon"
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            onClick={() => setView("list")}
            size="icon"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Review Cards */}
      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }`}
      >
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review) => (
            <Card key={review.id} className="dark:bg-card">
              <CardHeader>
                <h2 className="text-lg font-semibold text-foreground">
                  {review.farmer_full_name}
                </h2>
              </CardHeader>

              <CardContent>
                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Comment */}
                {review.comment && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                )}

                {/* Update Button */}
                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        Update Review
                      </Button>
                    </DialogTrigger>
                    <ReviewDialogContent />
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No reviews found for "{search}".
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-4 items-center">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
