import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, InputNumber, Select, Spin, message } from "antd";
import FormGeneric from "./Form/FormGeneric";
import FormContainer from "./Form/FormContainer";
import { Constant } from "../utils/constant";
import { useSelector } from "react-redux";

const FormEditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);

  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserById();
  }, [id, userToken]);

  const getUserById = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userToken,
        },
      };
      const response = await axios.get(
        `${Constant.BASE_URL}/users/${id}`,
        config
      );
      console.log(response.data);
      form.setFieldsValue(response.data);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    message.loading("Loading...", 1);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userToken,
        },
      };
      await axios.patch(`${Constant.BASE_URL}/users/${id}`, values, config);
      setTimeout(() => {
        message.success("Berhasil memperbarui user");
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
    <div>
      {loading ? (
        <div className="loading-screen">
          <Spin size="large" style={{ color: "var(--primary-color)" }} />
        </div>
      ) : (
        <FormContainer title={"Edit User"}>
          <FormGeneric
            goBackPathname={"/users"}
            onFinish={onFinish}
            form={form}
          >
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
                { pattern: /^[\d]{16,17}$/, message: "NIK Harus 16 digit" },
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
            <Form.Item name="role" rules={[{ required: true }]} label="Role">
              <Select
                placeholder="Pilih Role"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
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
      )}
    </div>
  );
};

export default FormEditUser;
