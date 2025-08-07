"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, LayoutGrid, List, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Dummy investor reviews
const dummyInvestorReviews = [
  {
    id: 1,
    investorName: "Daniel Owusu",
    rating: 5,
    tags: ["Supportive", "Prompt Funding"],
    comment: "Daniel was very responsive and funded quickly.",
  },
  {
    id: 2,
    investorName: "Akosua Ntim",
    rating: 4,
    tags: ["Provided Guidance"],
    comment: "Offered helpful feedback throughout the season.",
  },
  {
    id: 3,
    investorName: "Kofi Manu",
    rating: 3,
    tags: ["Delayed Responses"],
    comment: "There were delays in communication, but we managed.",
  },
  {
    id: 4,
    investorName: "Ama Kwarteng",
    rating: 5,
    tags: ["Reliable", "Trustworthy"],
    comment: "Ama has been a consistent and trustworthy investor.",
  },
  {
    id: 5,
    investorName: "Nana Adjei",
    rating: 2,
    tags: ["Lacked Feedback"],
    comment: "I wish there was more guidance provided.",
  },
  {
    id: 6,
    investorName: "Esi Koranteng",
    rating: 4,
    tags: ["Environmentally Conscious"],
    comment: "Happy to work with someone who cares about sustainability.",
  },
  {
    id: 7,
    investorName: "Yaw Frimpong",
    rating: 5,
    tags: ["Great Communication", "Goal-Oriented"],
    comment: "Great partner to work with, very clear expectations.",
  },
  {
    id: 8,
    investorName: "Selina Boateng",
    rating: 3,
    tags: ["Occasional Check-ins"],
    comment: "Helpful, but not very consistent with follow-ups.",
  },
];

export default function ReviewInvestorsPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const REVIEWS_PER_PAGE = 9;

  // Filter reviews by investor name
  const filteredReviews = dummyInvestorReviews.filter((review) =>
    review.investorName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE);

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  return (
    <div className="px-6 lg:px-24 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-end mb-6 gap-4">
       
        {/* Search & View Toggle */}
        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search by investor name..."
              className="pl-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
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
                  {review.investorName}
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
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No reviews found for "{search}".
          </p>
        )}
      </div>

      {/* Pagination */}
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
