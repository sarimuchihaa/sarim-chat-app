import SearchInput from "./SearchInput"
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div>
        <SearchInput/>
        <LogoutButton/>
        <div className="divider px-3"></div>
        <Conversations/>
    </div>
  )
}
export default Sidebar;