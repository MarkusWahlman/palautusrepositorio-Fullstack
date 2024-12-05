const AddPersonForm = ({ onSubmit, onNameChange, onPhoneChange }) => {
    return(
        <form onSubmit={onSubmit}>
            <div>
            name: <input onChange={onNameChange}/>
            </div>
            <div>
            number: <input onChange={onPhoneChange}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
      </form>
    )
}

export { AddPersonForm }