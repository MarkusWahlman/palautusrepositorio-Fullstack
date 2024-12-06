const Notification = ({notificationObject}) => {
    if (notificationObject === null) {
        return null
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }

    return(
        <div style={{ ...errorStyle, color: notificationObject.color }}>
            {notificationObject.message}
        </div>
    )
}

export { Notification }

