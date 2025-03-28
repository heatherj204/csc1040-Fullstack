function SmallText(props){


    let userText = props.userText;
    return (
        <div>
            <small>Hi  {userText} from nested component</small>
        </div>
    )
}

export default SmallText;