import { useState } from "react";
import PropTypes from "prop-types";
import { HiUser, HiPhone } from "react-icons/hi";
import { useDispatch } from "react-redux"; // Додано
import { deleteContact } from "../../redux/contacts/operations"; // Імпорт операції
import { updateContact } from "../../redux/contacts/operations";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import styles from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteContact(id)) // Удаление контакта
      .unwrap()
      .then(() => toast.success("Contact deleted successfully!"))
      .catch(() => toast.error("Failed to delete contact"));
    handleClose(); // Закрытие модального окна после удаления
  };

  //Edit contact
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editNumber, setEditNumber] = useState(number);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleSaveEdit = () => {
    if (!editName.trim() || !editNumber.trim()) {
      toast.error("Name and number cannot be empty!");
      return;
    }
    if (editName === name && editNumber === number) {
      toast("No changes detected!");
      handleEditClose();
      return;
    }

    dispatch(
      updateContact({ id, updatedData: { name: editName, number: editNumber } })
    )
      .unwrap()
      .then((response) => {
        toast.success("Contact updated successfully!");
      })
      .catch((error) => {
        toast.error("Failed to update contact");
      });

    handleEditClose();
  };

  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6">
          <HiUser /> {name}
        </Typography>
        <Typography variant="body2">
          <HiPhone /> {number}
        </Typography>
      </CardContent>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setEditOpen(true)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpen(true)}
          sx={{ ml: 1 }}
        >
          Delete
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for editing */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogContent>
          <DialogTitle>Edit Contact</DialogTitle>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              fullWidth
              autoFocus
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Number"
              fullWidth
              value={editNumber}
              onChange={(e) => {
                const formattedNumber = e.target.value
                  .replace(/\D/g, "") // Удаление всех нецифровых символов
                  .replace(/(\d{3})(\d{2})(\d{2})/, "$1-$2-$3") // Применение формата XXX-XX-XX
                  .slice(0, 9); // Ограничение длины
                setEditNumber(formattedNumber);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;
