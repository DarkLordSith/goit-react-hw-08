import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import { useState } from "react";
import toast from "react-hot-toast";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleNumberChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // Only numbers
    if (input.length > 3 && input.length <= 5) {
      input = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else if (input.length > 5) {
      input = `${input.slice(0, 3)}-${input.slice(3, 5)}-${input.slice(5, 7)}`;
    }
    setNumber(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Duplicate checker
    if (contacts.some((contact) => contact.name === name)) {
      toast.error(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number }))
      .unwrap()
      .then(() => toast.success("Contact added successfully!"))
      .catch(() => toast.error("Failed to add contact"));
    setName("");
    setNumber("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Contact
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          value={number}
          onChange={handleNumberChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" size="large">
          Add Contact
        </Button>
      </Box>
    </Paper>
  );
};

export default ContactForm;
