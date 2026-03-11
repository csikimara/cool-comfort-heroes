import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: LucideIcon;
  extraContent?: ReactNode;
}

const ServiceDetailModal = ({
  isOpen,
  onClose,
  title,
  description,
  icon: Icon,
  extraContent,
}: ServiceDetailModalProps) => {
  const paragraphs = description.split("\n\n");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="pt-2 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          {extraContent}
        </div>
        <div className="flex justify-end mt-4">
          <Button asChild>
            <a href="#kapcsolat" onClick={onClose}>
              Ajánlatkérés
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;
