const UserInfo = ({name, imageURL, info}) => {
    return (
        <div class="userInfo">
            <img src={imageURL} alt="" />
            <div class="info">
                <h2>{name}</h2>
            </div>
            <div>
                <h5>{info}</h5> 
            </div>
            <div class="vl"></div>
            
            
        </div>
    )
}

export default UserInfo;