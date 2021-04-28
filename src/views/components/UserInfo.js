const UserInfo = ({name, imageURL, info}) => {
    return (
        <div class="userInfo">
            <img src={imageURL} alt="" />
            <div class="info">
                <h2>{name}</h2>
                <h5>{info}</h5>
            </div>
        </div>
    )
}

export default UserInfo;