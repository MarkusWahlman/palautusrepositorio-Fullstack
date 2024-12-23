import { useState, useEffect } from "react";
import { PersonList } from "./components/PersonList";
import { AddPersonForm } from "./components/AddPersonForm";
import personService from "./services/persons";
import { Notification } from "./components/Notification";

const App = () => {
  const [searchString, setSearchString] = useState("");

  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [notificationObject, setNotificationObject] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  if (!persons) {
    return null;
  }

  const personsToShow = searchString
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchString.toLowerCase())
      )
    : persons;

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.delete(person.id);
      setPersons(persons.filter((curPerson) => curPerson.id !== person.id));
    }
  };

  const showTimedNotification = (message, color) => {
    setNotificationObject({
      message,
      color,
    });
    setTimeout(() => {
      setNotificationObject(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();

    //This should be on the server side
    const foundPerson = persons.find((person) => person.name === newName);
    //
    const personObject = {
      name: newName,
      number: newPhone,
    };
    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with the new one?`
        )
      ) {
        personService
          .update(foundPerson.id, personObject)
          .then((response) => {
            const responseData = response.data;
            setPersons(
              persons.map((person) =>
                person.id === responseData.id
                  ? {
                      ...person,
                      name: responseData.name,
                      number: responseData.number,
                    }
                  : person
              )
            );
            showTimedNotification(`Updated ${newName}`, "green");
          })
          .catch((error) => {
            if (error.status === 404) {
              showTimedNotification(
                `Information of ${newName} has already been removed from server`,
                "red"
              );
            }
          });
      }
      return;
    }

    personService.create(personObject).then((response) => {
      const responseData = response.data;
      setPersons([
        ...persons,
        {
          name: responseData.name,
          number: responseData.number,
          id: responseData.id,
        },
      ]);

      showTimedNotification(`Added ${newName}`, "green");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationObject={notificationObject} />
      <span>filter shown with </span>
      <input onChange={handleSearchChange} />

      <AddPersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      <PersonList persons={personsToShow} onDelete={handleDelete} />
    </div>
  );
};

export default App;
