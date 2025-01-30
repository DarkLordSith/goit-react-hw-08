import PropTypes from "prop-types";
import { HiUser } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import { useDispatch } from "react-redux"; // Додано
import { deleteContact } from "../../redux/contactsOps"; // Імпорт операції
import styles from "./Contact.module.css";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id)); // Виклик Redux-операції видалення контакту
  };

  return (
    <li className={styles.contactItem}>
      <div className={styles.contactContainer}>
        <p className={styles.contactInfo}>
          <HiUser className={styles.contactIcon} size="18" />
          {name}
        </p>
        <p className={styles.contactInfo}>
          <HiPhone className={styles.contactIcon} size="18" />
          {number}
        </p>
      </div>
      <button onClick={handleDelete} className={styles.deleteButton}>
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default Contact;
