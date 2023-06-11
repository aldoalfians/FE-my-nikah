import { Button, Col, Row, message, Space, Table as TableAntd } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Constant } from "../utils/constant";

export default function Table({ columns, data, strDelete, func }) {
  const { user, userToken } = useSelector((state) => state.auth);

  console.log("user", user);
  console.log("userInfo", userToken);

  const { pathname } = useLocation();

  const deleteRecords = async (records) => {
    message.loading("loading...", 0.5);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": userToken,
      },
    };
    try {
      await axios.delete(
        `${Constant.BASE_URL}/${strDelete}/${records.uuid}`,
        config
      );
      setTimeout(() => {
        message.success("Berhasil menghapus user");
        func();
      }, 500);
    } catch (error) {
      setTimeout(() => {
        message.error(error.response.data.msg);
      }, 500);
    }
  };

  const navigate = useNavigate();
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[8, 8]} justify="end">
          <Col>
            {pathname !== "/" && pathname !== "/booking" && (
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => navigate("./add")}
              >
                Tambah
              </Button>
            )}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <TableAntd
          scroll={{ x: true }}
          size="middle"
          columns={[
            {
              width: 50,
              title: "No",
              dataIndex: "no",
              key: "no",
              onCell() {
                return { style: { textAlign: "center" } };
              },
              onHeaderCell() {
                return { style: { textAlign: "center" } };
              },
              render(_, __, index) {
                ++index;
                return index;
              },
            },
            ...columns,
            {
              width: 88,
              key: "action",
              fixed: "right",
              render: (_, records) => (
                <>
                  {user?.role === "admin" && (
                    <Space>
                      <Button
                        shape="circle"
                        type="text"
                        onClick={() => navigate(`./${records.uuid}`)}
                        icon={<EditOutlined />}
                      />
                      <Button
                        shape="circle"
                        type="text"
                        htmlType="button"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => deleteRecords(records)}
                      />
                    </Space>
                  )}
                </>
              ),
            },
          ]}
          dataSource={data}
        />
      </Col>
    </Row>
  );
}
