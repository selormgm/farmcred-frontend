import { useFarmerTransfers } from "@/hooks/useFarmerData";
import { TransferInput } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const TransferHistory = () => {
  const { data: transfers, loading, error } = useFarmerTransfers();

  if (loading) return <div className="p-4">Loading transfers...</div>;
  if (error)
    return (
      <div className="p-4 text-red-600">Failed to load transfer history</div>
    );

  return (
    <div className="space-y-6">
      {(transfers || []).slice(0, 5).map((transfer, index: number) => {
        const recipientName =
          (transfer as any).recipient_or_sender ||
          transfer.recipient_or_sender ||
          (transfer as any).sender ||
          "N/A";

        const initial = recipientName
          ? recipientName.charAt(0).toUpperCase()
          : null;

        return (
          <div key={index} className="flex items-center gap-4">
            {/* Avatar */}
            {initial && (
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarImage />
                <AvatarFallback className="text-white bg-[#72BF01] text-lg font-bold">
                  {initial}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Transfer Details */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-l text-[#157148] mb-0.5">
                {recipientName}
              </p>
              <p className="text-sm text-[#157148]">
                {new Date(transfer.date)
                  .toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                  .replace(",", "")}
              </p>
            </div>

            {/* Amount */}
            <div className="text-right flex-shrink-0">
              <p className="font-normal text-xl text-[#157148]">
                GH₵ {transfer.amount}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransferHistory;