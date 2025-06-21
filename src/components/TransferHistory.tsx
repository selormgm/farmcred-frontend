import { TransferInput } from "@/lib/types";


const TransferHistory = ({transfer}: {transfer: TransferInput[] | undefined}) => {
  return (
  <div className="flex flex-col items-center justify-center">
    {[...transfer || []?.slice(0,5)
    ]}
    )

    }
  </div>)
  ;
};

export default TransferHistory;