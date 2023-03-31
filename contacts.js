const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    try {
        const response = await fs.readFile(contactsPath);
        const data = JSON.parse(response);
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const response = await fs.readFile(contactsPath);
        const data = JSON.parse(response);

        const contact = data.find((el) => el.id === contactId);
        if (contact === undefined) {
            return "You don't have this contact";
        }

        return contact;
    } catch (error) {
        console.error(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const response = await fs.readFile(contactsPath);
        const data = JSON.parse(response);
        const updateContactsList = data.filter((el) => el.id !== contactId);

        await fs.writeFile(
            contactsPath,
            JSON.stringify(updateContactsList, null, "\t")
        );
    } catch (error) {
        console.error(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const response = await fs.readFile(contactsPath);
        const data = JSON.parse(response);

        const newContact = { id: shortid.generate(), name, email, phone };
        if (data.some((el) => el.name === name || el.phone === phone)) {
            console.log("You already have this contact.");
            return;
        } else {
            const updatedContactsList = JSON.stringify(
                [...data, newContact],
                null,
                "\t"
            );

            await fs.writeFile(contactsPath, updatedContactsList);

            return newContact;
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
