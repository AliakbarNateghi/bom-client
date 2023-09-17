import { Modal, Box } from "@mui/material";
import questionMark from "@/public/logos/question.jpeg";

export default function BaseModal({
  open,
  onClose,
  ariaLabelledBy,
  ariaDescribedBy,
  children,
  width = 400,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    width: { width },
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
