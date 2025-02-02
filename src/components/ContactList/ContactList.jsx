import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import Contact from "../Contact/Contact";
import { Box, Typography } from "@mui/material";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <Box sx={{ mt: 2 }}>
      {contacts.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No contacts found.
        </Typography>
      ) : (
        contacts.map(({ id, name, number }) => (
          <Contact key={id} id={id} name={name} number={number} />
        ))
      )}
    </Box>
  );
};

export default ContactList;
