const PersonList = ({persons, onDelete}) => {
    return(
        <ul>
            {persons.map((person)=>{
                return (
                <li key={person.name}>
                {person.name} {person.number} <button onClick={()=>{onDelete(person)}}>delete</button>
                </li>
                )
            })}
        </ul>
    )
}

export { PersonList }