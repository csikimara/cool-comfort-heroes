import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon: LucideIcon;
}

const ServiceDetailModal = ({
  isOpen,
  onClose,
  title,
  description,
  icon: Icon,
}: ServiceDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-base leading-relaxed pt-4">
            {description}
          </DialogDescription>
        </DialogHeader>
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
