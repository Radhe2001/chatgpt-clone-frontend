import "../css/Chat.css";

function Chat() {
  return (
    <>
      <div className="central-div">
        <div className="grid logo-div mr-auto justify-items-center gap-6">
          <div className="logo h-24 w-24 rounded-full " />
          <div className="text-cyan-200 text-3xl font-semibold">
            How can I help you today?
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
