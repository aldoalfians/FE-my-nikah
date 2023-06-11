import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoNewspaper, IoCalendar } from "react-icons/io5";

const items = [
  { label: "Dashboard", key: "/dashboard", icon: <IoHome /> },
  { label: "Booking", key: "/booking", icon: <IoCalendar /> },
  { label: "Article", key: "/article", icon: <IoNewspaper /> },
  { label: "Users", key: "/users", icon: <IoPerson /> },
];

export default function MenuSide() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState(
    items.find((_item) => _item.key === location.pathname)?.key
  );

  const handleMenuClick = ({ key }) => {
    if (key) {
      navigate(key);
    }
  };

  useEffect(() => {
    setSelectedKey(items.find((_item) => _item.key === location.pathname)?.key);
  }, [location]);

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={items}
      onClick={handleMenuClick}
    />
  );
}
