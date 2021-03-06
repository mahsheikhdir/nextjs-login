import Image from "next/image"

function SideBarRow({src, Icon, title}) {
    return (
        <div className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-xl cursor-pointer">
            {src && 
                <Image src={src} width={30} height={30} className="rounded-full" layout="fixed"></Image>
            }
            {Icon &&
                <Icon className="h-8 w-8 text-blue-500"></Icon>
            }
            <p className="hidden sm:inline-flex font-medium">{title}</p>
        </div>
    )
}

export default SideBarRow
