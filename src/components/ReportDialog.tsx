import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HiOutlineFlag } from "react-icons/hi";
import { reportsApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingId: string;
  listingTitle: string;
}

const REPORT_REASONS = [
  { value: "fake_listing", label: "Fake Listing" },
  { value: "wrong_info", label: "Wrong Information" },
  { value: "unavailable", label: "Property Unavailable" },
  { value: "spam", label: "Spam" },
  { value: "inappropriate", label: "Inappropriate Content" },
  { value: "other", label: "Other" },
];

export function ReportDialog({ open, onOpenChange, listingId, listingTitle }: ReportDialogProps) {
  const { toast } = useToast();
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) {
      toast({
        title: "Select a reason",
        description: "Please select a reason for reporting this listing.",
        variant: "destructive",
      });
      return;
    }

    if (reason === "other" && !otherReason.trim()) {
      toast({
        title: "Specify reason",
        description: "Please specify the reason for reporting.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await reportsApi.create({
        listingId,
        reason,
        otherReason: reason === "other" ? otherReason : undefined,
        description: description || undefined,
      });

      toast({
        title: "Report submitted",
        description: "Thank you for helping keep Peza Nyumba safe. Our team will review this listing.",
      });

      // Reset form
      setReason("");
      setOtherReason("");
      setDescription("");
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error submitting report",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HiOutlineFlag className="text-destructive" />
            Report Listing
          </DialogTitle>
          <DialogDescription>
            Report "{listingTitle}" for review. This helps keep our community safe.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason *</label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_REASONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {reason === "other" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Specify Reason *</label>
              <input
                type="text"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Please specify the reason"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Details</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide more details about your report (optional)"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
