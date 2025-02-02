import { createSelector } from "reselect";

// base selectors
export const selectContacts = (state) => state.contacts.items;
export const selectFilter = (state) => state.filters.name;

// memorization selectors and filters of contacts
export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter?.toLowerCase() || "";
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number
          .replace(/[\s-]/g, "")
          .includes(normalizedFilter.replace(/[\s-]/g, ""))
    );
  }
);
