
const chatDataReducer = (chatData = null, actions) => {
    if(actions.type === 'FETCH_CHAT_DATA')
    {
        return actions.payload
    }
    return chatData;
}
export default chatDataReducer;