import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import FormContainer from "./Form/FormContainer";
import FormGeneric from "./Form/FormGeneric";
import { Form, Input, InputNumber, Select, message } from "antd";
import { Constant } from "../utils/constant";

const FormAddUser = () => {
  const navigate = useNavigate();

  const { userToken } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    message.loading("Loading...", 1);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      };
      await axios.post(`${Constant.BASE_URL}/users`, values, config);

      setTimeout(() => {
        message.success("Berhasil menambahkan user");
        navigate("/users");
      }, 1000);
    } catch (error) {
      if (error.response) {
        setTimeout(() => {
          message.error(error.response.data.msg);
        }, 1000);
      }
    }
  };
  return (
    <FormContainer title={"Tambah User"}>
      <FormGeneric goBackPathname={"/users"} onFinish={onFinish}>
        <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
          <Input placeholder="Masukan Nama" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Masukan Email" type="email" />
        </Form.Item>
        <Form.Item
          name="nik"
          label="NIK"
          rules={[
            { pattern: /^[\d]{16,16}$/, message: "NIK Harus 16 digit" },
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Masukan NIK"
            maxLength={16}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Masukan Password!" }]}
        >
          <Input.Password
            type="password"
            placeholder="Password"
            className="LoginRoute__input"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Konfirmasi Password"
          rules={[{ required: true, message: "Masukan Password!" }]}
        >
          <Input.Password
            type="password"
            placeholder="Password"
            className="LoginRoute__input"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item name="role" rules={[{ required: true }]} label="Role">
          <Select
            placeholder="Pilih Role"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "admin",
                label: "Admin",
              },
              {
                value: "user",
                label: "User",
              },
            ]}
          />
        </Form.Item>
      </FormGeneric>
    </FormContainer>
  );
};

export default FormAddUser;
