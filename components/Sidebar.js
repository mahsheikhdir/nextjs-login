import{
    ChevronDownIcon,
    ShoppingBagIcon,
    UserGroupIcon,
}from "@heroicons/react/outline"

import{
    UsersIcon,
    DocumentReportIcon,
}from "@heroicons/react/solid"
import SideBarRow from "./SideBarRow";

export default function Sidebar(props) {
    //const session = getSession();
    //console.log('Header-Session', session);
    //if(session==null) return <Login />;
    //const photo = getPhotoUrl(session);
    //const name = getFullName(session);
    //console.log('Header-Session', session);

    return (
        <div className="absolute mt-5 max-w-[600px] xl:min-w-[300px] pl-3 ">
           <SideBarRow src={props.photo} title={props.name}></SideBarRow>
           <SideBarRow Icon={UsersIcon} title="Friends"></SideBarRow>
           <SideBarRow Icon={UserGroupIcon} title="Groups"></SideBarRow>
           <SideBarRow Icon={DocumentReportIcon} title="Report"></SideBarRow>                    
        </div>
    )
}
