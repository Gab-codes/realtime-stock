// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// export default function CancelDialog({
//   open,
//   onClose,
//   onConfirm,
//   target,
//   isLoading,
//   format,
// }: {
//   open: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   target: Investment | null;
//   isLoading: boolean;
//   format: (v: number) => string;
// }) {
//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Cancel Investment</DialogTitle>
//         </DialogHeader>

//         <div className="py-2">
//           <p className="text-sm text-gray-300">
//             Cancelling this investment will{" "}
//             <strong>forfeit all accrued profit</strong> and return your original
//             principal. This action cannot be undone.
//           </p>

//           <div className="mt-4 space-y-2">
//             <p className="text-sm">
//               <strong>Plan:</strong> {target?.planLabel}
//             </p>
//             <p className="text-sm">
//               <strong>Principal:</strong>{" "}
//               {target ? format(target.principal) : "—"}
//             </p>
//             <p className="text-sm">
//               <strong>Profit forfeited:</strong>{" "}
//               {target ? format(target.profitAccrued) : "—"}
//             </p>
//           </div>
//         </div>

//         <DialogFooter className="mt-4 flex justify-end gap-3">
//           <Button variant="outline" onClick={onClose}>
//             Close
//           </Button>
//           <Button
//             className="bg-rose-600 hover:bg-rose-700 text-white"
//             onClick={onConfirm}
//             disabled={isLoading}
//           >
//             {isLoading ? "Cancelling..." : "Confirm Cancel"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
