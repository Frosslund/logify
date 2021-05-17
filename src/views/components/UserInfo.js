const UserInfo = ({name, imageURL, view, info}) => {
        
    return (
        <div className="userInfo">
            <img src={imageURL} alt="" />
            <div className="userName">
                <h4>{name}</h4>
                <h3>{view}</h3>
            </div>
            <div className="vl"></div>
            <div className="info">
                {info.map(i => 
                <div className="sepInfo">
                    <p>{i.split(':')[0]}</p>
                    <p className="number">{i.split(':')[1]}</p>
                </div>
                
                )}
            </div>
        </div>
    )
}

export default UserInfo;