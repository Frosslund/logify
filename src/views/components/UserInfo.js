const UserInfo = ({name, imageURL, info}) => {
    return (
        <div class="userInfo">
            <img src={imageURL} alt="" />
            <div class="userName">
                <h2>{name}</h2>
            </div>
            <div class="vl"></div>
            <div div="relatedInfo">
                <span>{info}</span> 
            </div>
        </div>
    )
}

export default UserInfo;