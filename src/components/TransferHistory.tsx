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
    <div className="grid gap-1">
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
          <div
            key={index}
            className="shadow p-3 rounded border border-[#E1E3E0] flex items-center space-x-2"
          >
            {/* Avatar or Initial */}
            <div className="flex items-center space-x-2">
              {initial ? (
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback className=" text-[#ffffff] bg-[#72BF01] border-1 border-[#E1E3E0]">
                    {initial}
                  </AvatarFallback>
                </Avatar>
              ) : null}
            </div>

            {/* Transfer Details */}
            <div className="flex flex-col">
              <p className="font-medium text-base text-[#157148]">
                {recipientName}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(transfer.date).toLocaleString()}
              </p>
            </div>
            <div className="text-[#157148] font-medium">
              <p>GH₵ {transfer.amount}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransferHistory;
