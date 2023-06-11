import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  message,
} from "antd";
import FormGeneric from "./Form/FormGeneric";
import FormContainer from "./Form/FormContainer";
import { Constant } from "../utils/constant";
import { useSelector } from "react-redux";
import { convertToMoment, inputNumberCurrency } from "../utils";

const FormEditBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);

  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getBookingById();
  }, [id, userToken]);

  const getBookingById = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userToken,
        },
      };
      const response = await axios.get(
        `${Constant.BASE_URL}/booking/${id}`,
        config
      );
      console.log(response.data);
      form.setFieldsValue({
        hours: response.data.hours,
        date: convertToMoment(response.data.date),
        price: response.data.price,
        role: response.data.role,
        status: response.data.status.toLowerCase(),
      });
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
      await axios.patch(`${Constant.BASE_URL}/booking/${id}`, values, config);
      setTimeout(() => {
        message.success("Berhasil memperbarui data");
        navigate("/booking");
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
        <FormContainer title={"Edit Booking"}>
          <FormGeneric
            goBackPathname={"/booking"}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="hours"
              label="Pilih Jam Nikah"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Pilih Jam Nikah"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "08:00-10:00 Pagi",
                    label: "08:00-10:00 Pagi",
                  },
                  {
                    value: "10:00-12:00 Siang",
                    label: "10:00-12:00 Siang",
                  },
                  {
                    value: "13:00-15:00 Siang",
                    label: "13:00-15:00 Siang",
                  },
                  {
                    value: "19:00-21:00 Malam",
                    label: "19:00-21:00 Malam",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="date"
              label="Pilih Tanggal Nikah"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Tanggal"
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Harga"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                {...inputNumberCurrency()}
                placeholder="Masukan Harga"
              />
            </Form.Item>
            <Form.Item
              name="role"
              rules={[{ required: true }]}
              label="Pilih Tempat Nikah"
            >
              <Select
                placeholder="Pilih Tempat Nikah"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "out",
                    label: "Di luar KUA",
                  },
                  {
                    value: "in",
                    label: "Di KUA",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="status"
              rules={[{ required: true }]}
              label="Status"
            >
              <Select
                placeholder="Pilih Tempat Nikah"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "pending",
                    label: "Menunggu Persetujuan",
                  },
                  {
                    value: "approve",
                    label: "Diterima",
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

export default FormEditBooking;
