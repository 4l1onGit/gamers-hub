import { BsNintendoSwitch } from "react-icons/bs";
import { FaPlaystation, FaXbox } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { Platform } from "../../App";

interface Props {
  platforms: {
    platform: Platform;
  }[];
}

const PlatformBadge = ({ platforms }: Props) => {
  return (
    <div className="flex space-x-6 items-center text-lg px-1">
      {platforms != undefined && platforms.length > 0
        ? platforms.map((p) => {
            switch (p.platform.id) {
              case 4:
                return <FaComputer />;
              case 18:
                return <FaPlaystation />;
              case 7:
                return <BsNintendoSwitch />;
              case 1:
                return <FaXbox />;
            }
          })
        : "Loading"}
    </div>
  );
};

export default PlatformBadge;
