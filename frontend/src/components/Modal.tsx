import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const Modal = ({
  title = "Title",
  isOpen,
  toggle,
  onCancel,
  cancelText,
  onSubmit,
  submitText,
  onDelete,
  deleteText,
  children,
}) => {
  return (
    <Dialog open={isOpen} onClose={toggle}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {onCancel && <Button onClick={onCancel}>{cancelText || "Hủy"}</Button>}
        {onDelete && <Button onClick={onDelete}>{deleteText || "Xóa"}</Button>}
        {onSubmit && (
          <Button onClick={onSubmit}>{submitText || "Xác nhận"}</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
